import GlobalUser from '../models/globalUserModel.js'
import Institute from '../models/instituteModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/jwtGenerator.js'

export const getInstitute = asyncHandler(async(req,res) => {
    const instituteList = await Institute.find({})
    res.json(instituteList)
})

export const signInUser =  asyncHandler(async(req, res) =>{
   const {username, password} = req.body
   const user = await GlobalUser.findOne({username})
   if(user && (await user.passwordVerification(password))){
    res.send({
        user_id: user._id,
        username: user.username,
        instituteName: user.instituteName,
        isAdmin:user.isAdmin,
        isSuperAdmin:user.isSuperAdmin,
        instituteName: user.instituteName,
    })
   }else{
       res.status(401).send({msg: "Invalid combination of username and password"})
       throw new Error ("Invalid combination of username and password")
   }
})


export const signUpUser =  asyncHandler(async(req, res) =>{
    const {username, email, password, institute} = req.body
    console.log({username, email, password, institute})
    const userExists = await GlobalUser.findOne({email: email})

    if(userExists){
        res.status(400).send({msg: "The email is already taken."})
        throw new Error('The email is already taken.')
    }
    const userExistsUsername = await GlobalUser.findOne({username: username})

    if(userExistsUsername){
        res.status(400).send({msg: "The username is already taken."})
        throw new Error('The username is already taken.')
    }
    const institute_id = await Institute.findOne({name: institute})
    if(!institute_id){
        res.status(400).send({msg: "The institute does not exist."})
        throw new Error('The institute does not exist.')
    }
    const newUser = await GlobalUser.create({
        username: username, 
        email: email, 
        password: password, 
        instituteName: institute_id._id
    })

    if(newUser){
        res.status(201).json({
            user_id:newUser._id,
            email:newUser.email,
            username:newUser.username,
            instituteName: newUser.instituteName
        })
    }else{
        res.status(400)
        throw new Error('Something is wrong. Please enter valid data.')
    }
})