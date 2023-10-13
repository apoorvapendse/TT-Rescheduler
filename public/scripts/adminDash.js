import { home } from "../../Controllers/auth";

console.log("hello");

let data = [];
async function getAllProfs() {
  const response = await fetch("/api/get/faculty");
  data = await response.json();
  console.log(data);
}
const list = document.querySelector(".profList");

function displayProfData() {
  console.log(data);
  console.log(list);
  data.forEach((item) => {
    console.log(item);
    const newProfItem = document.createElement("li");
    newProfItem.style.margin = "12px auto";
	  newProfItem.style.color = "white";
	  newProfItem.style.fontWeight = "bold";
	  newProfItem.style.textDecoration = "none";	
    newProfItem.innerHTML = `<a href="/admin/dashboard/${item.id}">Name:${item.name}  Email:${item.email}</a>`;

    newProfItem.addEventListener("click", async () => {
      console.log("clicked");
      await localStorage.setItem("profID", item.id);
    });
    list.append(newProfItem);
  });
}
// event listener for the "Home" button 
 // document.getElementById('home').addEventListener('click', function() {
 // window.location.href = '/index.ejs';
//});
home.addEventListener("click", function () {
  // Redirect to the Express.js route that renders the EJS template
  window.location.href = "/index"; 
});

about.addEventListener("click", function () {
  // Redirect to the Express.js route that renders the EJS template
  window.location.href = "/About"; 
});



getAllProfs()
  .then(() => {
    displayProfData();
  })
  .catch((err) => console.log(err));
