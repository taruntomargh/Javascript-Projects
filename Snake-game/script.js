const board = document.getElementById("game-board");
const current_score = document.getElementById("current-score");
const high_score = document.getElementById("high-score");
const instructionText = document.getElementById("instruction-text");

const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let direction = "right";
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;
let highScore = 0;

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

// Function to move the snake
function move(){
  const head = {...snake[0]};
  switch(direction){
    case "up": 
      head.y--;
      break;
    case "right": 
      head.x++;
      break;
    case "down": 
      head.y++;
      break;
    case "left": 
      head.x--;
      break;
  }

  snake.unshift(head);

  if(head.x === food.x && head.y === food.y){
    food = generateFood();
    increaseSpeed();
    clearInterval(gameInterval);
    gameInterval = setInterval(()=>{
      move();
      checkCollisions();
      draw();
    }, gameSpeedDelay);
  } else {
    snake.pop();
  }
}

// Function to start the game
function startGame(){
  gameStarted = true;
  instructionText.style.display = "none";
  gameInterval = setInterval(()=>{
    move();
    checkCollisions();
    draw();
  }, gameSpeedDelay);
}

function handleKeyPress(event){
  if((!gameStarted && event.code === "Space") || (!gameStarted && event.key === " ")){
    startGame();
  } else {
    switch(event.key){
      case "ArrowUp":
        direction =  "up";
        break;
      case "ArrowRight":
        direction = "right";
        break;
      case "ArrowDown":
        direction = "down";
        break;
      case "ArrowLeft":
        direction = "left";
        break;
    }
  }
}

document.addEventListener("keydown", handleKeyPress);

// Function to increase speed
function increaseSpeed(){
  if(gameSpeedDelay > 150){
    gameSpeedDelay -= 5;
  }
  else if(gameSpeedDelay > 100){
    gameSpeedDelay -= 3;
  }
  else if(gameSpeedDelay > 50){
    gameSpeedDelay -= 2;
  }
  else if(gameSpeedDelay > 25){
    gameSpeedDelay -= 1;
  }
}

// Function to check collisions
function checkCollisions(){
  const head = snake[0];

  if(head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize ){
    resetGame();
  }

  for(let i=1; i<snake.length; i++){
    if(head.x === snake[i].x || head.y === snake[i].y)
      resetGame();
  }
}

// Function to reset game
function resetGame(){
  updateHighScore();
  stopGame();
  snake = [{ x:10, y:10}];
  food = generateFood();
  direction = "right";
  gameSpeedDelay = 200;
  updateScore();
}

// Function to update score
function updateScore(){
  const currentScore = snake.length - 1;
  current_score.textContent = currentScore.toString().padStart(3, '0');
}

// Function to stop game
function stopGame(){
  clearInterval(gameInterval);
  gameStarted = false;
  instructionText.style.display = "block";
}

// Function to update high score
function updateHighScore(){
  const currentScore = snake.length - 1;
  if(currentScore > highScore){
    highScore = currentScore;
    high_score.textContent = highScore.toString().padStart(3, '0');
  }
}

