"use strict";

class Piece {
  x = 4;
  y = 0;
  shape = null;
  color = "";

  constructor(id = Math.floor(SHAPES.length * Math.random())) {
    this.shape = SHAPES[id];
    this.color = COLORS[Math.floor(COLORS.length * Math.random())];
  }
}
