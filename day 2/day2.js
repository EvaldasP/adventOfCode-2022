const { readFileSync } = require("fs");

// --- Part One ---

function syncReadFile(filename) {
  const contents = readFileSync(filename, "utf-8");

  var arr = contents.split(/\r?\n/).map((item) => item.replace(/\s/g, ""));

  return arr;
}

const rounds = syncReadFile("./input.txt");

function calculateRoundScore(mine, elf) {
  let score = 0;

  switch (mine) {
    case "X":
      score += 1;

      if (elf === "A") {
        score += 3;
      } else if (elf === "C") {
        score += 6;
      }
      break;

    case "Y":
      score += 2;

      if (elf === "B") {
        score += 3;
      } else if (elf === "A") {
        score += 6;
      }
      break;

    case "Z":
      score += 3;

      if (elf === "C") {
        score += 3;
      } else if (elf === "B") {
        score += 6;
      }
      break;
  }

  return score;
}

const total = rounds.reduce((acc, round) => {
  const myPlay = round[1];
  const elfPlay = round[0];

  return (acc += calculateRoundScore(myPlay, elfPlay));
}, 0);

// --- Part Two ---

function calculateRoundScoreV2(elf, mine) {
  let score = 0;

  switch (elf) {
    case "A":
      if (mine === "Y") {
        score = 4;
      } else if (mine === "X") {
        score = 3;
      } else if (mine === "Z") {
        score = 8;
      }
      break;
    case "B":
      if (mine === "Y") {
        score = 5;
      } else if (mine === "X") {
        score = 1;
      } else if (mine === "Z") {
        score = 9;
      }
      break;

    case "C":
      if (mine === "Y") {
        score = 6;
      } else if (mine === "X") {
        score = 2;
      } else if (mine === "Z") {
        score = 7;
      }
      break;
  }

  return score;
}

const totalV2 = rounds.reduce((acc, round) => {
  const elfPlay = round[0];
  const minePlay = round[1];

  return (acc += calculateRoundScoreV2(elfPlay, minePlay));
}, 0);

console.log(totalV2);
