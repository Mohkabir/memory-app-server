import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import postRouter from "./routes/post.js";
import usersRouter from "./routes/users.js";


const app = express();

app.use(bodyParser.json({ limit : "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit : "30mb", extended: true}));
app.use(cors());

app.get("/", (req, res) => {
  res.status(400).send({
    message: "Welcome to memory app backend"
  });
})

app.use( "/posts", postRouter);
app.use( "/users", usersRouter);

// mongo db 


const CONNECTION_URL = process.env.MONGODB_CONECTION;

const PORT = process.env.PPORT || 5000 ;

mongoose.connect("mongodb://localhost/memoryapp",{ useNewUrlParser: true, useUnifiedTopology: true})
.then( ()=> app.listen(PORT, ()=> {
  console.log(`server running on port ${PORT}`)
}))
.catch((error)=> console.log(error.message));


// mongoose.connect(CONNECTION_URL , { useNewUrlParser: true, useUnifiedTopology: true})
// .then( ()=> app.listen(PORT, ()=> {
//   console.log(`server running on port ${PORT}`)
// }))
// .catch((error)=> console.log(error.message));

// mongoose.set( "useFindAndModify", false );

