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
    newProfItem.innerText = `Name:${item.name}  Email:${item.email}`;
    list.append(newProfItem);
  });
}

getAllProfs()
  .then(() => {
    displayProfData();
  })
  .catch(err => console.log(err));
