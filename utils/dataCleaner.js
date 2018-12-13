function parkCleaner(info) {
  let parks = info[0];
  let cities = info[1];
  let cleaned = parks.reduce((acc, park, index) => {
    let city = cities[index];
    if (acc[city]) {
      let parks = [acc[city].parks];
      acc[city] = { parks: [...parks, park] };
    }

    acc[city] = { parks: park };

    return acc;
  }, {});

  return cleaned;
}

module.exports.parkCleaner = parkCleaner;
