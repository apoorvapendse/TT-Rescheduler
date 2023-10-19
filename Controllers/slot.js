import jwtDecode from "jwt-decode";
import nodeNotifier from "node-notifier";
import Professors from "../models/Faculty.js";
import timeTables from "../models/TimeTable.js";

async function getRequestSlot(req, res) {
  console.log("slot is requested");
  res.render("reqslot.ejs");
}

function getDay(day) {
  switch (day) {
    case "mon":
      return 1;
      break;

    case "tue":
      return 2;
      break;

    case "wed":
      return 3;
      break;

    case "thu":
      return 4;
      break;

    case "fri":
      return 5;
      break;

    default:
      break;
  }
}
async function postRequestSlot(req, res) {
  console.log(req.body);
  const profToken = req.cookies.proftoken;
  const senderProfID = jwtDecode(profToken).id;

  const senderProf = await Professors.findById(senderProfID);

  if (senderProf) {
    senderProf.sentRequests.push({
      time: req.body.time,
      roomID: req.body.roomID,
      day: req.body.day,
      approved: false,
      senderProfID: senderProfID,
    });

    senderProf.save();

    //searching for the prof who actually has that time slot on his name
    //$or will search in every day
    let receiverProfTT;
    let desiredTime = +req.body.time;
    let desiredRoom = +req.body.roomID;
    let desiredDay = getDay(req.body.day);
    console.log("Desired day is:", desiredDay);

    let dayTime = `Day${desiredDay}.time`;
    let dayRoom = `Day${desiredDay}.roomID`;

    // Construct the query
    const query = {
      $and: [{ [dayTime]: desiredTime }, { [dayRoom]: desiredRoom }],
    };

    // Perform the query
    const profTT = await timeTables.findOne(query);
    if (profTT) {
      const receiverProf = await Professors.findById(profTT.associateProfID);
      console.log(receiverProf);
      receiverProf.receivedRequests.push({
        roomID: req.body.roomID,
        time: req.body.time,
        day: req.body.day,
        approved: false,
        senderProfID: senderProfID,
      });
      receiverProf.save();
      nodeNotifier.notify("Request sent successfully");
      res.status(200).render("reqslot.ejs");
    } else {
      nodeNotifier.notify("No slot found");
      res.status(200).render("reqslot.ejs")
    }

    return;
  }
  res.json("something went wrong");
}

export { getRequestSlot, postRequestSlot };
