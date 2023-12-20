def calcular_nivel(vitorias, derrotas):
    # Calcula o saldo de Rankeadas
    saldo_vitorias = vitorias - derrotas

    # Determina o nível com base no saldo de vitórias
    if vitorias < 10:
        nivel = "Ferro"
    elif 11 <= vitorias <= 20:
        nivel = "Bronze"
    elif 21 <= vitorias <= 50:
        nivel = "Prata"
    elif 51 <= vitorias <= 80:
        nivel = "Ouro"
    elif 81 <= vitorias <= 90:
        nivel = "Diamante"
    elif 91 <= vitorias <= 100:
        nivel = "Lendário"
    else:
        nivel = "Imortal"

    # Exibe a mensagem com o saldo de vitórias e o nível
    mensagem = f"O Herói tem um saldo de {saldo_vitorias} e está no nível de {nivel}"
    return mensagem

def main():
    # Exemplo de uso
    quantidade_vitorias = 75
    quantidade_derrotas = 20
    resultado = calcular_nivel(quantidade_vitorias, quantidade_derrotas)
    print(resultado)

if __name__ == "__main__":
    main()
