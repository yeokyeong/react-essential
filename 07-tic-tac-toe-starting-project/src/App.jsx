import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

function deriveCurrentPlayer(turns) {
  let currentPlayer = "X";
  if (turns.length > 0 && turns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function deriveWinner(gameBoard, playerNames) {
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
  return winner;
}

function derviveGameBoard(gameTurns) {
  const gameBoard = [...INITIAL_GAME_BOARD.map((inner) => [...inner])];

  for (const turns of gameTurns) {
    // it will excute whenever App component render
    const { square, player } = turns;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}
function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [playerNames, setPlayerNames] = useState(PLAYERS);

  const currentPlayer = deriveCurrentPlayer(gameTurns);

  const gameBoard = derviveGameBoard(gameTurns);

  const winner = deriveWinner(gameBoard, playerNames);

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
            name={PLAYERS.X}
            symbol="X"
            isActive={currentPlayer === "X"}
            onChangeName={handleChangeName}
          />
          <Player
            name={PLAYERS.O}
            symbol="O"
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
