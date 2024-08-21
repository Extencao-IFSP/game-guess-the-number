$(document).on('keyup', function (event) {
    if (event.which === 13 && bool) {
        testar();
    }
});

let number, bool = false, tentativa, lvl = null;

draw.addEventListener("click", function () {
    random()
});

const random = () => {
    const draw = document.getElementById("draw");
    const spinner = document.getElementById("spinner");
    const msg = document.getElementById("message");
    document.getElementById("number-guess").value = null

    const selectedDifficulty = lvl === null ? document.querySelector('input[name="value-radio"]:checked').value : lvl;

    let min, max, level;

    switch (selectedDifficulty) {
        case "value-1":
        case 1:  // Combine os casos dessa forma
            min = 1;
            max = 10;
            tentativa = 3;
            level = "Fácil";
            lvl = 1;
            break;
        case "value-2":
        case 2: // Médio
            min = 1;
            max = 25;
            tentativa = 4;
            level = "Médio"
            lvl = 2;
            break;
        case "value-3":
        case 3: // Difícil
            min = 1;
            max = 50;
            tentativa = 5;
            level = "Difícil"
            lvl = 3;
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

const testar = async () => {

    if (tentativa > 0) {
        const numInput = document.getElementById("number-guess");
        let numGuess = parseInt(numInput.value);

        if (isNaN(numGuess)) {
            showNotification("Digite um número!")
            return
        } else {

            if (numGuess === number) {
                showNotification("Muito bem! Você acertou!");
                bool = false;

                const result = await showConfirm("Deseja passar para o próximo nível?");
                if (result) {
                    lvl++;
                    random();
                } else {
                    playAgain();
                }
            } else {
                tentativa--;
                document.getElementById("tentativas").innerText = `Tentativas restantes: ${tentativa}`;
                showNotification(`Errado! O número sorteado é <b>${numGuess > number ? 'menor!' : 'maior!'}</b><br>Tente mais <b>${tentativa}</b> vezes`);
                if (tentativa === 0) lost();
            }
        }
    }
};

const lost = () => {
    showNotification(`Você perdeu! O número era: ${number} <br>Tente novamente!`);
    playAgain();
};

const playAgain = () => {
    showConfirm("Deseja tentar novamente?").then((result) => {
        if (result) {
            random();
        } else {
            location.reload();
        }
    });
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

function showConfirm(message) {
    return new Promise((resolve) => {
        const confirmDialog = document.getElementById("confirm-dialog");
        const confirmMessage = document.getElementById("confirm-message");
        const yesButton = document.getElementById("confirm-yes");
        const noButton = document.getElementById("confirm-no");

        confirmMessage.textContent = message;
        confirmDialog.classList.remove("hidden");
        confirmDialog.classList.add("visible");

        yesButton.onclick = function () {
            resolve(true);
            closeConfirm();
        };

        noButton.onclick = function () {
            resolve(false);
            closeConfirm();
        };
    });
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