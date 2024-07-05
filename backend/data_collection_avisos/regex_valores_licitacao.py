import re
import json

def extrair_valor_licitacao(objeto):
    # Verifica se já existe a chave "Valor_Licitacao"
    if "Valor_Licitacao" in objeto:
        return objeto

    # Expressão regular para capturar valores no formato R$ X.XXX.XXX,XX
    regex = r'R\$ ?([\d.,]+)'
    
    # Procura todos os valores no campo "objeto"
    matches = re.findall(regex, objeto["objeto"])
    
    # Se encontrou algum valor, formata a lista de valores
    if matches:
        valores_licitacao = []
        for valor in matches:
            valor_limpo = valor.replace('.', '').replace(',', '.')
            # Verifica se o valor é válido (contém pelo menos um número)
            if re.search(r'\d', valor_limpo):
                valores_licitacao.append(valor_limpo)
        objeto["Valor_Licitacao"] = valores_licitacao if valores_licitacao else None
    else:
        objeto["Valor_Licitacao"] = None
    
    return objeto

def processar_json(caminho_arquivo):
    with open(caminho_arquivo, 'r', encoding='utf-8') as file:
        data = json.load(file)
        
    # Processa cada objeto no JSON
    data = [extrair_valor_licitacao(obj) for obj in data]
    
    with open(caminho_arquivo, 'w', encoding='utf-8') as file:
        json.dump(data, file, ensure_ascii=False, indent=4)

# Caminho do arquivo JSON
caminho_arquivo = "/home/victor-schmidt/Documents/LicitaBSB-24.1/backend/data_collection/database/data.json"
processar_json(caminho_arquivo)
