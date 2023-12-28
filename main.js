const express = require("express");
const db = require('./database');
// const sendLineNotify = require('./notify');

const app = express();
const port = 3098;

//test 
// app.get('/', (req, res) => {
//     const str = "Hello World123"
//     return res.json(str);
// });


app.listen(port, () => {
    console.log(` \nServer is running on port 🌐 ${port}`);
});