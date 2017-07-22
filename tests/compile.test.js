const test = require('ava');
const N = require('../nearley-there.js');



test.skip('compile is working', (t)=>{
	const res = N.compile('./tests/csscolor.ne', './thing.js');

	console.log(res);
	t.pass();
});





test('compiled code is working', (t)=>{
	const thing = require('../thing.js');

	const res = thing('#363');

	console.log(res);

	t.pass();
})

