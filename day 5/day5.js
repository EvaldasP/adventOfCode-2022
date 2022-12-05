const { readFileSync } = require("fs");

// --- Part One ---

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

const topCreateOfEachStack = Object.values(doOperations())
  .map((stack) => stack[0])
  .join("");

console.log(topCreateOfEachStack);

// --- Part Two ---

// In second part crane are able to pick multiple crates at once so basically I do not need to to reverse spliced array (crates needed to move)

const topCrateOfEachStackPart2 = Object.values(doOperations(false))
  .map((stack) => stack[0])
  .join("");

console.log(topCrateOfEachStackPart2);

// --- Functions ---

function syncReadFile(filename) {
  const contents = readFileSync(filename, "utf-8");

  var arr = contents.split(/\r?\n/);

  return arr;
}

function getStringBetween(str, start, end) {
  const result = str.match(new RegExp(start + "(.*)" + end));

  return result[1];
}

function doOperations(reverse = true) {
  const stacksCopy = structuredClone(stacks);

  moves.forEach((moveString) => {
    const move = +getStringBetween(moveString, "move ", " from");
    const from = +getStringBetween(moveString, "from ", " to");
    const to = +getStringBetween(moveString, "to ", "");

    const cratesToMove = stacksCopy[from].splice(0, move);

    if (reverse) cratesToMove.reverse();

    stacksCopy[to].unshift(...cratesToMove);
  });

  return stacksCopy;
}
