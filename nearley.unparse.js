const randexp = require('randexp');
/** Extracted from nearley/bin/nearley-unparse.js **/
function unparse(grammar, name=false, depth=5) {
	name = name || grammar.ParserStart;
	var rules = grammar.ParserRules;
	var min_depths_rule = [];

	function synth_nt(name, depth) {
		var good_rules = [];
		var min_min_depth = Infinity;
		for (var i=0; i<rules.length; i++) {
			min_depths_rule = [];
			var size = min_depth_rule(i, []);
			if (rules[i].name === name) {
				min_min_depth = Math.min(min_min_depth, size);
				if (size < depth) {
					good_rules.push(i);
				}
			}
		}
		if (good_rules.length === 0) {
			throw ("No strings in your grammar have depth "+depth+" (and " +
				   "none are shallower). Try increasing 'depth' to at least "+
				   (min_min_depth+1) + ".");
		}

		var r = good_rules[Math.floor(Math.random()*good_rules.length)];
		return synth_rule(r, depth);
	}
	function synth_rule(idx, depth) {
		var ret = "";
		for (var i=0; i<rules[idx].symbols.length; i++) {
			var tok = rules[idx].symbols[i];
			if (typeof(tok) === 'string') {
				ret += synth_nt(tok, depth-1);
			} else if (tok.test) {
				ret += new randexp(tok).gen();
			} else if (tok.literal) {
				ret += tok.literal;
			}
		}
		return ret;
	}
	function min_depth_nt(name, visited) {
		if (visited.indexOf(name) !== -1) {
			return +Infinity;
		}
		var d = +Infinity;
		for (var i=0; i<rules.length; i++) {
			if (rules[i].name === name) {
				d = Math.min(d, min_depth_rule(i, [name].concat(visited)));
			}
		}
		return d;
	}
	function min_depth_rule(idx, visited) {
		if (min_depths_rule[idx] !== undefined) return min_depths_rule[idx];

		var d = 1;
		for (var i=0; i<rules[idx].symbols.length; i++) {
			var tok = rules[idx].symbols[i];
			if (typeof(tok) === 'string') {
				d = Math.max(d, 1+min_depth_nt(tok, visited));
			}
		}
		min_depths_rule[idx] = d;
		return d;
	}

	var ret = synth_nt(name, depth);
	return ret;
}

module.exports=unparse;