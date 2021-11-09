import asyncHandler from 'express-async-handler'
import Sig from '../models/sigModel.js'
import Application from '../models/applicationModel.js';
import Round from '../models/helper_models/roundSchema.js';

export const getSig = asyncHandler(async(req,res) => {
    const instituteId  = req.body.instituteID;  
    const sigList = await Sig.find({ instituteId, isRecruiting: true})
    if(!sigList)
        res.status(404)
    res.status(201).json(sigList)
})

export const apply = asyncHandler(async(req,res) => {
    const {userID, sigID}  = req.body;
    console.log({userID, sigID})
    const exists = await Application.findOne({ username: userID, sigID: sigID})
    console.log(exists)
    if(exists){
        res.status(404).send({msg: "Already Applied!"})
        throw new Error ("Already Applied!")
    }
    const rounds = await Round.findOne({sigId: sigID, roundNum: 1})
    if(!rounds){
        res.status(404).send({msg: "No Rounds Registered"})
        throw new Error ("No Rounds Registered")
    }
    const success = await Application.create({
        username: userID,
        sigID: sigID,
        status: {
            roundID: rounds._id,
            status: 1
        }
    })
    if(success){
        res.status(201).send({msg: "Applied!"})
    }else{
        res.status(400).send({msg: "Error"})
        throw new Error('Something is wrong. Please enter valid data.')
    }
})