var gameController;

function setup() {
	document.documentElement.style.overflow = 'hidden';  // firefox, chrome
	document.body.scroll = "no"; // ie only

	createCanvas(windowWidth, windowHeight);
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