const express = require('express');
const router = express.Router();
const { validateName, validateEmail, validatePassword } = require('../utils/validators');
const User = require('../models/userModels');
const bcrypt = require('bcrypt');
const { PassThrough } = require('stream');

router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, isSeller } = req.body;
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(403).json({ err: "User already exists" });
        }
        if (!validateName(name)) {
            console.log(name);
            return res.status(400).json({ err: "Invalid Name" });
        }
        if (!validateEmail(email)) {
            return res.status(400).json({ err: "Invalid Email" });
        }
        if (!validatePassword(password)) {
            return res.status(400).json({ err: "Invalid Password" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = {
            name, email, password: hashedPassword, isSeller
        }
        const createdUser = await User.create(user);
        return res.status(200).json({
            message: `Welcome ${createdUser.name}`,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});
module.exports = router;