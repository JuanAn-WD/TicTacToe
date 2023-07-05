import { WINNING_COMBINATIONS } from "./constants";

export const checkEndGame = (newBoard) => {
  return newBoard.every((cell) => cell !== null);
};
export const checkWinner = (board) => {
  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c])
      return board[a];
  }
  return null;
};