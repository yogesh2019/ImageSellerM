const express = require('express');
const app = express();
const { connectDB } = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const PORT = 3001;

app.use(express.json());
app.use(express.static('content'));
app.use(express.urlencoded({ extends: false }));
app.use('/api/v1/user',userRoutes);
app.listen(PORT, () => {
    console.log("app is running");
    connectDB();
})