// Create a map object
var myMap1 = L.map("map1", {
  setView: ([48.858190, 2.294470], 16),
  // center: [15.5994, -28.6731],
  // this center is on Madrid Spain location
  center: [40.4168, 3.7038],
  zoom: 2
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  minZoom: 1,
  // id: "mapbox.streets-basic",
  id: "mapbox.light",
  accessToken: API_KEY
}).addTo(myMap1);

// City data
var cities = [
  {
    name: "Lisbon",
    location: [38.7223, -9.1393],
    realNewsPcent: 127
  },
  {
    name: "Ndola",
    location: [-12.9906, 28.6498],
    realNewsPcent: 182
  },
  {
    name: "Navsari",
    location: [20.9467, 72.9520],
    realNewsPcent: 156
  },
  {
    name: "Chicago",
    location: [41.8781, -87.6298],
    realNewsPcent: 140
  },
  {
    name: "San Francisco",
    location: [37.7749, -122.4194],
    realNewsPcent: 199
  },
  {
    name: "Shanghai",
    location: [31.2304, 121.4737],
    realNewsPcent: 198
  },
  {
    name: "Falkland Islands",
    location: [-51.7963, -59.5236],
    realNewsPcent: 196
  },
  {
    name: "Istanbul",
    location: [41.0082, 28.9784],
    realNewsPcent: 193
  },
  {
    name: "Bali",
    location: [8.3405, 115.0920],
    realNewsPcent: 172
  },
  {
    name: "Dublin",
    location: [53.3498, -6.2603],
    realNewsPcent: 161
  }
];


// Loop through the cities array and create one marker for each city object
for (var i = 0; i < cities.length; i++) {

  // Conditionals for cities realNewsPcent
  var color = "";
  if (cities[i].realNewsPcent > 200) {
    color = "yellow";
  }
  else if (cities[i].realNewsPcent > 100) {
    color = "blue";
  }
  else if (cities[i].realNewsPcent > 90) {
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
    radius: cities[i].realNewsPcent * 1500
  }).bindPopup("<h1>" + cities[i].name + "</h1> <hr> <h3>realNewsPcent: " + cities[i].realNewsPcent + "</h3>").addTo(myMap1);
}
