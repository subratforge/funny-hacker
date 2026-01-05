const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let dino;
let cactus;
let gravity = 1;
let score = 0;
let gameOver = false;
let speed = 5;

function initEntities() {
  dino = { x: 50, y: 150, w: 30, h: 30, dy: 0, jump: false };
  cactus = { x: canvas.width + 20, y: 150, w: 20, h: 30 };
  score = 0;
  gameOver = false;
  speed = 5;
  document.getElementById("score").innerText = "Score: 0";
}

document.addEventListener("keydown", e => {
  if (e.code === "Space" && !dino.jump) {
    dino.dy = -15;
    dino.jump = true;
  }
});

// support click / touch for mobile
canvas.addEventListener('mousedown', () => {
  if (!dino.jump) { dino.dy = -15; dino.jump = true; }
});
canvas.addEventListener('touchstart', (e) => { e.preventDefault(); if (!dino.jump) { dino.dy = -15; dino.jump = true; } }, {passive:false});

function drawDino() {
  ctx.fillStyle = "#00ff9c";
  ctx.fillRect(dino.x, dino.y, dino.w, dino.h);
}

function drawCactus() {
  ctx.fillStyle = "#ff5555";
  ctx.fillRect(cactus.x, cactus.y, cactus.w, cactus.h);
}

function resetGame() {
  initEntities();
  requestAnimationFrame(update);
}

function update() {
  if (gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dino physics
  dino.y += dino.dy;
  dino.dy += gravity;

  if (dino.y >= 150) {
    dino.y = 150;
    dino.jump = false;
    dino.dy = 0;
  }

  // Cactus move
  cactus.x -= speed;
  if (cactus.x < -cactus.w) {
    cactus.x = canvas.width + Math.random() * 200;
    score++;
    document.getElementById("score").innerText = "Score: " + score;
    // slowly increase speed
    if (score % 3 === 0) speed += 0.5;
  }

  // Collision
  if (
    dino.x < cactus.x + cactus.w &&
    dino.x + dino.w > cactus.x &&
    dino.y < cactus.y + cactus.h &&
    dino.y + dino.h > cactus.y
  ) {
    gameOver = true;
    setTimeout(() => {
      alert("💀 Game Over! Score: " + score);
      resetGame();
    }, 10);
    return;
  }

  drawDino();
  drawCactus();
  requestAnimationFrame(update);
}

// Restart button
const restartBtn = document.getElementById('restart');
if (restartBtn) restartBtn.addEventListener('click', () => resetGame());

// initialize and start
initEntities();
requestAnimationFrame(update);
