import jwtDecode from "jwt-decode";
import Professors from "../models/Faculty.js";
import timeTables from "../models/TimeTable.js";
import sendMail from "../mail/mailer.js";

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

  //now sending mails to both of them about this
  const recProf = await Professors.findById(req.body.receiverID);
  const sendProf = await Professors.findById(req.body.senderID);
  console.log("accepted by: ", recProf.email);
  console.log("accepted for :", sendProf.email);

  //sending mail to receiver prof about his room id being null since he accepted the request
  await sendMail(
    recProf.email,
    ` You have given up your slot on ${req.body.day} at ${req.body.time} for room number:${req.body.roomID}<br>Visit <a href="https://ttrs.onrender.com">ttrs</a> to learn more`,
    `Your Timetable has changed`
  );
  await sendMail(
    sendProf.email,
    ` You have been alloted the slot on ${req.body.day} at ${req.body.time} for room number:${req.body.roomID}<br>Visit <a href="https://ttrs.onrender.com">ttrs</a> to learn more`,
    `Your Slot Request has been accepted`
  );

  res.status(200).json("bimbimbambam");
};

const postChangeTimeTable = async (req, res) => {
  console.log(req.body);
};

const profReadonlyTTGet = async (req, res) => {
  res.render("my-timetable");
};

export { profDashGet, profDashPost, postChangeTimeTable, profReadonlyTTGet };
