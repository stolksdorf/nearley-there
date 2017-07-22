const test = require('ava');
const N = require('../nearley-there.js');

const fs = require('fs');
const parenGrammar = fs.readFileSync('./tests/paren.ne', 'utf8');

test('fielpath grammar is parsing', (t)=>{
	t.deepEqual(
		N.parse('./tests/csscolor.ne', '#333'),
		[ '#', [ '3' ], [ '3' ], [ '3' ] ]
	);
	t.is(N.parse('./tests/calculator.ne', '1+4'), 5);
});

test('string-based grammar is parsing', (t)=>{
	t.true(N.parse(parenGrammar, '{{{}}}'));
});

test('bad grammar throws', (t)=>{
	const error = t.throws(()=>N.parse('yoyoyoy', '{}'), TypeError);
	t.is(error.message, 'Cannot read property \'length\' of undefined')
});

test('non-matching input return error', (t)=>{
	const error = N.parse(parenGrammar, '{{}}}');
	t.true(error instanceof Error);
	t.is(error.offset, 4);
});