nomes = ["Victor", "Ana", "Carlos"]

try:
    print(nomes[5])

except IndexError:
    print("Essa posição não existe na lista.")