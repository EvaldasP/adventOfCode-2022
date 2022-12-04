const { readFileSync } = require("fs");

// --- Part One ---

function syncReadFile(filename) {
  const contents = readFileSync(filename, "utf-8");

  var arr = contents.split(/\r?\n/);

  return arr;
}

function getAllNumbersInRange(rangeStart, rangeEnd) {
  const allNumbers = [];
  for (var i = +rangeStart; i <= +rangeEnd; i++) {
    allNumbers.push(i);
  }

  return allNumbers;
}

const pairsWithSectionAssigments = syncReadFile("./input.txt");

const sumOfAssigmentsFullyCoverEachOther = pairsWithSectionAssigments.map(
  (pair) => {
    const elves = pair.split(",");
    const firstElf = elves[0].split("-");
    const secondElf = elves[1].split("-");

    const firstElfSections = getAllNumbersInRange(firstElf[0], firstElf[1]);
    const secondElfSections = getAllNumbersInRange(secondElf[0], secondElf[1]);

    return (
      firstElfSections.every((item) => secondElfSections.includes(item)) ||
      secondElfSections.every((item) => firstElfSections.includes(item))
    );
  }
);

console.log(sumOfAssigmentsFullyCoverEachOther.filter(Boolean).length);

// --- Part Two ---

const sumOfAssigmentsOverlapEachOther = pairsWithSectionAssigments.map(
  (pair) => {
    const elves = pair.split(",");
    const firstElf = elves[0].split("-");
    const secondElf = elves[1].split("-");

    const firstElfSections = getAllNumbersInRange(firstElf[0], firstElf[1]);
    const secondElfSections = getAllNumbersInRange(secondElf[0], secondElf[1]);

    return (
      firstElfSections.some((item) => secondElfSections.includes(item)) ||
      secondElfSections.some((item) => firstElfSections.includes(item))
    );
  }
);

console.log(sumOfAssigmentsOverlapEachOther.filter(Boolean).length);
