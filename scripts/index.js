"use strict";

const init = function () {
  const game = new Tetris();
  game.start();
};

document.addEventListener("DOMContentLoaded", init);
