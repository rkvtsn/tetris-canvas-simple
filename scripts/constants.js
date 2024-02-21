"use strict";

const ROWS = 20;
const COLS = 10;

const CELL_SIZE = 30;

const LEVEL_OVER = 10;

const EMPTY_CELL = "#FFF0FC";
const OFFSET_CELL = "#FFFECE";

const LEVELS = [800, 700, 600, 500, 400, 300, 200];

const COLORS = [
  "#0C359E",
  "#AF2655",
  "#AC7D88",
  "#597E52",
  "#80BCBD",
  "#FF407D",
  "#40679E",
  "#BF3131",
  "#9BB8CD",
  "#FF6C22",
  "#CE5A67",
  "#1F1717",
];

const SHAPES = [
  [
    [false, false, false, false],
    [true, true, true, true],
    [false, false, false, false],
    [false, false, false, false],
  ],
  [
    [true, false, false],
    [true, true, true],
    [false, false, false],
  ],
  [
    [true, true, true],
    [true, false, false],
    [false, false, false],
  ],
  [
    [false, true, true],
    [true, true, false],
    [false, false, false],
  ],
  [
    [true, true, false],
    [false, true, true],
    [false, false, false],
  ],
  [
    [true, true, true],
    [false, true, false],
    [false, false, false],
  ],
  [
    [true, true],
    [true, true],
  ],
];
