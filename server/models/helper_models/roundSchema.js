import mongoose from 'mongoose'



const RoundSchema = mongoose.Schema({

    roundNum : {

        type: Number,

        required: true

    },

    sigId:{

        type: mongoose.Schema.Types.ObjectId,

        required: true,

        ref: 'Sig'

    },

    description : {

        type: String

    },

    dateTime: {

        type: Date,

        required:true

    }

    },{

        timestamps: true

})



const Round = mongoose.model('Round', RoundSchema)



export default Round