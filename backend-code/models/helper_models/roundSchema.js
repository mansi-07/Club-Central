import mongoose from 'mongoose'

const RoundSchema = mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    description : {
        type: String
    },
    dateTime: {
        type: Date
    }
},{
    timestamps: true
})

export default RoundSchema