import mongoose from 'mongoose'

const EventSchema = mongoose.Schema({
    instituteID :{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Institute'
    },
    clubID :{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'GlobalUser'
    },
    endDate: {
        type: Date
    },
    startDate: {
        type: Date
    },
    name: {
        type: String
    }
},{
    timestamps: true
})

const Event = mongoose.model('Event', EventSchema)

export default Event