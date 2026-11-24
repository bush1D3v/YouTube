try:
    numero = int(input("Digite um número: "))

    resultado = 10 / numero

    print(resultado)

except ValueError:
    print("Você deve digitar um valor numérico")
except ZeroDivisionError:
    print("Você não pode realizar uma divisão por zero")
except:
    print("Ocorreu um erro durante a operação")
