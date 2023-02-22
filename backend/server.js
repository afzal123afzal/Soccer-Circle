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
// cb = (error) => {
//     if (!error) {
//         app.listen(process.env.PORT, () => {
//             console.log("listening to the port", process.env.PORT);
//         })
//     }
// }



/////connect to Db
// db.connectToDb(cb)
db.connectToDb()

const server = app.listen(process.env.PORT, () => {
    console.log("listening to the port", process.env.PORT);
})



//////// routes
app.use('/admin', adminRouter)
app.use('/api/player', playerRouter)
app.use('/api/club', clubRouter)

// Making Build Folder as Public
app.use(express.static(path.join(__dirname, '../frontend/build/')));

// for server
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
  });
  


const io = require("socket.io")(server, {
    cors: {
        origin: "https://soccercircle.live"
    },
});

let activeUsers = []

io.on("connection", (socket) => {

    /////add new User
    socket.on('new-user-add', (newUserId) => {
        ///// if user is not added previously
        if (!activeUsers.some((user) => user.userId === newUserId)) {
            activeUsers.push({
                userId: newUserId,
                socketId: socket.id
            })
        }
        // send all active users to new user
        console.log("Connected Users",activeUsers);
        io.emit("get-users", activeUsers);
    })

    // send message to a specific user
  socket.on("send-message", (data) => {
    const { receiverId } = data;
    const user = activeUsers.find((user) => user.userId === receiverId);
    console.log("Sending from socket to :", receiverId)
    console.log("Data: ", data)
    if (user) {
      io.to(user.socketId).emit("receive-message", data);
    }
  });

    socket.on("disconnect", () => {
        // remove user from active users
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
        console.log("User Disconnected", activeUsers);
        // send all active users to all users
        io.emit("get-users", activeUsers);
    });
})
