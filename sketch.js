var gameController;

var canvasWidth = 100;
var canvasHeight = 100;

function setup() {
  // frameRate(600);
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