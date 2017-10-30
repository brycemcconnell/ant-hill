import { fr } from './frame.js';

export default class Person {

	constructor(canvas) {
		this.name = 'Bob';
		this.color = fr.randomColor();
		this.canvas = canvas;
		this.pos = fr.randomVector(this.canvas.width, this.canvas.height);
		this.heading = fr.randomVector(this.canvas.width, this.canvas.height);
		this.size = 20;
		this.step = 1;
		this.getNewHeading = false;
		this.hunger = 6;
		this.gettingFood = false;
		this.target;
	}

	update() {
		//this.collisionDetect();
		let currentIndex = people.indexOf(this);
		for (let i = 0; i < people.length; i++) {
			if (i !== currentIndex) {
				fr.collisionDetect(people[i],this, this.canvas);
			}
		}
		// this.move();
		if (this.pos !== this.heading) {
			if (this.pos.x < this.heading.x ) { this.pos.x += this.step;}
			if (this.pos.x > this.heading.x ) { this.pos.x -= this.step;}
			if (this.pos.y < this.heading.y ) { this.pos.y += this.step;}
			if (this.pos.y > this.heading.y ) { this.pos.y -= this.step;}
		} 
		// this.think(); // aka 'arrived', decide next action
		if (this.pos.x == this.heading.x && this.pos.y == this.heading.y && !this.getNewHeading) {
			let timeout = 500;
			this.getNewHeading = true; // only call the setTimeout ONCE
			if (this.gettingFood && food[this.target]) {
				this.hunger += 5;
				this.size += 5;
				food[this.target].update();
				timeout += 2000;
				this.gettingFood = false;
			}
			setTimeout(() => { this.getHeading(); }
			, fr.random(timeout, timeout + 1000));
		}
	}

	getHeading () {
		if (this.hunger < 5) {
			if (food.length) { // If there is food
				// Create an array of distances between all food and this
				// NOTE: Update this to 'Rise over Run'?
				let foodDistances = food.map(item => Math.abs(item.x - this.pos.x) + Math.abs(item.y - this.pos.y));
				this.target = foodDistances.indexOf(Math.min(...foodDistances));
				this.heading = { x: food[this.target].x, y: food[this.target].y };
				this.gettingFood = true;
			}
			// no food found
		} else { // isn't hungry, move somewhere
			this.heading = fr.randomVector(this.canvas.width, this.canvas.height);
			this.hunger -= 1;
		}
		// Heading has now been set, don't look for another
		this.getNewHeading = false;
	}
}