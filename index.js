const express = require("express")
const app = express()
const bodyParser = require('body-parser');
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()
const port = process.env.PORT || 8000
 
// IMPORT ROUTES
const routes = require("./routes/Tweet.Route")
const register = require("./routes/UserRoute") 



// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
app.use("/api/",routes)
app.use("/api/accounts/",register)




// MONGODB CONNECTION
mongoose.connect(process.env.CONNECTION_STRING,
  {
    useNewUrlParser: true,
  }
).then(()=>{
    console.log("connected")
});

// RUN SERVER
app.listen(port,()=>{
    console.log(`sever running on port ${port}`)
})