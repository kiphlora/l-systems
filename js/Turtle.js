function drawTurtle(ctx, sentence, initialPoint, length, angle) {
	
	var fs = freq(sentence, "F");

	var translations = [];
	ctx.translate(initialPoint.x, initialPoint.y);
	ctx.strokeStyle = "rgba(0,0,0,0.01)";
	var p = 0;

	for (var i=0; i<sentence.length; i++) {
		var c = sentence.charAt(i);

		switch(c) {
			case "F":
				ctx.beginPath();
				ctx.moveTo(0,0);
				ctx.lineTo(0, -length);
				ctx.translate(0, -length);
				p += 1/fs;
				ctx.strokeStyle = "rgba(194," + Math.floor(p * 220) + ",40,0.3)";
				ctx.stroke();
				break;

			case "+":
				ctx.rotate(angle);
				// ctx.strokeStyle = "rgba(0," + Math.floor((angle/(Math.PI)) * 255) + ",0,0.3)";
				break;

			case "-":
				ctx.rotate(-angle);
				break;

			case "[":
				ctx.save();
				break;

			case "]":
				ctx.restore();
				break;
		}
	}
	
}
