import mongoose from 'mongoose'

const ApplicationSchema = mongoose.Schema({
    username :{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    sigID :{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Sig'
    },
    clubName : {
        type: String
    },
    status :{
        roundID : {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Round'
        },
        status :{
            type: Number
        }
    }
},{
    timestamps: true
})

const Application = mongoose.model('Application', ApplicationSchema)

export default Application