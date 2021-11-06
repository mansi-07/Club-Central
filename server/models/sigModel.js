import mongoose from 'mongoose'
//import RoundSchema from './helper_models/roundSchema'

const sigSchema = mongoose.Schema({
    ClubName :{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Club'
    },
    SigName : {
        type: String,
        required: true
    },
    SigDesc : {
        type: String,
        required: true
    }
    //round:[RoundSchema],
    // testLink: 
},{
    timestamps: true
})

const Sig = mongoose.model('Sig', sigSchema)

export default Sig