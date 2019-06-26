let myMap = L.map('vowels').setView([30.00, -91.00], 9)

// Basemap tiles
let OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap)

// set variables for layer-control and info pane
let migration = L.layerGroup().addTo(myMap)
let trap = L.layerGroup().addTo(myMap)
let dress = L.layerGroup().addTo(myMap)
let goose = L.layerGroup().addTo(myMap)
let face = L.layerGroup().addTo(myMap)
let fleece = L.layerGroup().addTo(myMap)
let foot = L.layerGroup().addTo(myMap)
let goat = L.layerGroup().addTo(myMap)
let kit = L.layerGroup().addTo(myMap)
let price = L.layerGroup().addTo(myMap)
let strut = L.layerGroup().addTo(myMap)
let lot = L.layerGroup().addTo(myMap)
let thought = L.layerGroup().addTo(myMap)
let mouth = L.layerGroup().addTo(myMap)
let schwa = L.layerGroup().addTo(myMap)
let parishesLayer = L.layerGroup().addTo(myMap)
let zipCodeLayer = L.layerGroup().addTo(myMap)

// create panes
myMap.createPane('markers')
myMap.getPane('markers').style.zIndex = 650

myMap.createPane('migrationLines')
myMap.getPane('migrationLines').style.zIndex = 640

// Migration lines layer
let migrationUrl = 'https://aprigozhina.github.io/LouisianaLingvo/Vowels/migration.geojson'
jQuery.getJSON(migrationUrl, function (data) {
	migration = L.geoJson(data, {
		 onEachFeature: onEachFeature0,
		pane: 'migrationLines',
		weight: 0.8
	}).addTo(myMap)
})

// add pop-ups
let onEachFeature0 = function (feature, layer) {
			let speakerName = feature.properties.SPEAKER
			 	layer.bindPopup(
					'<b>Speaker: </b>' + speakerName)
		migration.addLayer(layer)
 }

// let addArrows = L.polylineDecorator(migration, {
//     patterns: [
//         // defines a pattern of 10px-wide dashes, repeated every 20px on the line
//         {offset: '100%',
// 				repeat: 0,
// 				symbol: L.Symbol.arrowHead({ pixelSize: 15, polygon: true, pathOptions: { stroke: true } }) }
// 			]
// 		}).addTo(myMap)


// Layer 1 TRAP
let trapUrl = 'https://aprigozhina.github.io/LouisianaLingvo/Vowels/trap.geojson'
jQuery.getJSON(trapUrl, function (data) {
	vowels = L.geoJson(data, {
		 onEachFeature: onEachFeature1,
			pointToLayer: function(feature,latlng){
				var colors = {
					"Origin":"#A569BD",
					"Interim":"#5DADE2",
					"Current":"#2471A3"
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

// add pop-ups TRAP
let onEachFeature1 = function (feature, layer) {
			let speakerName = feature.properties.speaker
			let speakerGender = feature.properties.gender
			let speakerEthnicity = feature.properties.ethnicity
			let zipOrigin = feature.properties.zip1
			let zipInterm = feature.properties.zip2
			let zipCurrent = feature.properties.zip3
			let locType = feature.properties.ziptype
			let word = feature.properties.word
			let word2 = feature.properties.word2
			let vowel = feature.properties.vowel
			let soundLynk = feature.properties.word_sound
			let soundLynk2 = feature.properties.word2_sound
			 	layer.bindPopup(
					'<b>Speaker: </b>' + speakerName +
					'<b> Gender: </b>' + speakerGender +
					'<br><b>Ethnicity: </b>' + speakerEthnicity +
					'<br><b>Location Type: </b>' + locType +
					'<br><b>Vowel: </b>' + vowel + ' [æ] ' +
					'<br><b>Word: </b>' + word + '<br>' + soundLynk +
					'<br><b>Word: </b>' + word2 + '<br>' + soundLynk2)
		trap.addLayer(layer)
 }
// Layer 2


// Layer 3

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
	"DRESS [ɛ]": dress,
	"FACE [e]": face,
	"FLEECE [i]": fleece,
	"FOOT [ʊ]": foot,
	"GOAT [o]": goat,
	"GOOSE [u]": goose,
	"KIT [ɪ]": kit,
	"LOT [ɑ]": lot,
	"MOUTH [aʊ]": mouth,
	"PRICE [aɪ]": price,
	"SCHWA [ə]": schwa,
	"STRUT [ʌ]": strut,
	"THOUGHT [ɔ]": thought,
	"TRAP [æ]": trap
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
