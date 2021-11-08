import mongoose from 'mongoose'

const ClubSchema = mongoose.Schema({
    username :{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'GlobalUser'
    },
    name : {
        type: String,
        required: true
    },
    isExclusive:{
        type:Boolean,
        default: false
    },
    isRecruiting:{
        type:Boolean,
        default: false
    },
},{
    timestamps: true
})

const Club = mongoose.model('Club', ClubSchema)

export default Club