const PINK_LIGHT = "#fce4ec";
const PINK_HOT = "#ff0099";
const GREEN_WICKED = "#1b5e20";

const canvas = document.getElementById("snakeGame");
const ctx = canvas.getContext("2d");

//game square
ctx.fillStyle = PINK_LIGHT;
ctx.fillRect(0, 0, canvas.width, canvas.height);
// Border (hot pink!)
ctx.strokeStyle = PINK_HOT;
ctx.lineWidth = 6;
ctx.strokeRect(0, 0, canvas.width, canvas.height);

//grid
const tileSize = 20;
const tileCountX = canvas.width / tileSize;
const tileCountY = canvas.height / tileSize;

let snake = [
  {
    x: Math.floor(tileCountX / 2),
    y: Math.floor(tileCountY / 2)
  }
];
function drawSnake() {
  ctx.fillStyle = GREEN_WICKED;
  snake.forEach((segment) => {
    ctx.fillRect(
      segment.x * tileSize,
      segment.y * tileSize,
      tileSize,
      tileSize
    );
  });
}
function gameLoop() {
  // Redraw background
  ctx.fillStyle = PINK_LIGHT;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Redraw border
  ctx.strokeStyle = PINK_HOT;
  ctx.lineWidth = 6;
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  drawSnake();
}

setInterval(gameLoop, 150);
