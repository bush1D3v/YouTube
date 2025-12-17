def existe_maior_que(valores, limite):
    for v in valores:
        if v > limite:
            return True
        
    return False

print(existe_maior_que([1, 2, 3, 4, 5], 4))