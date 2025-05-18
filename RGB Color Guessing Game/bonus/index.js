
const rgbDisplay = document.getElementById('rgb-display');
const colorOptions = document.getElementById('color-options');
const livesDisplay = document.getElementById('lives');
const scoreDisplay = document.getElementById('score');
const feedback = document.getElementById('feedback');
const restartBtn = document.getElementById('restart-btn');

let lives = 3;
let score = 0;
let correctColor = "";

function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function generateGame() {
  feedback.textContent = "";
  colorOptions.innerHTML = "";

  correctColor = randomColor();
  const colors = [correctColor];
  while (colors.length < 3) {
    const color = randomColor();
    if (!colors.includes(color)) {
      colors.push(color);
    }
  }

  colors.sort(() => Math.random() - 0.5);

  rgbDisplay.textContent = correctColor.toUpperCase();

  colors.forEach((color) => {
    const box = document.createElement("div");
    box.classList.add("color-box");
    box.style.backgroundColor = color;
    box.addEventListener("click", () => checkAnswer(color));
    colorOptions.appendChild(box);
  });
}

function checkAnswer(selectedColor) {
  if (selectedColor === correctColor) {
    feedback.textContent = "✅ Correct!";
    score++;
    scoreDisplay.textContent = score;
    setTimeout(generateGame, 1000);
  } else {
    lives--;
    feedback.textContent = "❌ Wrong! Try again.";
    livesDisplay.textContent = lives;
    if (lives === 0) endGame();
  }
}

function endGame() {
  feedback.textContent = `🎮 Game Over! Final Score: ${score}`;
  colorOptions.innerHTML = "";
  restartBtn.style.display = "inline-block";
}

restartBtn.addEventListener("click", () => {
  lives = 3;
  score = 0;
  livesDisplay.textContent = lives;
  scoreDisplay.textContent = score;
  restartBtn.style.display = "none";
  generateGame();
});

generateGame();
