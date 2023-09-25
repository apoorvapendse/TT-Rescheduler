import Professors from "../models/Faculty.js";
import timeTables from "../models/TimeTable.js";

const getFaculty = async (req, res) => {
  try {
    const facultyList = await Professors.find({});

    const safeInfo = facultyList.map((item) => {
      let { name, email, _id } = item;
      // const safeobj = { name: name, email: email };
      const safeobj = { id: _id, name: name, email: email };
      return safeobj;
    });
    res.status(200).send(safeInfo);
  } catch (error) {
    console.log(error);
  }
};

const getTT = async (req, res) => {
  try{
    const prof = await Professors.findOne({_id: req.params.facultyId})
    const tt = await timeTables.findOne({_id: prof.tt})
    // the array needs to be sorted by time not day
    const array = []
    const days = ['Day1', 'Day2', 'Day3', 'Day4', 'Day5'];
    for(let i = 0; i < 10; i++){
      days.forEach(day => {
        array.push(tt[day][i])
      })
    }
    res.status(200).json(array)
  }catch(err){
    res.status(404).json({'success': false })
  }
}

const getFacultyById = async (req, res) => {
  try{
    const prof = await Professors.findOne({_id: req.params.id})
    res.status(200).json(prof)
  }catch(err){
    res.status(404).json({'success': false })
  }
}

export { getFaculty, getTT, getFacultyById };
