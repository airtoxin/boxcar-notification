import request from 'request';
import {ArgumentError} from 'standard-errors';

export default class BoxcarNotification {
	/**
     * @param {string} userCredentials - your boxcar's API token
     */
	constructor(userCredentials) {
		this.userCredentials = userCredentials;
	}

	/**
     * @property {string[]} VALID_SOUNDS - selectable sounds list
     */
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

	/**
     * @property {string} API_URL - API endpoint url
     */
	static get API_URL() {
		return 'https://new.boxcar.io/api/notifications';
	}

	/**
     * Send notification request.
     * @param {object} options - notification options
     * @param {string} options.title - [required] notification title
     * @param {string} options.longMessage - [required] notification message body
     * @param {string} options.sound - notification sound
     * @param {string} options.sourceName - notification source
     * @param {string} options.iconUrl - notification icon url
     * @return {Promise<string, string>} - response body or error message
     */
	send(options) {
		return new Promise((resolve, reject) => {
			if (!options.title) {
				return reject(new ArgumentError('title required'));
			}
			if (!options.longMessage) {
				return reject(new ArgumentError('longMessage required'));
			}
			if (options.sound && BoxcarNotification.VALID_SOUNDS.indexOf(options.sound) === -1) {
				const sounds = BoxcarNotification.VALID_SOUNDS.join(',');
				return reject(new ArgumentError(`sound must be one of [${sounds}]`));
			}

			const formData = {
				// eslint-disable-next-line camelcase
				user_credentials: this.userCredentials,
				'notification[title]': options.title,
				'notification[long_message]': options.longMessage
			};

			if (options.sound) {
				formData['notification[sound]'] = options.sound;
			}
			if (options.sourceName) {
				formData['notification[source_name]'] = options.sourceName;
			}
			if (options.iconUrl) {
				formData['notification[icon_url]'] = options.iconUrl;
			}

			request.post({
				url: BoxcarNotification.API_URL,
				formData
			}, (error, _, body) => {
				if (error) {
					return reject(error);
				}
				resolve(body);
			});
		});
	}
}
