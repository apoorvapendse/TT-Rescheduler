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
    data.receivedRequests.forEach(async (req, i) => {
      console.log("received requests:", req);

      let suffix = "";
      if (+req.time >= 8 && +req.time <= 11) {
        suffix = "AM";
      } else {
        suffix = "PM";
      }
      if (!req.approved) {
        const li = document.createElement("li");

        li.innerHTML = `Time:${req.time} ${suffix}<br>Day:${req.day}<br>Room:${req.roomID}<br>
        <button class="btn btn-primary accept" name='${i}' senderID=${req.senderProfID} receiverID=${profID} day=${req.day} time=${req.time} room=${req.roomID} type="button">Accept</button>
        <button class="btn btn-danger" type="button">Deny</button><hr>`;
        reqList.appendChild(li);
      }
    });

    // making a post request on clicking accept button
    const acceptBtn = document.querySelectorAll(".accept");
    console.log(acceptBtn);
    console.log(data.receivedRequests);
    acceptBtn.forEach((btn, i) => {
      btn.addEventListener("click", async (event) => {
        const senderID = event.target.getAttribute("senderID");
        const receiverID = event.target.getAttribute("receiverID");
        const day = event.target.getAttribute("day");
        const time = event.target.getAttribute("time");
        const roomID = event.target.getAttribute("room");
        let postData = {
          senderID,
          receiverID,
          index: btn.name,
          day: day,
          time: time,
          roomID,
        };
        console.log("postData:", postData);

        await fetch("/prof/dashboard", {
          method: "POST",
          body: JSON.stringify(postData),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });

        // console.log(data);
        // const requestOptions = {
        //   method: "POST", // Specify the HTTP method
        //   headers: {
        //     "Content-Type": "application/json", // Set the content type of the request body
        //     // Add any other headers if needed, e.g., authorization headers
        //   },
        //   body: JSON.stringify(data), // Convert the data to JSON format and set it as the request body
        // };
        // await fetch(`/api/post/faculty/change-time-table`, requestOptions);
      });
    });

    // creating sent requests dropdown
    // it shows the status of your sent requests
    data.receivedRequests.forEach((req) => {
      let suffix = "";
      if (+req.time >= 8 && +req.time <= 11) {
        suffix = "AM";
      } else {
        suffix = "PM";
      }
      const li = document.createElement("li");
      li.innerHTML = `
        ${req.time} ${suffix}<br>Day:${req.day}<br>Room:${req.roomID}<br>
        
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
