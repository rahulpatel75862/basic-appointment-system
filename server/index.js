import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/authRoutes.js'
import appointmentRoutes from './routes/appointmentRoutes.js'

dotenv.config()
const app = express();

app.use(express.json());
app.use('/api', userRoutes)
app.use('/api', appointmentRoutes)

const PORT = process.env.PORT || 8000;



app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
