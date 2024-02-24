import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { useState } from "react";

function App() {
  const [activePlayer, setActivePlayer] = useState("X");

  function handleActivePlayer() {
    setActivePlayer((prevPlayer) => {
      return prevPlayer === "X" ? "O" : "X";
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
          handleActivePlayer={handleActivePlayer}
          activePlayerSymbol={activePlayer}
        />
      </main>
      <Log />
    </>
  );
}

export default App;
