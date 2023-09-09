import Professors from '../models/Faculty.js'

const getFaculty = async (req, res) => {
  const facultyList = await Professors.find({})
  res.status(200).send(facultyList)
}

export { getFaculty }
