
// DOM elements
const header = document.querySelector("header");
const main = document.querySelector("main");
const footer = document.querySelector("footer");

const colorSelectPanel = document.querySelector(".color-select-bg");
const scoresPanel = document.querySelector(".scores-bg");
const difficultyPanel = document.querySelector(".difficulty-bg");
const controlPanel = document.querySelector(".control-panel-bg");
const backButton = document.querySelector(".back-button-bg");
const timer = document.querySelector(".timer");

const difficultyButtonsContainer = document.querySelector(".difficulty-buttons");
const headerTimer = document.querySelector(".header-timer");

const difficultyText = document.querySelector(".difficulty-text");

const target = document.querySelector(".target");

// Button elements
const playButton = document.querySelector(".play-button");
const difficultyButton = document.querySelector(".difficulty-button");
const colorSelectButton = document.querySelector(".color-select-button");
const scoresButton = document.querySelector(".scores-button");

// Game variables
let score;
let difficulty = "Easy";
let gameDuration = 20;
let targetSize;
let targetOnScreenDuration = 1.5 * 1000;
let targetPauseDuration = 0.8 * 1000;
let spawnInterval;

// Scores variable, store objects containing the score, difficulty, and date
let scores;

// Circle spawner timeout
let spawnTimeout;


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

function startGame() {
    // remove the timer and footer
    timer.style.display = "none";
    footer.style.display = "none";

}

function startTimer() {
    headerTimer.textContent = gameDuration;
    const timerInterval = setInterval(() => {
        gameDuration--;
        headerTimer.textContent = gameDuration;

        if (gameDuration <= 0) {
            // clear all timers/timeouts and kill existing circle
            clearInterval(timerInterval);
            clearTimeout(spawnTimeout);
            target.style.display = "none";

            // wait one second after the game then show score
            
        }
    }, 1000);
}

function spawnTarget() {
    if (gameDuration <= 0) return;

    // padding so targets don't appear right at the edges of the screen (px)
    target.style.display = "block";
    const padding = 60;
    const mainStyle = getComputedStyle(main);
    const targetStyle = getComputedStyle(target);
    const maxX = parseFloat(mainStyle.width) - (2 * padding) - parseFloat(targetStyle.width);
    const maxY = parseFloat(mainStyle.height) - (2 * padding) - parseFloat(targetStyle.height);
    target.style.left = (Math.floor(Math.random() * maxX) + padding) + "px";
    target.style.top = (Math.floor(Math.random() * maxY) + padding) + "px";

    spawnTimeout = setTimeout(() => {
        target.style.display = "none";
        setTimeout(() => {
            spawnTarget();
        }, targetPauseDuration);

    }, targetOnScreenDuration);
}

target.addEventListener("click", (event) => {
    target.style.display = "none";
    clearTimeout(spawnTimeout);
    setTimeout(() => {
        spawnTarget();
    }, targetPauseDuration);
}); 

// Sets the target size and spawn interval based on the value of difficulty
function setDifficulty() {

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

difficultyButtonsContainer.addEventListener("click", (event) => {
    if (event.target !== difficultyButtonsContainer) {
        const parts = difficultyText.textContent.split(":");
        parts[1] = ` ${event.target.textContent}`;
        difficulty = event.target.textContent;
        console.log(difficulty);
        difficultyText.textContent = parts.join(":")

    const visibleChildren = Array.from(main.children).filter((child) => {
        const style = getComputedStyle(child);
        return style.display !== 'none';
    });

    for (const child of visibleChildren) {
        child.style.display = "none";
    }
    
    controlPanel.style.display = "block";
    }
});

spawnTarget();

