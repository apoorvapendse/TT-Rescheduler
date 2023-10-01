import jwtDecode from "https://cdn.jsdelivr.net/npm/jwt-decode@3.1.2/+esm";

// fetches the required cookie
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

const profToken = getCookie("proftoken");
const profID = jwtDecode(profToken).id;
const reqList = document.getElementById("req-list");
const approvalList = document.getElementById("approval-list");

// populates the request dropdown
const getData = async () => {
  try {
    // fetching data from db
    let data = await fetch(`/api/get/faculty/${profID}`);
    data = await data.json();

    // creating incoming request dropup down
    data.receivedRequests.forEach((req, i) => {
      const li = document.createElement("li");
      li.innerHTML = `${req.time}
          <button class="btn btn-primary accept" name='${i}' type="button">Accept</button>
          <button class="btn btn-danger" type="button">Deny</button>`;
      reqList.appendChild(li);
    });

    // making a post request on clicking accept button
    const acceptBtn = document.querySelectorAll(".accept");
    console.log(acceptBtn);
    acceptBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        fetch("/prof/dashboard", {
          method: "POST",
          body: JSON.stringify({
            index: btn.name,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
      });
    });

    // creating sent requests dropdown
    // it shows the status of your sent requests
    data.receivedRequests.forEach((req) => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${req.time}
        <button class="btn ${
          req.approved ? "btn-success" : "btn-danger"
        }" type="button" disabled>
          ${req.approved ? "Approved" : "Pending"}
        </button>`;
      approvalList.appendChild(li);
    });
  } catch (err) {
    console.log("tt doesnt exist add new", err);
  }
};
getData();
