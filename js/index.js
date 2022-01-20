// Game Constants and Variables
let inputDir = {x: 0, y: 0};
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let lastPaintTime = 0;
let speed = 7;
snakeArr = [
    {x: 13, y: 15}
]
food = {x: 6, y: 7};
let score = 0;
var prevDir;

// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime - lastPaintTime)/1000 < 1/speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snakeArr) {
    // If you Bump Into YourSelf
    for (let i = 1; i < snakeArr.length; i++) {
        if(snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y) {
            return true;
        }
    }
    // If You Bump Into Wall
    if((snakeArr[0].x <= 0 || snakeArr[0].x >= 18) || (snakeArr[0].y <= 0 || snakeArr[0].y >= 18)) return true;
    return false;
}

function gameEngine() {
    // Part 1 : Updating The Snake Array and Food
    if(isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x: 0, y: 0};
        alert("Game Over. Press Any Key To Play Again!");
        snakeArr = [{x: 13, y: 15}];
        document.body.addEventListener("keydown", function () {
            musicSound.play();
        })
        score = 0;
        scoreBox.innerHTML = "Score : " + score;
        prevDir = "south";
    }

    // If you have eaten the Food, Increment The Score and Regenerate The Food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        scoreBox.innerHTML = "Score : " + score;
        if(score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
        }
        hiscoreBox.innerHTML = "Hi Score : " + hiscoreval;
        if(score % 10 == 0) speed += 1;
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x,y:snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x : Math.round(a + (b-a)*Math.random()),y : Math.round(a + (b-a)*Math.random())};
    }

    // Moving The Snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2 : Display The Snake and Food
    // Display The Snake
    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    // Display The Food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

// Main Logic Starts Here
document.body.addEventListener("keydown", function () {
    musicSound.play()
})
let hiscore = localStorage.getItem('hiscore')
var hiscoreval;
if(hiscore == null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}
else {
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "Hi Score : " + hiscoreval;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    if(prevDir == "up")
    inputDir = {x: 0, y: -1};
    else if(prevDir == "down")
    inputDir = {x: 0, y: 1};
    else if(prevDir == "left")
    inputDir = {x: -1, y: 0};
    else if(prevDir == "right")
    inputDir = {x: 1, y: 0};
    moveSound.play();
    switch(e.key) {

        case "ArrowUp" :
            if(prevDir!="down" || score == 0) {
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            prevDir = "up";
            }
            break;

        case "ArrowDown" :
            if(prevDir!="up" || score == 0) {
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            prevDir = "down";
            }
            break;

        case "ArrowLeft" :
            if(prevDir!="right" || score == 0) {
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            prevDir = "left";
            }
            break;

        case "ArrowRight" :
            if(prevDir!="left" || score == 0) {
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            prevDir = "right";
            }
            break;

        default :
            break;
    }
})