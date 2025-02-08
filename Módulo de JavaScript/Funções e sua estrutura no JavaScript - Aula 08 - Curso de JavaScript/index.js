/**
 * @param {string} sabor Sabor do bolo a ser exibido
 * @returns {string} Mensagem personalizada de bolo pronto
 */
function fazerBolo(sabor) {
    /**
     * @type string
     */
    let emoji = "";

    if (sabor === "Morango") {
        emoji = "🍓";
    } else if (sabor === "Laranja") {
        emoji = "🍊";
    } else if (sabor === "Banana") {
        emoji = "🍌";
    }

    return `Bolo de ${sabor} está pronto! ${emoji}`
}

console.log(fazerBolo("Morango"));
console.log(fazerBolo("Laranja"));
console.log(fazerBolo("Banana"));