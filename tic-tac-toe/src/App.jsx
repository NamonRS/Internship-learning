import { useState } from "react";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);

  const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const calculateWinner = () => {
    for (let pattern of winningPatterns) {
      const [a, b, c] = pattern;

      if (
        board[a] &&
        board[a] === board[b] &&
        board[a] === board[c]
      ) {
        return board[a];
      }
    }
    return null;
  };

  const winner = calculateWinner();

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";

    setBoard(newBoard);
    setIsXTurn(!isXTurn);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Tic Tac Toe</h1>

      <h2>
        {winner
          ? `Winner: ${winner}`
          : `Current Player: ${isXTurn ? "X" : "O"}`}
      </h2>

      <div className="board">
        {board.map((cell, index) => (
          <button
            key={index}
            className="square"
            onClick={() => handleClick(index)}
          >
            {cell}
          </button>
        ))}
      </div>

      <br />

      <button onClick={resetGame}>
        Restart Game
      </button>
    </div>
  );
}

export default App;