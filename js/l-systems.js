function LSystem(axiom) {

	var allGens, currentGenIndex;
	var rules = [];

	resetLSystem(axiom === undefined ? "" : axiom);
	
	function my(){}

	function resetLSystem(init) {
		axiom = init;
		allGens = [];
		allGens[0] = axiom;
		currentGenIndex = 1;
	}

	function applyRules(g) {
		var sentence = "";
		for (var i=0; i<g.length; i++) {
			var c = g.charAt(i);
			var matchFound = false;
			for (var r=0; r<rules.length; r++) {
				if (c === rules[r].key) {
					sentence += rules[r].replacement;
					matchFound = true;
					break;
				}
			}
			if (!matchFound) {
				sentence += c;
			}
		}

		return sentence;
	}


	// resets the L-system, but keeps the ruleset
	my.axiom = function(a) {
		if (!arguments.length) return axiom;

		resetLSystem(a);

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
		rules.push({ key: key, replacement: replacement });

		return my;
	};

	my.rules = function(rulesArray) {
		if (!arguments.length) return rules;

		rules	= ruleArray;

		return my;
	};

	my.generations = function() {
		return allGens;
	};

	my.currentGeneration = function() {
		return allGens[currentGenIndex-1];
	};


	return my;
}