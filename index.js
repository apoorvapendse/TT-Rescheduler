import express from "express";
import dotenv from "dotenv";
import router from "./Router/Router.js";
import { connectDB } from "./database/database.js";
import path from "path";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
//setting up middleware
app.set("view engine", "ejs"); // EJS template engine
app.use(express.json()); // for JSON data
// OR
app.use(express.urlencoded({ extended: true })); //to access data from request bodies
app.use(express.static(path.join(path.resolve(), "public"))); //all css files and images will be in public folder
//to handle data from cookies
app.use(cookieParser());

//to verify whether request sender is the admin

//use router
app.use("/", router);

// const mongoURI = process.env.MONGO_URI;
// const port = process.env.PORT;
// const jwtPassword = process.env.JWT_PASSWD;
// Define a route for 'my-timetable' using  GET method.

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("server is up at ", process.env.PORT);
  });
});
