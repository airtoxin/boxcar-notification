import assert from 'assert';
import BoxcarNotification from '../build.js';

describe('constructor', () => {
    it('should get credential', (done) => {
        let credential = 'TEST';
        let bn = new BoxcarNotification(credential);
        assert.strictEqual(bn.userCredentials, credential);
        done();
    });
});

describe('static properties', () => {
    it('should have sounds property', (done) => {
        let validSounds = BoxcarNotification.VALID_SOUNDS;
        assert.ok(validSounds.length > 0);
        done();
    });

    it('should have api url property', (done) => {
        let apiUrl = BoxcarNotification.API_URL;
        assert.ok((/^https:\/\/.*boxcar.*$/).test(apiUrl));
        done();
    });
});
