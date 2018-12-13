const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const environment = process.env.NODE_ENV || "development";
const config = require("./knexfile")[environment];
const database = require("knex")(config);
const app = express();

app.use(bodyParser.json(), cors());
app.set("port", process.env.PORT || 3000);
app.locals.title = "BYOB";
app.use(express.static("./dev-docs/build"));

app.get("/api/v1/cities", (request, response) => {
  if (request.query.city) {
    let nameQuery = request.query.city;

    database("cities")
      .where("city", nameQuery)
      .select()
      .then(city => {
        response.status(200).json(city);
      });
  } else {
    database("cities")
      .select()
      .then(cities => {
        response.status(200).json(cities);
      })
      .catch(error => {
        response.status(500).json({ error: error.message });
      });
  }
});

app.patch(
  "/api/v1/cities/:id",
  (request, response, next) => {
    const tourism_website = request.body;

    let missingProp = [];

    for (let requiredParam of ["tourism_website"]) {
      if (!tourism_website[requiredParam]) {
        missingProp = [...missingProp, requiredParam];
      }
    }

    if (!missingProp.length) next("route");
    else next();
  },
  function(request, response, next) {
    response.status(415).json({ error: error.message });
  }
);

app.patch("/api/v1/cities/:id", (request, response, next) => {
  const { id } = request.params;
  const tourism_website = request.body;
  database("cities")
    .where("id", id)
    .update({ tourism_website })
    .then(row => {
      response
        .status(201)
        .json(
          `City ${id}'s website has been updated to ${
            tourism_website.tourism_website
          }`
        );
    })
    .catch(error => {
      response.status(500).json({ error: error.message });
    });
});

app.post("/api/v1/cities", (request, response) => {
  const city = request.body;

  let missingProp = [];

  for (let requiredParam of [
    "city",
    "state",
    "primary_airport",
    "population",
    "tourism_website"
  ]) {
    if (!city[requiredParam]) {
      missingProp = [...missingProp, requiredParam];
    }
  }

  if (missingProp.length) {
    response.status(422).json({ error: error.message });
  }

  database("cities")
    .insert(city, "id")
    .then(cityIds => {
      response.status(201).json({ id: cityIds[0] });
    })
    .catch(error => {
      response.status(500).json({ error: error.message });
    });
});

app.get("/api/v1/cities/:id", (request, response) => {
  const { id } = request.params;

  database("cities")
    .where("id", id)
    .select()
    .then(city => response.status(200).json(city))
    .catch(error =>
      response.status(500).json(`Error fetching city: ${error.message}`)
    );
});

app.patch(
  "/api/v1/comedy_clubs/:club_id",
  (request, response, next) => {
    const rating = request.body;

    let missingProp = [];

    for (let requiredParam of ["rating"]) {
      if (!rating[requiredParam]) {
        missingProp = [...missingProp, requiredParam];
      }
    }

    if (!missingProp.length) next("route");
    else next();
  },
  function(request, response, next) {
    response.status(415).json({ error: error.message });
  }
);

app.get("/api/v1/comedy_clubs/:club_id", (request, response) => {
  const { club_id } = request.params;

  database("comedy_clubs")
    .where("id", club_id)
    .select()
    .then(club => response.status(200).json(club))
    .catch(error =>
      response.status(500).json(`Error fetching city: ${error.message}`)
    );
});

app.patch("/api/v1/comedy_clubs/:club_id", (request, response, next) => {
  const { club_id } = request.params;
  const rating = request.body;
  database("comedy_clubs")
    .where("id", club_id)
    .update(rating)
    .then(row => {
      response
        .status(201)
        .json(`Club ${club_id}'s rating has been updated to ${rating.rating}`);
    })
    .catch(error => {
      response.status(500).json({ error: error.message });
    });
});

app.get("/api/v1/comedy_clubs", (request, response) => {
  database("comedy_clubs")
    .select()
    .then(clubs => {
      response.status(200).json(clubs);
    })
    .catch(error => {
      response.status(500).json({ error: error.message });
    });
});

app.post("/api/v1/cities/:city_id/comedy_clubs", (request, response) => {
  const club = request.body;

  let missingProp = [];

  for (let requiredParam of ["name", "street_address", "zip_code", "rating"]) {
    if (club[requiredParam] === undefined) {
      missingProp = [...missingProp, requiredParam];
    }
  }

  if (missingProp.length) {
    response.status(422).json({ error: error.message });
  }

  database("comedy_clubs")
    .insert(club, "id")
    .then(club => {
      response.status(201).json(club);
    })
    .catch(error => {
      response.status(500).json({ error: error.message });
    });
});

app.get("/api/v1/cities/:city_id/comedy_clubs", (request, response) => {
  const { city_id } = request.params;

  database("comedy_clubs")
    .where("city_id", city_id)
    .select()
    .then(clubs => response.status(200).json(clubs))
    .catch(error =>
      response.status(500).json(`Error fetching cities clubs: ${error.message}`)
    );
});

app.delete("/api/v1/cities/:id", (request, response) => {
  const { id } = request.params;

  database("comedy_clubs")
    .where("city_id", id)
    .del()
    .then(() =>
      database("cities")
        .where("id", id)
        .del()
    )
    .then(city => {
      response.status(202).json(id);
    })
    .catch(error => {
      response.status(500).json({ error: error.message });
    });
});

app.delete(
  "/api/v1/cities/:city_id/comedy_clubs/:club_id",
  (request, response) => {
    const { club_id } = request.params;

    database("comedy_clubs")
      .where("id", club_id)
      .del()
      .then(club => {
        response.status(202).json(club_id);
      })
      .catch(error => {
        response.status(500).json({ error: error.message });
      });
  }
);

app.listen(app.get("port"), () => {
  console.log(`${app.locals.title} is running on ${app.get("port")}.`);
});

module.exports = app;
