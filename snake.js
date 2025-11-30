//CONSTANTS & CANVAS SETUP

const PINK_LIGHT = "#fce4ec";
const PINK_HOT = "#ff0099";
const GREEN_WICKED = "#1b5e20";

const canvas = document.getElementById("snakeGame");
const ctx = canvas.getContext("2d");

//GRID CONFIGURATION

const tileSize = 10;
const tileWidth = tileSize;
const tileHeight = tileSize;
const tileCountX = canvas.width / tileSize;
const tileCountY = canvas.height / tileSize;

//GAME STATE

let snake = [
  {
    x: Math.floor(tileCountX / 2),
    y: Math.floor(tileCountY / 2)
  }
];

let speed = 7;

// >>> needed: variables for head position and movement
let headX = snake[0].x;
let headY = snake[0].y;

let xVelocity = 1; // >>> starts moving right
let yVelocity = 0;

//DRAW FUNCTIONS


// Draw board background + border
function drawBoard() {
  ctx.fillStyle = PINK_LIGHT;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = PINK_HOT;
  ctx.lineWidth = 6;
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

// Draw snake segments
function drawSnake() {
  ctx.fillStyle = GREEN_WICKED;
  snake.forEach((segment) => {
    ctx.fillRect(
      segment.x * tileWidth,
      segment.y * tileHeight,
      tileWidth,
      tileHeight
    );
  });
}

//GAME LOOP

function gameLoop() {
  changeSnakePosition();

  // >>> needed: update the snake head to follow movement
  snake[0].x = headX;
  snake[0].y = headY;

  drawBoard();
  drawSnake();

  // Debug to observe updates in the console
  console.log("Redrawing the game at speed:", speed);

  setTimeout(gameLoop, 1000 / speed);
}

function changeSnakePosition(){
  // >>> needed: move head according to velocity
  headX = headX + xVelocity;
  headY = headY + yVelocity;
}

//INPUT HANDLING

//INPUT HANDLING

document.body.addEventListener("keydown", keyDown);

function keyDown(event){
  //up
  if(event.key === "ArrowUp"){
    yVelocity = -1;
    xVelocity = 0;
  }

  //down
  if(event.key === "ArrowDown"){
    yVelocity = 1;
    xVelocity = 0;
  }

  //left
  if(event.key === "ArrowLeft"){
    xVelocity = -1;
    yVelocity = 0;
  }

  //right
  if(event.key === "ArrowRight"){
    xVelocity = 1;
    yVelocity = 0;
  }
}



//START GAME

gameLoop();
