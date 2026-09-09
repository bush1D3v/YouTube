# O(n^2)

def todos_os_pares(lst):
    pares = []
    for i in lst:
        for j in lst:
            pares.append((i, j))
    return pares
