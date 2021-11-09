import express from 'express'
const router = express.Router()
import mongoose from 'mongoose'
import Sig from "../models/sigModel.js"
import Club from "../models/clubModel.js"
import Appli from '../models/applicationModel.js'
import Round from "../models/helper_models/roundSchema.js"
import Application from '../models/applicationModel.js'
import User from '../models/globalUserModel.js'




router.get('/users/:sigId', (req, res) => {
    const today = Date.now()
    Round.find({
        $and: [
            { sigId: req.params.sigId },
            { dateTime: { $lt: today } }
        ]
    })
        .sort('-roundNum')
        .limit(1)
        .exec(function (err, round) {
            if (err)
                console.log(err)

            console.log(round)
            const roundID = round._id
            Application.find({ roundID: roundID })
                .populate("username", "_id username")
                .exec(function (err, users) {
                    if (err)
                        console.log(err)

                    console.log(users)
                    //res.send("OK")
                    res.json(users)
                })
        })


})




router.get('/sigs', (req, res) => {

    Sig.find()
        .then((sigs) => {
            //console.log({posts})
            res.json({ sigs })
        }).catch(err => {
            console.log(err)
        })


})


router.put('/users/notselected', (req, res) => {

    Application.updateMany({
        '_id': { $in: req.body.notSelected }
    }, { status: 0 }, function (err, apps) {
        if (err) {
            console.log(err)
        }
        else {
            console.log( apps);
        }
    })

})




router.put('/users/selected', (req, res) => {

    Application.updateMany({
        '_id': { $in: req.body.selected }
    }, { status: 2 }, function (err, apps) {
        if (err) {
            console.log(err)
        }
        else {
            console.log( apps);
        }
    })

})

export default router