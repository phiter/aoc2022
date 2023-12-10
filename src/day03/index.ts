import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split('\n').map(l => l.trim());

const atoz = [...Array(26).keys()].map(k => String.fromCharCode(k + 97));
const AtoZ = [...Array(26).keys()].map(k => String.fromCharCode(k + 65));

const itemPriorities: Record<string, number> = [...atoz, ...AtoZ].reduce((o, char, index) => ({
  ...o,
  [char]: index + 1
}), {});

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let totalSum = 0;
  for (const line of input) {
    const firstHalf = line.slice(0, line.length / 2).split('');
    const secondHalf = line.slice(line.length / 2, line.length);
    const itemsInCommon = [...new Set(firstHalf.filter(i => secondHalf.includes(i)))];

    totalSum += [...itemsInCommon].reduce((t, i) => t + itemPriorities[i], 0);
  }
  return totalSum;
};

const splitIntoChunks = (lines: string[], chunkSize: number) => {
  const chunks = [];
  for (let i = 0; i < lines.length; i += chunkSize) {
    chunks.push(lines.slice(i, i + chunkSize));
  }
  return chunks;
}

const ELF_GROUP_SIZE = 3;

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lineGroups = splitIntoChunks(input, ELF_GROUP_SIZE);
  let totalSum = 0;
  for (const group of lineGroups) {
    const [first, second, third] = group;
    const itemInCommon = [...new Set(first.split('').filter(item => second.includes(item) && third.includes(item)))]?.[0];
    totalSum += itemPriorities[itemInCommon];
  }
  return totalSum;
};
const input = `
vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
`;

run({
  part1: {
    tests: [
      {
        input,
        expected: 157,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input,
        expected: 70,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false
});
