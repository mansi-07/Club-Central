import mongoose from 'mongoose'

const connectDatabase = async () =>{
    try {
        const dbConnection = await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        console.log(`Database connected:${dbConnection.connection.host}`)
    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit(1)
    }
}

export default connectDatabase