import jwtDecode from "jwt-decode";
import Professors from "../models/Faculty.js";
import timeTables from "../models/TimeTable.js";

const profDashGet = (req, res) => {
  res.status(200).render("prof_dashboard.ejs");
};

const profDashPost = async (req, res) => {
  console.log("inside profDashPost line number 9:", req.body);
  const profID = jwtDecode(req.cookies.proftoken).id;

  try {
    const prof = await Professors.findOne({ _id: profID });
    prof.receivedRequests[req.body.index].approved = true;
    prof.save();
  } catch (err) {
    console.log(err);
  }

  //swapping the timetables
  let dayIndex;
  let targetTime = req.body.time;
  switch (req.body.day) {
    case "mon":
      dayIndex = 0;
      break;
    case "tue":
      dayIndex = 1;
      break;
    case "wed":
      dayIndex = 2;
      break;
    case "thu":
      dayIndex = 3;
      break;
    case "fri":
      dayIndex = 4;
      break;

    default:
      break;
  }

  let dayQuery = `Day${dayIndex + 1}`;
  console.log("Day Query is :", dayQuery);
  //now i have the index of the day

  const receiverProfTimeTable = await timeTables.findOne({
    associateProfID: req.body.receiverID,
  });
  let recProfSwapDay = receiverProfTimeTable[dayQuery];
  recProfSwapDay.forEach((slot) => {
    if (slot.time == targetTime) {
      slot.roomID = -1;
    }
  });
  receiverProfTimeTable.save();

  console.log(req.body.senderID);
  const senderProfTimeTable = await timeTables.findOne({
    associateProfID: req.body.senderID,
  });
  if (senderProfTimeTable) {
    let senderProfSwapDay = senderProfTimeTable[dayQuery];
    senderProfSwapDay.forEach((slot) => {
      if (slot.time == targetTime) {
        console.log(slot);
        slot.roomID = req.body.roomID;
      }
    });
  }
  senderProfTimeTable.save();

  res.status(200).json("bimbimbambam");
};

const postChangeTimeTable = async (req, res) => {
  console.log(req.body);
};

const profReadonlyTTGet = async (req, res) => {
  res.render("my-timetable");
};

export { profDashGet, profDashPost, postChangeTimeTable, profReadonlyTTGet };
