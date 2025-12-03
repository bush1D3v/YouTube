lista = ["Python", "Java", "Go", "Rust", "Python"]

def contar_repeticao_item_na_lista(lista, itemAEncontrar):
    contador = 0
    for item in lista:
        if item == itemAEncontrar:
            contador += 1
        
    return contador

print(contar_repeticao_item_na_lista(lista, "JavaScript"))