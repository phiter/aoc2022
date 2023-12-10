import run from "aocrunner";

const sumArrayItems = (array: string[] | number[]) => array.reduce((t: number, i) => t + Number(i), 0);

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const groups = input.split('\n\n');

  const groupSums = groups.map((g) => sumArrayItems(g.split('\n')));

  return Math.max(...groupSums);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const groups = input.split('\n\n');

  const groupSums = groups.map((g) => sumArrayItems(g.split('\n')));
  const topThree = groupSums.sort((a, b) => b - a).slice(0, 3);
  const topThreeSum = sumArrayItems(topThree);

  return topThreeSum;
};

const input = `
1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
`;
run({
  part1: {
    tests: [
      {
        input,
        expected: 24000,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input,
        expected: 45000,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
