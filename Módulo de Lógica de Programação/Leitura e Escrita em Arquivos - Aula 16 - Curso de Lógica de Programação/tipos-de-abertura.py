# criando ou sobrescrevendo um arquivo de texto

with open("mensagem.txt", "w", encoding="utf-8") as arquivo:
    arquivo.write("Teste")

# ----

# Leitura e consulta do conteúdo

with open("mensagem.txt", "r", encoding="utf-8") as arquivo:
    print(arquivo.read())

# ----

with open("mensagem.txt", "a", encoding="utf-8") as arquivo:
    arquivo.write("\n de adição de conteúdo")

# ----

with open("mensagem.txt", "r", encoding="utf-8") as arquivo:
    for linha in arquivo:
        print(linha.strip())