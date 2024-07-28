const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const cors=require('cors')
const mongoose=require('mongoose')

const authenticationRoutes=require('./routes/authentication')
const authorisedRoutes=require('./routes/authorized')
const mongoConfig=require('./config/mongoDB.config')

const port = process.env.PORT || 5000;

mongoose.connect(mongoConfig.url)

app.use(cors())
app.use(bodyParser.json({limit:'50mb',extended:true}))
app.use(express.json())


app.use('/authentication',authenticationRoutes)
app.use('/',authorisedRoutes)



app.listen(port)

