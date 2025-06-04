import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import AuthRoutes from './src/routes/auth.routes.js'
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/auth', AuthRoutes)
const port = process.env.PORT

app.get('/', (req, res)=>{
    res.send("Om Shree Ganeshay Namaha")
})

app.listen(port, ()=>{
    console.log("Om Shree Ganeshay Namaha")
    console.log(`Port is listening at http://localhost:${port}`)
})