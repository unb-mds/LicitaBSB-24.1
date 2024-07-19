import sys
from datetime import datetime, timedelta
import funcoes_coletoras as func

def main():
    # Verificação dos argumentos passados
    if len(sys.argv) < 2:
        print("Uso incorreto. Exemplos de uso:")
        print("python3 main.py avisos")
        print("python3 main.py extratos")
        print("python3 main.py avisos <dia-inicial>/<mes-inicial>/<ano-inicial>")
        print("python3 main.py extratos <dia-inicial>/<mes-inicial>/<ano-inicial>")
        print("python3 main.py avisos <dia-inicial>/<mes-inicial>/<ano-inicial> <dia-final>/<mes-final>/<ano-final>")
        print("python3 main.py extratos <dia-inicial>/<mes-inicial>/<ano-inicial> <dia-final>/<mes-final>/<ano-final>")
        return

    # Definindo o tipo
    tipo = sys.argv[1]
    if tipo not in ['avisos', 'extratos']:
        print("Tipo inválido. Use 'avisos' ou 'extratos'.")
        return

    # Definindo data inicial e final
    if len(sys.argv) == 2:
        # Caso nenhuma data seja fornecida, a leitura será realizada do dia anterior
        data_final = datetime.now() - timedelta(days=1)
        data_inicial = data_final
    elif len(sys.argv) == 3:
        # Caso apenas a data inicial seja fornecida
        try:
            data_inicial = datetime.strptime(sys.argv[2], "%d/%m/%Y")
            data_final = datetime.now()
        except ValueError:
            print("Formato de data inválido. Use dd/mm/aaaa.")
            return
    elif len(sys.argv) == 4:
        # Caso ambas as datas sejam fornecidas
        try:
            data_inicial = datetime.strptime(sys.argv[2], "%d/%m/%Y")
            data_final = datetime.strptime(sys.argv[3], "%d/%m/%Y")
        except ValueError:
            print("Formato de data inválido. Use dd/mm/aaaa.")
            return

    # Verificar se a data inicial é antes de 05/02/2018
    if data_inicial < datetime(2018, 2, 5):
        print("A data inicial não pode ser antes de 05/02/2018.")
        return

    # Verificar se a data final é depois da data de hoje
    if data_final > datetime.now():
        print("A data final não pode ser posterior à data de hoje.")
        return

    # Iterar sobre os dias no intervalo fornecido
    data_atual = data_inicial
    while data_atual <= data_final:
        dia = data_atual.day
        mes = data_atual.month
        ano = data_atual.year

        print(f"Processando {dia}/{mes}/{ano}...")

        # Capturar o link do jornal diário
        url = func.link_jornal_diario(dia, mes, ano)
        if not url.startswith("http"):
            print(url)
            data_atual += timedelta(days=1)
            continue

        # Extrair as URLs dos títulos
        urls_titulos = func.extrair_url_titles(url)

        # Extrair avisos ou extratos de licitação
        links_avisos = func.extraindo_links_licitacoes(urls_titulos, tipo)

        # Criar JSON com avisos ou extratos
        func.criando_json_com_licitacoes(links_avisos, dia, mes, ano, tipo)

        # Avançar para o próximo dia
        data_atual += timedelta(days=1)

if __name__ == "__main__":
    main()
