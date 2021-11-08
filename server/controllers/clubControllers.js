import asyncHandler from 'express-async-handler'
import Club from '../models/clubModel.js'
import Sig from '../models/sigModel.js'

export const getClubData = asyncHandler(async(req,res) => {
    const clubData = await Club.findOne({username: req.body.id})
    if(clubData === null){
        res.status(404)
        throw new Error('No user found.')}
    res.status(201).json(clubData)
})


export const postClubData = asyncHandler(async(req,res) => {
    const {name, isExclusive, isRecruiting, id} = req.body
    const userData = await Club.find({username: id})
    
    
    if(userData.length===0){
        const newUser = new Club({
            name: name,
            isExclusive: isExclusive,
            isRecruiting:isRecruiting,
            username: id
        });
        const success = await newUser.save();
        
        if(success){
            const sigUpdate = await Sig.update(
                { ClubName: newUser._id },        
                { $set: { isRecruiting: newUser.isRecruiting } },
                { multi: true }
            );
            res.status(201).json(newUser);
            
        } else {
            res.status(404)
            throw new Error('No user found.')
        }
    }
    userData[0].name = name || userData[0].name;
    userData[0].isExclusive = isExclusive;
    userData[0].isRecruiting = isRecruiting;
    const update = await userData[0].save();

    const sigUpdate = await Sig.update(
        { ClubName: userData[0]._id },        
        { $set: { isRecruiting: userData[0].isRecruiting } },
        { multi: true }
    );
    
    if(update){
        res.status(201).json(userData[0])          
    }else{
        res.status(404)
        throw new Error('No user found.')
    }
    
})