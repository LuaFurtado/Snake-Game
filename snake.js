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

let ateFood = false;


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

  // >>> Check if snake head is on the food
if (headX === foodX && headY === foodY) {
  ateFood = true;

  foodX = Math.floor(Math.random() * tileCountX);
  foodY = Math.floor(Math.random() * tileCountY);

  console.log("Snake ate the food!");
} else {
  ateFood = false;
}


  // >>> build new head segment
  const newHead = { x: headX, y: headY };

  // >>> put new head at front of snake
  snake.unshift(newHead);

  // >>> for now: always remove tail (snake stays size 1)
  snake.pop();

  drawBoard();
  drawSnake();
  drawFood();

  // Debug to observe updates in the console
  console.log("Redrawing the game at speed:", speed);

  setTimeout(gameLoop, 1000 / speed);
}

function changeSnakePosition(){
  // >>> needed: move head according to velocity
  headX = headX + xVelocity;
  headY = headY + yVelocity;

  if (headX >= tileCountX) headX = 0;
  if (headX < 0) headX = tileCountX - 1;

  if (headY >= tileCountY) headY = 0;
  if (headY < 0) headY = tileCountY - 1;

  // Why no else statements?
  // Because each boundary must be checked independently:
  // the snake can cross left/right or top/bottom on any frame.
  // Using else would skip the other checks and break the wrap-around logic.
}

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

//FOOD 
let foodX = Math.floor(Math.random() * tileCountX);
let foodY = Math.floor(Math.random() * tileCountY);

function drawFood() {
  ctx.fillStyle = PINK_HOT;  
  ctx.fillRect(foodX * tileSize, foodY * tileSize, tileSize, tileSize);
}

/*

3. Add the new head to the snake:
   - Create a new head object with (headX, headY).
   - Insert this new head at the beginning of the snake array.

4. If the snake did NOT eat:
   - Remove the last element of the snake array (the tail).
     This keeps the snake the same size.

5. If the snake DID eat:
   - Do NOT remove the tail.
     This makes the snake one segment longer.

6. Draw everything:
   - Draw the board.
   - Draw every segment of the snake.
   - Draw the food.

7. Repeat the loop. */


//START GAME

gameLoop();
