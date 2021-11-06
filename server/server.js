import express from 'express'
import dotenv from 'dotenv'
import connectDatabase from './configurations/databaseConfig.js'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import clubRoutes from './routes/clubRoutes.js'

dotenv.config()

await connectDatabase()

const app = express()

app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/club', clubRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
);