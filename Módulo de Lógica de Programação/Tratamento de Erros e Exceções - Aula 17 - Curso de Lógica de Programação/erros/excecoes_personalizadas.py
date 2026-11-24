# def cadastrar_usuario(nome, idade):
#     if idade < 0:
#         raise ValueError("A idade não pode ser negativa.")

#     return {
#         "nome": nome,
#         "idade": idade
#     }


# try:
#     usuario = cadastrar_usuario("Victor", -5)

#     print(usuario)

# except ValueError as erro:
#     print(f"Erro no cadastro: {erro}")

class IdadeInvalidaError(Exception):
    pass


def cadastrar_usuario(nome, idade):
    if idade < 0:
        raise ValueError(
            "A idade informada não pode ser negativa."
        )

    return {
        "nome": nome,
        "idade": idade
    }


try:
    usuario = cadastrar_usuario("Victor", -5)

except ValueError as erro:
    print(f"Erro no cadastro: {erro}")