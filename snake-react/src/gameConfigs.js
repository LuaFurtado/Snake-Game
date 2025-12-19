// Centralized game configuration for different modes
// Got help from my friend Manu
// Everything that changes between game modes goes here
// I included initial speed, 
// I don't understand why is needed, but before Included the game was starting in a very fast speed


export const CLASSIC_CONFIG = {
  initialSpeed: 7,
  speedIncrease: 3,
  tileSize: 10,
  gameOverMessage: "Game Over",
};

export const KIDS_CONFIG = {
  initialSpeed: 7,
  speedIncrease: 0,
  tileSize: 20,
  gameOverMessage: "Oops! Let's try again 🧸",
};