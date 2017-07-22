const test = require('ava');
const N = require('../nearley-there.js');

const fs = require('fs');
const parenGrammar = fs.readFileSync('./tests/paren.ne', 'utf8');


test('compile to string', (t)=>{
	const res = N.compile(parenGrammar);
	t.is(typeof res, 'string');
});

test('compiled code works', (t)=>{
	N.compile('./tests/calculator.ne', './tests/calculator.built.js');
	const calculator = require('./calculator.built.js');
	t.is(calculator('3+7'), 10);
});

test('bad grammar throws', (t)=>{
	const error = t.throws(()=>N.compile('yoyoyoy'), TypeError);
	t.is(error.message, 'Cannot read property \'length\' of undefined')
});
