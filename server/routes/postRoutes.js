import express from 'express'
const router = express.Router()
import mongoose from 'mongoose'
import checklogin from '../middlewares/authMiddleware.js'
import Post from "../models/postModel.js"
import Club from "../models/clubModel.js"



router.post('/createpost', checklogin, (req, res) => {
    const { title, description, imageLink } = req.body
    if (!title || !description || !imageLink) {
        return res.status(422).json({ error: "Plase add all the fields" })
    }

    Club.findOne({ username: req.user.id }, function (err, club) {
        if (err) {
            console.log(err);
            return
        }
        //console.log(club)
        const post = new Post({
            title,
            imageLink,
            description,
            club,
            instituteId: req.user.instituteName
        })
        post.save().then(result => {
            res.json({ post: result })
        })
            .catch(error => {
                console.log(error)
            })
    });


})

router.get('/allpost',checklogin,(req, res) => {

    
    Club.findOne({ username: req.user.id }, function (err, club) {
        if (err) {
            console.log(err);
            return
        }
        Post.find({ club: club._id})
            .populate("club", "_id name")
            .populate("comments.commentBy", "_id name")
            .sort('-createdAt')
            .then((posts) => {
                res.json({posts})
            }).catch(err => {
                console.log(err)
            })
    });



})



router.put('/comment',checklogin,(req,res)=>{
    const comment={
        commentMessage:req.body.commentMessage,
        commentBy:req.user._id
    }

    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    }).populate("comments.commentBy","_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

export default router;
