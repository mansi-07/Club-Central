import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

connectDatabase()

const app = express()

app.use(express.json())


const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
);