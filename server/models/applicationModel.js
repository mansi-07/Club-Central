import mongoose from 'mongoose'

const ApplicationSchema = mongoose.Schema({
    username :{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'GlobalUser'
    },
    sigID :{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Sig'
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