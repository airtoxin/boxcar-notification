import test from 'ava';
import BoxcarNotification from '../../main';

test.beforeEach(t => {
	t.context.options = {
		title: 'title-title',
		longMessage: 'longMessage-longMessage',
		sound: 'beep-crisp',
		sourceName: 'sourceName-sourceName',
		iconUrl: 'iconUrl-iconUrl'
	};
	t.context.bn = new BoxcarNotification('TEST');
});

test('should resolve with API response "Not Authorized"', async t => {
	const {bn, options} = t.context;

	const body = await bn.send(options);
	t.is(JSON.parse(body).Response, 'Not Authorized');
});

test('should require title', async t => {
	const {bn, options} = t.context;

	const error = await t.throws(bn.send({...options, title: undefined}));
	t.regex(error.message, /title required/);
});

test('should require longMessage', async t => {
	const {bn, options} = t.context;

	const error = await t.throws(bn.send({...options, longMessage: undefined}));
	t.regex(error.message, /longMessage required/);
});

test('should reject when sound option is invalid', async t => {
	const {bn, options} = t.context;

	const error = await t.throws(bn.send({...options, sound: 'testestestestes'}));
    t.regex(error.message, /sound must be one of/);
});
