/*
-Create new maps
-Add layers to map
-Add tags to each layer
-Button to save tags
  -Save tags and coordinates in Mongo

-Aggregate tags for given coordinates (find most popular by lat $ lon)
-Create community map with tags (by size) based on popularity in area
*/

//set up global variables
var selectedLayerId;


//set map height
var height=document.body.scrollHeight-50;
document.getElementById("map").style.height=height.toString()+'px'

//initialize map to SF
var map = L.map('map').setView([37.789, -122.414], 14);
L.tileLayer('http://api.tiles.mapbox.com/v3/austentalbot.gfeh9hg8/{z}/{x}/{y}.png', {maxZoom: 18}).addTo(map);

// Initialise the FeatureGroup to store editable layers
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

// Initialise the draw control and pass it the FeatureGroup of editable layers
var drawControl = new L.Control.Draw({
  draw: {
    polyline : false,
    circle : false,
    marker: false
  },
  edit: {
    featureGroup: drawnItems
  }
});
map.addControl(drawControl);

map.on('draw:created', function (e) {
    var type = e.layerType,
        layer = e.layer;

    // Add layer and listen for clicks
    map.addLayer(layer);
    drawnItems.addLayer(layer);
    layer.on('click', function(e) {
      selectedLayerId=e.target._leaflet_id;
    });
});

map.on('draw:edited', function (e) {
    var layers = e.layers;
    layers.eachLayer(function (layer) {
      //do whatever you want, most likely save back to db
    });
});

//add tag to object
document.getElementById("addTag").addEventListener('click', function(){
  var tag=document.getElementById('tagInput').value;
  var layer=drawnItems._layers[selectedLayerId];
  if (layer.label!==undefined) {
    tags=layer.label._content+', '+tag;
  } else {
    tags=tag;
  }
  layer.bindLabel(tags);
}, false);
