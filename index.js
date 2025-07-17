const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
var cors = require('cors')

const connectToMongoose = require('./db'); // if this connects to MongoDB
connectToMongoose();


app.use(express.json())
app.use(cors())

app.use("/api/user", require("./routes/user"))
app.use("/api/number", require("./routes/number"))
app.use("/api/auth", require("./routes/auth"))

app.get('/', (req, res) => {
  res.send('Hello, Backend running!');
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});