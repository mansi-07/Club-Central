import GlobalUser from '../models/globalUserModel.js'
import asyncHandler from 'express-async-handler'

export const getUserList = asyncHandler(async(req,res) => {
    const instituteID = req.body.instituteID
    const userList = await GlobalUser.find({instituteName: instituteID})
    if(userList.length===0)
        res.status(404)
    res.status(201).json(userList)
})

export const changeRole = asyncHandler(async(req,res) => {
    const userID = req.body.userID
    const user = await GlobalUser.findOne({_id: userID})
    console.log(user)
    user.isAdmin = user.isAdmin===true ? false : true;
    const update = await user.save();
    if(update){
        res.status(201).json({msg: "Successful!"})
    }
    else{
        res.status(404).json({msg: "Failed!"})
    }
    
})