import express from 'express'
import dotenv from 'dotenv'
import router from './Router/Router.js';
import {connectDB} from './database/database.js';
import path from 'path'
dotenv.config();

const app = express();
//setting up middleware
app.use(express.urlencoded({extended:true}));//to access data from request bodies
app.use(express.static(path.join(path.resolve(), "public")));//all css files and images will be in public folder 

//use router
app.use("/",router);


connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("server is up at ", process.env.PORT)
    })
})

