import Professors from "../models/Faculty.js";

const getFaculty = async (req, res) => {
  try {
    const facultyList = await Professors.find({});

    const safeInfo = facultyList.map((item) => {
      let { name, email } = item;
      const safeobj = { name: name, email: email };
      return safeobj;
    });
  } catch (error) {
    console.log(error);
  }
  res.status(200).send(safeInfo);
};

export { getFaculty };
