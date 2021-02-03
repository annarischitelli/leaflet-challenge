// API
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Creating map object
var myMap = L.map("map", {
  center: [45.5051, -122.6750],
  zoom: 11
});

// Adding tile layer to the map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
//   accessToken: API_KEY
}).addTo(myMap);


// Grab the data with d3
d3.json(url).then(function(data) {

  console.log(data);

  // Add 
  L.geoJson(data, {
    onEachFeature: function (feature, layer) {
      layer.bindPopup('<h1>'+feature.properties.Coll_Day_N+'</h1><p>name: '+feature.properties.Hauler+'</p><p>contact: '+feature.properties.Phone_Num+'</p>');
    }
  }).addTo(myMap);

});
