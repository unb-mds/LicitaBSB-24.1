import sys
from datetime import datetime, timedelta
from functions import link_jornal_diario, extrair_url_titles, extraindo_avisos_licitacao, criandojsoncomavisos

def main():
    # Verificação dos argumentos passados
    if len(sys.argv) not in [1, 2, 3]:
        print("Uso incorreto. Exemplos de uso:")
        print("python3 main.py")
        print("python3 main.py <dia-inicial>/<mes-inicial>/<ano-inicial>")
        print("python3 main.py <dia-inicial>/<mes-inicial>/<ano-inicial> <dia-final>/<mes-final>/<ano-final>")
        return

    # Definindo data inicial e final
    if len(sys.argv) == 1:
        # Caso nenhuma data seja fornecida, usaremos 05/02/2018 até hoje quue onde começa a ter dados de avisos
        data_inicial = datetime(2018, 2, 5)
        data_final = datetime.now()
    elif len(sys.argv) == 2:
        # Caso apenas a data inicial seja fornecida
        try:
            data_inicial = datetime.strptime(sys.argv[1], "%d/%m/%Y")
            data_final = datetime.now()
        except ValueError:
            print("Formato de data inválido. Use dd/mm/aaaa.")
            return
    elif len(sys.argv) == 3:
        # Caso ambas as datas sejam fornecidas
        try:
            data_inicial = datetime.strptime(sys.argv[1], "%d/%m/%Y")
            data_final = datetime.strptime(sys.argv[2], "%d/%m/%Y")
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
        url = link_jornal_diario(dia, mes, ano)
        if not url.startswith("http"):
            print(url)
            data_atual += timedelta(days=1)
            continue

        # Extrair as URLs dos títulos
        urls_titulos = extrair_url_titles(url)

        # Extrair avisos de licitação
        links_avisos = extraindo_avisos_licitacao(urls_titulos)

        # Criar JSON com avisos
        criandojsoncomavisos(links_avisos, dia, mes, ano)

        # Avançar para o próximo dia
        data_atual += timedelta(days=1)

if __name__ == "__main__":
    main()
