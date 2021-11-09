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
            SigDesc,
            instituteId: req.user.instituteName
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
    Club.findOne({ username: req.user.id}, function (err, ClubName  ) {
        if (err) {
            console.log(err);
            return
        }
        Sig.find({ ClubName: ClubName._id, instituteId: req.user.instituteName})
            .populate("ClubName", "_id name")
            .sort('-createdAt')
            .then((sigs) => {
                res.json({sigs})
            }).catch(err => {
                console.log(err)
            })
    });



})

router.delete('/deletesig/:sigId',checklogin,(req,res)=>{

    const id = mongoose.Types.ObjectId(req.params.sigId);
    //console.log(id)
        Sig.findOneAndDelete({ _id:id},function(err,result){
            if(err||!result){
                return res.status(422).json({error:err,result:result,sigId:id})
            }
            else{
                //console.log(result)
                res.status(201).json(result)
            }
        })
})


router.put('/editsig/:sigId',checklogin,(req,res)=>{
    const sig ={
        SigName:req.body.SigName,
        SigDesc:req.body.SigDesc,
    }
    Sig.findOneAndUpdate({ _id:req.params.sigId},sig,none,function(err,sig){
        
            if(err){
                return res.status(422).json({error:err})
            }
            else{
                res.status(201).json(sig)
            }
        })
    }
)


export default router;