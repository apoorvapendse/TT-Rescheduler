async function getRequestSlot(req, res) {
  console.log("slot is requested");
  res.render("reqslot.ejs");
}
async function postRequestSlot(req, res) {
  console.log(req.body);
  res.json(req.body);
}

export { getRequestSlot, postRequestSlot };
