import { countriesDetails } from "./countries.js";


let currentFlagIndex = 0;
let score = 0;
let seconds = 120;
let timer;
let shuffledCountries = [];


const timerElement = document.getElementById('timer');
const guessInput = document.getElementById('guess-input');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-button')


function shuffleArray(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function displayFlag() {
    const descriptionElement = document.getElementById('description');
    descriptionElement.src = shuffledCountries[currentFlagIndex].image;
    timerElement.textContent = `Time Left: ${seconds}s`;
}


function checkGuess() {
    const guess = guessInput.value.trim().toLowerCase();
    const correctCountry = shuffledCountries[currentFlagIndex].name.trim().toLowerCase();

    if (guess === correctCountry) {
        resultElement.textContent = "Correct Answer";
        score++;
    }
    else {
        resultElement.textContent = "Wrong Answer";
    }

    scoreElement.textContent = `Score: ${score}`;
    guessInput.value = '';
    guessInput.focus();
    nextCountry();
}


function nextCountry() {
    currentFlagIndex++;

    setTimeout(() => {
        resultElement.textContent = '';
    }, 1000)

    if (currentFlagIndex === shuffledCountries.length) {
        currentFlagIndex = 0;
        shuffledCountries = shuffleArray([...countriesDetails]);
    }
    displayFlag();
}


guessInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        checkGuess();
    }
});

guessInput.addEventListener('click', () => {
    startTimer();
});


document.addEventListener('DOMContentLoaded', () => {
    shuffledCountries = shuffleArray([...countriesDetails]);
    displayFlag();
})


function startTimer() {
    timer = setInterval(() => {
        seconds--;

        if (seconds <= 0) {
            endGame();
            timerElement.textContent = "Time's Up!";
            guessInput.disabled = true;
        }
        else {
            timerElement.textContent = `Time Left: ${seconds}s`;
        }
    }, 1000)
}

function endGame() {
    clearInterval(timer);
    guessInput.disabled = true;
    timerElement.textContent = "";
    restartButton.style.display = "block";
}

restartButton.addEventListener('click', () => {
    restartGame();
})

function restartGame() {
    currentFlagIndex = 0;
    score = 0;
    seconds = 120;
    clearInterval(timer);
    guessInput.disabled = false;
    shuffledCountries = shuffleArray([...countriesDetails]);
    guessInput.value = '';
    displayFlag();
}