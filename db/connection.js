const mongoose = require('mongoose')

const connectionString = process.env.DATABASE

mongoose.connect(connectionString, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log("MongoDB Atlas connected successfully");
}).catch((err) => {
    console.log(`MongoDB Atlas connection error : ${err}`);
})