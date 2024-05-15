# -*- coding: latin1 -*-
import csv
import json
import os

def analyse_licitacoes(file_path):
    data=[]
    try:
        with open(file_path, 'r', encoding='latin1') as file:
            csv_reader = csv.DictReader(file, delimiter=';')
            for line in csv_reader:
                if line['Município'] == "BRASILIA" and line['Modalidade Compra'] == "Pregão - Registro de Preço" :
                    data.append(line)
    except FileNotFoundError:
        print("The file does not exist.")
    return data

def save_json(data):
    json_file = "output.json"
    if data:
        mode = 'a' if os.path.exists(json_file) else 'w'
        with open(json_file, mode, encoding='latin1') as file:
            if mode == 'a' and os.path.getsize(json_file) > 1:
                file.write(',')
            json.dump(data, file, ensure_ascii=False, indent=4)

def main():
    file_path = "202404_Licitacoes/202404_Licitação.csv"
    data = analyse_licitacoes(file_path)
    save_json(data)


if __name__ == "__main__":
    main()