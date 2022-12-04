const { readFileSync, promises: fsPromises } = require("fs");

// --- Part One ---

function syncReadFile(filename) {
  const contents = readFileSync(filename, "utf-8");

  const arr = contents.split(/\r?\n/);

  return arr;
}

const allCalories = syncReadFile("./input.txt");

const elfsWithCalories = [];

let elfCalories = 0;

for (let index = 0; index < allCalories.length; index++) {
  if (allCalories[index] === "") {
    elfsWithCalories.push(elfCalories);
    elfCalories = 0;
  }

  elfCalories += +allCalories[index];
}

const sortedElfArray = elfsWithCalories.sort((a, b) =>
  a < b ? 1 : a > b ? -1 : 0
);

console.log(sortedElfArray[0]);

// --- Part Two ---

const top3ElvesCalories = sortedElfArray
  .slice(0, 3)
  .reduce((acc, val) => acc + val, 0);

console.log(top3ElvesCalories);
