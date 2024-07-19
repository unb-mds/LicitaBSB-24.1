'''
Essa função serve para renomear os arquivos json a utilize para realizar alterações e
manipulações nos nomes das tags dos jsons que contém os dados
'''


import json

# Variável para o caminho do arquivo JSON
json_file_path = '/home/victor-schmidt/Documents/LicitaBSB-24.1/backend/data_collection_avisos/database/data.json'

# Dicionário de mapeamento para renomear os campos
rename_map = {
    "tipo": "tipo",
    "numero_licitacao": "numero_licitacao",
    "nomeOrgao": "nomeOrgao",
    "objeto": "objeto",
    "numero_processo": "numero_processo",
    "assinante": "assinante",
    "data_abertura": "data_abertura",
    "cargo": "cargo",
    "edicao": "edicao",
    "secao_pagina": "secao_pagina",
    "link": "link",
    "Valor_Licitacao": "valores_licitacao",
    "id": "id"
}

def rename_keys(data, rename_map):
    if isinstance(data, list):
        return [rename_keys(item, rename_map) for item in data]
    elif isinstance(data, dict):
        return {rename_map.get(key, key): rename_keys(value, rename_map) for key, value in data.items()}
    else:
        return data

def main():
    # Carregar o JSON do arquivo
    with open(json_file_path, 'r', encoding='utf-8') as file:
        data = json.load(file)
    
    # Renomear as chaves
    renamed_data = rename_keys(data, rename_map)
    
    # Salvar o JSON renomeado de volta no arquivo
    with open(json_file_path, 'w', encoding='utf-8') as file:
        json.dump(renamed_data, file, ensure_ascii=False, indent=4)
    
    print("Renomeação concluída com sucesso!")

if __name__ == "__main__":
    main()