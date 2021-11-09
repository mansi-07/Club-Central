import express from 'express'
const router = express.Router()
import mongoose from 'mongoose'
import checklogin from '../middlewares/authMiddleware.js'
import Sig from "../models/sigModel.js"
import Application from "../models/applicationModel.js"
import Club from "../models/clubModel.js"

router.post('/preferenceorder',checklogin,(req, res) => {
    Application.find({ username: req.body.id}, function (err, username) {
        if (err) {
            console.log(err);
            return
        }
        
    });



})


router.put('/preference', checklogin, (req, res) => {
    const { pref_num} = req.body
    if (!pref_num) {
        return res.status(422).json({ error: "Please add all the fields" })
    }

    Application.findOne({ username: req.user.id }, function (err, ClubName) {
        if (err) {
            console.log(err);
            return
        }
    //     console.log(req.user)
    //     res.send("ok")
    //    console.log(clubname)
        const preference = new Preference({
            user,
            ClubName,
            pref_num,
            instituteId: req.user.instituteName
            // instituteId: req.user.instituteName
        })
        preference.save().then(result => {
            res.json({ sig: result })
        })
            .catch(error => {
                console.log(error)
            })
    });


})


export default router;