const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const endgameElement = document.getElementById("end-game-container");
const settingsButton = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

const words = [
    "sigh",
    "tense",
    "airplane",
    "ball",
    "pies",
    "juice",
    "warlike",
    "bad",
    "north",
    "dependent",
    "steer",
    "silver",
    "highfalutin",
    "superficial",
    "quince",
    "eight",
    "feeble",
    "admit",
    "drag",
    "loving",
    "happy",
    "danger",
    "resolve",
    "undertaker",
    "mystrious",
    "heavy",
    "harmful",
    "wealth",
    "systum",
    "ready",
    "hurry",
    "drama",
    "incognito",
    "blackbox",
    "bugs",
    "constant",
    "selection",
    "terminal",
    "terminology",
    "underestimate",
    "professional",
    "terminology",
    "menifesto",
    "qwerty",
    "determination",
    "projectory",
    "localstorage",
    "Tractable",
    "Placate",
    "Miser",
    "Engender",
    "Dogma",
    "Homogeneous",
    "Laconic",
    "Quiescence",
    "Anomalous",
    "Venerate",
    "Assuage",
    "Digress",
    "Corroborate",
    "Buttress",
    "Antipathy",
    "Disabuse",
    "Feigned",
    "Honorificabilitudinitatibus",
    "Thyroparathyroidectomized",
    "Dichlorodifluoromethane",
    "Incomprehensibilities",
];

let randomWord;
let score = 0;
let time = 10;
let difficulty =
    localStorage.getItem("difficulty") !== null
        ? localStorage.getItem("difficulty")
        : "medium";

const timeInterval = setInterval(updateTime, 1000);

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function addWordToDom() {
    randomWord = getRandomWord();
    word.innerText = randomWord;
}

function updateScore() {
    score++;
    scoreElement.innerText = score;
}

function updateTime() {
    time--;
    timeElement.innerText = time + "s";
    if (time === 0) {
        clearInterval(timeInterval);
        gameOver();
    }
}

function gameOver() {
    endgameElement.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="history.go(0)">Play Again</button>
    `;
    endgameElement.style.display = "flex";
}

text.addEventListener("input", (e) => {
    const insertedText = e.target.value;
    if (insertedText === randomWord) {
        e.target.value = "";
        addWordToDom();
        updateScore();
        if (difficulty === "hard") time += 2;
        else if (difficulty === "medium") time += 3;
        else time += 5;
        updateTime();
    }
});

settingsButton.addEventListener("click", () =>
    settings.classList.toggle("hide")
);
settingsForm.addEventListener("change", (e) => {
    difficulty = e.target.value;
    localStorage.setItem("difficulty", difficulty);
});

difficultySelect.value = difficulty;
addWordToDom();
text.focus();