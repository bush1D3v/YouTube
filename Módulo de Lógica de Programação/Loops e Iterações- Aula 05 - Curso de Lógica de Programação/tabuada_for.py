numero = int(input("Digite um número para ver a sua tabuada: "))

for valor in range(1, 11):
    print(f"{numero} x {valor} = {numero * valor}")