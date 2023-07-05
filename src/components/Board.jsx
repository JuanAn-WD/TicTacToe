import { Cell } from './Cell.jsx';

export function Board({ board, updateBoard }) {
  return (
    <section className="game">
      {board.map((cellValue, index) => (
        <Cell key={index} index={index} updateBoard={updateBoard}>
          {cellValue}
        </Cell>
      ))}
    </section>
  );
}
