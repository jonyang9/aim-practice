
// DOM elements
const header = document.querySelector("header");
const footer = document.querySelector("footer");
const backButton = document.querySelector(".back-button-bg");
const timer = document.querySelector(".timer");
const colorSelectPanel = document.querySelector(".color-select-bg");
const scoresPanel = document.querySelector(".scores-bg");
const difficultyPanel = document.querySelector(".difficulty-bg");
const controlPanel = document.querySelector(".control-panel-bg");
const main = document.querySelector("main");

// Button elements
const playButton = document.querySelector(".play-button");
const difficultyButton = document.querySelector(".difficulty-button");
const colorSelectButton = document.querySelector(".color-select-button");
const scoresButton = document.querySelector(".scores-button");

// Game variables
let score;
let difficulty = "Easy";

// Scores variable, store objects containing the score, difficulty, and date
let scores;


playButton.addEventListener("click", async (event) => {
    header.style.display = "none";
    footer.style.display = "none";
    controlPanel.style.display = "none";
    scoresPanel.style.display = "none";
    colorSelectPanel.style.display = "none";

    let countdown = 3;
    while (countdown > 0) {
        timer.textContent = countdown.toString();
        await delay(1000);
        countdown--;
    }
});

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

difficultyButton.addEventListener("click", (event) => {
    controlPanel.style.display = "none";
    difficultyPanel.style.display = "block";
    backButton.style.display = "block";
});

backButton.addEventListener("click", (event) => {
    const visibleChildren = Array.from(main.children).filter((child) => {
        const style = getComputedStyle(child);
        return style.display !== 'none';
    });

    for (const child of visibleChildren) {
        child.style.display = "none";
    }

    controlPanel.style.display = "block";
});

colorSelectButton.addEventListener("click", (event) => {
    controlPanel.style.display = "none";
    colorSelectPanel.style.display = "block";
    backButton.style.display = "block";
});

scoresButton.addEventListener("click", (event) => {
    controlPanel.style.display = "none";
    scoresPanel.style.display = "block";
    backButton.style.display = "block";
});


