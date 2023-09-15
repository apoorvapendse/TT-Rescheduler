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
    console.log(tt);
    res.status(200).json({tt: [tt.Day1, tt.Day2, tt.Day3, tt.Day4, tt.Day5]})
  }catch(err){
    console.log(err);
    res.status(404).json({})
  }
}

export { getFaculty, getTT };
