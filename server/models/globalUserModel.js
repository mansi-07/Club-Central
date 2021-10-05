import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const globalUserSchema = mongoose.Schema({
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
    instituteName:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Institute'
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isSuperAdmin:{
        type:Boolean,
        default:false
    }
},{
    timestamps: true
})

globalUserSchema.methods.passwordVerification = async function(enteredPassword){
    
    return await bcrypt.compare(enteredPassword, this.password)
}

// @Job : encrypt the password before we save them in the database
globalUserSchema.pre(
    'save', 
    async function (next) {
        if(!this.isModified('password')){
            next();
        }
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }
)


const GlobalUser = mongoose.model('GlobalUser', globalUserSchema)

export default GlobalUser