import express from 'express'
const router = express.Router()
import mongoose from 'mongoose'
import checklogin from '../middlewares/authMiddleware.js'
import Sig from "../models/sigModel.js"
import Club from "../models/clubModel.js"



router.post('/addsig', checklogin, (req, res) => {
    const { SigName, SigDesc} = req.body
    if (!SigName || !SigDesc) {
        return res.status(422).json({ error: "Please add all the fields" })
    }

    Club.findOne({ username: req.user.id }, function (err, ClubName) {
        if (err) {
            console.log(err);
            return
        }
    //     console.log(req.user)
    //     res.send("ok")
    //    console.log(clubname)
        const sig = new Sig({
            ClubName,
            SigName,
            SigDesc
            // instituteId: req.user.instituteName
        })
        sig.save().then(result => {
            res.json({ sig: result })
        })
            .catch(error => {
                console.log(error)
            })
    });


})

router.get('/viewsig',checklogin,(req, res) => {

    
    Club.findOne({ username: req.user.id}, function (err, sig) {
        if (err) {
            console.log(err);
            return
        }
        Sig.find({ sig: sig._id, instituteId: req.user.instituteName})
            .populate("sigs", "_id name")
            .sort('-createdAt')
            .then((sigs) => {
                res.json({sigs})
            }).catch(err => {
                console.log(err)
            })
    });



})



// router.get('/allpost',checklogin,(req, res) => {

    
//     Club.findOne({ username: req.user.id }, function (err, club) {
//         if (err) {
//             console.log(err);
//             return
//         }
//         Post.find({ club: club._id})
//             .populate("club", "_id name")
//             .populate("comments.commentBy", "_id name")
//             .sort('-createdAt')
//             .then((posts) => {
//                 res.json({posts})
//             }).catch(err => {
//                 console.log(err)
//             })
//     });



// })



// router.put('/comment',checklogin,(req,res)=>{
//     const comment={
//         commentMessage:req.body.commentMessage,
//         commentBy:req.user._id
//     }

//     Post.findByIdAndUpdate(req.body.postId,{
//         $push:{comments:comment}
//     },{
//         new:true
//     }).populate("comments.commentBy","_id name")
//     .exec((err,result)=>{
//         if(err){
//             return res.status(422).json({error:err})
//         }else{
//             res.json(result)
//         }
//     })
// })

export default router;
