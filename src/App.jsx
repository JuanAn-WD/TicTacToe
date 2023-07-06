import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Cell } from "./components/Cell";
import { ModalWinner } from "./components/ModalWinner";
import { Board } from "./components/Board";
import { TURNS } from "./utils/constants";
import {ModalSetGame} from "./components/ModalSetGame";
import { checkEndGame, checkWinner, checkSuposedWinner } from "./utils/checks";
import { GithubButton, LinkedinButton } from "./components/socilMediaButtons";
import avatar from "./assets/img/avatar.svg";

function App() {
  const [mode,setMode] = useState(() => {
    const mode = window.localStorage.getItem("mode");
    return mode ? mode : "";
  })
  const [board, setBoard] = useState(() => {
    const boardFromLocal = window.localStorage.getItem("board");
    return boardFromLocal ? JSON.parse(boardFromLocal) : Array(9).fill(null);
  });
  const [turn, setTurn] = useState(() => {
    const turnFromLocal = window.localStorage.getItem("turn");
    return turnFromLocal ?? TURNS.X;
  });

  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (turn === TURNS.O && mode === "ai") {
      makeAIMove();
    }
  }, [turn]);
  const updateMode = (modeSelected) =>{
    setMode(modeSelected)
  }
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    setMode("")
    window.localStorage.removeItem("board");
    window.localStorage.removeItem("turn");
  };

  function makeAIMove() {
    const availableMoves = [];
    let randomMove;
  
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = TURNS.O;
        if (checkWinner(board)) {
          updateBoard(i);
          setWinner(TURNS.O)
        }
        board[i] = null;
        board[i] = TURNS.X;
        if (checkSuposedWinner(board, TURNS.X)) {
          availableMoves.push(i);
        }
        board[i] = null;
      }
    }
    if (availableMoves.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableMoves.length);
      randomMove = availableMoves[randomIndex];
      updateBoard(randomMove);
      return;
    }
  
    const emptyIndices = [];
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        emptyIndices.push(i);
      }
    }
    const randomIndex = Math.floor(Math.random() * emptyIndices.length);
    randomMove = emptyIndices[randomIndex];
    updateBoard(randomMove);
  }
  

  const updateBoard = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    window.localStorage.setItem("board", JSON.stringify(newBoard));
    window.localStorage.setItem("turn", newTurn);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) setWinner(false);
  };

  return (
    <>
      <header className="header">
        <img src={avatar} className="avatar" alt="Avatar" />
        <span className="text">JuanAn-WD</span>
      </header>
      <main className="board">
        <h1>TicTacToe</h1>
        <button onClick={resetGame}>Reset Game</button>
        <Board board={board} updateBoard={updateBoard} />
        <section className="turn">
          <Cell isSelected={turn == TURNS.X}>{TURNS.X}</Cell>
          <Cell isSelected={turn == TURNS.O}>{TURNS.O}</Cell>
        </section>
        <ModalWinner resetGame={resetGame} winner={winner} />
        <ModalSetGame updateMode={updateMode} mode={mode}/>
      </main>
      <footer className="footer">
        <LinkedinButton />
        <GithubButton />
      </footer>
    </>
  );
}

export default App;
