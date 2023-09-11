import Professors from "../models/Faculty.js";

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

export { getFaculty };
