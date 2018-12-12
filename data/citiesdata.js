const cities = [
  {
    city: "Denver",
    state: "CO",
    primary_airport: "Denver International Airport",
    population: 704621,
    tourism_website: "https://www.denver.org",
    theme_parks: "Lakeside Amusement Park"
  },
  {
    city: "New York City",
    state: "NY",
    primary_airport: "LaGuardia Airport",
    population: 8623000,
    tourism_website: "https://www.nyc.com",
    theme_parks: "None"
  },
  {
    city: "Chicago",
    state: "IL",
    primary_airport: "O'Hare International Airport",
    population: 2716000,
    tourism_website: "https://www.cityofchicago.org",
    theme_parks: "None"
  },
  {
    city: "Atlanta",
    state: "GA",
    primary_airport: "Hartsfield-Jackson Atlanta International Airport",
    population: 486290,
    tourism_website: "https://www.atlanta.com",
    theme_parks: "None"
  },
  {
    city: "Detroit",
    state: "MI",
    primary_airport: "Detroit Metropolitan Airport",
    population: 673104,
    tourism_website: "https://www.visitdetroit.com",
    theme_parks: "None"
  },
  {
    city: "Los Angeles",
    state: "CA",
    primary_airport: "Los Angeles International Airport",
    population: 4000000,
    tourism_website: "https://www.discoverlosangeles.com",
    theme_parks: "None"
  },
  {
    city: "Philadelphia",
    state: "PA",
    primary_airport: "Philadelphia International Airport",
    population: 1581000,
    tourism_website: "https://www.visitphilly.com",
    theme_parks: "None"
  },
  {
    city: "Boston",
    state: "MA",
    primary_airport: "Logan International Airport",
    population: 685094,
    tourism_website: "https://www.bostonusa.com",
    theme_parks: "None"
  },
  {
    city: "Miami",
    state: "FL",
    primary_airport: "Miami International Airport",
    population: 463347,
    tourism_website: "https://www.visitflorida.com",
    theme_parks: "None"
  },
  {
    city: "Minneapolis",
    state: "MN",
    primary_airport: "Minneapolis-Saint Paul International Airport",
    population: 422331,
    tourism_website: "https://www.minneapolis.org",
    theme_parks: "None"
  },
  {
    city: "Austin",
    state: "TX",
    primary_airport: "Austin-Bergstrom International Airport",
    population: 950715,
    tourism_website: "https://www.austintexas.org",
    theme_parks: "None"
  },
  {
    city: "Dallas",
    state: "TX",
    primary_airport: "Dallas/Fort Worth International Airport",
    population: 1341000,
    tourism_website: "https://www.visitdallas.com",
    theme_parks: "None"
  },
  {
    city: "Seattle",
    state: "WA",
    primary_airport: "Seattle-Tacoma International Airport",
    population: 724745,
    tourism_website: "https://www.visitseattle.org",
    theme_parks: "None"
  },
  {
    city: "San Diego",
    state: "CA",
    primary_airport: "San Diego International Airport",
    population: 1420000,
    tourism_website: "https://www.sandiego.org",
    theme_parks: "SeaWorld San Diego"
  },
  {
    city: "Las Vegas",
    state: "NV",
    primary_airport: "McCarran International Airport",
    population: 641676,
    tourism_website: "https://www.visitlasvegas.com",
    theme_parks: "Stratosphere Tower Hotel & Casino"
  },
  {
    city: "Baltimore",
    state: "MD",
    primary_airport: "Baltimore-Washington International Airport",
    population: 611648,
    tourism_website: "https://www.baltimore.org",
    theme_parks: "None"
  },
  {
    city: "Nashville",
    state: "TN",
    primary_airport: "Nashville International Airport",
    population: 691243,
    tourism_website: "https://www.visitmusiccity.com",
    theme_parks: "None"
  },
  {
    city: "Louisville",
    state: "KY",
    primary_airport: "Louisville International Airport",
    population: 616261,
    tourism_website: "https://www.gotolouisville.com",
    theme_parks: "Kentucky Kingdom"
  },
  {
    city: "New Orleans",
    state: "LA",
    primary_airport: "Louis Armstrong New Orleans International Airport",
    population: 393292,
    tourism_website: "https://www.neworleans.com",
    theme_parks: "Carousel Gardens"
  },
  {
    city: "Charlotte",
    state: "NC",
    primary_airport: "Charlotte Douglas International Airport",
    population: 859035,
    tourism_website: "https://www.visitnc.com",
    theme_parks: "Carowinds"
  },
  {
    city: "Cleveland",
    state: "OH",
    primary_airport: "Cleveland Hopkins International Airport",
    population: 385525,
    tourism_website: "https://www.thisiscleveland.com",
    theme_parks: "None"
  },
  {
    city: "Indianapolis",
    state: "IN",
    primary_airport: "Indianapolis International Airport",
    population: 872680,
    tourism_website: "https://www.visitindy.com",
    theme_parks: "Indianapolis Zoo"
  },
  {
    city: "Phoenix",
    state: "AZ",
    primary_airport: "Phoenix Sky Harbor International Airport",
    population: 1626000,
    tourism_website: "https://www.visitphoenix.com",
    theme_parks: "Enchanted Island"
  },
  {
    city: "Kansas City",
    state: "MO",
    primary_airport: "Kansas City International Airport",
    population: 488943,
    tourism_website: "https://www.visitkc.com",
    theme_parks: "Worlds of Fun"
  },
  {
    city: "Cincinnati",
    state: "OH",
    primary_airport: "Cincinnati Municipal Airport",
    population: 301301,
    tourism_website: "https://www.cincinnatiusa.com",
    theme_parks: "Coney Island"
  },
  {
    city: "Oklahoma City",
    state: "OK",
    primary_airport: "Will Rogers World Airport",
    population: 643648,
    tourism_website: "https://www.visitokc.com",
    theme_parks: "Frontier City"
  },
  {
    city: "Houston",
    state: "TX",
    primary_airport: "George Bush International Airport",
    population: 2313000,
    tourism_website: "https://www.visithoustontexas.com",
    theme_parks: "Zuma Fun Center"
  },
  {
    city: "San Francisco",
    state: "CA",
    primary_airport: "San Francisco International Airport",
    population: 884363,
    tourism_website: "https://www.sftravel.com",
    theme_parks: "None"
  },
  {
    city: "Portland",
    state: "OR",
    primary_airport: "Portland International Airport",
    population: 647805,
    tourism_website: "https://www.travelportland.com",
    theme_parks: "Oaks Park"
  },
  {
    city: "Milwaukee",
    state: "WI",
    primary_airport: "General Mitchell International Airport",
    population: 595351,
    tourism_website: "https://www.visitmilwaukee.org",
    theme_parks: "None"
  }
];
