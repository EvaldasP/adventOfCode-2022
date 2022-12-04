const { readFileSync } = require("fs");

// --- Part One ---

function syncReadFile(filename) {
  const contents = readFileSync(filename, "utf-8");

  var arr = contents.split(/\r?\n/);

  return arr;
}

const alphabet = "abcdefghijklmnopqrstuvwxyz";

const priorityAlphabet = [...alphabet, ...alphabet.toUpperCase()];

const rucksacks = syncReadFile("./input.txt");

const sumOfItemsPriorities = rucksacks.reduce((acc, rucksack) => {
  const half = rucksack.length / 2;

  const firstDepartment = [...rucksack.slice(0, half)];
  const secondDepartment = [...rucksack.slice(half)];

  const commonItem = firstDepartment.find((item) =>
    secondDepartment.includes(item)
  );

  return (acc += priorityAlphabet.indexOf(commonItem) + 1);
}, 0);

console.log(sumOfItemsPriorities);

// --- Part Two ---

const elvesGroupsWithItems = [];

while (rucksacks.length > 0) {
  const chunk = rucksacks.splice(0, 3);

  elvesGroupsWithItems.push(chunk);
}

const sumOfElvesBadgePriorities = elvesGroupsWithItems.reduce(
  (acc, groupItems) => {
    const mostCommonGroupItem = maxChar(groupItems);

    return (acc += priorityAlphabet.indexOf(mostCommonGroupItem) + 1);
  },
  0
);

console.log(sumOfElvesBadgePriorities);

function maxChar(groupItems) {
  const allItems = groupItems.join("");

  let freqCounter = {};

  for (const item of allItems) {
    const doesAllGroupElvesContainItem = !groupItems
      .map((items) => items.includes(item))
      .includes(false);

    if (doesAllGroupElvesContainItem) {
      freqCounter[item] = freqCounter[item] + 1 || 1;
    }
  }

  let maxCount = 0;
  let maxChar = null;

  for (const key in freqCounter) {
    if (freqCounter[key] > maxCount) {
      maxCount = freqCounter[key];
      maxChar = key;
    }
  }

  return maxChar;
}
