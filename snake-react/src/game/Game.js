this.snake = new Snake(tileCountX, tileCountY);
this.food = new Food(tileCountX, tileCountY, this.snake);
this.board = new Board(canvas, ctx);
this.score = 0;
