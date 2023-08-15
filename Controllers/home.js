import mongoose from 'mongoose'

export const home = (req,res)=>{
    console.log(req.body);
    res.status(200).render("home.ejs")
}