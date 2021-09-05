const router = require("express").Router();

const User = require("../Models/user");

const { verifyToken } = require('../Middleware/auth');

//not sure I need verify token for these 2 functions

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

router.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201)
        .json(newUser);
    } catch (error) {
        console.error("Could not create user");
        res.status(422)
        .json({error})
    }
})

module.exports = router;