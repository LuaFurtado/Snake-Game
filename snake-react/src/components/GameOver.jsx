export default function GameOver({ message, onRestart }) {
  return (
    <div className="game-over-overlay">
      <div className="game-over-card">
        <h2>{message}</h2>
        <button onClick={onRestart}>Restart</button>
      </div>
    </div>
  );
}