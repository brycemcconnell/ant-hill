export default class Food {
	
	constructor (x, y) {
		this.x = x - 25;
		this.y = y - 25;
		this.size = 30;
	}

	update () {
		this.size -= 10;
		if (this.size <= 0) { food.splice(food.indexOf(this), 1); }
	}
}