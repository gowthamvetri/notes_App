import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectdb from './config/connectdb.js'
import userRout from './routs/user.route.js'
import notesRoute from './routs/notes.route.js'

dotenv.config()
const app = express()


app.use(express.json())

app.use(cors({
    origin:"*"
}))

connectdb().then(()=>{
    app.listen(8000,()=>{
    console.log("Server is running")
})}
)

app.get('/',(req,res)=>{
    return res.json({
        message : "Hello from Server"
    })
})

app.use('/api/user',userRout)
app.use('/api/notes',notesRoute)