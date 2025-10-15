const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken');
const User=require('../models/User');

const generateToken=(id)=>{
    return jwt.sign({id},process.env.jwt_secret,{
        expiresIn:'30d',
    });
}

exports.registerUser=async(req,res)=>{
    const {name,email,password}=req.body;
    try{
        let user=await User.findOne({email});
        if(user) return res.status(400).json({message:"User exists"});
        user=new User({name,email,password})
        const salt=await bcrypt.genSalt(10);
        user.password=await bcrypt.hash(password,salt);
        await user.save();

        res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id),
        });
    }
    catch(error){
        res.status(500).json({message:"Error"});
    }
}

exports.loginUser=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await User.findOne({email});
        if(user && (await bcrypt.compare(password,user.password))){
            res.json({
                _id:user.id,
                name:user.name,
                email:user.email,
                token:generateToken(user._id),
            })
        }
        else
        {
            res.status(401).json({message:"Correct Password Dalna!!"});
        }
    }
    catch(error)
    {
        res.status(500).json({message:"Error"});
    }
}

exports.changePassword=async(req,res)=>{
    const {currentPassword,newPassword}=req.body;
    try{
        const user=await User.findById(req.user.id);
        if(!user)
        {
            return res.status(404).json({message:"Thu Kuyn Hai Re"});
        }
        const isMatch=await bcrypt.compare(currentPassword,user.password);
        if(!isMatch)
        {
            return res.status(401).json({message:"Galat Dala Re Password Thu"});
        }
        const isSame=await bcrypt.compare(newPassword,user.password);
        if(isSame)
        {
            return res.status(400).json({message:"Same Password Mat Use Kar Re"});
        }
        const salt=await bcrypt.genSalt(10);
        user.password=await bcrypt.hash(newPassword,salt);
        await user.save();

        res.status(200).json({message:"Mast Password Rakha Hai Re Tu"});
    }
    catch(error){
        console.error("Error:",error);
        res.status(500).json({message:"Error Changing Password"});
    }
}