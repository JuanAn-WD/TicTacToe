import { Cell } from './Cell.jsx';

export function ModalWinner({ winner, resetGame }) {
  if (winner === null) return null;

  return (
    <section className="winner">
      <div className="text">
        {winner === false ? 'Draw' : 'Got Winner'}
        <header className="win">{winner && <Cell>{winner}</Cell>}</header>
        <footer>
          <button onClick={resetGame}>Reset Game</button>
        </footer>
      </div>
    </section>
  );
}