const gameContainer = document.querySelector(".game-container");
const snake = document.getElementById("snake");
const food = document.getElementById("food");

let snakeX = 2;
let snakeY = 2;
let foodX = 10;
let foodY = 10;
let gridSize = 20;
let snakeSpeed = 100;
let direction = "right";
let tail = 2;
let tailX = [2, 1];
let tailY = [2, 2];

function updateGame() {
  // Move the snake
  if (direction === "right") snakeX++;
  if (direction === "left") snakeX--;
  if (direction === "up") snakeY--;
  if (direction === "down") snakeY++;

  // Check for collision with food
  if (snakeX === foodX && snakeY === foodY) {
    foodX = Math.floor(Math.random() * gridSize);
    foodY = Math.floor(Math.random() * gridSize);
    tail++;
  }

  // Check for collision with walls
  if (snakeX < 0 || snakeX >= gridSize || snakeY < 0 || snakeY >= gridSize) {
    clearInterval(gameLoop);
    alert("Game over!");
    location.reload();
  }

  // Update the tail
  tailX.unshift(snakeX);
  tailY.unshift(snakeY);
  while (tailX.length > tail) {
    tailX.pop();
    tailY.pop();
  }

  // Render the snake and food
  snake.style.gridColumn = snakeX + 1;
  snake.style.gridRow = snakeY + 1;

  food.style.gridColumn = foodX + 1;
  food.style.gridRow = foodY + 1;

  for (let i = 0; i < tail; i++) {
    const tailSegment = document.createElement("div");
    tailSegment.className = "snake";
    tailSegment.style.gridColumn = tailX[i] + 1;
    tailSegment.style.gridRow = tailY[i] + 1;
    gameContainer.appendChild(tailSegment);
  }
}

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      if (direction !== "down") direction = "up";
      break;
    case "ArrowDown":
      if (direction !== "up") direction = "down";
      break;
    case "ArrowLeft":
      if (direction !== "right") direction = "left";
      break;
    case "ArrowRight":
      if (direction !== "left") direction = "right";
      break;
  }
});

const gameLoop = setInterval(updateGame, snakeSpeed);
