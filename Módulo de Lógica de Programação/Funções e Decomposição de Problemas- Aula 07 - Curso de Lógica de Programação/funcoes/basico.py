def saudacao(nome):
    if nome == "Victor":
        return "Olá, administrador!"
    return "Olá, usuário!"

nome = "Victor"
saudacaoComNome = saudacao(nome)

print("saudacaoComNome")
print(saudacaoComNome)