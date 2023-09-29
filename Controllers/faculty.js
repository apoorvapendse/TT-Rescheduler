import jwtDecode from "jwt-decode";


const profDashGet = (req, res) => {
  res.status(200).render("prof_dashboard.ejs");
};

const profDashPost = (req, res) => {
  console.log(req.body);
  try{
    const proftoken = jwtDecode(req.cookies.proftoken)
    
  }catch(err){console.log(err);}
  if(proftoken){
    console.log(proftoken);

  }

  res.status(200).json("bimbimbambam");
};

export { profDashGet, profDashPost };
