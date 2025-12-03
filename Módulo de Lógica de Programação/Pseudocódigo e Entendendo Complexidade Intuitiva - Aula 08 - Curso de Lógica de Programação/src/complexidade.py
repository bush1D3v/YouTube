# O(n)
# 10 itens -> 10 passos
# 100 itens -> 100 passos
# Exemplo: 
# def comparar_dados(lista):
#     for item in lista:
#         print("Item primário")
#         print(item)

# O(n2)
# 10 -> 100 passos
# 100 itens -> 10000 passos
# Num items -> Num itens x Num itens passos
# Exemplo: 
# def comparar_dados(lista):
#     for item in lista:
#         print("Item primário")
#         print(item)
#         for b in lista:
#             print("Item secundário")
#             print(b)

lista = [1, 2, 3, 4, 5]

def comparar_dados(lista):
    for item in lista:
        print("Item primário")
        print(item)
        for b in lista:
            print("Item secundário")
            print(b)

comparar_dados(lista)