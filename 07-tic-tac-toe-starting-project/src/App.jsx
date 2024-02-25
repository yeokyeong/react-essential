import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveCurrentPlayer(turns) {
  let currentPlayer = "X";
  if (turns.length > 0 && turns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}
function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [playerNames, setPlayerNames] = useState({
    X: "Player 1",
    O: "Player 2",
  });

  const currentPlayer = deriveCurrentPlayer(gameTurns);
  const gameBoard = [...initialGameBoard.map((inner) => [...inner])];

  for (const turns of gameTurns) {
    // it will excute whenever App component render
    const { square, player } = turns;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    // it will excute whenever App component render
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = playerNames[firstSquareSymbol];
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIdx, colIdx) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveCurrentPlayer(prevTurns);
      return [
        { square: { row: rowIdx, col: colIdx }, player: currentPlayer },
        ...prevTurns,
      ];
    });
  }
  function handleChangeName(symbol, name) {
    setPlayerNames((prevNames) => {
      return {
        ...prevNames,
        [symbol]: name,
      };
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }
  return (
    <>
      <h1>React Tic-Tac-Toe</h1>
      <main id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name="player1"
            symbol="X"
            isActive={currentPlayer === "X"}
            onChangeName={handleChangeName}
          />
          <Player
            name="player2"
            symbol="0"
            isActive={currentPlayer === "O"}
            onChangeName={handleChangeName}
          />
        </ol>
        {(hasDraw || winner) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard
          handleSelectSquare={handleSelectSquare}
          gameBoard={gameBoard}
        />
      </main>
      <Log gameTurns={gameTurns} />
    </>
  );
}

export default App;
