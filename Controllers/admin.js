import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Professors from "../models/Faculty.js";
import timeTables from "../models/TimeTable.js";
import { parse } from "dotenv";

const adminDashGet = (req, res) => {
  res.render("adminDash.ejs");
};

const createFacultyPost = async (req, res) => {
  console.log("Create faculty post called");
  const checkProf = await Professors.findOne({ email: req.body.email });
  if (checkProf) res.json("prof acc already exists");
  else {
    const newProf = new Professors({
      UID: new mongoose.Types.ObjectId(),
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
    });

    newProf
      .save()
      .then((result) => {
        console.log("prof created:", result);
        res.redirect(`/admin/dashboard/${result.UID}`);
      })
      .catch((err) => {
        console.log(err);
        req.json("could not create prof acc");
      });
  }
};

const editTimetabeGet = (req, res) => {
  res.status(200).render("faculty timetable.ejs");
};

const saveTimetablePost = async (req, res) => {
  const prof = await Professors.findOne({ _id: req.params.id })
  if (prof) {
    // getting timetable data
    const data = []
    for (const key in req.body.formData) {
      const day = key.substring(0, 3);
      const time = +key.substring(3, 5);
      const roomID = +req.body.formData[key];
      data.push({day, time, roomID})
    }

    // formatting timetable data
    const parsed = [[],[],[],[],[]]
    const days = ['mon', 'tue', 'wed', 'thu', 'fri']
    data.forEach(lec => {
      for(let i = 0; i < 5; i++){
        if(lec['day'] === days[i])
          parsed[i].push({time:lec['time'], roomID:lec['roomID']})
      }
    })
    const dataObj = {
      Day1: parsed[0],
      Day2: parsed[1],
      Day3: parsed[2],
      Day4: parsed[3],
      Day5: parsed[4],
    }

    // adding it to timetable model
    let tt = await timeTables.findOne({_id:prof.tt})
    if(tt){
      // timetable exists hence fetch data from it
      console.log('timetable exists');

      const updateResult = await timeTables.updateOne({_id: prof.tt}, dataObj)
      if (updateResult.nModified === 1) {
        console.log('Document updated successfully.');
      } else {
        console.log('No document was modified.');
      }
    }
    else{
      tt = new timeTables(dataObj)
      tt.save()
        .then(() => console.log('timetable saved successfully'))
        .catch((err) => console.log("tt not saved"))
    }

    // linking timetable model to prof model
    prof.tt = tt._id
    prof.save()
      .then(() => console.log('saved to prof'))
      .catch((err) => console.log(err))
    console.log(prof.name)
    // everything working as expected till here
    // apoorva take a look here
    // Professors.findOne({ _id: req.params.id })
    //   .populate('tt')
    //   .then(() => console.log('done'))
    //   .catch((err) => console.log(err))
  }

  res.status(200).json("all good");
};

export { adminDashGet, createFacultyPost, editTimetabeGet, saveTimetablePost };
