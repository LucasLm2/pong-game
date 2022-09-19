let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2;

const velocidade = 6;

let velocidadeXBolinha = velocidadeYBolinha = velocidade;

let raqueteComprimento = 5;
let raqueteAltura = 50;

// Variáveis da Raquete
let xRaquete = 9;
let yRaquete = 170;

// Variáveis do oponente
let xRaqueteOponente = 586;
let yRaqueteOponente = 170;
let velocidadeYOponente;
let chanceDeErrar = 0;

let colidiu = false;

// Placardo jogo
let meusPontos = 0;
let pontosDoOponente = 0;

function setup() {
    createCanvas(600, 400);
}

function draw() {
    background(0);
    mostraBolinha();
    movimentaBolinha();
    verificaColisaoBorda();
    mostrarRaquete(xRaquete, yRaquete);
    mostrarRaquete(xRaqueteOponente, yRaqueteOponente);
    movimentarRaquete();
    //verificaColisaoRaquete();
    verificaColisaoRaquete(xRaquete, yRaquete);
    verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
    movimentarRaqueteOponente();
    incluiPlacar();
    marcaPonto();
    bolinhaNaoFicaPresa();
}

function mostraBolinha() {
    circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
    xBolinha += velocidadeXBolinha;
    yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
    if(
        xBolinha > width - raio ||
        xBolinha < raio
    ) 
    {
        velocidadeXBolinha *= -1;
    }
  
    if(
        yBolinha > height - raio || 
        yBolinha < raio
    ) 
    {
        velocidadeYBolinha *= -1;
    }
}

function verificaColisaoRaquete() {
    if(
        xBolinha - raio < xRaquete + raqueteComprimento &&
        yBolinha - raio < yRaquete + raqueteAltura &&
        yBolinha + raio > yRaquete
    ) 
    {
        velocidadeXBolinha *= -1;
    }
}

function mostrarRaquete(x,y) {
    rect(x,y,raqueteComprimento,raqueteAltura);
}

function movimentarRaquete() {
    if(keyIsDown(87)) {
        yRaquete -= 10;
    }
    
    if(keyIsDown(83)) {
        yRaquete += 10;
    }
}

function movimentarRaqueteOponente() {
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente;
  calculaChanceDeErrar();
  // if(keyIsDown(UP_ARROW)) {
  //   yRaqueteOponente -= 10;
  // }
  
  // if(keyIsDown(DOWN_ARROW)) {
  //   yRaqueteOponente += 10;
  // }
}

function verificaColisaoRaquete(x, y) {
  colidiu = collideRectCircle(x,y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if(colidiu) {
    velocidadeXBolinha *= -1;
  }
}

function incluiPlacar() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(255,140,0);
  rect(150, 10, 40, 20);
  rect(450, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  text(pontosDoOponente, 470, 26);
}

function marcaPonto() {
  if(xBolinha > 590) {
     meusPontos++;
  }
  
  if(xBolinha < 10) {
     pontosDoOponente++;
  }
}

function calculaChanceDeErrar() {
  if(pontosDoOponente >= meusPontos) {
     chanceDeErrar++;
     if(chanceDeErrar >= 39) {
        chanceDeErrar = 40;
     }
  } else {
    chanceDeErrar--;
    if(chanceDeErrar <= 35) {
       chanceDeErrar = 35;
    }
  }
}

function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
        xBolinha = 23
    }
}