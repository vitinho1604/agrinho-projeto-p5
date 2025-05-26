let basket;
let fruits = [];
let score = 0;
let gameOver = false;

function setup() {
  createCanvas(600, 400);
  basket = new Basket();
}

function draw() {
  background(220);
  if (score >= 10) {
    // Mensagem de vitória
    fill(0);
    textSize(36);
    textAlign(CENTER, CENTER);
    text("Você venceu!", width/2, height/2);
    noLoop(); // Para o loop de desenho após vencer
    return;
  }

  // Desenha e atualiza a cesta
  basket.show();
  basket.move();

  // Cria novas frutas aleatoriamente
  if (frameCount % 60 === 0) { // uma fruta por segundo
    fruits.push(new Fruit());
  }

  // Atualiza e desenha as frutas
  for (let i = fruits.length -1; i >=0; i--) {
    fruits[i].show();
    fruits[i].update();

    // Verifica se a fruta foi pega pela cesta
    if (fruits[i].hits(basket)) {
      score++;
      fruits.splice(i,1);
    } 
    // Remove frutas que caíram fora da tela
    else if (fruits[i].offScreen()) {
      fruits.splice(i,1);
    }
  }

  // Exibe a pontuação
  fill(0);
  textSize(24);
  text('Pontuação: ' + score, 10, 30);
}

// Classe para a cesta
class Basket {
  constructor() {
    this.x = width/2;
    this.y = height - 20;
    this.width = 80;
    this.height = 20;
    this.speed = 7;
  }

  show() {
    fill(150,75,0);
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);
  }

  move() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.speed;
    } else if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed;
    }
    // Limitar dentro da tela
    this.x = constrain(this.x, this.width/2, width - this.width/2);
  }
}

// Classe para as frutas
class Fruit {
  constructor() {
    this.x = random(20, width -20);
    this.y = -20;
    this.size = 20;
    this.speed = random(3,5);

    // Pode escolher diferentes tipos de frutas aqui
    this.color = color(random(255), random(255), random(255));
  }

  show() {
    fill(this.color);
    ellipse(this.x, this.y, this.size);
  }

   update() {
     this.y += this.speed;
   }

   hits(basket) {
     let d = dist(this.x, this.y, basket.x, basket.y - basket.height/2);
     return d < (this.size/2 + basket.width/2);
   }

   offScreen() {
     return this.y > height + this.size;
   }
}