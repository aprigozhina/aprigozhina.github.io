let myMap = L.map('vowels').setView([31.00, -92.50], 7)

// Basemap tiles
let OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap)

// set variables for layer-control and info pane
let vowels
let trap = L.layerGroup().addTo(myMap)
let dress = L.layerGroup().addTo(myMap)
let goose = L.layerGroup().addTo(myMap)

// Add GeoJSON with markers
// Layer 1
let trapUrl = 'https://aprigozhina.github.io/LouisianaLingvo/Vowels/trap.geojson'
jQuery.getJSON(trapUrl, function (data) {
	vowels = L.geoJson(data, {
		 onEachFeature: onEachFeature1,
			pointToLayer: function(feature,latlng){
				var colors = { // variable properties go in curly braces
					"Never changed":"#1a9850",
					"Current":"#1a9850"
				};
				return L.circleMarker(latlng, {
					radius: 7,
					fillColor: colors[feature.properties.ziptype],
					color: colors[feature.properties.ziptype],
					weight: 1,
					opacity: 1,
					fillOpacity: 0.6,
					clickable: true
				});
			}
	}).addTo(myMap)
})

// Layer 2


// Layer 3

// add pop-ups
let onEachFeature1 = function (feature, layer) {
			let tablePopup = feature.properties.table
			 	layer.bindPopup(tablePopup)
		trap.addLayer(layer)
 }

// add layer control
let baseLayers = {
	"OSM": OpenStreetMap_Mapnik
}

let overlays = {
	"TRAP": trap,
	"DRESS": dress,
	"GOOSE": goose
}

L.control.layers(baseLayers, overlays, {
	hideSingleBase: true,
	collapsed: false
}).addTo(myMap)
