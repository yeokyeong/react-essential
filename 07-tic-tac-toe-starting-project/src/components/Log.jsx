export default function Log({ gameTurns }) {
  return (
    <ol id="log">
      {gameTurns.map((turns, idx) => {
        const { square, player } = turns;
        const { row, col } = square;
        return (
          <li className={idx === 0 ? "highlighted" : undefined} key={idx}>
            Player : {player} row : {row}, col : {col}
          </li>
        );
      })}
    </ol>
  );
}
