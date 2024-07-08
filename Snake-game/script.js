const board = document.getElementById("game-board");

const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();

// Function to draw snake and food
function draw() {
  board.innerHTML = "";
  drawSnake();
  drawFood();
}

// Drawing snake
function drawSnake() {
  snake.forEach((segment) => {
    let snakeElement = createGameElement("div", "snake");
    setPosition(snakeElement, segment);
    board.appendChild(snakeElement);
  });
}

// Creating game element
function createGameElement(tag, className) {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

// Setting snake position
function setPosition(element, position) {
  element.style.gridColumn = position.x;
  element.style.gridRow = position.y;
}

// Function to draw food
function drawFood() {
    const foodElement = createGameElement("div", "food");
    setPosition(foodElement, food);
    board.appendChild(foodElement);
}

// Function to generate random values for food
function generateFood(){
    const x = Math.floor(Math.random() * gridSize) + 1;
    const y = Math.floor(Math.random() * gridSize) + 1;
    return { x,y };
}

// Calling draw function
draw();