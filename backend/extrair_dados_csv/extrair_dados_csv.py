# -*- coding: latin1 -*-
import csv
import json
import os

def analyse_licitacoes(file_path):
    data=[]
    try:
        with open(file_path, 'r', encoding='latin1') as file:
            #Lê o arquivo com o delimitador sendo ';'
            csv_reader = csv.DictReader(file, delimiter=';')
            for line in csv_reader:
                #Apenas armazena as licitações que apresentam as seguintes condições
                if line['Munic�pio'] == "BRASILIA" and line['Modalidade Compra'] == "Preg�o - Registro de Pre�o" and line['Valor Licita��o'] != "0,00":
                    data.append(line)
    except FileNotFoundError:
        print("The file does not exist.")
    return data

def save_json(data):
    json_file = "dados_csv.json"
    if data:
        mode = 'a' if os.path.exists(json_file) else 'w'
        with open(json_file, mode, encoding='latin1') as file:
            if mode == 'a' and os.path.getsize(json_file) > 1:
                file.write(',')
            json.dump(data, file, ensure_ascii=False, indent=4)

def main():
    folder_path = "licitacoes_csv"  
    #Itera sobre todos os aquivos dentro de folder_path
    for filename in os.listdir(folder_path):
        if filename.endswith(".csv"):
            file_path = os.path.join(folder_path, filename)
        data = analyse_licitacoes(file_path)
        save_json(data)


if __name__ == "__main__":
    main()