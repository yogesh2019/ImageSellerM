const express = require('express');
const app = express();
const { connectDB } = require('./config/db');

const PORT = 3001;

app.use(express.json());
app.use(express.static('content'));
app.use(express.urlencoded({ extends: false }));
app.listen(PORT, () => {
    console.log("app is running");
    connectDB();
})