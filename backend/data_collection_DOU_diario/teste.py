import json

# Dados a serem escritos no arquivo JSON
data = {
    "message": "Hello, World!"
}

# Nome do arquivo JSON
file_name = 'hello_world.json'

# Escrever os dados no arquivo JSON
with open(file_name, 'w') as json_file:
    json.dump(data, json_file, indent=4)

print(f'{file_name} criado com sucesso!')
