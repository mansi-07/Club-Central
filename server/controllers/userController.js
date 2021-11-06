import GlobalUser from '../models/globalUserModel.js'
import Institute from '../models/instituteModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/jwtGenerator.js'
import User from '../models/userModel.js'

export const getUserData = asyncHandler(async(req,res) => {
    const userID = req.params.id
    const userData = await User.findOne({username: userID})
    if(!userData)
        res.status(404)
    res.status(201).json(userData)
})

export const postUserData = asyncHandler(async(req,res) => {
    const {name, rollno, branch, passingyear, id} = req.body
    const userData = await User.find({username: id})
    if(userData.length===0){
        const newUser = new User({
            name: name,
            rollNo: rollno,
            branch:branch,
            passingYear: passingyear,
            username: id
        });
        const success = await newUser.save();
    
        if(success){
            res.status(201).json(newUser);
            
        } else {
            res.status(404)
            throw new Error('No user found.')
        }
    }
    
    userData[0].name = name || userData[0].name;
    userData[0].rollNo = rollno || userData[0].rollNo;
    userData[0].branch = branch || userData[0].branch;
    userData[0].passingYear = passingyear || userData[0].passingYear;
    const update = await userData[0].save();
    if(update){
        res.status(201).json(userData[0])          
    }else{
        res.status(404)
        throw new Error('No user found.')
    }
    
    
})