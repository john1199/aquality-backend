const express = require("express");
const UsersService = require("../services/user");
const { check, validationResult } = require("express-validator");

const router = express.Router();

const usersService = new UsersService();

router.get("/", async function (req, res) {
    try {
        console.log("safds");
        const userList = await usersService.getUsers();
        return res.status(200).json({ users: userList, msg: "Sin errores" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.get("/:userId", async function (req, res) {
    try {
        const { userId } = req.params;
        const user = await usersService.get({ userId });
        console.log(user);
        if (user) {
            const { name, surname, username, email, rol } = user;
            return res.status(200).json({
                msg: "Sin errores",
                user: { name, surname, username, email, rol },
            });
        } else {
            res.status(400).json({ msg: "user no exist" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.post(
    "/add",
    [
        check("document", "Provide an document").exists(),
        check("name", "Provide an name").exists(),
        check("surname", "Provide an surname").exists(),
        check("username", "Provide an username").exists(),
        check("email", "Provide an email").exists(),
        check("password", "Provide an password").isLength(6).exists(),
    ],
    async function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { body: user } = req;
            const userId = await usersService.createUser({ user });
            res.status(200).json({ idUser: userId, msg: "Register user successfully" });
        } catch (error) {
            res.status(500).json({ error: error, msg: "Register user unsuccessfully" });
        }
    }
);

router.put(
    "/edit/:userId",
    [
        check("document", "Provide an document").exists(),
        check("name", "Provide an name").exists(),
        check("surname", "Provide an surname").exists(),
        check("username", "Provide an username").exists(),
        check("email", "Provide an email").exists(),
        check("password", "Provide an password").isLength(6).exists(),
    ],
    async function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { userId } = req.params;
            const { body: user } = req;
            const userGet = await usersService.get({ userId });
            if (userGet) {
                const userUpdateId = await usersService.updateUser({ userId, user });
                res.status(200).json({
                    idUser: userUpdateId,
                    msg: "Edit user successfully",
                });
            } else {
                res.status(400).json({ msg: "user no exist" });
            }
        } catch (error) {
            res.status(500).json({ error: error, msg: "Edit user unsuccessfully" });
        }
    }
);

router.delete("/:userId", async function (req, res) {
    const { userId } = req.params;
    try {
        const user = await usersService.get({ userId });
        if (user) {
            const deleteId = await usersService.deletedUser({ userId });
            res.status(200).json({ idUser: deleteId, msg: "Delete user successfully" });
        } else {
            res.status(400).json({ msg: "user no exist" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message, msg: "Delete user unsuccessfully" });
    }
});

module.exports = router;
