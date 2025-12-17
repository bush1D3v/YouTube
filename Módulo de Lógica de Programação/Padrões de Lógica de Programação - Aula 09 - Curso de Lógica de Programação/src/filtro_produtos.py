produtos = [
    {"nome": "Teclado", "preco": 100 },
    {"nome": "Monitor", "preco": 900 },
    {"nome": "Mouse", "preco": 50 }
]

filtrados=[]

for p in produtos:
    if p["preco"] > 100:
        filtrados.append(p)

print(filtrados)