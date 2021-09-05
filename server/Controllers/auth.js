require("dotenv").config();

const router = require("express").Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../Models/user");

router.post("/register", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashed = await bcrypt.hash(req.body.password, salt)
        await User.create({...req.body, password: hashed})
        res.status(201)
        .json({msg: 'User created'})
    } catch (error) {
        res.status(500)
        .json({error})
    }
})

router.post("/login", async(req, res) => {
    try {
        const user = await User.findByUsername(req.body.username);
        if(!user){
            throw new Error("No user with this username");
        }
        const authed = await bcrypt.compare(req.body.password, user.passwordDigest);
        if(!!authed){
            const payload = {
                username: user.username,
                email: user.email
            };
            const sendToken = (error, token) => {
                if(error){
                    throw new Error("Error in token generation");
                }
                res.status(200)
                .json({success: true,
                        token: "Bearer "+token});
            }
            jwt.sign(payload, process.env.SECRET,{ expiresIn: 3600 }, sendToken);
        }else{
            throw new Error("User could not be authenticated");
        }
    } catch (error) {
        res.status(401)
        .json({error});
    }
})

module.exports = router;