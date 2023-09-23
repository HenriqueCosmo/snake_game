const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");

const size = 30;

const snake = [
    {x:200, y:200},
    {x:230, y:200},
]; 

const drawSnake = () => {
    ctx.fillStyle = "#ddd";
    
    snake.forEach((position, index) => {

        if (index == snake.length -1){
            ctx.fillStyle = "white"
        }

        ctx.fillRect(position.x, position.y, size,size)
    });
};

let direction 
let loopId

const moveSnake = () => {

    if (!direction) return;

    const head =snake[snake.length -1];

    snake.shift()

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
};

const gameLoop = () => {
    clearInterval(loopId)
    ctx.clearRect(0,0, 600, 600);

    moveSnake();
    drawSnake();

    loopId = setTimeout(() => {
        gameLoop()
    }, 300);
};

gameLoop();


document.addEventListener("keydown", ({key}) => {
    if (key == "d" && direction !== "left"  || key == "D" && direction !== "left") {
        direction = "right"
    };
    if (key == "a" && direction !== "right" || key == "A" && direction !== "right") {
        direction = "left"
    };
    if (key == "w" && direction !== "down" || key == "W" && direction !== "down") {
        direction = "up"
    }; if (key == "s" && direction !== "up" || key == "S" && direction !== "up") {
        direction = "down"
    };
});
