$(document).on('keyup', function (event) {
    if (event.which === 13 && bool) {
        testar();
    }
});

let number, bool = false, tentativa;

draw.addEventListener("click", function () {
    const draw = document.getElementById("draw");
    const spinner = document.getElementById("spinner");
    const msg = document.getElementById("message");

    // Determina a dificuldade com base no botão de rádio selecionado
    const selectedDifficulty = document.querySelector('input[name="value-radio"]:checked').value;
    let min, max;

    switch (selectedDifficulty) {
        case "value-1": // Fácil
            min = 1;
            max = 10;
            tentativa = 3;
            break;
        case "value-2": // Médio
            min = 1;
            max = 25;
            tentativa = 4;
            break;
        case "value-3": // Difícil
            min = 1;
            max = 50;
            tentativa = 5;
            break;
        default:
            min = 10;
            max = 20;
            tentativa = 3;
    }

    // Mostra o spinner e oculta o botão
    spinner.classList.remove("hidden");
    msg.classList.remove("hidden");
    draw.classList.add("hidden");

    number = Math.floor(Math.random() * (max - min + 1)) + min;

    msg.innerText = "Sorteando, aguarde...";

    // Aguarda 2.5 segundos
    delay(2500).then(() => {
        console.log(number);
        msg.innerText = "";
        show();

        // Esconde o spinner e mostra o botão
        spinner.classList.add("hidden");
        draw.classList.remove("hidden");
    });

    document.getElementById("range").innerText = `Escolha um número entre ${min} e ${max}`
    document.getElementById("tentativas").innerText = `Tentativas restantes: ${tentativa}` 
});

const show = () => {
    const form = document.getElementById("guesser");
    form.classList.add("visible");

    const main = document.getElementById("main");
    main.style.display = "none";

    bool = true;
};

const test = document.getElementById("test");

test.addEventListener("click", function () {
    testar();
});

const testar = () => {
    const numInput = document.getElementById("number-guess");
    let numGuess = parseInt(numInput.value);

    if (numGuess === number) {
        alert("Bem feito! Você acertou!");

        if (confirm("Tentar novamente?")) {
            location.reload();
        }

        bool = false;
    } else {
        tentativa--;
        alert(`Errado! Tente mais ${tentativa} vezes`);
        if (tentativa === 0) lost();
    }
};

const lost = () => {

    alert(`Você perdeu! O número era: ${number}\nJogue mais outra vez`);
    location.reload();
};

// Função de atraso
const delay = async (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};