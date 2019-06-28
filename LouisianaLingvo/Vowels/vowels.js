let myMap = L.map('vowels').setView([30.00, -91.00], 9)

// Basemap tiles
let OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap)

// set variables for layer-control and info pane
let migration = L.layerGroup().addTo(myMap)
let trap = L.layerGroup().addTo(myMap)
let dress = L.layerGroup()
let goose = L.layerGroup()
let face = L.layerGroup()
let fleece = L.layerGroup()
let foot = L.layerGroup()
let goat = L.layerGroup()
let kit = L.layerGroup()
let price = L.layerGroup()
let strut = L.layerGroup()
let lot = L.layerGroup()
let thought = L.layerGroup()
let mouth = L.layerGroup()
let schwa = L.layerGroup()
let parishesLayer = L.layerGroup().addTo(myMap)
let zipCodeLayer = L.layerGroup().addTo(myMap)

// create panes - defines layers order
myMap.createPane('markers')
myMap.getPane('markers').style.zIndex = 650

myMap.createPane('migrationLines')
myMap.getPane('migrationLines').style.zIndex = 640

myMap.createPane('parishesBelow')
myMap.getPane('parishesBelow').style.zIndex = 390

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

// Layer 1 DRESS
let dressUrl = 'https://aprigozhina.github.io/LouisianaLingvo/Vowels/dress.geojson'
jQuery.getJSON(dressUrl, function (data) {
	vowels = L.geoJson(data, {
		 onEachFeature: onEachFeature1,
			pointToLayer: function (feature,latlng) {
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
	})
})

// add pop-ups DRESS
let onEachFeature1 = function (feature, layer) {
			let speakerName = feature.properties.speaker
			let speakerGender = feature.properties.gender
			let speakerEthnicity = feature.properties.ethnicity
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
					'<br><b>Vowel: </b>' + vowel + ' [ɛ] ' +
					'<br><b>Word: </b>' + word + '<br>' + soundLynk +
					'<br><b>Word: </b>' + word2 + '<br>' + soundLynk2)
		dress.addLayer(layer)
 }

 // Layer 2 FACE
 let faceUrl = 'https://aprigozhina.github.io/LouisianaLingvo/Vowels/face.geojson'
 jQuery.getJSON(faceUrl, function (data) {
 	vowels = L.geoJson(data, {
 		 onEachFeature: onEachFeature2,
 			pointToLayer: function (feature,latlng) {
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
 	})
 })

 // add pop-ups FACE
 let onEachFeature2 = function (feature, layer) {
 			let speakerName = feature.properties.speaker
 			let speakerGender = feature.properties.gender
 			let speakerEthnicity = feature.properties.ethnicity
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
 					'<br><b>Vowel: </b>' + vowel + ' [e] ' +
 					'<br><b>Word: </b>' + word + '<br>' + soundLynk +
 					'<br><b>Word: </b>' + word2 + '<br>' + soundLynk2)
 		face.addLayer(layer)
  }

	// Layer 3 FLEECE
	let fleeceUrl = 'https://aprigozhina.github.io/LouisianaLingvo/Vowels/fleece.geojson'
	jQuery.getJSON(fleeceUrl, function (data) {
	 vowels = L.geoJson(data, {
			onEachFeature: onEachFeature3,
			 pointToLayer: function (feature,latlng) {
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
	 })
	})

	// add pop-ups FLEECE
	let onEachFeature3 = function (feature, layer) {
			 let speakerName = feature.properties.speaker
			 let speakerGender = feature.properties.gender
			 let speakerEthnicity = feature.properties.ethnicity
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
					 '<br><b>Vowel: </b>' + vowel + ' [i] ' +
					 '<br><b>Word: </b>' + word + '<br>' + soundLynk +
					 '<br><b>Word: </b>' + word2 + '<br>' + soundLynk2)
		 fleece.addLayer(layer)
	 }

	 // Layer 4 FOOT
 	let footUrl = 'https://aprigozhina.github.io/LouisianaLingvo/Vowels/foot.geojson'
 	jQuery.getJSON(footUrl, function (data) {
 	 vowels = L.geoJson(data, {
 			onEachFeature: onEachFeature4,
 			 pointToLayer: function (feature,latlng) {
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
 	 })
 	})

 	// add pop-ups FOOT
 	let onEachFeature4 = function (feature, layer) {
 			 let speakerName = feature.properties.speaker
 			 let speakerGender = feature.properties.gender
 			 let speakerEthnicity = feature.properties.ethnicity
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
 					 '<br><b>Vowel: </b>' + vowel + ' [ʊ] ' +
 					 '<br><b>Word: </b>' + word + '<br>' + soundLynk +
 					 '<br><b>Word: </b>' + word2 + '<br>' + soundLynk2)
 		 foot.addLayer(layer)
 	 }

	 // Layer 5 GOAT
 	let goatUrl = 'https://aprigozhina.github.io/LouisianaLingvo/Vowels/goat.geojson'
 	jQuery.getJSON(goatUrl, function (data) {
 	 vowels = L.geoJson(data, {
 			onEachFeature: onEachFeature5,
 			 pointToLayer: function (feature,latlng) {
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
 	 })
 	})

 	// add pop-ups GOAT
 	let onEachFeature5 = function (feature, layer) {
 			 let speakerName = feature.properties.speaker
 			 let speakerGender = feature.properties.gender
 			 let speakerEthnicity = feature.properties.ethnicity
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
 					 '<br><b>Vowel: </b>' + vowel + ' [o] ' +
 					 '<br><b>Word: </b>' + word + '<br>' + soundLynk +
 					 '<br><b>Word: </b>' + word2 + '<br>' + soundLynk2)
 		 goat.addLayer(layer)
 	 }

	 // Layer 6 GOOSE
 	let gooseUrl = 'https://aprigozhina.github.io/LouisianaLingvo/Vowels/goose.geojson'
 	jQuery.getJSON(gooseUrl, function (data) {
 	 vowels = L.geoJson(data, {
 			onEachFeature: onEachFeature6,
 			 pointToLayer: function (feature,latlng) {
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
 	 })
 	})

 	// add pop-ups GOOSE
 	let onEachFeature6 = function (feature, layer) {
 			 let speakerName = feature.properties.speaker
 			 let speakerGender = feature.properties.gender
 			 let speakerEthnicity = feature.properties.ethnicity
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
 					 '<br><b>Vowel: </b>' + vowel + ' [u] ' +
 					 '<br><b>Word: </b>' + word + '<br>' + soundLynk +
 					 '<br><b>Word: </b>' + word2 + '<br>' + soundLynk2)
 		 goose.addLayer(layer)
 	 }

	 // Layer 7 KIT
 	let kitUrl = 'https://aprigozhina.github.io/LouisianaLingvo/Vowels/kit.geojson'
 	jQuery.getJSON(kitUrl, function (data) {
 	 vowels = L.geoJson(data, {
 			onEachFeature: onEachFeature7,
 			 pointToLayer: function (feature,latlng) {
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
 	 })
 	})

 	// add pop-ups KIT
 	let onEachFeature7 = function (feature, layer) {
 			 let speakerName = feature.properties.speaker
 			 let speakerGender = feature.properties.gender
 			 let speakerEthnicity = feature.properties.ethnicity
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
 					 '<br><b>Vowel: </b>' + vowel + ' [ɪ] ' +
 					 '<br><b>Word: </b>' + word + '<br>' + soundLynk +
 					 '<br><b>Word: </b>' + word2 + '<br>' + soundLynk2)
 		 kit.addLayer(layer)
 	 }

	 // Layer 8 LOT
 	let lotUrl = 'https://aprigozhina.github.io/LouisianaLingvo/Vowels/lot.geojson'
 	jQuery.getJSON(lotUrl, function (data) {
 	 vowels = L.geoJson(data, {
 			onEachFeature: onEachFeature8,
 			 pointToLayer: function (feature,latlng) {
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
 	 })
 	})

 	// add pop-ups LOT
 	let onEachFeature8 = function (feature, layer) {
 			 let speakerName = feature.properties.speaker
 			 let speakerGender = feature.properties.gender
 			 let speakerEthnicity = feature.properties.ethnicity
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
 					 '<br><b>Vowel: </b>' + vowel + ' [ɑ] ' +
 					 '<br><b>Word: </b>' + word + '<br>' + soundLynk +
 					 '<br><b>Word: </b>' + word2 + '<br>' + soundLynk2)
 		 lot.addLayer(layer)
 	 }

	 // Layer 9 MOUTH
		let mouthUrl = 'https://aprigozhina.github.io/LouisianaLingvo/Vowels/mouth.geojson'
		jQuery.getJSON(mouthUrl, function (data) {
		 vowels = L.geoJson(data, {
				onEachFeature: onEachFeature9,
				 pointToLayer: function (feature,latlng) {
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
		 })
		})

		// add pop-ups MOUTH
		let onEachFeature9 = function (feature, layer) {
				 let speakerName = feature.properties.speaker
				 let speakerGender = feature.properties.gender
				 let speakerEthnicity = feature.properties.ethnicity
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
						 '<br><b>Vowel: </b>' + vowel + ' [aʊ] ' +
						 '<br><b>Word: </b>' + word + '<br>' + soundLynk
						// + '<br><b>Word: </b>' + word2 + '<br>' + soundLynk2
					)
			 mouth.addLayer(layer)
		 }

		 // Layer 10 PRICE
	 	let priceUrl = 'https://aprigozhina.github.io/LouisianaLingvo/Vowels/price.geojson'
	 	jQuery.getJSON(priceUrl, function (data) {
	 	 vowels = L.geoJson(data, {
	 			onEachFeature: onEachFeature10,
	 			 pointToLayer: function (feature,latlng) {
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
	 	 })
	 	})

	 	// add pop-ups PRICE
	 	let onEachFeature10 = function (feature, layer) {
	 			 let speakerName = feature.properties.speaker
	 			 let speakerGender = feature.properties.gender
	 			 let speakerEthnicity = feature.properties.ethnicity
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
	 					 '<br><b>Vowel: </b>' + vowel + ' [aɪ] ' +
	 					 '<br><b>Word: </b>' + word + '<br>' + soundLynk +
	 					 '<br><b>Word: </b>' + word2 + '<br>' + soundLynk2)
	 		 price.addLayer(layer)
	 	 }

		 // Layer 11 SCHWA
	 	let schwaUrl = 'https://aprigozhina.github.io/LouisianaLingvo/Vowels/schwa.geojson'
	 	jQuery.getJSON(schwaUrl, function (data) {
	 	 vowels = L.geoJson(data, {
	 			onEachFeature: onEachFeature11,
	 			 pointToLayer: function (feature,latlng) {
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
	 	 })
	 	})

	 	// add pop-ups SCHWA
	 	let onEachFeature11 = function (feature, layer) {
	 			 let speakerName = feature.properties.speaker
	 			 let speakerGender = feature.properties.gender
	 			 let speakerEthnicity = feature.properties.ethnicity
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
	 					 '<br><b>Vowel: </b>' + vowel + ' [ə] '
	 					// + '<br><b>Word: </b>' + word + '<br>' + soundLynk +
	 					// '<br><b>Word: </b>' + word2 + '<br>' + soundLynk2
					 )
	 		 schwa.addLayer(layer)
	 	 }

		 // Layer 12 STRUT
	 	let strutUrl = 'https://aprigozhina.github.io/LouisianaLingvo/Vowels/strut.geojson'
	 	jQuery.getJSON(strutUrl, function (data) {
	 	 vowels = L.geoJson(data, {
	 			onEachFeature: onEachFeature12,
	 			 pointToLayer: function (feature,latlng) {
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
	 	 })
	 	})

	 	// add pop-ups STRUT
	 	let onEachFeature12 = function (feature, layer) {
	 			 let speakerName = feature.properties.speaker
	 			 let speakerGender = feature.properties.gender
	 			 let speakerEthnicity = feature.properties.ethnicity
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
	 					 '<br><b>Vowel: </b>' + vowel + ' [ʌ] ' +
	 					 '<br><b>Word: </b>' + word + '<br>' + soundLynk +
	 					 '<br><b>Word: </b>' + word2 + '<br>' + soundLynk2)
	 		 strut.addLayer(layer)
	 	 }

		 // Layer 13 THOUGHT
	 	let thoughtUrl = 'https://aprigozhina.github.io/LouisianaLingvo/Vowels/thought.geojson'
	 	jQuery.getJSON(thoughtUrl, function (data) {
	 	 vowels = L.geoJson(data, {
	 			onEachFeature: onEachFeature13,
	 			 pointToLayer: function (feature,latlng) {
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
	 	 })
	 	})

	 	// add pop-ups THOUGHT
	 	let onEachFeature13 = function (feature, layer) {
	 			 let speakerName = feature.properties.speaker
	 			 let speakerGender = feature.properties.gender
	 			 let speakerEthnicity = feature.properties.ethnicity
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
	 					 '<br><b>Vowel: </b>' + vowel + ' [ɔ] ' +
	 					 '<br><b>Word: </b>' + word + '<br>' + soundLynk +
	 					 '<br><b>Word: </b>' + word2 + '<br>' + soundLynk2)
	 		 thought.addLayer(layer)
	 	 }

