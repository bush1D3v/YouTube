idade = 20
tem_carteira = True

if idade >= 18 and tem_carteira:
    print("Pode dirigir!")
else:
    print("Não pode dirigir.")

# - `and` → as duas condições precisam ser verdadeiras
# - `or` → basta uma ser verdadeira
# - `not` → inverte o valor lógico (True → False)

usuario_logado = True
senha_correta = False

if usuario_logado and not senha_correta:
    print("Senha incorreta!")

if usuario_logado and senha_correta:
    print("Bem-vindo!")