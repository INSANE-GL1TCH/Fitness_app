const RegisterUser = require("../models/userModels");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const {sendEmail} = require("../utlis/verifyEmail");

const registerUser= async(req,res) =>{
    const{username, email, password}=req.body;

    if(!username || !email || !password){
        return res.status(400).json({
            message:"please fill all fields"
        });
    }
    const user = await RegisterUser.findOne({where:{username:username}});
    if(user){
        return res.status(400).json({
            message:`${username} already exists` 
        });
    }

    // const verficationToken = crypto

    // hashing password
    const hashedpassword = bcrypt.hashSync(password,10)

    //generate verification Token
    const verificationToken = await crypto.randomBytes(32).toString("hex");

    //expiry date verificationToken
    const verificationTokenExpires = new Date(Date.now() + 1 * 60 * 60 * 1000)

    //passig data to model 
    const createUser =await RegisterUser.create({
        username,
        email,
        password : hashedpassword,
        verificationToken,
        verificationTokenExpires
    });

    const verifyLink = `http://localhost:3000/api/user/verify-email?token=${verificationToken}`;

    await sendEmail(
        email,
        "verify your email",
        `
            <h1> verify yourself</h1>
            <a href=${verifyLink}>click here</a>
        `
    )

    return res.status(201).json({
        success: true,
        message:"user registered sucuessfully",
        user: {
            username :createUser.username,
            email : createUser.email
        }

    })
}
const userLogin = async(req,res) =>{
    const{email,password}= req.body;

    if(!email || !password){
        return res.status(400).json({
            message:"email or password cannot be empty"
        })
    }
    const user = await RegisterUser.findOne({where:{email : email}})
    if(!user){
        return res.status(404).json({
            message:`No user found with this email ${email}`
        })
    }

    const isMatch = await bcrypt.compare(password,user.password)

    if(isMatch){

        const token = jwt.sign(
            {
                id:user.id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES
            }
        )

        return res.status(201).json({
            success:true,
            message : "login succesfull",
            token
        })
    }else{
        return res.status(401).json({
            message : "login failed"
        })
    }
}

const resetPassword =  (req, res) => {
    
}
module.exports = {registerUser,userLogin};