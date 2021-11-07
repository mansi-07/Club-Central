import express from 'express'
const router = express.Router()
import mongoose from 'mongoose'
import checklogin from '../middlewares/authMiddleware.js'
import Post from "../models/postModel.js"
import Club from "../models/clubModel.js"



router.post('/createpost', checklogin, (req, res) => {
    const { title, description, imageLink } = req.body
    if (!title || !description || !imageLink) {
        return res.status(422).json({ error: "Please add all the fields" })
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
            res.status(201).json({ post: result })
        })
            .catch(error => {
                console.log(error)
            })
    });


})

router.get('/clubpost', checklogin, (req, res) => {

    
    Club.findOne({ username: req.user.id }, function (err, club) {
        if (err) {
            console.log(err);
            return
        }
        Post.find({ club: club._id, instituteId: req.user.instituteName })
            .populate("club", "_id name")
            .populate("comments.commentBy", "_id name")
            .sort('-createdAt')
            .then((posts) => {
                //console.log({posts})
                res.json({posts})
            }).catch(err => {
                console.log(err)
            })
    });



})




router.get('/allpost', checklogin, (req, res) => {

    Post.find({ instituteId: req.user.instituteName })
        .populate("club", "_id name")
        .populate("comments.commentBy", "_id name")
        .sort('-createdAt')
        .then((posts) => {
            res.json({ posts })
        }).catch(err => {
            console.log(err)
        })

})



router.put('/comment', checklogin, (req, res) => {
    const comment = {
        commentMessage: req.body.commentMessage,
        commentBy: req.user.id
    }

    Post.findByIdAndUpdate(req.body.postId, {
        $push: { comments: comment }
    }, {
        new: true
    }).populate("comments.commentBy", "_id name")
        .exec((err, result) => {
            if (err) {
                return res.status(422).json({ error: err })
            } else {

                res.json(result)
            }
        })
})


router.delete('/deletepost/:postId', checklogin, (req, res) => {

    const id = mongoose.Types.ObjectId(req.params.postId);
    //console.log(id)
    Post.findOneAndDelete({ _id: id }, function (err, result) {
        if (err || !result) {
            return res.status(422).json({ error: err, result: result, postId: id })
        }
        else {
            //console.log(result)
            res.status(201).json(result)
        }
    })
})


router.put('/editpost/:postId', (req, res) => {
    const post = {
        title: req.body.title,
        description: req.body.description,
    }
    if(req.body.imageLink !== "")
    {
        post.imageLink=req.body.imageLink
    }
    Post.findOneAndUpdate(
        { _id: req.params.postId }, post, null, function (err, post) {

        if (err) {
            return res.status(422).json({ error: err })
        }
        else {
            //console.log(post)
            res.status(201).json(post)
        }
    })
}
)

export default router;
