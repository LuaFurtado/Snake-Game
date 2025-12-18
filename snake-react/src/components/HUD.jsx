//HUD (Heads-Up Display)
//This component displays the score and game over message.
import { useEffect, useState } from "react";

function HUD({ gameRef }) {
  const [level, setLevel] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      const game = gameRef?.current;
      if (game) {
        setLevel(game.level);
      }
    }, 100); // 10x / second

    return () => clearInterval(interval);
  }, [gameRef]);

  return (
    <div className="hud">
      <p>Level: {level}</p>
    </div>
  );
}

export default HUD;
