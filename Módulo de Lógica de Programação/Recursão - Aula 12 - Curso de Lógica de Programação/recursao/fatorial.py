def fatorial(n):
    if n <=1:
        return 1


    return n * fatorial(n - 1)

print(fatorial(4))

# | fatorial(1) |
# | fatorial(2) |
# | fatorial(3) |
# | fatorial(4) |
# ---------------
#      STACK
