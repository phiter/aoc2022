import run from "aocrunner";
const parseInput = (rawInput: string) => rawInput.split('\n\n');

type Stacks = Record<string, string[]>;
type Instruction = number[];

const parseStacks = (lines: string[]) => {
  return lines.reduce<Stacks>((stacks, line) => {
    // Match every [X] (and takes only X) or every 4 spaces.
    const matches = line.match(/( ?(?<=\[)\w(?=\])|(\s{4}))/g);
    matches?.forEach((box, i) => {
      if (!box.trim()) return;
      stacks[i + 1] = [box, ...(stacks[i + 1] ?? [])];
    });
    return stacks;
  }, {})
}

const parseInstructions = (instructionLines: string[]) => {
  return instructionLines.reduce<Instruction[]>((acc, line) => {
    const matches = line.match(/\d+/g)?.map(Number);
    if (!matches) return acc;
    return [...acc, matches];
  }, []);
}

const moveBoxes = (stacks: Stacks, instructions: Instruction[], canMoveAllBoxesAtOnce = false) => {
  for (const instruction of instructions) {
    const [boxAmount, from, to] = instruction;
    const cargo = stacks[from].splice(stacks[from].length - boxAmount, boxAmount);
    stacks[to].push(...(canMoveAllBoxesAtOnce ? cargo : cargo.reverse()));
  }
}

const solve = (arrangement: string, instructionLines: string, canMoveAllBoxesAtOnce = false) => {
  const arrangementLines = arrangement.split('\n').slice(0, -1); // Last line are stack numbers, no need for it
  const stacks = parseStacks(arrangementLines);
  const instructions = parseInstructions(instructionLines.split('\n'));
  moveBoxes(stacks, instructions, canMoveAllBoxesAtOnce);
  return Object.values(stacks).map(stack => stack[stack.length - 1]).join('');
}

const part1 = (rawInput: string) => {
  const [arrangement, instructionLines] = parseInput(rawInput);
  return solve(arrangement, instructionLines);
};

const part2 = (rawInput: string) => {
  const [arrangement, instructionLines] = parseInput(rawInput);
  return solve(arrangement, instructionLines, true);
};

// Gotta use this identation without trimming.
const input = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

run({
  part1: {
    tests: [
      {
        input,
        expected: "CMZ",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input,
        expected: "MCD",
      },
    ],
    solution: part2,
  },
  trimTestInputs: false,
  onlyTests: false,
});
