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
