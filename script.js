
// DOM elements
const header = document.querySelector("header");
const footer = document.querySelector("footer");
const controlPanel = document.querySelector(".control-panel");
const scores = document.querySelector(".scores");
const colorSelect = document.querySelector(".color-select");
const timer = document.querySelector(".timer");
const controlPanelBackground = document.querySelector(".control-panel-bg");

// Game variables
let score;
let difficulty;
// Scores



// document.addEventListener("DOMContentLoaded", async () => {
//     await new Promise(resolve => setTimeout(resolve, 5000));
//     header.style.display = "none";
//     footer.style.display = "none";
//     controlPanel.style.display = "none";
//     scores.style.display = "none";
//     colorSelect.style.display = "none";
//     let countdown = 3;
//     let intervalId = setInterval(() => {
//         timer.textContent = countdown.toString();
//         countdown--;
//         if (countdown === 0) 
//             clearInterval(intervalId);
//     }, 1000);
// });

const playButton = document.querySelector(".play-button");
playButton.addEventListener("click", async (event) => {
    header.style.display = "none";
    footer.style.display = "none";
    controlPanelBackground.style.display = "none";
    scores.style.display = "none";
    colorSelect.style.display = "none";
    let countdown = 3;
    while (countdown >= 0) {
        timer.textContent = countdown.toString();
        await delay(1000);
        countdown--;
    }
    
});

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

