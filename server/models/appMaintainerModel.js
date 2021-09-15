import mongoose from 'mongoose'

const AppMaintainerSchema = mongoose.Schema({
    username : {
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
},{
    timestamps: true
})

const AppMaintainer = mongoose.model('AppMaintainer', AppMaintainerSchema)

export default AppMaintainer