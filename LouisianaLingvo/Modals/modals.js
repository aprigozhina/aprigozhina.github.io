let myMap = L.map('modals').setView([31.00, -92.50], 7)

// Basemap tiles
let OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap)

// set variables for layer-control and info pane
let answerSet1
let answerSet2
let sentence1 = L.layerGroup().addTo(myMap)
let sentence2 = L.layerGroup().addTo(myMap)
let parishesLayer = L.layerGroup().addTo(myMap)
let zipCodeLayer = L.layerGroup().addTo(myMap)

// create panes
myMap.createPane('markers')
myMap.getPane('markers').style.zIndex = 650

// Add GeoJSON with markers
// Layer 1
let lingvoData = 'https://aprigozhina.github.io/LouisianaLingvo/Modals/modals1.geojson'
jQuery.getJSON(lingvoData, function (data) {
	answerSet1 = L.geoJson(data, {
		 onEachFeature: onEachFeature1,
			pointToLayer: function(feature,latlng){
				var colors = { // variable properties go in curly braces
					"TRUE": "#1a9850",
					"FALSE": "#d73027"
				};
				return L.circleMarker(latlng, {
					radius: 7,
					fillColor: colors[feature.properties.answer],
					color: colors[feature.properties.answer],
					weight: 1,
					opacity: 1,
					fillOpacity: 0.6,
					clickable: true,
					pane: 'markers'
				});
			}
	}).addTo(myMap)
})

// Layer 2
let lingvoData2 = 'https://aprigozhina.github.io/LouisianaLingvo/Modals/modals1.geojson'
jQuery.getJSON(lingvoData2, function (data) {
	answerSet2 = L.geoJson(data, {
		 onEachFeature: onEachFeature2,
			pointToLayer: function(feature,latlng){
			var colors = {
					"TRUE": "#66c2a5",
					"FALSE": "#f46d43"
			};
			return L.circleMarker(latlng, {
				radius: 7,
				fillColor: colors[feature.properties.answer],
				color: colors[feature.properties.answer],
				weight: 1,
				opacity: 1,
				fillOpacity: 0.6,
				clickable: true,
				pane: 'markers'
			});
		}
	}).addTo(myMap)
})

// Parishes
let parishUrl = 'https://aprigozhina.github.io/LouisianaLingvo/ParishSimple.geojson'
jQuery.getJSON(parishUrl, function (data) {
	let parishes = function (feature) { // this function returns an object
	//	let males = feature.properties.MALES
	//	let females = feature.properties.FEMALES
	//		let genderComposition = males / females * 100
			let parishColor = '#bdc9e1'
	//			if ( genderComposition < 100 ) {stateColor = '#67a9cf'}
	//			if ( genderComposition < 97 ) { stateColor = '#02818a' }
						return {
							fillColor: parishColor,
							color: '#808B96', //use the color variable above for the value
						 	weight: 1,
						 	fillOpacity: 0.4,
						 	dashArray: '3'
						}
		}
				let parishesOptions = {
					style: parishes,
		  		onEachFeature: onEachFeature6
		 		}
	L.geoJSON(data, parishesOptions).addTo(myMap)
})

// add pop-ups
let onEachFeature6 = function (feature, layer) {
			let name = feature.properties.NAMELSAD
				 	layer.bindPopup(name)
		parishesLayer.addLayer(layer)
 }

 // ZIP codes
 let zipUrl = 'https://aprigozhina.github.io/LouisianaLingvo/ZIPSimple.geojson'
 jQuery.getJSON(zipUrl, function (data) {
 	let zipCodes = function (feature) { // this function returns an object
 	//	let males = feature.properties.MALES
 	//	let females = feature.properties.FEMALES
 	//		let genderComposition = males / females * 100
 			let zipColor = '#A2D9CE'
 	//			if ( genderComposition < 100 ) {stateColor = '#67a9cf'}
 	//			if ( genderComposition < 97 ) { stateColor = '#02818a' }
 						return {
 							fillColor: zipColor,
 							color: '#808B96', //use the color variable above for the value
 						 	weight: 0.5,
 						 	fillOpacity: 0.4
 						}
 		}
 				let zipOptions = {
 					style: zipCodes,
 		  		onEachFeature: onEachFeature7
 		 		}
 	L.geoJSON(data, zipOptions).addTo(myMap)
 })

 // add pop-ups
 let onEachFeature7 = function (feature, layer) {
 			let name = feature.properties.ZCTA5CE10
 				 	layer.bindPopup('ZIP: ' + name)
 		zipCodeLayer.addLayer(layer)
  }

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

// add layer control
let baseLayers = {

	"Sentence 1": sentence1,
	"Sentence 2": sentence2
}

let overlays = {
	"OSM": OpenStreetMap_Mapnik,
	"Parishes": parishesLayer,
	"ZIP codes": zipCodeLayer
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
    this._div.innerHTML = '<h4>Double Modals Survey</h4>' +  (props ?
        '<b>Answer: </b>' + props.answer +
				'<br><b>ZIP code: </b>' + props.zipcode +
				'<br><b>Gender: </b>' + props.gender +
				'<br><b>Age: </b>' + props.age +
				'<br><b>Ethnicity: </b>' + props.ethnicity +
				'<br><b>Education: </b>' + props.education +
				'<br><b>Mother Education: </b>' + props.mother_ed +
				'<br><b>Father Education: </b>' + props.father_ed +
				'<br><b>Stay in Louisiana: </b>' + props.stayInLA
        : 'Hover over a point to see the speaker info and survey response')
}

info.addTo(myMap)
