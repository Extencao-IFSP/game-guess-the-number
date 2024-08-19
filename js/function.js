let number

// sortear numero
const draw = document.getElementById("draw")

draw.addEventListener("click", function () {
    const msg = document.getElementById("message")
    let min = 10, max = 20

    number = Math.floor(Math.random() * (max - min + 1)) + min;
    msg.innerText = "teste"
    delay(2500)
    console.log(number)
    msg.innerText = null

    show()
})

const show = () => {

    const form = document.getElementById("guess-form")
    form.classList = "visible"

}

// testar numero sorteado
const test = document.getElementById("test")
let cont = 3 
test.addEventListener("click", function () {
    const numInput = document.getElementById("number-guess")
    let numGuess = parseInt(numInput.value)

    if (numGuess === number) {
        alert("Well done! You got it!")

        let text;
        if (confirm("Try again?") == true) {
            location.reload()
        } else {
            
        }
    }
    else {
        cont--
        if(cont === 0) lost()
        alert(`Wrong! Try more ${cont} times`)
    }
}
)

const lost = () =>{
    alert("You lose! Try again later.")
    location.reload()
}

//other one
const delay = async (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};
