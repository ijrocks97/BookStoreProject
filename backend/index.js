import express from "express";
import { PORT , mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModels.js";
import booksroutes from './routes/bookroutes.js'
import cors from "cors";

const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS policy
//option-1: Allow all Origins with Default of cors(*)
app.use(cors());

//option-2 : Allow custom Origins
// app.use(cors({
//     origin: "http://localhost:5173",
//     methods:['GET','PUT','POST','DELETE'],
//     allowedHeaders:['Content-Type'],
// }
// ));

app.get("/",(request,response)=>{
    console.log(request);
    return response.status(234).send("welcome to mer stack")
});

app.use("/books", booksroutes );

mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log("App connected to databse");
        app.listen(PORT, () =>{
            console.log(`The server is running on port ${PORT}`);
        });
    }).catch((error)=>{
        console.log(error);
    });


