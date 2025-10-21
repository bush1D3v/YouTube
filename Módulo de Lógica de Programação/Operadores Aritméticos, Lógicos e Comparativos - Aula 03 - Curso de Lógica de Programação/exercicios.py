print("=== Teste de Operadores ===")

# Entrada de dados
a = int(input("Digite o primeiro número: "))
b = int(input("Digite o segundo número: "))

# Aritméticos
print(f"Soma: {a + b}")
print(f"Subtração: {a - b}")
print(f"Multiplicação: {a * b}")
print(f"Divisão inteira: {a // b}")
print(f"Resto: {a % b}")

# Comparação
print(f"{a} é igual a {b}? {a == b}")
print(f"{a} é maior que {b}? {a > b}")

# Lógicos
condicao = (a > 0 and b > 0)
print(f"Ambos são positivos? {condicao}")