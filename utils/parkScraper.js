const Nightmare = require("nightmare");
const nightmare = Nightmare({ show: true });
const fs = require("fs");

nightmare
  .viewport(1025, 1500)
  .goto("https://www.ultimaterollercoaster.com/coasters/parks/states")
  .evaluate(() => {
    let state = document.querySelectorAll("h3.new");
    state = [].slice.call(state);

    state = state.map(location => location.innerText);

    return state;
  })
  .end()
  .then(result => {
    console.log(JSON.stringify(result, null, 4));
  })
  .catch(error => console.error("Here is your error", error));
