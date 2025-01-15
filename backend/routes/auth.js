import express, { json } from 'express';
import User from '../models/User.js';
import { body,validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import fetchuser from '../middleware/fetchuser.js';

dotenv.config()

const JWT_SERECT = "Ujt!gf87$JH@Nm4l12#FdSpfafa3455@@!4##@";

const router = express.Router();
//api/auth/createuser

router.post('/createuser',[
    body('name')
    .isLength({ max: 10 }),
    body('password')
      .isLength({ min: 8 })
      .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
      .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
      .matches(/[0-9]/).withMessage('Password must contain at least one digit'),
    body("email")
    .isEmail()
    .normalizeEmail(),
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try{
    let user = await User.findOne({email:req.body.email})
    
    if(user)
        return res.status(400).json({error:"User already exits"})

    const salt  = await bcrypt.genSalt(10)
    const secPass = await bcrypt.hash(req.body.password,salt) 
   const person = await User.create({
        name:req.body.name,
        email:req.body.email,
        password:secPass
    });
    const data = {
        user:{
            id:person.id,
        }
    }
    const auth_token = jwt.sign(data,JWT_SERECT);

    res.status(201).json({message:"User created successfully",token:auth_token})
}catch(error){
    console.error(error.message)
    res.status(500).send("Some error occurred")
}
});

//login  checks

router.post('/loginuser',[
    body('password')
      .isLength({ min: 8 })
      .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
      .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
      .matches(/[0-9]/).withMessage('Password must contain at least one digit'),
    body("email")
    .isEmail()
    .normalizeEmail(),
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email:email})
        if(!user)
            return res.status(400).json({error:"Invalid credentials"})
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch)
            return res.status(401).json({error:"Invalid credentials"})
        const data = {
            user:{
                id:user.id,
                }
                }
                const auth_token = jwt.sign(data, JWT_SERECT);
                res.status(200).json({
                    "success": true,
                    "icon": user.name
                  })
                }catch(error){
                    console.error(error.message)
                    res.status(500).send("Some error occurred")
                    }
});


// Get user data
router.post('/getuser',fetchuser, async (req, res) => {
try{
    const user = await User.findById(req.user.id).select("-password");
    res.send(user)
}catch(error){
    console.error(error.message)
    res.status(500).send("Some error occurred")
    }   
})


export default router;
