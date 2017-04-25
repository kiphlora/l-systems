function LSystem(a) {

	var axiom, allGens, currentGenIndex;
	var ruleset = {};
	var delim = ",";

	resetLSystem(a === undefined ? "" : a);
	
	function my(){}

	function resetLSystem(init) {
		axiom = init;
		allGens = [];
		allGens[0] = axiom;
		currentGenIndex = 1;
	}

	function applyRules(g) {
		var ruleLen = Object.keys(ruleset);
		if (ruleLen === 0) return g;

		g = g.split(delim);

		console.log(g);

		var g2 = [];

		for (var i=0; i<g.length; i++) {
			var replacement = ruleset[g[i]] === undefined ? g[i] : ruleset[g[i]];
			console.log("replacement: ", replacement);
			g2.push(replacement);
		}

		return g2.join();
	}


	// resets the L-system, but keeps the ruleset
	my.axiom = function(v) {
		if (!arguments.length) return axiom;

		resetLSystem(v);

		return my;
	};

	my.iterate = function(n) {
		if (!arguments.length) n = 1;

		for (var i=0; i<n; i++) {
			allGens.push(applyRules(allGens[currentGenIndex-1]));
			currentGenIndex = allGens.length;
		}

		return my;
	};

	my.addRule = function(key, replacement) {
		ruleset[key] = replacement;

		return my;
	};

	my.ruleset = function(ruleObject) {
		if (!arguments.length) return ruleset;

		ruleset	= ruleObject;

		return my;
	};

	my.generations = function() {
		return allGens;
	};

	my.delim = function(d) {
		if (!arguments.length) return delim;
		delim = d;

		return my;
	};


	return my;
}