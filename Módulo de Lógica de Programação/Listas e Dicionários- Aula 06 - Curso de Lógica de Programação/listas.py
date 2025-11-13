notas = [8.0, 6.5, 9.2]

print("notas[0] - primeiro item")
print(notas[0])

print("notas[-1] - último item")
print(notas[-1])

print(len(notas))

notas.append(7.8)
print(notas)

removido = notas.pop()
print(notas)
print(removido)

print(notas[:2])
print(notas[1:])
print(notas[::2])

for indice, valor in enumerate(notas):
    print(f"{indice}: {valor}")