import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
    club :{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Club'
    },
    title : {
        type: String,
        required: true
    },
    description : {
        type: String
    },
    imageLink : {
        type: String
    },
    comments : {
        commentMessage: {type: String, required: true},
        commentBy: {type: mongoose.Schema.Types.ObjectId, required: true, ref: GlobalUser},
        commentAt: {type: Date, default: Date.now}
    }
},{
    timestamps: true
})

const Post = mongoose.model('Post', postSchema)

export default Post