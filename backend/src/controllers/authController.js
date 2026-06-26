import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res) =>{
    try{
        const {name, email, password} = req.body;

        const existingUser = await User.findOne({
            email: email.toLowerCase(),
        });

        if(existingUser){
            return res.status(409).json({
            success: false,
            message: "User already exists",
            errors:[],
            });
        }

        const passwordHash = await bcrypt.hash(password,10);
        const user = await User.create({
            name,
            email,
            passwordHash,
        });

        const token = generateToken(user._id);
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data:{
                token,
                user:{
                    id: user._id,
                    name: user.name,
                    email: user.email,
                },
            },
        });
    }
    catch(error){
        console.error(error);

        return res.status(500).json({
            success:false,
            message: "Internal server error",
            errors:[],
        });
    }
};

export const login = async (req, res)=>{
    try{
        const {email,password} = req.body;
        const user =  await User.findOne({
            email: email.toLowerCase(),
        });
        if(!user){
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
                errors: [],
            });
        }
        const isMatch = await bcrypt.compare(
            password,
            user.passwordHash
        );
        
        if(!isMatch){
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
                errors: [],
            });
        }
        const token = generateToken(user._id);
        return res.status(200).json({
            success: true,
            message: "Login successfully",
            data:{
                token,
                user:{
                    id: user._id,
                    name: user.name,
                    email: user.email,
                },
            },
        });
        
    }   catch(error){
        console.error(error);

        return res.status(500).json({
            success:false,
            message: "Internal server error",
            errors:[],
        });
    }
}

export const getMe = async (req, res)=>{
    try{
        return res.status(200).json({
            success: true,
            message: "User Profile fetched",
            data: req.user,
        });
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            errors: [],
        });
    }
};