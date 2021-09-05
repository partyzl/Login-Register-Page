const router = require("express").Router();

const User = require("../Models/user");

const { verifyToken } = require('../Middleware/auth');

router.get('/', verifyToken, async (req, res) => {
    try{
        const users = await User.all
        res.json(users)
    }catch(error){
        console.error("Could not retrieve users");
        res.status(500)
        .json({error})
    }
})

router.get('/:username', verifyToken, async (req, res) => {
    try{
        const user = await User.findByUsername(req.params.username);
        res.status(200)
        .json(user)
    }catch(error){
        console.error("Could not find user");
        res.status(404)
        .json({error})
    }
})

module.exports = router;