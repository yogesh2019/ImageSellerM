const express = require('express');
const router = express.Router();
const { validateName, validateEmail, validatePassword } = require('../utils/validators');
const User = require('../models/userModels');

router.post('/signup', async (req, res) => {
    try {
        const { email } = req.body;
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(403).json({ err: "User already exists" });
        }
        console.log(existingUser);
        return res.json({
            ok : 'ok'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});
module.exports = router;