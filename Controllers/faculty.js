const profDashGet = (req, res) => {
  res.status(200).render("prof_dashboard.ejs");
};

const profDashPost = (req, res) => {
  console.log(req.body);
  res.send("bimbimbambam");
};

export { profDashGet, profDashPost };
