import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split('\n');

const parseLine = (line: string) => {
  const { a1, a2, b1, b2 } = line.match('(?<a1>[0-9]+)-(?<a2>[0-9]+),(?<b1>[0-9]+)-(?<b2>[0-9]+)')?.groups!;
  return {
    a1: Number(a1),
    a2: Number(a2),
    b1: Number(b1),
    b2: Number(b2)
  };
}
const checkIsFullyContained = ({ a1, a2, b1, b2 }: ReturnType<typeof parseLine>) => {
  return (a1 >= b1 && a2 <= b2) || (b1 >= a1 && b2 <= a2);
}
const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let fullyContainedLines = 0;
  for (const line of input) {
    const lineResult = parseLine(line);
    const isFullyContained = checkIsFullyContained(lineResult);
    if (isFullyContained) {
      fullyContainedLines++;
    }
  }

  return fullyContainedLines;
};

const checkHasOverlap = ({ a1, a2, b1, b2 }: ReturnType<typeof parseLine>) => {
  return a1 >= b1 && a1 <= b2 || b1 >= a1 && b1 <= a2;
}
const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let overlappingLines = 0;
  for (const line of input) {
    const lineResult = parseLine(line);
    const hasOverlap = checkHasOverlap(lineResult);
    if (hasOverlap) {
      overlappingLines++;
    }
  }

  return overlappingLines;
};
const input = `
2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
6-6,6-6
`;
run({
  part1: {
    tests: [
      {
        input,
        expected: 3,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
