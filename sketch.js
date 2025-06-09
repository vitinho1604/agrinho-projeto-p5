let basket;
let fruits = [];
let score = 0;
let timeLeft = 60;
let gameOver = false;
let victory = false;
let gameStarted = false;
let fruitDropInterval = 30;
let timerInterval = 1000;
let startButton;
let showInstructions = false;
let timerStarted = false;

function setup() {
  createCanvas(600, 600);

  startButton = createButton('🎮 Começar');
  startButton.position(width / 2 - 40, height / 2 + 20);
  startButton.mousePressed(startGame);
  startButton.class('start-button');

  basket = new Basket();
}

function startGame() {
  gameStarted = true;
  score = 0;
  timeLeft = 60;
  gameOver = false;
  victory = false;
  fruits = [];
  startButton.hide();

  showInstructions = true;  // Ativa a tela de instruções
}

function startTimerAndGame() {
  timerStarted = true;
  
  setInterval(() => {
    if (!gameOver && !victory && gameStarted && timerStarted) {
      timeLeft--;
      if (timeLeft <= 0) {
        gameOver = true;
      }
    }
  }, timerInterval);
}

function draw() {
  background(100, 200, 100);

  if (!gameStarted) {
    drawStartScreen();
    return;
  }

  if (showInstructions) {
    drawInstructionsScreen();
    return;  // Pausa aqui até o jogador apertar a tecla
  }

  if (!gameOver && !victory) {
    basket.update();
    basket.show();

    if (frameCount % fruitDropInterval === 0) {
      fruits.push(new Fruit());
    }

    for (let i = fruits.length - 1; i >= 0; i--) {
      fruits[i].update();
      fruits[i].show();

      if (fruits[i].hits(basket)) {
        score++;
        fruits.splice(i, 1);
      } else if (fruits[i].offScreen()) {
        fruits.splice(i, 1);
      }
    }

    if (score >= 40) {
      victory = true;
    }

    fill(0);
    textSize(20);
    text(`Pontuação: ${score}`, 75, 25);
    text(`Tempo: ${timeLeft}s`, 75, 50);
  } else if (victory) {
    drawEndScreen("🎉 Você venceu! 🎉");
  } else if (gameOver) {
    drawEndScreen("⏱️ GAME OVER!!");
  }
}

function drawStartScreen() {
  textAlign(CENTER, CENTER);
  fill(0);
  textSize(32);
  text("🍓 Jogo das Frutas 🍓", width / 2, height / 2 - 40);
  textSize(20);
  text("Use as setas ← → para mover a cesta", width / 2, height / 2 - 10);
}

function drawInstructionsScreen() {
  textAlign(CENTER, CENTER);
  fill(0);
  textSize(28);
  text("🍏 Colete 40 maçãs antes do tempo acabar!", width / 2, height / 2 - 20);
  textSize(18);
  text("Pressione ESPAÇO para começar!", width / 2, height / 2 + 20);
}

function drawEndScreen(msg) {
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(0);
  text(msg, width / 2, height / 2 - 20);
  textSize(24);
  text(`Pontuação final: ${score}`, width / 2, height / 2 + 20);
}

function keyPressed() {
  if (showInstructions && keyCode === 32) {  // Tecla ESPAÇO
    showInstructions = false;
    startTimerAndGame();  // Só inicia o timer quando sair da instrução
  } else {
    if (keyCode === LEFT_ARROW) basket.move(-1);
    if (keyCode === RIGHT_ARROW) basket.move(1);
  }
}

function keyReleased() {
  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) basket.move(0);
}

class Basket {
  constructor() {
    this.w = 80;
    this.h = 20;
    this.x = width / 2 - this.w / 2;
    this.y = height - this.h - 10;
    this.speed = 10;
    this.direction = 0;
  }

  move(dir) {
    this.direction = dir;
  }

  update() {
    this.x += this.direction * this.speed;
    this.x = constrain(this.x, 0, width - this.w);
  }

  show() {
    fill(139, 69, 19);
    rect(this.x, this.y, this.w, this.h, 10);
  }
}

class Fruit {
  constructor() {
    this.x = random(20, width - 20);
    this.y = -20;
    this.r = 20;
    this.speed = 6;
  }

  update() {
    this.y += this.speed;
  }

  show() {
    fill(255, 0, 100);
    ellipse(this.x, this.y, this.r * 2);
  }

  hits(basket) {
    return (
      this.y + this.r > basket.y &&
      this.x > basket.x &&
      this.x < basket.x + basket.w
    );
  }

  offScreen() {
    return this.y > height + this.r;
  }
}
