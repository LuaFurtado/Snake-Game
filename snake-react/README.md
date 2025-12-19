# 🐍 Snake Game – React 
> Deployment coming soon. The project is currently under active development.

This project is a classic Snake game built with React and HTML Canvas.  
It was created to practice core React concepts such as components, props, and state management using Hooks, and is based on a previous version built with vanilla JavaScript, HTML, and CSS using Canvas.

---

## 🎮 How to Play

- Use the on-screen controls or your keyboard arrow keys to move the snake
- Eat the food to grow and progress through the game
- Avoid hitting the snake’s own body
- Switch between **Classic Mode** and **Kids Mode**, each with different configurations and visuals

---

## 🧩 Component Structure

The application is composed of multiple React components with clear parent/child relationships:

- **App**  
  Root component of the application.

- **GameBoard (Parent Component)**  
  Responsible for:
  - Managing the main game logic
  - Rendering the canvas
  - Handling and updating the game state
  - Passing data and handlers to child components

- **HUD (Child Component)**  
  Displays game information such as:
  - Current level
  - Game over state
  - Other gameplay feedback

- **Controls (Child Component)**  
  - Displays on-screen control buttons
  - Receives user input
  - Sends movement and action events back to the parent component

---

## 🔁 Parent → Child Communication

`GameBoard` acts as the **parent component** and passes data and handlers to child components via props.

Examples:
- `gameRef` is passed from `GameBoard` to `HUD` so it can display live game information
- Movement handlers are passed from `GameBoard` to `Controls` to respond to user input

This separation allows the parent component to focus on game logic while child components handle UI and interaction.

---

## 📁 Project Structure

```text
src/
├── assets/
│   └── controls/
│       ├── arrow-up.png
│       ├── arrow-down.png
│       ├── arrow-left.png
│       └── arrow-right.png
│
├── components/
│   ├── GameBoard.jsx
│   ├── HUD.jsx
│   └── Controls.jsx
│
├── App.jsx
├── App.css
├── gameConfigs.js
├── index.css
├── main.jsx

## Running the Project Locally

```bash
git clone <repository-url>
cd snake-react
npm install
npm run dev

## Future Improvements

Planned enhancements for future versions of the game include:

- **Kids Mode progression feedback**  
  Adding positive reinforcement messages (such as “Good job!” or “You’re doing great!”) after every few food items collected, to encourage and motivate young players.

- **Caterpillar theme**  
  Transforming the snake into a caterpillar character, with food items inspired by *The Very Hungry Caterpillar* (such as fruit and leaves).

- **Victory transformation**  
  At the end of a successful game in Kids Mode, the caterpillar will transform into a butterfly as a visual reward for completing the game.
