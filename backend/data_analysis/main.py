# -*- coding: latin1 -*-
import os
import json

def extract(txt_file):
    data = []
    with open(txt_file, 'r', encoding='latin1') as file:
        capturing_text = False
        current_bid = None
        lines_since_pela_contratada = 0

        for line in file:
            if "EXTRATO DE CONTRATO" in line or "AVISO DE LICITAÇÃO" in line:
                if current_bid:
                    data.append(current_bid)
                notice_type = "EXTRATO DE CONTRATO" if "EXTRATO DE CONTRATO" in line else "AVISO DE LICITAÇÃO"
                current_bid = {"Tipo": notice_type, "Texto": ""}
                capturing_text = True
                lines_since_pela_contratada = 0
            elif "PELA CONTRATADA:" in line or "VALOR ESTIMADO" in line:
                capturing_text = False
                if current_bid:
                    data.append(current_bid)
                    current_bid = None
            elif capturing_text:
                current_bid["Texto"] += line.strip() + '\n'
                lines_since_pela_contratada += 1
                if lines_since_pela_contratada >= 10:
                    capturing_text = False
                    data.append(current_bid)
                    current_bid = None

        if current_bid:
            data.append(current_bid)

    return data

def save_json(data, json_file):
    if data:
        mode = 'a' if os.path.exists(json_file) else 'w'
        with open(json_file, mode, encoding='latin1') as file:
            if mode == 'a' and os.path.getsize(json_file) > 1:
                file.write(',')
            json.dump(data, file, ensure_ascii=False, indent=4)

def main():
    input_folder = 'gazette/'
    output_file = 'output.json'

    with open(output_file, 'w', encoding='latin1') as file:
        file.write('[')  

    for file in os.listdir(input_folder):
        if file.endswith(".txt"):
            txt_file = os.path.join(input_folder, file)
            data = extract(txt_file)
            save_json(data, output_file)
            print(f"Data from '{file}' have been extracted and appended to JSON file '{output_file}' successfully.")

    with open(output_file, 'a', encoding='latin1') as file:
        file.write(']')  

if __name__ == "__main__":
    main()