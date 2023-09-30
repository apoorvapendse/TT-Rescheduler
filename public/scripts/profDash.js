import jwtDecode from 'https://cdn.jsdelivr.net/npm/jwt-decode@3.1.2/+esm';

// fetches the required cookie
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
const profToken = getCookie('proftoken')
const profID = jwtDecode(profToken).id
const reqList = document.getElementById('req-list')

const getData = async () => {
  try {
    let data = await fetch(`/api/get/faculty/${profID}`)
    data = await data.json()
    console.log(data);
    data.receivedRequests.forEach((req, i) => {
      const li = document.createElement('li')
      li.innerHTML = `${req.time}
          <button class="btn btn-primary accept" name='${i}' type="button">Accept</button>
          <button class="btn btn-danger" type="button">Deny</button>`
      reqList.appendChild(li);
    })

    const acceptBtn = document.querySelectorAll('.accept')
    console.log(acceptBtn)
    acceptBtn.forEach(btn => {
      btn.addEventListener('click', () => {
        fetch('/prof/dashboard', {
          method: 'POST',
          body: JSON.stringify({
            index: btn.name
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        })
      })
    })
  } catch (err) {
    console.log('tt doesnt exist add new', err);
  }
}
getData()

