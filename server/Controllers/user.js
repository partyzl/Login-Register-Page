const User = require("../Models/user");

async function index(req, res) {
    try {
        const users = await User.all;
        res.status(200)
        .json(users);
    } catch (error) {
        console.error('Could not get all users');
        res.status(500)
        .json({error})
    }
}