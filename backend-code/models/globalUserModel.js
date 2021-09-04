import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const globalUserSchema = mongoose.Schema({
    username : {
        type: String,
        required: true,
        unique: true,
        index: true
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
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    },
    isSuperAdmin:{
        type:Boolean,
        required:true,
        default:false
    },
},{
    timestamps: true
})

globalUserSchema.methods.passwordVerification = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

globalUserSchema.pre(
    'save', 
    async function (next) {
        if(!this.isModified('password')){
            next()
        }

        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    }
)

const GlobalUser = mongoose.model('GlobalUser', globalUserSchema)

export default GlobalUser