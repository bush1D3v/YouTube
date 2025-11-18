def verifica_par(n):
    return n % 2 == 0

def dobrar_valor(n):
    return n * 2

def dobrar_valor_par(n):
    if verifica_par(n):
        return dobrar_valor(n)
    return n

print(dobrar_valor_par(3))