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
                if line['Município'] == "BRASILIA" and line['Modalidade Compra'] == "Pregão - Registro de Preço" and line['Valor Licitação'] != "0,00":
                    data.append(line)
    except FileNotFoundError:
        print("The file does not exist.")
    return data

def save_json(data):
    json_file = "output.json"
def save_json(data):
    json_file = "output.json"
    if data:
        mode = 'a' if os.path.exists(json_file) else 'w'
        with open(json_file, mode, encoding='latin1') as file:
            if mode == 'a' and os.path.getsize(json_file) > 1:
                file.write(',')
            json.dump(data, file, ensure_ascii=False, indent=4)

def main():
    folder_path = "licitacoes"  
    for filename in os.listdir(folder_path):
        if filename.endswith(".csv"):
            file_path = os.path.join(folder_path, filename)
        data = analyse_licitacoes(file_path)
        save_json(data)


if __name__ == "__main__":
    main()