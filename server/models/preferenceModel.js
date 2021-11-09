import mongoose from 'mongoose'
//import RoundSchema from './helper_models/roundSchema'

const sigSchema = mongoose.Schema({
    user :{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'GlobalUser'
    },
    ClubName :{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Club'
    },
    Pref_num : {
        type: Number,
        required: true
    },
    // SigDesc : {
    //     type: String,
    //     required: true
    // },
    // isRecruiting:{
    //     type:Boolean,
    //     default: false
    // },
    instituteId :{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Club'
    },
    //round:[RoundSchema],
    // testLink: 
},{
    timestamps: true
})

const Preference = mongoose.model('Preference', sigSchema)

export default Preference