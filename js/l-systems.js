function LSystem(a) {

	var axiom, allGens, currentGenIndex;
	var ruleset = {};

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

		var g2 = "";

		for (var i=0; i<g.length; i++) {
			var replacement = ruleset[g[i]] === undefined ? g[i] : ruleset[g[i]];
			g2 = g2.concat(replacement);
		}

		return g2;
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



	return my;
}





