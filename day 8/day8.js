const { readFileSync } = require("fs");

const lines = readFileSync("./input.txt", { encoding: "utf-8" })
  .replace(/\r/g, "")
  .trim()
  .split("\n")
  .map((line) => [...line].map(Number));

let visibleTrees = 0;
let highestScenicScore = 0;

// --Part 1

lines.forEach((line, index) => {
  //check for first and last lines of trees
  if (index === 0 || index === lines.length - 1) {
    visibleTrees += line.length;
  } else {
    line.forEach((tree, treeIndex) => {
      //check if tree is the first or the last in line
      if (treeIndex === 0 || treeIndex === line.length - 1) {
        visibleTrees++;
      } else {
        const leftTrees = line.slice(0, [treeIndex]);
        const rightTrees = line.slice([treeIndex + 1]);

        const upTrees = lines
          .slice(0, index)
          .map((value) => value.find((number, i) => i === treeIndex));
        const downTrees = lines
          .slice(index + 1)
          .map((value) => value.find((number, i) => i === treeIndex));

        // --part 2 count scenic view score

        const treeScenicViewScore = calcViewScore(
          upTrees,
          downTrees,
          leftTrees,
          rightTrees,
          tree
        );

        if (treeScenicViewScore > highestScenicScore) {
          highestScenicScore = treeScenicViewScore;
        }

        if (
          leftTrees.every((item) => item < tree) ||
          rightTrees.every((item) => item < tree) ||
          upTrees.every((item) => item < tree) ||
          downTrees.every((item) => item < tree)
        ) {
          visibleTrees++;
        }
      }
    });
  }
});

console.log(visibleTrees);

// --Part 2

console.log(highestScenicScore);

function calcViewScore(upTrees, downTrees, leftTrees, rightTrees, tree) {
  const upTreesScore = scoreCalc(upTrees.reverse(), tree);
  const downTreesScore = scoreCalc(downTrees, tree);
  const leftTreesScore = scoreCalc(leftTrees.reverse(), tree);
  const rightTreesScore = scoreCalc(rightTrees, tree);

  return upTreesScore * downTreesScore * leftTreesScore * rightTreesScore;
}

function scoreCalc(trees, tree) {
  let score = 0;

  for (let index = 0; index < trees.length; index++) {
    const element = trees[index];

    if (element < tree) {
      score++;
    } else if (element >= tree) {
      score++;
      break;
    }
  }

  return score;
}
