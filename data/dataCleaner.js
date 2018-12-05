const cities = require('./citiesdata.js');

const clubArray = () => {
    cities.map(async (city) => {
      const response = await fetch(`https://api.foursquare.com/v2/venues/search?client_id=LXVIOUKRYFT2QZAVED2QULSNELFHKTUJZIM21U2QQADH2XPU&client_secret=VMRLTF5IPLQ1ZUCYBSQP3MGRFKSCPS2MNIZOAX1SFMOBYYOD&v=20180323&near='${city.city}, ${city.state}'&categoryId=4bf58dd8d48988d18e941735`)
      const data = await response.json()
      return cleanComedyClubData(data)
    })
  }
  
  const cleanComedyClubData = (comedyClubs) => {
    comedyClubs.response.venues.map((club) => {
      return {
        name: club.name,
        street_address: club.location.address,
        zip_code: club.location.postalCode,
        rating: 0
      }
    })
  }

  module.exports = clubArray