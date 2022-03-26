const express = require("express");
const UsersService = require("../services/user");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");

const router = express.Router();

const usersService = new UsersService();
router.post(
    "/login",
    [
        check("username", "Provide an username").exists(),
        check("password", "Provide an password").exists(),
    ],
    async function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { username, password } = req.body;
            const user = await usersService.getUser({ username });
            const flag = await bcrypt.compare(password, user.password);
            if (user && flag) {
                res.status(200).json({ msg: "Login successfully" });
            } else {
                res.status(400).json({ msg: "Login unsuccessfully or user no exist" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message, msg: "Login unsuccessfully" });
        }
    }
);

module.exports = router;
