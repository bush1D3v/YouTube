## sanitizar -> validar -> processar
## python strip method
## python upper method

def sanitizar(valor):
    return valor.strip()

def validar(valor):
    return len(valor) >= 3

def processar(valor):
    return valor.upper()

def pipeline(texto):
    textoSanitizado = sanitizar(texto)
    if not validar(textoSanitizado):
        return "Valor inválido!!"
    return processar(textoSanitizado)

print(pipeline("    oi      "))
print(pipeline(" navarro   "))