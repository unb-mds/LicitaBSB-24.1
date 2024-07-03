import json
import os
# Caminho para o arquivo JSON
file_path = os.path.join(os.getcwd(), 'backend/data_collection/database/data.json')
print(file_path)
# Carregar o JSON existente
with open(file_path, 'r', encoding='utf-8') as file:
    data = json.load(file)

# Adicionar IDs incrementais apenas para itens que não possuem um ID
current_max_id = max((item['id'] for item in data if 'id' in item), default=0)
next_id = current_max_id + 1

for item in data:
    if 'id' not in item:
        item['id'] = next_id
        next_id += 1

# Salvar o JSON com IDs adicionados
with open(file_path, 'w', encoding='utf-8') as file:
    json.dump(data, file, ensure_ascii=False, indent=4)

print(f"IDs adicionados com sucesso a {next_id - current_max_id - 1} itens.")
