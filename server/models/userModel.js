import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
    username :{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'GlobalUser'
    },
    name : {
        type: String,
        required: true
    },
    rollNo:{
        type:String,
        required:true,
        unique:true
    },
    branch:{
        type:String,
        required:true
    },
    passingYear:{
        type:Number,
        required:true
    },
    resumeLink: {
        type: String,
    }
    // preferences:{
    //     type:
    // }
},{
    timestamps: true
})

const User = mongoose.model('User', UserSchema)

export default User