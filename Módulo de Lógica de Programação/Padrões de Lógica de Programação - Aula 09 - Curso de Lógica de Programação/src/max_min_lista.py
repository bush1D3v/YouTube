valores = [10, 3, 50, 2, 70]

menor = valores[0]
maior = valores[0]

for v in valores:
    if v < menor: menor = v
    if v > maior: maior = v

print(menor, maior)