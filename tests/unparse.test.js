const test = require('ava');
const N = require('../nearley-there.js');

const fs = require('fs');
const parenGrammar = fs.readFileSync('./tests/paren.ne', 'utf8');

test('filepath grammar is unparsing', (t)=>{
	const paren = N.unparse('./tests/paren.ne', 10);
	t.is(N.parse('./tests/paren.ne', paren), true);

	const equation = N.unparse('./tests/calculator.ne', 15);
	t.is(typeof N.parse('./tests/calculator.ne', equation), 'number');
});

test('generator working', (t)=>{
	N.generator('./tests/csscolor.ne', './tests/csscolorgen.built.js');
	const csscolorGen = require('./csscolorgen.built.js');
	t.is(typeof csscolorGen(), 'string');
	t.is(typeof N.parse('./tests/csscolor.ne', csscolorGen()), 'object');
})