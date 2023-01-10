require('dotenv').config()
const express = require('express')
const { default: mongoose } = require('mongoose')
const db = require('./config/dbConnect')
const adminRouter = require('./routes/adminRouter')
const playerRouter = require('./routes/playerRouter')
const clubRouter = require('./routes/clubRouter')
const cors = require('cors')
mongoose.set('strictQuery', false); //To remove deprecation warning


/////  express app
const app = express()

//////////middleware
app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

/////////////
cb = (error) => {
    if (!error) {
        app.listen(process.env.PORT, () => {
            console.log("listening to the port", process.env.PORT);
        })
    }
}

/////connect to Db
db.connectToDb(cb)



//////// routes
app.use('/admin', adminRouter)
app.use('/api/player', playerRouter)
app.use('/api/club', clubRouter)

