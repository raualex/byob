const express = require('express')
const bodyParser = require('body-parser')
const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const database = require('knex')(config)
const app = express()

app.use(bodyParser.json())
app.set('port', process.env.PORT || 3000);
app.locals.title = 'BYOB';
app.use(express.static('public'));

app.get('/api/v1/cities', (request, response) => {
    database('palette_cities').select()
        .then(cities => {
            response.status(200).json(cities)
        })
        .catch(error => {
            response.status(500).json({ error: error.message });
        })
  })
  
  app.post('/api/v1/cities', (request, response) => {
    const city = request.body
  
    for(let requiredParam of ['city', 'state', 'primary_airport', 'population', 'tourism_website']) {
        if(!city[requiredParam]) {
            response.status(422).json({error: error.message})
        }
    }
  
    database('cities').insert(city, 'id')
        .then(cityIds => {
            response.status(201).json({id: cityIds[0]})
        })
        .catch(error => {
            response.status(500).json({error: error.message})
        })
  })
  
  app.get('/api/v1/cities/:id', (request, response) => {
    const { id } = request.params
    
    database('cities').where('id', id).select()
        .then(city => response.status(200).json(city))
        .catch(error => response.status(500).json(`Error fetching city: ${error.message}`))
  })
  
  app.get('/api/v1/comedy_clubs', (request, response) => {
    database('comedy_clubs').select()
        .then(clubs => {
            response.status(200).json(clubs)
        })
        .catch(error => {
            response.status(500).json({ error: error.message });
        })
  })
  
  app.post('/api/v1/cities/:city_id/comedy_clubs', (request, response) => {
    const club = request.body
  
    for(let requiredParam of ['name', 'street_address', 'zip_code', 'rating']) {
        if(!club[requiredParam]) {
            response.status(422).json({error: error.message})
        }
    }
  
    database('comedy_clubs').insert(club, 'id')  
        .then(club => {
            response.status(201).json(club)
        })
        .catch(error => {
            response.status(500).json({error: error.message})
        })
  })
  
  app.delete('/api/v1/cities/:city_id/comedy_clubs/:club_id', (request, response) => {
    const { id, club_id } = request.params
    
    database('comedy_clubs').where('id', club_id).del()
    .then(club => {
      response.status(201).json(id)
    })
    .catch(error => {
      response.status(500).json({error: error.message})
    })
  })

app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});