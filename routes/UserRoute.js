const router = require("express").Router()
const {User} = require("../modules/User")
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")



router.post("/createUser",async(req,res)=>{
    const { username, email, password } = req.body;
    // CHECK IF EMAIL ALREADY EXIST
    const user_ = User.findOne({email:email}).exists()

    if(user_) return res.status(400).json({error : "Email already exists"})
    const salt =  bcrypt.genSalt(10);
    const hashPassword = bcrypt.hash(password,salt)
    const newUser = new User({ username:username, email:email, password:hashPassword });

    try {
        const saveUser = await newUser.save()
        res.send(saveUser)
    } catch (error) {
        console.log(error)
    }
    
    
})




module.exports = router;


