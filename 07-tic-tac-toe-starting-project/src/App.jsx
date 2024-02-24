import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { useState } from "react";

function App() {
  const [activePlayer, setActivePlayer] = useState("X");
  const [gameTurns, setGameTurns] = useState([]);

  function handleSelectSquare(rowIdx, colIdx) {
    setActivePlayer((prevPlayer) => {
      return prevPlayer === "X" ? "O" : "X";
    });
    setGameTurns((prevTurns) => {
      let currentPlayer = "X";
      if (prevTurns.length > 0 && prevTurns[0].player === "X") {
        currentPlayer = "O";
      }
      console.log(rowIdx, colIdx, "selected");
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
          <Player name="player1" symbol="X" isActive={activePlayer === "X"} />
          <Player name="player2" symbol="0" isActive={activePlayer === "O"} />
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
