let myMap = L.map('modals').setView([31.00, -92.50], 7)

// Basemap tiles
let OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap)

// set variables for layer-control and info pane
let answerSet1
let answerSet2
let vowels
let sentence1 = L.layerGroup().addTo(myMap)
let sentence2 = L.layerGroup().addTo(myMap)
let speakers = L.layerGroup().addTo(myMap)

// Add GeoJSON with markers
// Layer 1
let lingvoData = 'https://aprigozhina.github.io/LouisianaLingvo/data.geojson'
jQuery.getJSON(lingvoData, function (data) {
	answerSet1 = L.geoJson(data, {
		 onEachFeature: onEachFeature1,
			pointToLayer: function(feature,latlng){
				var colors = { // variable properties go in curly braces
					"Yes": "#1a9850",
					"No": "#d73027"
				};
				return L.circleMarker(latlng, {
					radius: 7,
					fillColor: colors[feature.properties.Answer],
					color: colors[feature.properties.Answer],
					weight: 1,
					opacity: 1,
					fillOpacity: 0.6,
					clickable: true
				});
			}
	}).addTo(myMap)
})

// Layer 2
let lingvoData2 = 'https://aprigozhina.github.io/LouisianaLingvo/data2.geojson'
jQuery.getJSON(lingvoData2, function (data) {
	answerSet2 = L.geoJson(data, {
		 onEachFeature: onEachFeature2,
			pointToLayer: function(feature,latlng){
			var colors = {
					"Yes": "#66c2a5",
					"No": "#f46d43"
			};
			return L.circleMarker(latlng, {
				radius: 7,
				fillColor: colors[feature.properties.Answer],
				color: colors[feature.properties.Answer],
				weight: 1,
				opacity: 1,
				fillOpacity: 0.6,
				clickable: true
			});
		}
	}).addTo(myMap)
})

// make highlight and restore
function onEachFeature1(feature, layer){
	layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlight
	})
	sentence1.addLayer(layer)
}

function onEachFeature2(feature, layer){
	layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlight
	})
		sentence2.addLayer(layer)
}

function highlightFeature(e) {
    var layer = e.target
    	layer.setStyle({
        weight: 2,
        color: '#717D7E',
        fillOpacity: 0.7
    	})
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront()
    }
		info.update(layer.feature.properties)
}

function resetHighlight(e) {
    answerSet1.resetStyle(e.target),
		answerSet2.resetStyle(e.target)
		info.update()
}

// Layer 3
let speakersUrl = 'https://aprigozhina.github.io/LouisianaLingvo/tabletry.geojson'
jQuery.getJSON(speakersUrl, function (data) {
	vowels = L.geoJson(data, {
		 onEachFeature: onEachFeature3,
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

// add pop-ups
let onEachFeature3 = function (feature, layer) {
			let tablePopup = feature.properties.table
			 	layer.bindPopup(tablePopup)
		speakers.addLayer(layer)
 }

// add layer control
let baseLayers = {
	"OSM": OpenStreetMap_Mapnik
}

let overlays = {
	"Sentence 1": sentence1,
	"Sentence 2": sentence2,
	"Speakers": speakers
}

L.control.layers(baseLayers, overlays, {
	hideSingleBase: true,
	collapsed: false
}).addTo(myMap)

// add info pane
var info = L.control({position: 'bottomleft'})

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info') // create a div with a class "info"
    this.update();
    return this._div;
}

// update the control based on feature properties
info.update = function (props) {
    this._div.innerHTML = '<h4>Sentence use survey</h4>' +  (props ?
        '<b>Answer: </b>' + props.Answer +
				'<br><b>Gender: </b>' + props.Gender +
				'<br><b>Age: </b>' + props.Age +
				'<br><b>Education: </b>' + props.Education +
				'<br><b>Race: </b>' + props.Race +
				'<br><b>Place raised: </b>' + props.Birth_plac +
				'<br><b>Currently lives: </b>' + props.Live_place
        : 'Hover over a point')
}

info.addTo(myMap)
