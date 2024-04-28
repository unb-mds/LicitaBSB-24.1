import os
from PyPDF2 import PdfReader

def extrair_texto_e_metadados(pdf_path):
    texto = ''
    metadados = {}

    with open(pdf_path, 'rb') as pdf_file:
        reader = PdfReader(pdf_file)
        for page in reader.pages:
            texto += page.extract_text()
        metadados = reader.metadata

    return texto, metadados

def salvar_em_txt(texto, txt_path):
    with open(txt_path, 'w', encoding='utf-8') as txt_file:
        txt_file.write(texto)

def converter_pdfs_para_txts(directory):
    for root, dirs, files in os.walk(directory): #percorre as pastas de onde ta a raspagem
        for dir_name in dirs:
            dir_path = os.path.join(root, dir_name)
            pdf_files = [file for file in os.listdir(dir_path) if file.lower().endswith('.pdf')]

            if pdf_files:
                print(f"Processando a pasta: {dir_path}")
                for pdf_file in pdf_files:
                    pdf_path = os.path.join(dir_path, pdf_file)
                    # Extrair texto do PDF
                    texto, _ = extrair_texto_e_metadados(pdf_path)
                    # Salvar texto em um arquivo de texto
                    txt_path = os.path.join(dir_path, pdf_file.replace('.pdf', '.txt'))
                    salvar_em_txt(texto, txt_path)
                    print(f"Arquivo TXT salvo: {txt_path}")

root_directory = "data_collection/data/arquivos_raspados/"

converter_pdfs_para_txts(root_directory)
