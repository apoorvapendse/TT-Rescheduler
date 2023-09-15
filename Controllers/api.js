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
    const array = []
    array.push(...tt.Day1)
    array.push(...tt.Day2)
    array.push(...tt.Day3)
    array.push(...tt.Day4)
    array.push(...tt.Day5)
    res.status(200).json(array)
  }catch(err){
    console.log(err);
    res.status(404).json({})
  }
}

export { getFaculty, getTT };