// Layer 14 TRAP
let trapUrl = 'https://aprigozhina.github.io/LouisianaLingvo/Vowels/trap.geojson'
jQuery.getJSON(trapUrl, function (data) {
	vowels = L.geoJson(data, {
		 onEachFeature: onEachFeature14,
		 // filter: filterGender,
		 // filter: function(feature, layer) {
			//  return (feature.porperties.verified !== "Female") ;
		 // },
			pointToLayer: function (feature,latlng) {
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
let onEachFeature14 = function (feature, layer) {
			let speakerName = feature.properties.speaker
			let speakerGender = feature.properties.gender
			let speakerEthnicity = feature.properties.ethnicity
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

// Parishes
let parishUrl = 'https://aprigozhina.github.io/LouisianaLingvo/ParishSimple.geojson'
	 jQuery.getJSON(parishUrl, function (data) {
	 	let parishes = function (feature) {
	 			let parishColor = '#bdc9e1'
	 						return {
	 							fillColor: parishColor,
	 							color: '#808B96',
	 						 	weight: 1,
	 						 	fillOpacity: 0.4,
	 						 	dashArray: '3',
								pane: 'parishesBelow'
	 						}
	 		}
	 		let parishesOptions = {
	 					style: parishes,
	 		  		onEachFeature: onEachFeature15
	 		}
	 	L.geoJSON(data, parishesOptions).addTo(myMap)
})

 // add pop-ups
 let onEachFeature15 = function (feature, layer) {
 			let name = feature.properties.NAMELSAD
 				 	layer.bindPopup(name)
 		parishesLayer.addLayer(layer)
  }

  // ZIP codes
let zipUrl = 'https://aprigozhina.github.io/LouisianaLingvo/ZIPSimple.geojson'
  jQuery.getJSON(zipUrl, function (data) {
  	let zipCodes = function (feature) {
  	let edIndex = feature.properties.EdIndex
  	//	let females = feature.properties.FEMALES
  	//		let genderComposition = males / females * 100
  			let zipColor = '#006d2c'
					if (edIndex < 0.5) { zipColor = '#2ca25f' }
					if (edIndex < 0.3) { zipColor = '#66c2a4' }
					if (edIndex < 0.2) { zipColor = '#b2e2e2' }
					if (edIndex < 0.1) { zipColor = '#edf8fb' }
  						return {
  							fillColor: zipColor,
  							color: '#808B96',
  						 	weight: 0.5,
  						 	fillOpacity: 0.4
  						}
  		}
  		let zipOptions = {
  					style: zipCodes,
  		  		onEachFeature: onEachFeature16
  		}
  	L.geoJSON(data, zipOptions).addTo(myMap)
})

  // add pop-ups
  let onEachFeature16 = function (feature, layer) {
  			let name = feature.properties.GEOID10
				let edIndex = Math.round(feature.properties.EdIndex * 100)
				let pop = feature.properties.Population
				let popNumber = pop.toLocaleString()
  				 	layer.bindPopup(
							'<b>ZIP: </b>' + name +
							'<br><b>Total Population: </b>' + popNumber +
							'<br><b>Education Index: </b>' + edIndex + '%'
						)
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
