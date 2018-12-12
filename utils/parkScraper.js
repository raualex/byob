const Nightmare = require("nightmare");
const nightmare = Nightmare({ show: true });
const fs = require("fs");
const cities = require("../data/citiesdata");

var cleaner = require("./dataCleaner.js").parkCleaner;

nightmare
  .viewport(1025, 1500)
  .goto("https://www.ultimaterollercoaster.com/coasters/parks/states")
  .evaluate(() => {
    let parks = document.querySelectorAll(".tpList li a");
    let cities = document.querySelectorAll(".tpList li i");

    parks = [].slice.call(parks);
    cities = [].slice.call(cities);

    parks = parks.map(park => park.innerText);
    cities = cities.map(city => city.innerText);

    return [parks, cities];
  })
  .end()
  .then(result => {
    let cleaned = cleaner(result);
    cleaned = cities.map(city => {
      let name = city.city;
      let park = "None";
      if (cleaned[name]) park = cleaned[name].parks;

      city = { ...city, theme_parks: park };
      return city;
    });
    fs.writeFileSync("./data/citiesdata.js", JSON.stringify(cleaned), err => {
      if (err) throw err;
      console.log("file saved");
    });
    console.log(JSON.stringify(cleaned, null, 4));
  })
  .catch(error => console.error("Here is your error", error));
