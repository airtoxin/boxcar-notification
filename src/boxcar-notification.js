import request from 'request';
import Promise from 'promise';

export default class BoxcarNotification {
    constructor(userCredentials) {
        this.userCredentials = userCredentials;
    }
    static get VALID_SOUNDS() {
        return [
            'beep-crisp',
            'beep-soft',
            'bell-modern',
            'bell-one-tone',
            'bell-simple',
            'bell-triple',
            'bird-1',
            'bird-2',
            'boing',
            'cash',
            'clanging',
            'detonator-charge',
            'digital-alarm',
            'done',
            'echo',
            'flourish',
            'harp',
            'light',
            'magic-chime',
            'magic-coin',
            'notifier-1',
            'notifier-2',
            'notifier-3',
            'orchestral-long',
            'orchestral-short',
            'score',
            'success',
            'up'
        ];
    }
    static get API_URL() {return 'https://new.boxcar.io/api/notifications';}
    send (options) {
        return new Promise((resolve, reject) => {
            if (!options.title) return reject('title required');
            if (!options.longMessage) return reject('longMessage required');
            if (options.sound && BoxcarNotification.VALID_SOUNDS.indexOf(options.sound) === -1) {
                let sounds = BoxcarNotification.VALID_SOUNDS.join(',');
                return reject(`sound must be one of [${sounds}]`);
            }

            let formData = {user_credentials: this.userCredentials};
            formData['notification[title]'] = options.title;
            formData['notification[long_message]'] = options.longMessage;
            if (options.sound) formData['notification[sound]'] = options.sound;
            if (options.sourceName) formData['notification[source_name]'] = options.sourceName;
            if (options.iconUrl) formData['notification[icon_url]'] = options.iconUrl;

            request.post({
                url: BoxcarNotification.API_URL,
                formData: formData
            }, (error, response, body) => {
                if (error) return reject(error);
                resolve(body);
            });
        });
    }
}
