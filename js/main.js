import { fr } from './frame.js';
import Person from './Person.js';
import Food from './Food.js';

const c = document.createElement("canvas");
c.width = 800;
c.height = 600;
const ctx = c.getContext('2d');
const wrapper = document.getElementById('display');
wrapper.appendChild(c);

window.people = [];
const addPerson = document.getElementById('add-person');
addPerson.onclick = function () {
	people.push(new Person(c));
}

window.food = [];
const mouse = {	x: 0, y: 0 };
let mousePressed = false;
c.addEventListener("mousemove", function (e) {
	mouse.x = e.pageX - this.offsetLeft;
	mouse.y= e.pageY - this.offsetTop;
});
c.addEventListener('mousedown', (e) => {
		mousePressed = true;
		food.push(new Food(mouse.x, mouse.y));
});
c.addEventListener('mouseup', (e) => {
		mousePressed = false;
});

function main() {
	ctx.clearRect(0, 0, c.width, c.height);
	
	food.forEach(item => {
		ctx.fillStyle = "#a0a";
		ctx.fillRect(item.x,item.y,item.size,item.size);
	});
	people.forEach(person => {
		person.update(c);
		ctx.fillStyle = person.color;
		ctx.fillRect(person.pos.x, person.pos.y, person.size, person.size);
	});
	requestAnimationFrame(main);
}

main();