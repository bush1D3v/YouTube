nome = input("Digite seu nome: ")

with open("usuarios.txt", "a", encoding="utf-8") as arquivo:
    arquivo.write(nome + "\n")

print("Nome salvo com sucesso no arquivo 'usuarios.txt'. Lista atualizada de usuários:")
with open("usuarios.txt", "r", encoding="utf-8") as arquivo:
    for linha in arquivo:
        print(linha.strip())