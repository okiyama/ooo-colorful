var gameController;

var canvasWidth = 900;
var canvasHeight = 900;

function setup() {
  // frameRate(60);
  createCanvas(canvasWidth, canvasHeight);
  colorMode(HSB, 360, 100, 100, 1);
  gameController = new GameController();
}

function draw() {
  gameController.update();
  gameController.draw();
}

function keyPressed() {
  gameController.onKeyPressed(keyCode);
}