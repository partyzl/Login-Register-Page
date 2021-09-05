const router = require("express").Router();

const User = require("../Models/user");

const { verifyToken } = require('../Middleware/auth');

router.get('/', verifyToken, async (req, res) => {
    const users = await User.all
    res.json(users)
})

module.exports = router;