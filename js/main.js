const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");

const score = document.querySelector('.score--value');
const finalScore = document.querySelector(".final-score > span");
const menu = document.querySelector('.menu-screen');
const buttonPlay = document.querySelector('.btn-play');
const difficultyMode = document.querySelector(".difficulty-mode");
const buttonLessDifficulty = document.querySelector(".less-difficulty");
const buttonMoreDifficulty = document.querySelector(".more-difficulty");

let timeDelay = 300;

const size = 30;
const audio = new Audio('../assets/audio.mp3')

const initialPosition = { x: 270, y: 240 };

let snake = [initialPosition] 

const drawSnake = () => {
    ctx.fillStyle = "#ddd";
    
    snake.forEach((position, index) => {

        if (index == snake.length -1){
            ctx.fillStyle = "white"
        };

        ctx.fillRect(position.x, position.y, size,size)
    });
};

let direction 
let loopId

const incrementarScore = () =>{
    score.innerText = +score.innerText + 10;
}


const randomNumber = (min, max) => {
    return Math.round(Math.random() *  (max - min) + min);
};

const randomPosition = () =>{
    const number = randomNumber(0, canvas.width - size);
    return Math.round(number / 30) * 30;
};

const randomColor = () =>{
    const red = randomNumber(0, 255);
    const green = randomNumber(0, 255);
    const blue = randomNumber(0, 255);

    return `rgb(${red},${green},${blue})`
}

const food = {
    x: randomPosition(),
    y: randomPosition(),
    color: randomColor()
}

const drawFood = () => {
    const { x, y, color} = food;
    
    ctx.shadowColor = color;
    ctx.shadowBlur = 12;
    ctx.fillStyle = food.color;
    ctx.fillRect(x, y, size, size);
    ctx.shadowBlur = 0;
};

const moveSnake = () => {

    if (!direction) return;

    const head = snake[snake.length -1];


    if (direction == "right") {
        snake.push({x: head.x + size, y: head.y})
    };

    if (direction == "left") {
        snake.push({x: head.x - size, y: head.y})
    };

    if (direction == "down") {
        snake.push({x: head.x, y: head.y + size})
    };

    if (direction == "up") {
        snake.push({x: head.x, y: head.y - size})
    };

    snake.shift();

};

const drawGrid = () => {
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#202020";

    for (let i = 30; i < canvas.width; i += 30) {
        ctx.beginPath();
        ctx.lineTo(i, 0);
        ctx.lineTo(i, 600);  
        ctx.stroke();

        ctx.beginPath();
        ctx.lineTo(0, i);
        ctx.lineTo(600, i);
        ctx.stroke();
    };
};

const checkEat = () => {
    const head = snake[snake.length -1];
    if (head.x == food.x && head.y == food.y) {
        incrementarScore();
        snake.push(head);
        audio.play();

        let x = randomPosition();
        let y = randomPosition();


        while (snake.find((position) => position.x == x && position.y == y)) {
            x = randomPosition();
            y = randomPosition();
        }

        food.x = x,
        food.y = y,
        food.color = randomColor()
    };
};

const checkColision = () => {
    const head = snake[snake.length -1];
    const canvasLimit = canvas.width - size;
    const neckIndex = snake.length - 2

    const wallColision = head.x < 0 || head.x > canvasLimit || head.y < 0 || head.y > canvasLimit
    const selfColision = snake.find((position, index) => {
        return index < neckIndex && position.x == head.x && position.y == head.y
    });

    if (wallColision || selfColision) {
        gameOver();
    };
};

const gameOver = () => {
    direction = undefined;
    menu.style.display = "flex";
    finalScore.innerText = score.innerText;
    canvas.style.filter = "blur(3px)"
}



const gameLoop = () => {
    clearInterval(loopId)
    ctx.clearRect(0,0, 600, 600);

    moveSnake();
    drawGrid();
    drawSnake();
    drawFood();
    checkEat();
    checkColision();
    

    loopId = setTimeout(() => {
        gameLoop();
    }, timeDelay);
};

gameLoop();


document.addEventListener("keydown", ({key}) => {
    if (key == "d" && direction !== "left"  || key == "D" && direction !== "left" ) {
        direction = "right"
    };
    if (key == "a" && direction !== "right" || key == "A" && direction !== "right") {
        direction = "left"
    };
    if (key == "w" && direction !== "down" || key == "W" && direction !== "down") {
        direction = "up"
    }; 
    if (key == "s" && direction !== "up" || key == "S" && direction !== "up") {
        direction = "down"
    };
});

document.addEventListener("keydown", ({key}) => {
    if (key == "ArrowRight" && direction !== "left") {
        direction = "right"
    };
    if (key == "ArrowLeft" && direction !== "right") {
        direction = "left"
    };
    if (key == "ArrowUp" && direction !== "down") {
        direction = "up"
    }; 
    if (key == "Arrow" && direction !== "up") {
        direction = "down"
    };
});


buttonPlay.addEventListener("click", () =>{
    score.innerText = "00";
    menu.style.display = "none";
    canvas.style.filter = "none";

    snake = [initialPosition];

    food.x = randomPosition();
    food.y = randomPosition();
    food.color = randomColor();
});


buttonLessDifficulty.addEventListener("click", () =>{
    if (timeDelay == 300){
        timeDelay +=200
        difficultyMode.innerText = "easy"

    } else if (timeDelay == 400 ){
        timeDelay +=100
        difficultyMode.innerText = "easy"
    } else if(timeDelay == 100){
        timeDelay += 200 
        difficultyMode.innerText = "Medium"

    } else {
        return
    };
    
    console.log(timeDelay)
});

buttonMoreDifficulty.addEventListener("click", () =>{
    if (timeDelay == 300){
        timeDelay -=200
        difficultyMode.innerText = "hard"

    } else if (timeDelay == 400 ){
        timeDelay -=300
        difficultyMode.innerText = "hard"
    } else if (timeDelay == 500) {
        timeDelay -= 200 
        difficultyMode.innerText = "Medium"

    } else {
        return
    };
    console.log(timeDelay)
    
});

if (timeDelay = 300){
    difficultyMode.innerText = "Medium"
};