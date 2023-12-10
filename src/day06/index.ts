import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const findDistinctSequenceLastIndex = (str: string, size: number) => {
  const items = str.split('');
  for (let i = 0; i < items.length;) {
    const index = Number(i);
    const distinctChars = new Set(items.slice(index, size + index)).size;
    if (distinctChars === size) return i + size;
    // Skip non-distinct sequence (makes code run ~5x faster than checking each position)
    i += size - distinctChars;
  }
}
const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return findDistinctSequenceLastIndex(input, 4);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return findDistinctSequenceLastIndex(input, 14);
};

const input = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`;

run({
  part1: {
    tests: [
      {
        input,
        expected: 7,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input,
        expected: 19,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
