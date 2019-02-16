import test from 'ava';
import BoxcarNotification from '../../main';

test('should have sounds property', t => {
	t.true(BoxcarNotification.VALID_SOUNDS.length > 0);
});

test('should have api url property', t => {
	t.regex(BoxcarNotification.API_URL, /^https:\/\/.*boxcar.*$/);
});
