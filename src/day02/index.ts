import run from "aocrunner";

const sumArrayItems = (array: string[] | number[]) => array.reduce((t: number, i) => t + Number(i), 0);
const parseInput = (rawInput: string) => rawInput.split('\n');

enum Shape {
  Rock = 1,
  Paper = 2,
  Scissors = 3
};

const ShapeWeakness = {
  [Shape.Rock]: Shape.Paper,
  [Shape.Paper]: Shape.Scissors,
  [Shape.Scissors]: Shape.Rock
};

const ShapeStrength = {
  [Shape.Rock]: Shape.Scissors,
  [Shape.Paper]: Shape.Rock,
  [Shape.Scissors]: Shape.Paper
}

interface Round {
  opponent: Shape,
  player: Shape
}

const OpponentPlayMap = {
  A: Shape.Rock,
  B: Shape.Paper,
  C: Shape.Scissors
};

const PlayerPlayMap = {
  X: Shape.Rock,
  Y: Shape.Paper,
  Z: Shape.Scissors
};

const parseRound = (round: string): Round => {
  const matches = round.match('(?<opponent>[A-C]) (?<player>[X-Z])');
  const { opponent, player } = matches?.groups!;

  return {
    opponent: OpponentPlayMap[opponent as keyof typeof OpponentPlayMap],
    player: PlayerPlayMap[player as keyof typeof PlayerPlayMap]
  };
};

const getRoundPoints = (round: Round) => {
  // Draw
  if (round.player === round.opponent) return 3;
  // Player victory
  if (ShapeWeakness[round.opponent] === round.player) return 6;

  // Opponent victory
  return 0;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const rounds = input.map(parseRound);
  const roundPoints = rounds.map(r => getRoundPoints(r) + r.player);
  return sumArrayItems(roundPoints);
};

enum Strategy {
  Lose,
  Draw,
  Win
}
const StrategyMap = {
  X: Strategy.Lose,
  Y: Strategy.Draw,
  Z: Strategy.Win
};

interface RoundStrategy {
  opponent: Shape,
  strategy: Strategy
};

const parseRoundStrategy = (round: string): RoundStrategy => {
  const matches = round.match('(?<opponent>[A-C]) (?<strategy>[X-Z])');
  const { opponent, strategy } = matches?.groups!;

  return {
    opponent: OpponentPlayMap[opponent as keyof typeof OpponentPlayMap],
    strategy: StrategyMap[strategy as keyof typeof StrategyMap]
  };
};

const drawAgainst = (shape: Shape) => shape;
const loseAgainst = (shape: Shape) => ShapeStrength[shape];
const winAgainst = (shape: Shape) => ShapeWeakness[shape];
const playRoundStrategy = (round: RoundStrategy): Round => {
  return {
    opponent: round.opponent,
    player: round.strategy === Strategy.Win
      ? winAgainst(round.opponent)
      : round.strategy === Strategy.Lose
        ? loseAgainst(round.opponent)
        : drawAgainst(round.opponent)
  };
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const roundStrategies = input.map(parseRoundStrategy);
  const rounds = roundStrategies.map(playRoundStrategy);
  const roundPoints = rounds.map(r => getRoundPoints(r) + r.player);
  return sumArrayItems(roundPoints);
};

run({
  part1: {
    tests: [
      {
        input: `A Y
                B X
                C Z`,
        expected: 15,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `A Y
                B X
                C Z`,
        expected: 12,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
