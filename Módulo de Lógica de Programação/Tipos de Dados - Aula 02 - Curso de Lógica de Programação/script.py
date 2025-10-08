try:
    n1 = int(input("Digite um número inteiro: "))
    n2 = int(input("Digite outro inteiro: "))
    print("Soma:", n1 + n2)
except ValueError:
    print("Erro: Você deve digitar um número inteiro.")


alturaStr = input("Altura em metros (use ponto): ")
try:
    alturaFloat = float(alturaStr)
    if "." not in alturaStr:
        print("Precisa enviar o número com casas decimais, para não ter erro de dados")
    else:
        print("Altura em metros: ", alturaFloat)
except ValueError:
    print("Erro: Você deve digitar uma altura válida, com casa decimal.")

texto = input("Digite algo (pode deixar vazio): ")
if texto:
    print("Tem conteúdo → True")
else:
    print("Vazio → False")