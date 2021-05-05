function Board() {
	var numHorizontalCells = 100;
	var numVerticalCells = 100;

	//var initialTiles = initializeTiles(numHorizontalCells, numVerticalCells);

	return {
		tiles: initializeTiles(numHorizontalCells, numVerticalCells),
		state: "MIXING", //or "SOLVING"
		moves: [], //[row, column, direction]
		moveCount: 0,
		moveCountBeforeSolve: numVerticalCells * numHorizontalCells,
		
		update: function() {
			if(this.moveCount > this.moveCountBeforeSolve) {
				this.state = "SOLVING";
			}

			if(this.state === "MIXING") {
				if(getRandomInt(0,1) === 0) {
					//row
					var rowNum = getRandomInt(0, numVerticalCells - 1);
					var direction = getRandomInt(0, 1) === 0 ? "LEFT" : "RIGHT";
					this.updateBoard("ROW", rowNum, direction);
				} else {
					//column
					var colNum = getRandomInt(0, numVerticalCells - 1);
					var direction = getRandomInt(0, 1) === 0 ? "UP" : "DOWN";
					this.updateBoard("COLUMN", colNum, direction);
				}
			} else {
				if(this.moves.length === 0) {
					this.moveCount = 0;
					this.state = "MIXING";
				} else {
					this.solve();	
				}
			}
		},

		solve: function() {
			var move = this.moves.pop();
			if(move) {
				console.info(move);
				this.updateBoard(move[0], move[1], this.getOppositeDirection(move[2]), true);	
			}
		},

		getOppositeDirection: function(direction) {
			switch(direction) {
				case "UP":
					return "DOWN";
				case "DOWN":
					return "UP";
				case "LEFT":
					return "RIGHT";
				case "RIGHT":
					return "LEFT";
			}
		},

		updateBoard(rowOrCol, rowOrColNum, direction, solving) {
			if(!solving) {
				this.moves.push([rowOrCol, rowOrColNum, direction]);
			}
			this.moveCount++;

			if(rowOrCol === "ROW") {
				//row
				var rowNum = rowOrColNum;
				if(direction === "LEFT") {
					var temp = this.tiles[0][rowNum];

					for(var i = 0; i < numHorizontalCells - 1; i++) {
						this.tiles[i][rowNum] = this.tiles[i+1][rowNum];
					}

					this.tiles[numHorizontalCells - 1][rowNum] = temp;
				} else {
					var temp = this.tiles[numHorizontalCells - 1][rowNum];

					for(var i = numHorizontalCells - 1; i > 0; i--) {
						this.tiles[i][rowNum] = this.tiles[i - 1][rowNum];
					}

					this.tiles[0][rowNum] = temp;
				}
			} else {
				//column
				var colNum = rowOrColNum;
				if(direction === "UP") {
					var temp = this.tiles[colNum][0];

					for(var i = 0; i < numVerticalCells - 1; i++) {
						this.tiles[colNum][i] = this.tiles[colNum][i+1];
					}

					this.tiles[colNum][numVerticalCells - 1] = temp;
				} else {
					var temp = this.tiles[colNum][numVerticalCells - 1];

					for(var i = numVerticalCells - 1; i > 0; i--) {
						this.tiles[colNum][i] = this.tiles[colNum][i - 1];
					}

					this.tiles[colNum][0] = temp;
				}
			}
		},


		draw: function() {
			for(var i = 0; i < this.tiles.length; i++) {
				for(var j = 0; j < this.tiles[i].length; j++) {
					noStroke();
					fill(this.tiles[i][j]);
					rect(i * (width / numHorizontalCells), j * (height / numVerticalCells), width / numHorizontalCells, height / numVerticalCells);
				}
			}
		}
	};

	function initializeTiles(numHorizontalCells, numVerticalCells) {
		var tiles = [];
		for(var i = 0; i < numVerticalCells; i++) {

			for(var j = 0; j < numVerticalCells; j++) {
				if(!tiles[i]) {
					tiles[i] = [];
				}
				tiles[i][j] = color((i * (j + 1)) * (360 / (numHorizontalCells * numVerticalCells)), 100, 100, 1);
			}
		}

		return tiles;
	}
}