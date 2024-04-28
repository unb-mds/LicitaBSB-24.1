import datetime
import re
import os
import urllib
import io
import PyPDF2
from dateparser import parse
from dateutil.rrule import MONTHLY, rrule
from scrapy import Request

from gazette.items import Gazette
from gazette.spiders.base import BaseGazetteSpider

MONTH_MAP = {
    idx + 1: value
    for idx, value in enumerate(
        [
            "01_Janeiro",
            "02_Fevereiro",
            "03_Março",
            "04_Abril",
            "05_Maio",
            "06_Junho",
            "07_Julho",
            "08_Agosto",
            "09_Setembro",
            "10_Outubro",
            "11_Novembro",
            "12_Dezembro",
        ]
    )
}


class DfBrasiliaSpider(BaseGazetteSpider):
    TERRITORY_ID = "5300108"
    name = "licita_bsb"
    start_date = datetime.date(1967, 12, 25)

    GAZETTE_URL = "https://dodf.df.gov.br/listar"
    DATE_REGEX = r"[0-9]{2}-[0-9]{2}[ -][0-9]{2,4}"
    EXTRA_EDITION_TEXT = "EDTICAO EXR"
    PDF_URL = "https://dodf.df.gov.br/index/visualizar-arquivo/?pasta={}&arquivo={}"
    OUTPUT_FOLDER = "data/licita_bsb/arquivos_raspados"  # Define a pasta de saída desejada

    def start_requests(self):
        months_by_year = [
            (date.month, date.year)
            for date in rrule(
                MONTHLY, dtstart=self.start_date.replace(day=1), until=self.end_date
            )
        ]
        for month, year in months_by_year:
            month_value = MONTH_MAP.get(month)
            yield Request(
                f"{self.GAZETTE_URL}?dir={year}/{month_value}",
                meta={"month": month_value, "year": year},
                callback=self.parse_month,
            )

    def parse_month(self, response):
        """Parses available dates to request a list of documents for each date."""
        month, year = response.meta["month"], response.meta["year"]
        dates = response.json().get("data", [])

        for gazette_name in dates.values():
            date = re.search(self.DATE_REGEX, gazette_name).group()

            if date is None:
                continue

            date = parse(date, settings={"DATE_ORDER": "DMY"}).date()

            if date < self.start_date:
                continue

            url = f"{self.GAZETTE_URL}?dir={year}/{month}/{gazette_name}"
            yield Request(url, callback=self.parse_gazette)

    def parse_gazette(self, response):
        """Parses list of documents to request each one for the date."""
        json_response = response.json()
        if not json_response:
            self.logger.warning(f"Document not found in {response.url}")
            return

        json_dir = json_response["dir"]

        date = re.search(self.DATE_REGEX, json_dir).group()
        date = parse(date, settings={"DATE_ORDER": "DMY"}).date()
        is_extra_edition = self.EXTRA_EDITION_TEXT in json_dir
        path = json_dir.replace("/", "|")

        json_data = json_response["data"]
        file_urls = [self.PDF_URL.format(path, url.split("/")[-1]) for url in json_data]

        for pdf_url in file_urls:
            yield Request(pdf_url, meta={"date": date, "is_extra_edition": is_extra_edition}, callback=self.save_pdf_and_text)

    def save_pdf_and_text(self, response):
        """Saves the PDF file and its corresponding text."""
        date = response.meta["date"]
        is_extra_edition = response.meta["is_extra_edition"]

        # Create output folder if it does not exist
        if not os.path.exists(self.OUTPUT_FOLDER):
            os.makedirs(self.OUTPUT_FOLDER)

        # Save PDF file
        pdf_path = os.path.join(self.OUTPUT_FOLDER, f"{date}_{'extra_' if is_extra_edition else ''}gazette.pdf")
        with open(pdf_path, "wb") as pdf_file:
            pdf_file.write(response.body)

        # Extract text from PDF and save it
        reader = PyPDF2.PdfReader(io.BytesIO(response.body))
        text = ""
        for page in reader.pages:
            text += page.extract_text()
        text_path = os.path.join(self.OUTPUT_FOLDER, f"{date}_{'extra_' if is_extra_edition else ''}gazette.txt")
        with open(text_path, "w") as text_file:
            text_file.write(text)

        yield Gazette(date=date, file_urls=[pdf_path, text_path], is_extra_edition=is_extra_edition, power="executive_legislative")
