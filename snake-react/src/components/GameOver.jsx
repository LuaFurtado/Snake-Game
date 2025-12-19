export default function GameOver({ onRestart }) {
  return (
    <div className="game-over-overlay">
      <div className="game-over-card">
        <h2>Game Over</h2>
        <button onClick={onRestart}>Restart</button>
      </div>
    </div>
  );
}
