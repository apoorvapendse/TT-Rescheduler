import jwtDecode from "https://cdn.jsdelivr.net/npm/jwt-decode@3.1.2/+esm";

// fetches the required cookie
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

const profToken = getCookie("proftoken");
const profID = jwtDecode(profToken).id;

const form = document.querySelector("form");

const getData = async () => {
  let i = 0;

  try {
    let data = await fetch(`/api/get/${profID}`);
    data = await data.json();
    console.log(data);
    form.querySelectorAll("input").forEach((input) => {
      input.value = data[i++].roomID;
    });
  } catch (err) {
    console.log("tt doesnt exist add new");
  }
};
getData();
