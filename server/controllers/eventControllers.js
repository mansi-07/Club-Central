import GlobalUser from '../models/globalUserModel.js'
import Institute from '../models/instituteModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/jwtGenerator.js'
import Event from '../models/eventModel.js'

export const addEvent = asyncHandler(async(req,res) => {

    const {name, startDate, endDate, clubID, instituteID} = req.body
   
    const newEvent = new Event({
        name: name,
        startDate: startDate,
        endDate: endDate,
        clubID: clubID,
        instituteID: instituteID
    });
    const success = await newEvent.save();

    if(success){
        res.status(201).json(newEvent);
        
    } else {
        res.status(404)
        throw new Error('No user found.')
    }
    
})

export const getEvent = asyncHandler(async(req,res) => {
    const instituteID = req.body.instituteID
    
    const success = await Event.find({instituteID: instituteID});
    console.log(instituteID)
    if(success){
        res.status(201).json(success);
        
    } else {
        res.status(404)
        throw new Error('Error')
    }
})