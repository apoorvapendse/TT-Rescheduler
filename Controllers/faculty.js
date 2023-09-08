const profDashGet = (req, res) => {
  res.status(200).render("prof_dashboard.ejs");
};

export {
  profDashGet
}