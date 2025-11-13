produto = { "id": 107, "nome": "Teclado", "preco": 199.90 }

produto["estoque"] = 12
produto["preco"] = 179.90

print(produto)

print(produto.get("nome"))
print("id" in produto)

valor = produto.pop("estoque", None)
print(valor, produto)

# for key, value in produto.items():
#     print(key, "->", value)

produtos = [
    { "id": 107, "nome": "Teclado", "preco": 199.90 },
    { "id": 108, "nome": "Mouse", "preco": 129.90 }
]

for indice, valor in enumerate(produtos):
    for key, value in valor.items():
        print(key, "->", value)
