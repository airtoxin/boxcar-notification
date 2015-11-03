# boxcar-notification [![Build Status](https://travis-ci.org/airtoxin/boxcar-notification.svg)](https://travis-ci.org/airtoxin/boxcar-notification)
boxcar api notification library

## Install

`$ npm install boxcar-notification`

## Usage

First, prepare boxcar api token from [here](https://new.boxcar.io/account/edit)

```javascript
import BoxcarNotification from 'boxcar-notification';
let bn = new BoxcarNotification('API_TOKEN');

let notification = bn.send({
    title: 'my first notification',
    longMessage: 'Hello!!'
});
notification.then((body) => {
    console.log('@body:', body);
}).catch((error) => {
    console.log('@error:', error);
});
```

## Document

### class `BoxcarNotification`

+ `BoxcarNotification.constructor(API_TOKEN)`

+ `BoxcarNotification.VALID_SOUNDS`

+ `BoxcarNotification.API_URL`

### instance of `BoxcarNotification: bn`

+ `bn.send(options) => Promise:notification`

 + options.title
 + options.longMessage
 + options.sound
 + options.sourceName
 + options.iconUrl

+ `notification.then(body)`
+ `notification.catch(error)`
