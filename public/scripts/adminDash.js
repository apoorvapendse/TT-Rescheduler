let data = [];
async function getAllProfs() {
  const response = await fetch("/api/get/faculty");
  data = await response.json();
}
const list = document.querySelector(".profList");

function displayProfData() {
  data.forEach((item) => {
    const newProfItem = document.createElement("li");
    newProfItem.style.margin = "12px auto";
    newProfItem.style.color = "white";
    newProfItem.style.fontWeight = "bold";
    newProfItem.style.textDecoration = "none";
    newProfItem.innerHTML = `<a href="/admin/dashboard/${item.id}">Name:${item.name}  Email:${item.email}</a>`;

    newProfItem.addEventListener("click", async () => {
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
  window.location.href = "/";
});

getAllProfs()
  .then(() => {
    displayProfData();
  })
  .catch((err) => console.log(err));
