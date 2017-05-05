function TurtleMap() {
	var CLOCKWISE = "c";
	var ANTICLOCKWISE = "ac";
	var PUSH = "[";
	var POP = "]";
	var MOVE = "F";

	var moveDist = 10;
	var turnAngle = Math.PI/6;
	var currentAngle = 0;

	var start = new Vec2(100,100);

	var points = [];
	var stack = [];

	var line = d3.svg.line()
  		.x(function(d) { return d.x; })
  		.y(function(d) { return d.y; })
  		.interpolate('linear');

	function my(arr) {
		arr = arr.split(",");
		points.push(start.clone());
		console.log(arr);
		var loc = start;
		for (var i=0; i<arr.length; i++) {
			var a = arr[i];
			switch(a) {
				case CLOCKWISE:
					// loc = loc.rotate(-turnAngle);
					// points.push(loc.clone());
					currentAngle -= turnAngle;
					console.log(i + " " + a + " " + "clockwise " + loc.x + "," + loc.y);
					break;

				case ANTICLOCKWISE:
					// loc = loc.rotate(turnAngle);
					// points.push(loc.clone());
					currentAngle += turnAngle;
					console.log(i + " " + a + " " + "anticlockwise " + loc.x + "," + loc.y);
					break;

				case PUSH:
					stack.push(loc.clone());
					console.log(i + " " + a + " " + "push " + loc.x + "," + loc.y);
					break;

				case POP:
					loc = stack.pop();
					points.push(loc.clone());
					console.log(i + " " + a + " " + "pop " + loc.x + "," + loc.y);
					break;

				case MOVE:
					var v = Vec2.normWithAngle(currentAngle).mag(moveDist);
					loc = loc.add(v);
					points.push(loc.clone());
					console.log(i + " " + a + " " + "move " + loc.x + "," + loc.y);
					break;

				default: 
					var v = Vec2.normWithAngle(currentAngle).mag(moveDist);
					loc = loc.add(v);
					points.push(loc.clone());
					console.log(i + " " + a + " " + "move " + loc.x + "," + loc.y);
			}
		}

		return my;
	}

	my.points = function() {
		return points;
	};

	my.path = function() {
		return line(points);
	};

	my.turnAngle = function(angle) {
		if (!arguments.length) return turnAngle;
		turnAngle = angle;
		return my;
	};

	my.moveDist = function(dist) {
		if (!arguments.length) return moveDist;
		moveDist = dist;
		return my;
	};

	my.startLoc = function(loc) {
		if (!arguments.length) return start;
		start = loc;
		return my;
	};

	my.startAngle = function(angle) {
		if (!arguments.length) return currentAngle;
		currentAngle = angle;
		return my;
	};

	my.centerPoints = function(centerX, centerY) {
		var v = new Vec2(centerX, centerY);

		points = vecOp(points, function(p){ 
			p = Vec2.subtract(v,p);
			return p;
		});

		return points;
	}



	return my;
}	