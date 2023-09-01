import { log } from 'console';
import mongoose from 'mongoose'
import path from 'path'


const home = (req, res) => {
    console.log(req.body);
    res.status(200).render("home.ejs")
}

const loginPage = (req, res) => {
    const url = new URL(import.meta.url);
    const basePath = path.dirname(url.pathname);
    const options = {
        root: path.join(basePath, '../views')
    };
    res.status(200).sendFile('login.html', options)
}

const auth = (req, res) => {
    console.log(req.body.email, req.body.password)

}

export {home, loginPage, auth}