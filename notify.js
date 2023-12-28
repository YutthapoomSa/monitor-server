const axios = require('axios');

const LINE_NOTIFY_TOKEN = 'tb2CimRelBE4aGZ6F8EZx2RF2oYp2oGr3uvOU3LKXXZ';

function sendLineNotify(message) {
    axios.post('https://notify-api.line.me/api/notify', {
        message: message,
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${LINE_NOTIFY_TOKEN}`,
        },
    })
        .then((response) => {
            console.log('\nLine Notify response:', response.data);
        })
        .catch((error) => {
            console.error('Error sending Line Notify:', error);
        });
}

module.exports = { sendLineNotify };
