
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async(req, res) =>{
    try {
        const {name, email, password} = req.body;


        const user = await User.findOne({email});
        if(user){
            return res.status(409).json(
                {
                    message:"User already exists! Please Login",
                    success:false
                }
            )
        }
        const userModel = new User({name, email, password});
        userModel.password = await bcrypt.hash(password,10);

        await userModel.save();
        res.status(201)
            .json(
                {
                    message:"SignUp Successfull",
                    success:true
                }
            )

    } catch (error) {
        res.status(500).json(
            {
                message:"Internal server error",
                success: false
            }
        )
    }
};


exports.login = async(req, res) =>{

        try {
            const {email, password} = req.body;
            const user = await User.findOne({email});
            if(!user){
                return res.status(403).json(
                    {
                        message:"User Not Existed Please Register",
                        success:false
                    }
                )
            }

            const isPassword = await bcrypt.compare(password, user.password);
            if(!isPassword){
                return res.status(403).json(
                    {
                        message:"Password is incorrect",
                        success:false
                    }
                )
            }
            const JwtToken = jwt.sign(
                {
                    email:user.email,
                    _id:user._id
                },
                process.env.JWTSECRET,
                {expiresIn:"24hr"}

            )
            res.status(200)
                .json(
                    {
                        message:"Login Succesfull",
                        success:true,
                        JwtToken,
                        email,
                        name:user.name
                    }
                )

            
        } catch (error) {
            console.log(error);
            res.status(500).json(
                {
                    message:"Internal server error",
                    success: false
                }
            )
        }
};