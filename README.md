# boxcar-notification [![Build Status](https://travis-ci.org/airtoxin/boxcar-notification.svg)](https://travis-ci.org/airtoxin/boxcar-notification)
boxcar api notification library

## Install

`$ npm install boxcar-notification`

## Usage

First, prepare your Boxcar API token [here](https://new.boxcar.io/account/edit)

```javascript
import BoxcarNotification from 'boxcar-notification';
const bn = new BoxcarNotification('API_TOKEN');

const notification = bn.send({
    title: 'my first notification',
    longMessage: 'Hello!!'
});

notification.then((body) => {
    console.log('@body:', body);
}).catch((error) => {
    console.log('@error:', error);
});
```