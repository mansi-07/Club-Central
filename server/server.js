import express from 'express'
import dotenv from 'dotenv'
import connectDatabase from './configurations/databaseConfig.js'
import authRoutes from './routes/authRoutes.js'
import postRoutes from './routes/postRoutes.js'
import sigRoutes from './routes/SigRoutes.js'
import userRoutes from './routes/userRoutes.js'
import clubRoutes from './routes/clubRoutes.js'
import recsRoutes from './routes/recsRoutes.js'
import superadminRoutes from './routes/superadminRoutes.js'
dotenv.config()

await connectDatabase()

const app = express()

app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb'}));



app.use('/api/auth', authRoutes)
app.use('/api/post',postRoutes)
app.use('/',sigRoutes)
app.use('/api/recs', recsRoutes)
app.use('/api/user', userRoutes)
app.use('/api/club', clubRoutes)
app.use('/api/superadmin', superadminRoutes)


const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
);