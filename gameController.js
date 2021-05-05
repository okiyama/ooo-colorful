//Controls the state of the game. Passes information between the various systems as they need it
function GameController() {
	return {
		board: new Board(),

		update: function() {
			if(this.isUpdateFrame()) {
				this.board.update();
			}
		},

		isUpdateFrame: function() {
			return frameCount % 1 == 0;
		},

		draw: function() {
			this.board.draw();
		},

		onKeyPressed: function(keyCode) {
			if (keyCode === LEFT_ARROW) {
				this.board.state = "SOLVING";
			}
		}
	};
};
