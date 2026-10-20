try:
    with open("inexistente.txt", "r", encoding="utf-8") as arquivo:
        print(arquivo.read())
except FileNotFoundError:
    print("O arquivo 'inexistente.txt' não foi encontrado.")    