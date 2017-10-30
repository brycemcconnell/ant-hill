/*

Some common functions

*/

export const fr = {

	randomColor: function () {
		const col = () => Math.floor(Math.random() * 256);
		return 'rgb(' + col() + ',' + col() + ',' + col() + ')'; 
	},

	random: function (min, max) {
		if (Array.isArray(min)) {
			min = min.length;
		}
		if (!max) {
			max = min;
			min = 0;
		}
		return Math.floor(Math.random() * (max - min)) + min;
	},

	randomVector: function (maxX, maxY, minX = 0, minY = 0) {
		const x = Math.floor(Math.random() * (maxX - minX)) + minX; 
		const y = Math.floor(Math.random() * (maxY - minY)) + minY; 
		return {x, y};
	},

	collisionDetect: function (obj1, obj2, canvas) {
		let ctx = canvas.getContext('2d');
		if (obj1.pos.x < obj2.pos.x + obj2.size &&
			obj1.pos.x + obj1.size > obj2.pos.x &&
			obj1.pos.y < obj2.pos.y + obj2.size &&
			obj1.size + obj1.pos.y > obj2.pos.y) {
			// Detected collision
			fr.line(ctx,
				obj1.pos.x, obj1.pos.y,
				obj2.pos.x, obj2.pos.y);
			fr.line(ctx,
				obj1.pos.x + obj1.size, obj1.pos.y + obj1.size,
				obj2.pos.x + obj2.size, obj2.pos.y + obj2.size);
			fr.line(ctx,
				obj1.pos.x, obj1.pos.y + obj1.size,
				obj2.pos.x, obj2.pos.y + obj2.size);
			fr.line(ctx,
				obj1.pos.x + obj1.size, obj1.pos.y,
				obj2.pos.x + obj2.size, obj2.pos.y);
		} else {
			// console.log('oaky');
		}
	},
	
	line: function(ctx, x1, y1, x2 = 0, y2 = 0) {
		ctx.beginPath();
		ctx.moveTo(x2, y2);
		ctx.lineTo(x1, y1);
		ctx.stroke();
	}
};
