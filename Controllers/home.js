import { log } from 'console';
import mongoose from 'mongoose'
import path from 'path'
import bcrypt from 'bcrypt'
import Professors from '../models/Faculty.js';
import Admins from '../models/Admin.js';


const home = (req, res) => {
    console.log(req.body);
    res.status(200).render("index.ejs")
}

// to render loginpage in browser
const userLoginGet = (req, res) => {
    res.status(200).render('login.ejs')
}

// to handle post req from login page
const userLoginPost = async (req, res) => {
    const user = await Professors.findOne({email: req.body.email})
    if(user){
        if(await bcrypt.compare(req.body.password, user.password))
            res.json("login success")
        else
            res.json("password wrong")
    }
    else{
        res.json("user does not exists")
    }
}

const adminLoginGet = (req, res) => {
    res.status(200).render('login.ejs')
}

const adminLoginPost = async (req, res) => {
    const user = await Admins.findOne({email: req.body.email})
    if(user){
        if(await bcrypt.compare(req.body.password, user.password))
            res.json("login success")
        else
            res.json("password wrong")
    }
    else{
        res.json("user does not exists")
    }
}


export {home, userLoginGet, userLoginPost, adminLoginGet, adminLoginPost}