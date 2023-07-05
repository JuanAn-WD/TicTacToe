import { useState } from "react";
import confetti from "canvas-confetti";
import { Cell } from "./components/Cell";
import { ModalWinner } from "./components/ModalWinner";
import { Board } from "./components/Board";
import { TURNS } from "./utils/constants";
import { checkEndGame, checkWinner } from "./utils/checks";

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromLocal = window.localStorage.getItem('board')
    return boardFromLocal ? JSON.parse(boardFromLocal) : Array(9).fill(null)
  });
  const [turn, setTurn] = useState(() =>{ const turnFromLocal = window.localStorage.getItem('turn')  
  return turnFromLocal ?? TURNS.X}
  );

  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  };

  const updateBoard = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    
    window.localStorage.setItem('board',JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) setWinner(false);
  };

  return (
    <main className="board">
      <h1>TicTacToe</h1>
      <button onClick={resetGame}>Reset Game</button>
      <Board board={board} updateBoard={updateBoard} />
      <section className="turn">
        <Cell isSelected={turn == TURNS.X}>{TURNS.X}</Cell>
        <Cell isSelected={turn == TURNS.O}>{TURNS.O}</Cell>
      </section>
      <ModalWinner resetGame={resetGame} winner={winner} />
    </main>
  );
}

export default App;
