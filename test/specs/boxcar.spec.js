import test from 'ava';
import BoxcarNotification from '../../main';

test('should get credential', t => {
	const credential = 'TEST';
	const bn = new BoxcarNotification(credential);
	t.is(bn.userCredentials, credential);
});
