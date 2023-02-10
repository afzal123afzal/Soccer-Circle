const mongoose = require('mongoose')


module.exports = {
    connectToDb: () => {
        mongoose.connect(process.env.MONGO_URI)
            .then(() => {
                console.log("Connected to db");
                // return cb()
            })
            .catch((error) => {
                console.log(error);
                // return cb(error)

            })
    }
}














// module.exports = {
//     connectToDb: (cb) => {
//         mongoose.connect(process.env.MONGO_URI)
//             .then(() => {
//                 console.log("Connected to db");
//                 return cb()
//             })
//             .catch((error) => {
//                 console.log(error);
//                 return cb(error)

//             })
//     }
// }