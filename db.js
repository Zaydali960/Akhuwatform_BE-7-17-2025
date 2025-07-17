const mongoose = require('mongoose')

const URI = "mongodb+srv://akhuwat:mLt4ILQysqoBhBZb@cluster0.vqo8y6s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.set("strictQuery", false);
const connectToMongoose = () => mongoose.connect(URI, () => {
    console.log("Connected to Mongo Successfully")
})

module.exports = connectToMongoose

