const mysql = require('mysql2');
const sendLineNotify = require('./notify');

let connected = false;

function handleDisconnect() {
    const connection = mysql.createConnection({
        host: '192.168.80.253',
        user: 'sa',
        password: 'sa',
        database: 'hos'
    });

    connection.connect((err) => {
        if (err) {
            const message = "เชื่อมต่อฐานข้อมูลไม่สำเร็จ โปรดตรวจสอบการเชื่อมต่อฐานข้อมูล"
            sendLineNotify.sendLineNotify(message);
            setTimeout(handleDisconnect, 2000); // Reconnect after 2 seconds
            return;
        }
        connected = true;
        const message = "เชื่อมต่อฐานข้อมูลสำเร็จ"
        sendLineNotify.sendLineNotify(message);

        connection.on('error', (err) => {
            const message = "เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล โปรดตรวจสอบการเชื่อมต่อฐานข้อมูล"
            sendLineNotify.sendLineNotify(message);
            connected = false;
            handleDisconnect(); // Reconnect logic here if required
        });
    });
}

handleDisconnect();

// Check MySQL connection status and send messages to Line Notify based on conditions
setInterval(() => {
    if (!connected) {
        const message = "เชื่อมต่อฐานข้อมูลไม่สำเร็จ โปรดตรวจสอบการเชื่อมต่อฐานข้อมูล"
        sendLineNotify.sendLineNotify(message);
    } else {
        // Uncomment the block below if you want to send a notification on successful connection
        // else {
        //     const message = "เชื่อมต่อฐานข้อมูลสำเร็จ"
        //     sendLineNotify.sendLineNotify(message);
    }   // }
}, 20000);
