import jwtDecode from "jwt-decode";
import Professors from "../models/Faculty.js";

async function getRequestSlot(req, res) {
  console.log("slot is requested");
  res.render("reqslot.ejs");
}
async function postRequestSlot(req, res) {
  console.log(req.body);
  const profToken = req.cookies.proftoken;
  const senderProfID = jwtDecode(profToken).id;

  const senderProf = await Professors.findById(senderProfID);

  if (senderProf) {
    senderProf.sentRequests.push({
      time: req.body.time,
      day: req.body.day,
      approved: false,
    });

    senderProf.save();
    res.send("<h1>Request sent successfully</h1>");
    return
  }
  res.json("something went wrong");
}

export { getRequestSlot, postRequestSlot };
