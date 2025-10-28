nota = float(input("Digite sua nota: "))

# OK
status = "Aprovado" if nota >= 7 else "Reprovado"

#Evite
status = "Aprovado" if nota >= 9 else "Bom" if nota >= 7 else "Reprovado"