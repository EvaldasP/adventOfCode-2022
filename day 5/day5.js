const { readFileSync } = require("fs");

// --- Part One ---

function syncReadFile(filename) {
  const contents = readFileSync(filename, "utf-8");

  var arr = contents.split(/\r?\n/);

  return arr;
}

function getStringBetween(str, start, end) {
  const result = str.match(new RegExp(start + "(.*)" + end));

  return result[1];
}

const moves = syncReadFile("./input.txt");

// arrays represent stacks of crates [0] is the top crate

// [J]             [F] [M]
// [Z] [F]     [G] [Q] [F]
// [G] [P]     [H] [Z] [S] [Q]
// [V] [W] [Z] [P] [D] [G] [P]
// [T] [D] [S] [Z] [N] [W] [B] [N]
// [D] [M] [R] [J] [J] [P] [V] [P] [J]
// [B] [R] [C] [T] [C] [V] [C] [B] [P]
// [N] [S] [V] [R] [T] [N] [G] [Z] [W]

const stacks = {
  1: ["J", "Z", "G", "V", "T", "D", "B", "N"],
  2: ["F", "P", "W", "D", "M", "R", "S"],
  3: ["Z", "S", "R", "C", "V"],
  4: ["G", "H", "P", "Z", "J", "T", "R"],
  5: ["F", "Q", "Z", "D", "N", "J", "C", "T"],
  6: ["M", "F", "S", "G", "W", "P", "V", "N"],
  7: ["Q", "P", "B", "V", "C", "G"],
  8: ["N", "P", "B", "Z"],
  9: ["J", "P", "W"],
};

const stacksPart2 = structuredClone(stacks);

moves.forEach((moveString) => {
  const move = +getStringBetween(moveString, "move ", " from");
  const from = +getStringBetween(moveString, "from ", " to");
  const to = +getStringBetween(moveString, "to ", "");

  const createsToMove = stacks[from].splice(0, move).reverse();

  stacks[to].unshift(...createsToMove);
});

const topCreateOfEachStack = Object.values(stacks)
  .map((stack) => stack[0])
  .join("");

console.log(topCreateOfEachStack);

// --- Part Two ---

moves.forEach((moveString) => {
  const move = +getStringBetween(moveString, "move ", " from");
  const from = +getStringBetween(moveString, "from ", " to");
  const to = +getStringBetween(moveString, "to ", "");

  const createsToMove = stacksPart2[from].splice(0, move);

  stacksPart2[to].unshift(...createsToMove);
});

const topCreateOfEachStackPart2 = Object.values(stacksPart2)
  .map((stack) => stack[0])
  .join("");

console.log(topCreateOfEachStackPart2);
