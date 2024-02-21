"use strict";

class Tetris {
  canvas = null;
  ctx = null;
  grid = [];
  cols = 0;
  rows = 0;
  pool = [];
  scores = 0;
  level = 0;
  offsetWidth = 6;

  constructor({
    canvasId = "canvas",
    cellSize = CELL_SIZE,
    rows = ROWS,
    cols = COLS,
  } = {}) {
    this.canvas = document.getElementById(canvasId);
    this.canvas.height = rows * cellSize;
    this.canvas.width = cols * cellSize + cellSize * this.offsetWidth;

    this.ctx = canvas.getContext("2d");
    this.ctx.scale(cellSize, cellSize);
    this.rows = rows;
    this.cols = cols;

    this.pool = [new Piece(), new Piece(), new Piece()];

    this.grid = [];
    for (let i = 0; i < this.rows; i++) {
      this.grid.push([]);
      for (let j = 0; j < this.cols; j++) {
        this.grid[i].push(EMPTY_CELL);
      }
    }

    this.initControls();
  }

  renderNext() {
    let offset = 1;
    for (let { shape, color } of this.pool) {
      this.renderPiece({ shape, color, x: this.cols + 1, y: offset });
      offset += 3;
    }
  }

  renderPiece({ shape, color, x, y } = this.piece) {
    for (let i = 0; i < shape.length; i++) {
      for (let j = 0; j < shape[0].length; j++) {
        if (shape[i][j]) {
          this.ctx.fillStyle = color;
          this.ctx.fillRect(j + x, i + y, 1, 1);
        }
      }
    }
  }

  renderScores() {
    this.ctx.font = "1px serif";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(`Scores: ${this.scores}`, this.cols + 1, 4 * 3);
    this.ctx.fillText(`Level: ${this.level + 1}`, this.cols + 1, 4 * 3 + 2);
  }

  renderDisplay() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols + this.offsetWidth; j++) {
        if (j in this.grid[i]) {
          this.ctx.fillStyle = this.grid[i][j];
        } else {
          this.ctx.fillStyle = OFFSET_CELL;
        }
        this.ctx.fillRect(j, i, 1, 1);
      }
    }
  }

  addPiece() {
    this.piece = this.pool.shift();
    this.pool.push(new Piece());
    this.refresh();
  }

  hasCollision(x, y, shape = this.piece.shape) {
    for (let i = 0; i < shape.length; i++) {
      for (let j = 0; j < shape[0].length; j++) {
        if (shape[i][j]) {
          const xj = x + j;
          const yi = y + i;
          if (
            xj < 0 ||
            xj >= this.cols ||
            yi < 0 ||
            yi >= this.rows ||
            this.grid[yi][xj] != EMPTY_CELL
          ) {
            return true;
          }
        }
      }
    }

    return false;
  }

  refresh() {
    this.renderDisplay();
    this.renderPiece();
    this.renderNext();
    this.renderScores();
  }

  tick() {
    if (!this.piece) {
      this.addPiece();
    }
    this.refresh();
    this.moveDown();
  }

  start() {
    this.loop = setInterval(() => {
      this.tick();
    }, LEVELS[this.level]);
  }

  updateScores(rowsCount = 0) {
    this.scores += 10 * Math.ceil(rowsCount * 1.5);
    if (this.scores >= 100) {
      this.scores = 0;
      this.level += 1;
    }
    this.stop();
    if (this.level >= LEVELS) {
      alert("GAME is finished. To be continue...");
    } else {
      this.start();
    }
  }

  stop() {
    clearInterval(this.loop);
    this.loop = null;
  }

  gameOver() {
    this.stop();
    alert("Game over, your level is " + (this.level + 1));
  }

  collide() {
    const { x, y, shape, color } = this.piece;
    for (let i = 0; i < shape.length; i++) {
      for (let j = 0; j < shape[0].length; j++) {
        if (shape[i][j]) {
          this.grid[y + i][x + j] = color;
        }
      }
    }
    this.checkRows();
    this.addPiece();
  }

  checkRows() {
    let count = 0;
    for (let i = 0; i < this.grid.length; i++) {
      if (this.grid[i].every((x) => x != EMPTY_CELL)) {
        this.grid.splice(i, 1);
        this.grid.unshift(Array(this.cols).fill(EMPTY_CELL));
        count++;
      }
    }
    if (count > 0) {
      this.updateScores(count);
    }
  }

  moveDown() {
    if (!this.hasCollision(this.piece.x, this.piece.y + 1)) {
      this.piece.y += 1;
    } else {
      if (this.piece.y == 0) {
        this.gameOver();
      }
      this.collide();
    }
  }

  moveLeft() {
    if (!this.hasCollision(this.piece.x - 1, this.piece.y)) {
      this.piece.x -= 1;
    }
  }

  moveRight() {
    if (!this.hasCollision(this.piece.x + 1, this.piece.y)) {
      this.piece.x += 1;
    }
  }

  rotate() {
    const shape = this.piece.shape.map((x) => x.map((y) => y));

    for (let i = 0; i < shape.length; i++) {
      for (let j = i; j < shape[0].length; j++) {
        let temp = shape[i][j];
        shape[i][j] = shape[j][i];
        shape[j][i] = temp;
      }
    }
    shape.forEach((row) => {
      row.reverse();
    });

    if (!this.hasCollision(this.piece.x, this.piece.y, shape)) {
      this.piece.shape = shape;
    }
  }

  initControls() {
    document.addEventListener("keydown", ({ key }) => {
      if (!this.loop) {
        return;
      }
      if (key === "ArrowDown") {
        this.moveDown();
      } else if (key === "ArrowLeft") {
        this.moveLeft();
      } else if (key === "ArrowRight") {
        this.moveRight();
      } else if (key === "ArrowUp") {
        this.rotate();
      }
      this.refresh();
    });
  }
}
