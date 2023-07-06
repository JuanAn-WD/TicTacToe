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
export const checkSuposedWinner = (board,turn) => {
  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;
    if (board[a] === turn && board[b] === turn && board[c] === turn)
      return true;
  }
  return false;
};
