import mongoose from 'mongoose'

const instituteSchema = mongoose.Schema({
    name : {
        type: String,
        required: true
    }
},{
    timestamps: true
})

const Institute = mongoose.model('Institute', instituteSchema)

export default Institute