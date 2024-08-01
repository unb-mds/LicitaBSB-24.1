import os

# Pega o diretório atual
current_directory = os.getcwd()
print(f"Diretório atual: {current_directory}")

# Move um nível para cima
parent_directory = os.path.join(current_directory, '..')

# Altera o diretório de trabalho para o diretório pai
os.chdir(parent_directory)

# Pega o novo diretório atual
new_directory = os.getcwd()
print(f"Novo diretório atual: {new_directory}")
