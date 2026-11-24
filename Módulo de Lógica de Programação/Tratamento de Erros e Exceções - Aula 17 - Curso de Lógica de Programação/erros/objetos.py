usuario = {
    "nome": "Victor",
    "idade": 21
}

try:
    print(usuario["email"])

except KeyError:
    print("Essa informação não existe.")