let myMap = L.map('vowels').setView([30.00, -91.00], 9)

// Basemap tiles
let OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap)

// set variables for layer-control and info pane
let vowels
let migration
let trap = L.layerGroup().addTo(myMap)
let dress = L.layerGroup().addTo(myMap)
let goose = L.layerGroup().addTo(myMap)
let parishesLayer = L.layerGroup().addTo(myMap)
let zipCodeLayer = L.layerGroup().addTo(myMap)

// create panes
myMap.createPane('markers')
myMap.getPane('markers').style.zIndex = 650

// Add GeoJSON with markers
// Layer 1
let trapUrl = 'https://aprigozhina.github.io/LouisianaLingvo/Vowels/trap.geojson'
jQuery.getJSON(trapUrl, function (data) {
	vowels = L.geoJson(data, {
		 onEachFeature: onEachFeature1,
			pointToLayer: function(feature,latlng){
				var colors = { // variable properties go in curly braces
					"origin":"#A569BD",
					"interm":"#5DADE2",
					"current":"#2471A3"
				};
				return L.circleMarker(latlng, {
					radius: 7,
					fillColor: colors[feature.properties.ziptype],
					color: colors[feature.properties.ziptype],
					weight: 1,
					opacity: 1,
					fillOpacity: 0.8,
					clickable: true,
					pane: 'markers'
				});
			}
	}).addTo(myMap)
})

// Layer 2
let migrationUrl = 'https://aprigozhina.github.io/LouisianaLingvo/Vowels/migration.geojson'
jQuery.getJSON(migrationUrl, function (data) {
	migration = L.geoJson(data, {
		pane: 'markers'
	}).addTo(myMap)
})

// var arrowHead = L.polylineDecorator(migration, {
//     patterns: [
//         {
//             offset: '100%',
//             repeat: 0,
//             symbol: L.Symbol.arrowHead({pixelSize: 15, polygon: false, pathOptions: {stroke: true}})
//         }
//     ]
// }).addTo(map);

// Layer 3

// add pop-ups
let onEachFeature1 = function (feature, layer) {
			let tablePopup = feature.properties.table
			 	layer.bindPopup(tablePopup)
		trap.addLayer(layer)
 }

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

// add layer control
let baseLayers = {
	"TRAP": trap,
	"DRESS": dress,
	"GOOSE": goose
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
