import { useRef, useEffect } from "react";
import "../App.css";

const PINK_LIGHT = "#fce4ec";
const PINK_HOT = "#ff0099";
const GREEN_WICKED = "#1b5e20";

const tileSize = 10;
const canvasSize = 400;

// ===== Snake =====
class Snake {
  constructor(tileCountX, tileCountY) {
    this.tileCountX = tileCountX;
    this.tileCountY = tileCountY;

    this.body = [
      { x: Math.floor(tileCountX / 2), y: Math.floor(tileCountY / 2) },
    ];

    this.headX = this.body[0].x;
    this.headY = this.body[0].y;

    this.xVelocity = 1;
    this.yVelocity = 0;
  }

  updatePosition() {
    this.headX += this.xVelocity;
    this.headY += this.yVelocity;

    if (this.headX >= this.tileCountX) this.headX = 0;
    if (this.headX < 0) this.headX = this.tileCountX - 1;
    if (this.headY >= this.tileCountY) this.headY = 0;
    if (this.headY < 0) this.headY = this.tileCountY - 1;
  }

  hasSelfCollision() {
    return this.body.some(
      (segment, index) =>
        index !== 0 &&
        segment.x === this.headX &&
        segment.y === this.headY
    );
  }

  updateBody(ateFood) {
    this.body.unshift({ x: this.headX, y: this.headY });
    if (!ateFood) this.body.pop();
  }

  draw(ctx) {
    ctx.fillStyle = GREEN_WICKED;
    this.body.forEach((segment) => {
      ctx.fillRect(
        segment.x * tileSize,
        segment.y * tileSize,
        tileSize,
        tileSize
      );
    });
  }
}

// ===== Board =====
class Board {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
  }

  draw() {
    this.ctx.fillStyle = PINK_LIGHT;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.strokeStyle = PINK_HOT;
    this.ctx.lineWidth = 6;
    this.ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

// ===== Game =====
class Game {
  constructor(canvas, ctx) {
    const tileCountX = canvas.width / tileSize;
    const tileCountY = canvas.height / tileSize;

    this.canvas = canvas;
    this.ctx = ctx;

    this.snake = new Snake(tileCountX, tileCountY);
    this.board = new Board(canvas, ctx);

    this.speed = 7;
    this.running = false;
  }

  start() {
    this.running = true;
    this.loop();
  }

  loop() {
    if (!this.running) return;

    this.update();
    this.draw();

    setTimeout(() => this.loop(), 1000 / this.speed);
  }

  update() {
    this.snake.updatePosition();

    if (this.snake.hasSelfCollision()) {
      this.running = false;
      return;
    }

    this.snake.updateBody(false);
  }

  draw() {
    this.board.draw();
    this.snake.draw(this.ctx);
  }
}

function GameBoard() {
  const canvasRef = useRef(null);
  const gameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const game = new Game(canvas, ctx);
    gameRef.current = game;

    game.board.draw();
    game.start();

    const handleKeyDown = (event) => {
      const snake = game.snake;

      switch (event.key) {
        case "ArrowUp":
          if (snake.yVelocity !== 1) {
            snake.yVelocity = -1;
            snake.xVelocity = 0;
          }
          break;
        case "ArrowDown":
          if (snake.yVelocity !== -1) {
            snake.yVelocity = 1;
            snake.xVelocity = 0;
          }
          break;
        case "ArrowLeft":
          if (snake.xVelocity !== 1) {
            snake.xVelocity = -1;
            snake.yVelocity = 0;
          }
          break;
        case "ArrowRight":
          if (snake.xVelocity !== -1) {
            snake.xVelocity = 1;
            snake.yVelocity = 0;
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      game.running = false;
    };
  }, []);

  return (
    <div className="game-board-container">
      <canvas ref={canvasRef} width={canvasSize} height={canvasSize} />
    </div>
  );
}

export default GameBoard;
