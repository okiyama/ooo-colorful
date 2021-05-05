function Rectangle(givenX, givenY, width, height, initialColor, isStatic) {
	return {
		x: givenX,
		y: givenY,
		w: width,
		h: height,
		initC: initialColor,
		staticColor: isStatic,
		c: initialColor || color(getRandomInt(0,360), 100, 100, 1),
		age: 0,

		draw: function() {
			if(!this.staticColor) {
				this.updateColor();	
			}
			noStroke();
			fill(this.c);
			rect(this.x, this.y, this.w, this.h);
			this.age++;
		},

		updateColor: function() {
			var h = hue(this.c);

			h = (this.age * frameRate() / 120) % 360;
			this.c = color(h, 100, 100, 1);
		},
	};
};
