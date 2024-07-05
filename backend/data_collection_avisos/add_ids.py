import os
import json

diretorio_atual = os.getcwd()
# Obter o diretório atual e criar o caminho completo para o arquivo JSON
file_path = os.path.join(diretorio_atual, 'backend/data_collection/database/data.json')
# Carregar o JSON existente
with open(file_path, 'r', encoding='utf-8') as file:
    data = json.load(file)

# Adicionar IDs incrementais
for index, item in enumerate(data, start=1):
    item['id'] = index

# Salvar o JSON com IDs adicionados
with open(file_path, 'w', encoding='utf-8') as file:
    json.dump(data, file, ensure_ascii=False, indent=4)

print(f"IDs adicionados com sucesso a {len(data)} itens.")
