import assert from 'assert';
import BoxcarNotification from '../build.js';

let fail = () => {assert.ok(0);};

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

describe('send()', function () {
    this.timeout(10000);
    let options;
    let bn;
    let notAuthorizedResponse = '{"Response":"Not Authorized"}';
    beforeEach((done) => {
        options = {
            title: 'title-title',
            longMessage: 'longMessage-longMessage',
            sound: 'beep-crisp',
            sourceName: 'sourceName-sourceName',
            iconUrl: 'iconUrl-iconUrl'
        };
        bn = new BoxcarNotification('TEST');
        done();
    });

    it('should done nomaly but api response "not authorized"', (done) => {
        bn.send(options).then((body) => {
            assert.deepEqual(body, notAuthorizedResponse);
        }).catch((e) => {
            fail();
        }).done(done);
    });

    it('should require title', (done) => {
        options.title = undefined;
        bn.send(options).then(() => {
            fail();
        }).catch((error) => {
            assert.ok(error);
        }).done(done);
    });

    it('should require longMessage', (done) => {
        options.longMessage = undefined;
        bn.send(options).then(() => {
            fail();
        }).catch((error) => {
            assert.ok(error);
        }).done(done);
    });

    it('should reject when sound option is invalid', (done) => {
        options.sound = 'testestestestes';
        bn.send(options).then(() => {
            fail();
        }).catch((error) => {
            assert.ok(error);
        }).done(done);
    });
});
