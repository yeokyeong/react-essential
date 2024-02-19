import Player from "./components/Player";

function App() {
  return (
    <>
      <h1>React Tic-Tac-Toe</h1>
      <main id="game-container">
        <ol id="players">
          <Player name="player1" symbol="X" />
          <Player name="player2" symbol="0" />
        </ol>
      </main>
      log
    </>
  );
}

export default App;
