$(document).on('keyup', function (event) {
    if (event.which === 13 && bool) {
        testar();
    }
});

let number, bool = false, tentativa;

draw.addEventListener("click", function () {
    random()
});

const random = () => {
    const draw = document.getElementById("draw");
    const spinner = document.getElementById("spinner");
    const msg = document.getElementById("message");
    document.getElementById("number-guess").value = null

    // Determina a dificuldade com base no botão de rádio selecionado
    const selectedDifficulty = document.querySelector('input[name="value-radio"]:checked').value;
    let min, max, level;

    switch (selectedDifficulty) {
        case "value-1": // Fácil
            min = 1;
            max = 10;
            tentativa = 3;
            level = "Fácil"
            break;
        case "value-2": // Médio
            min = 1;
            max = 25;
            tentativa = 4;
            level = "Médio"
            break;
        case "value-3": // Difícil
            min = 1;
            max = 50;
            tentativa = 5;
            level = "Difícil"
            break;
        default:
            min = 10;
            max = 20;
            tentativa = 3;
            level = "Default"
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

    document.getElementById("range").innerText = `Escolha um número entre ${min} e ${max}. (${level})`
    document.getElementById("tentativas").innerText = `Tentativas restantes: ${tentativa}`
}

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

    if (tentativa > 0 && bool) {
        const numInput = document.getElementById("number-guess");
        let numGuess = parseInt(numInput.value);

        if (isNaN(numGuess)) {
            showNotification("Digite um número!")
            return
        } else {

            if (numGuess === number) {
                showNotification("Muito bem! Você acertou!");
                bool = false
                showConfirm("Deseja jogar novamente?", function (result) {
                    if (result) {
                        random()
                    } else {
                        location.reload();
                    }
                });

                bool = false;
            } else {
                tentativa--;
                document.getElementById("tentativas").innerText = `Tentativas restantes: ${tentativa}`
                showNotification(`Errado! o número sorteado é <b>${numGuess > number ? 'menor!' : 'maior!'}</b><br>Tente mais <b>${tentativa}</b> vezes`);
                if (tentativa === 0) lost();
            }
        }
    }
};

const lost = () => {

    showNotification(`Você perdeu! O número era: ${number} <br>Tente novamente!`);
    showConfirm("Deseja tentar novamente?", function (result) {
        if (result) {
            random()
        } else {
            location.reload();
        }
    })
};

function showNotification(message, duration = 8000) {
    const notification = document.getElementById("notification");
    const notificationMessage = document.getElementById("notification-message");

    notificationMessage.innerHTML = message;
    notification.classList.remove("hidden");
    notification.classList.add("visible");

    setTimeout(() => {
        notification.classList.remove("visible");
        notification.classList.add("hidden");
    }, duration);
}

function closeNotification() {
    const notification = document.getElementById("notification");
    notification.classList.remove("visible");
    notification.classList.add("hidden");
}

function showConfirm(message, callback) {
    const confirmDialog = document.getElementById("confirm-dialog");
    const confirmMessage = document.getElementById("confirm-message");
    const yesButton = document.getElementById("confirm-yes");
    const noButton = document.getElementById("confirm-no");

    confirmMessage.textContent = message;
    confirmDialog.classList.remove("hidden");
    confirmDialog.classList.add("visible");

    // Se o usuário clicar em "Sim"
    yesButton.onclick = function () {
        callback(true);
        closeConfirm();
    };

    // Se o usuário clicar em "Não"
    noButton.onclick = function () {
        callback(false);
        closeConfirm();
    };
}

function closeConfirm() {
    const confirmDialog = document.getElementById("confirm-dialog");
    confirmDialog.classList.remove("visible");
    confirmDialog.classList.add("hidden");
}

// Função de atraso
const delay = async (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};