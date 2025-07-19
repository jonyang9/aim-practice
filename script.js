
// DOM elements
const header = document.querySelector("header");
const main = document.querySelector("main");
const footer = document.querySelector("footer");
const h1 = document.querySelector("h1");

const scoresPanel = document.querySelector(".scores-bg");
const difficultyPanel = document.querySelector(".difficulty-bg");
const controlPanel = document.querySelector(".control-panel-bg");
const colorSelectPanel = document.querySelector(".color-select-bg");
const gameOverPanel = document.querySelector(".gameover-panel");

const difficultyButtonsContainer = document.querySelector(".difficulty-buttons");

// Text elements
const headerTimer = document.querySelector(".header-timer");
const headerScore = document.querySelector(".header-score");
const gameOverScore = document.querySelector(".gameover-score");
const timer = document.querySelector(".timer");

// Target elements
const target = document.querySelector(".target");
const innerTarget = document.querySelector(".inner-target");

// Button elements
const playButton = document.querySelector(".play-button");
const difficultyButton = document.querySelector(".difficulty-button");
const colorSelectButton = document.querySelector(".color-select-button");
const scoresButton = document.querySelector(".scores-button");
const backButton = document.querySelector(".back-button-bg");

// Game variables
let score = 0;
let difficulty = "Easy";
let gameDuration = 9;
let gameTimeLeft;
let targetSize;
let targetOnScreenDuration = 1.5 * 1000;
let targetPauseDuration = 0.8 * 1000;
let spawnInterval;
let targetSpawnTime;
let spawnTimeout;

// Scores variable, store objects containing the score, difficulty, and date
let scores;



playButton.addEventListener("click", async (event) => {
    header.style.display = "none";
    footer.style.display = "none";
    controlPanel.style.display = "none";
    timer.style.display = "block";

    setDifficulty();
    resetGame();

    let countdown = 3;
    while (countdown > 0) {
        timer.textContent = countdown.toString();
        await delay(1000);
        countdown--;
    }

    timer.style.display = "none";
    startGame();

});

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function startGame() {
    startTimer();
    spawnTarget();
}

function startTimer() {
    headerTimer.textContent = `Time: ${gameTimeLeft}`;
    headerScore.textContent = `Score: ${score}`;
    header.style.display = "flex";
    h1.style.display = "none";
    headerTimer.style.display = "block";
    headerScore.style.display = "block";
    console.log(gameTimeLeft);

    const timerInterval = setInterval(async () => {
        gameTimeLeft--;
        headerTimer.textContent = `Time: ${gameTimeLeft}`;

        console.log(gameTimeLeft);

        if (gameTimeLeft <= 0) {
            console.log("Game Over");
            // clear all timers/timeouts and kill existing circle
            clearInterval(timerInterval);
            clearTimeout(spawnTimeout);
            target.style.display = "none";

            // wait a bit after the game then show score, play sound
            await delay(2000);

            header.style.display = "none";
            gameOverPanel.style.display = "flex";
            gameOverScore.textContent = `Final Score: ${score}`;
            backButton.style.display = "block";
            addNewScore();
        }
    }, 1000);
}

function spawnTarget() {
    if (gameTimeLeft <= 0) return;

    // padding so targets don't appear right at the edges of the screen (px)
    target.style.display = "block";
    const padding = 60;
    const mainStyle = getComputedStyle(main);
    const targetStyle = getComputedStyle(target);
    const maxX = parseFloat(mainStyle.width) - (2 * padding) - parseFloat(targetStyle.width);
    const maxY = parseFloat(mainStyle.height) - (2 * padding) - parseFloat(targetStyle.height);
    target.style.left = (Math.floor(Math.random() * maxX) + padding) + "px";
    target.style.top = (Math.floor(Math.random() * maxY) + padding) + "px";
    target.style.padding = (parseFloat(targetStyle.width) * 0.13) + "px";

    targetSpawnTime = Date.now();

    spawnTimeout = setTimeout(() => {
        target.style.display = "none";
        setTimeout(() => {
            spawnTarget();
        }, targetPauseDuration);

    }, targetOnScreenDuration);
}

target.addEventListener("click", (event) => {
    target.style.display = "none";

    const reactionTime = Date.now() - targetSpawnTime;
    const maxScore = 1000;
    const fraction = (targetOnScreenDuration - reactionTime) / targetOnScreenDuration;
    score += Math.round(fraction * maxScore);
    headerScore.textContent = `Score: ${score}`;

    clearTimeout(spawnTimeout);
    setTimeout(() => {
        spawnTarget();
    }, targetPauseDuration);
});

function addNewScore() {
    const table = document.querySelector("table");
    const tr = document.createElement("tr");
    for (let i = 0; i < 3; i++) {
        const td = document.createElement("td");
        if (i === 0) {
            td.textContent = score;
        } else if (i === 1) {
            td.textContent = difficulty;
        } else {
            const currDate = new Date();
            const dateString = currDate.toDateString();
            td.textContent = dateString;
        }
        tr.appendChild(td);
    }
    table.appendChild(tr);

}

// Sets the target size and spawn interval based on the value of difficulty
function setDifficulty() {
    if (difficulty === "Easy") {
        target.style.width = "80px";
        target.style.height = "80px";
        targetOnScreenDuration = 1 * 1000;
    } else if (difficulty === "Medium") {
        target.style.width = "60px";
        target.style.height = "60px";
        targetOnScreenDuration = 0.8 * 1000;
    } else {
        target.style.width = "40px";
        target.style.height = "40px";
        targetOnScreenDuration = 0.4 * 1000;
    }
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

    header.style.display = "flex";
    headerScore.style.display = "none";
    headerTimer.style.display = "none";
    h1.style.display = "block";
    footer.style.display = "flex";
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

document.querySelectorAll(".color-theme").forEach((theme) => {
    theme.addEventListener("click", () => {
        const outer = theme.querySelector('.color-theme-outer-target');
        const inner = theme.querySelector('.color-theme-inner-target');

        const themeStyle = getComputedStyle(theme);
        const outerStyle = getComputedStyle(outer);
        const innerStyle = getComputedStyle(inner);

        main.style.backgroundColor = themeStyle.backgroundColor;
        target.style.backgroundColor = outerStyle.backgroundColor;
        innerTarget.style.backgroundColor = innerStyle.backgroundColor;

        const visibleChildren = Array.from(main.children).filter((child) => {
            const style = getComputedStyle(child);
            return style.display !== 'none';
        });

        for (const child of visibleChildren) {
            child.style.display = "none";
        }
    
        controlPanel.style.display = "block";
    })
})

difficultyButtonsContainer.addEventListener("click", (event) => {
    const difficultyText = document.querySelector(".difficulty-text");
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

function resetGame() {
    score = 0;
    gameTimeLeft = gameDuration;
}



