import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { useState } from "react";

function deriveCurrentPlayer(turns) {
  let currentPlayer = "X";
  if (turns.length > 0 && turns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}
function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const currentPlayer = deriveCurrentPlayer(gameTurns);
  function handleSelectSquare(rowIdx, colIdx) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveCurrentPlayer(prevTurns);

      return [
        { square: { row: rowIdx, col: colIdx }, player: currentPlayer },
        ...prevTurns,
      ];
    });
  }
  return (
    <>
      <h1>React Tic-Tac-Toe</h1>
      <main id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="player1" symbol="X" isActive={currentPlayer === "X"} />
          <Player name="player2" symbol="0" isActive={currentPlayer === "O"} />
        </ol>
        <GameBoard
          handleSelectSquare={handleSelectSquare}
          gameTurns={gameTurns}
        />
      </main>
      <Log gameTurns={gameTurns} />
    </>
  );
}

export default App;
