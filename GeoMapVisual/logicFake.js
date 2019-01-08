// Create a map object
var myMap = L.map("map", {
  setView: ([68.858190, 42.294470], 3),
  // center: [15.5994, -28.6731],
  // this center is on Madrid Spain location
  center: [40.4168, 3.7038],
  zoom: 2
});
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  // id: "mapbox.streets-basic",
  id: "mapbox.light",
  accessToken: API_KEY
}).addTo(myMap);

// Country data
var cities = [
  {
    name: "New York",
    location: [40.7128, -74.0060],
    fakeNewsPcent: 227
  },
  {
    name: "London",
    location: [51.5074, 0.1278],
    fakeNewsPcent: 218
  },
  {
    name: "Paris",
    location: [48.8566, 2.3522],
    fakeNewsPcent: 256
  },
  {
    name: "Johannesburg",
    location: [-26.2041, 28.0473],
    fakeNewsPcent: 240
  },
  {
    name: "Mumbai",
    location: [19.0760, 72.8777],
    fakeNewsPcent: 299
  },
  {
    name: "Moscow",
    location: [55.7558, 37.6173],
    fakeNewsPcent: 298
  },
  {
    name: "Toronto",
    location: [43.6532, -79.3832],
    fakeNewsPcent: 296
  },
  {
    name: "Rio De Janeiro",
    location: [-22.9068, -43.1729],
    fakeNewsPcent: 293
  },
  {
    name: "Cairo",
    location: [30.0444, 31.2357],
    fakeNewsPcent: 272
  },
  {
    name: "Beijing",
    location: [39.9042, 116.4074],
    fakeNewsPcent: 261
  }
];


// Loop through the cities array and create one marker for each city object
for (var i = 0; i < cities.length; i++) {

  // Conditionals for cities fakeNewsPcent
  var color = "";
  if (cities[i].fakeNewsPcent > 200) {
    color = "yellow";
  }
  else if (cities[i].fakeNewsPcent > 100) {
    color = "blue";
  }
  else if (cities[i].fakeNewsPcent > 90) {
    color = "green";
  }
  else {
    color = "red";
  }

  // Add circles to map
  L.circle(cities[i].location, {
    fillOpacity: 0.75,
    stroke: false,
    // color: "lightgrey",
    fillColor: color,
    // Adjust radius
    radius: cities[i].fakeNewsPcent * 1500
  }).bindPopup("<h1>" + cities[i].name + "</h1> <hr> <h3>fakeNewsPcent: " + cities[i].fakeNewsPcent + "</h3>").addTo(myMap);
}
