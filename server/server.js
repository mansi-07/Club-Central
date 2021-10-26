import express from 'express'
import dotenv from 'dotenv'
import connectDatabase from './configurations/databaseConfig.js'
import authRoutes from './routes/authRoutes.js'
import postRoutes from './routes/postRoutes.js'

dotenv.config()

await connectDatabase()

const app = express()

app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb'}));



app.use('/api/auth', authRoutes)
app.use('/',postRoutes)


const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
);