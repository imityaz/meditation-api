const express = require("express");
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}))
const cors = require('cors');
const connectDB = require("./db/conn")
const PORT = process.env.PORT || 5000;

const userRoutes = require("./routes/userRoutes")
const communityRoutes = require("./routes/communityRoutes")
app.use(cors({
    origin: 'https://meditation-12aaf.firebaseapp.com',
    optionsSuccessStatus: 200,
  }));
app.use("/api/user", userRoutes);
app.use("/api/community", communityRoutes);

const start = async()=>{
    console.log("database ", process.env.DATABASE);
  try{
    await connectDB(process.env.DATABASE_ATLAS)
    app.listen(PORT, () =>{
      console.log(`${PORT} yes i am connected`);
    });
  } catch (error) {
    console.log(error)
  }
}

start();