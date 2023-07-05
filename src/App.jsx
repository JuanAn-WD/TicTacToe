import { useState } from "react";

const TURNS = {
  X: "X",
  O: "O",
};
const Cell = ({ children, isSelected, updateBoard, index }) => {
  const className = `square  ${isSelected ? "is-selected" : ""}`;
  const handleClick = () => {
    updateBoard(index);
  };
  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};
function App() {
  const [board, setBoard] = useState(Array(9).fill(null));

  const [turn, setTurn] = useState(TURNS.X);

  const [winner, setWinner] = useState(null);
  
  const checkWinner = (board) => {  
    // Combinaciones ganadoras posibles
    const winningCombinations = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];
  
    // Verificar si alguna combinación ganadora está completa
    for( const combination of winningCombinations) {
      const [a,b,c] = combination
      if (
        board[a] &&
        board[a] === board[b] &&
        board[a] === board[c] 
        ) return board[a]
      
    }
    return null; // Si no hay ganador
  };
  const updateBoard = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    }
  };

  return (
    <main className="board">
      <h1>TicTacToe</h1>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Cell key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Cell>
          );
        })}
      </section>
      <section className="turn">
        <Cell isSelected={turn == TURNS.X}>{TURNS.X}</Cell>
        <Cell isSelected={turn == TURNS.O}>{TURNS.O}</Cell>
      </section>
    </main>
  );
}

export default App;
