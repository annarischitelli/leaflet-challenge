// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl).then(function(data) {
//   // The data.features object is in the GeoJSON standard
  console.log(data.features);

  // This is it! Leaflet knows what to do with 
  // each type of feature (held in the `geometry` key) and draws the correct markers.
  var earthquakes = L.geoJSON(data.features);

  // The rest of this is all the same
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/satellite-v9",
    accessToken: API_KEY
});

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
});

  var outdoorsmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/outdoors-v11",
    accessToken: API_KEY
});

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Satellite Map": streetmap,
    "Grayscale Map": darkmap,
    "Outdoors Map": outdoorsmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("mapid", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [streetmap, darkmap, outdoorsmap, earthquakes]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {collapsed: false}).addTo(myMap);

// Loop through the cities array and create one marker for each city object
L.geoJSON(data.features).forEach(function(mag) {

    // Conditionals for countries points
    var color = "";
    if (feature.properties.mag > 5) {
      color = "red";
    }
    else if (feature.properties.mag > 4) {
      color = "orange";
    }
    else if (feature.properties.mag > 3) {
      color = "yellow";
    }
    else if (feature.properties.mag > 2) {
        color = "green";
    }
    else if (feature.properties.mag > 1) {
        color = "blue";
     }
    else {
      color = "gray";
    }
  
    // Add circles to map
    L.circle(country.location, {
      fillOpacity: 0.75,
      color: "white",
      fillColor: color,
      // Adjust radius
      radius: country.points * 1500
    }).bindPopup("<h1>" + country.name + "</h1> <hr> <h3>Points: " + country.points + "</h3>").addTo(myMap);
  });







  // https://leafletjs.com/examples/geojson/
// L.geoJSON() also gives us handy options, almost like a built in `.forEach()`
// // Define a function we want to run once for each feature in the features array
// // Give each feature a popup describing the place and time of the earthquake
function onEachFeatureFunc(feature, layer) {
    layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place+"<br>Time:"+new Date(feature.properties.time));
}

var geojsonMarkerOptions = {
    radius: radius(feature.properties.mag),
    fillColor: color(feature.properties.mag),
    color: "#red",
    weight: 1,
    opacity: 1,
    fillOpacity: 1
};

function pointToLayerFunc(feature, latlng) {
  return L.circleMarker(latlng, geojsonMarkerOptions);
}

// Create a GeoJSON layer containing the features array on the earthquakeData object
// Run the onEachFeature function once for each piece of data in the array
  // Paste this into the .then() function
  var earthquakes = L.geoJSON(data.features, {
    onEachFeature: onEachFeatureFunc,
    pointToLayer: pointToLayerFunc
  }).addTo(myMap);

//  Create legend
//   var legend= L.control({position:"bottomright"});

//   legend.onAdd=function(){
//       var div = L.DomUtil.create("div", "info legend");
//       var grades=[0,1,2,3,4,5];
//       var colors =["#98ee00","#d4ee00","#eecc00","#ee9c00","#ea822c","#ea2c2c"]};


});

