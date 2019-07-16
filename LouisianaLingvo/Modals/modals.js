let myMap = L.map('modals').setView([31.00, -93.00], 7)

// Basemap tiles
let OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	minZoom: 6,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap)

// set variables for layer-control and info pane
let survey1 = L.layerGroup().addTo(myMap)
let survey2 = L.layerGroup().addTo(myMap)
let survey3 = L.layerGroup().addTo(myMap)
let survey4 = L.layerGroup().addTo(myMap)
let parishesLayer = L.layerGroup().addTo(myMap)
let zipCodeLayer = L.layerGroup().addTo(myMap)

// create panes
myMap.createPane('markers')
myMap.getPane('markers').style.zIndex = 650

// variables for markers
var answerYY = L.icon({
	iconUrl: 'https://aprigozhina.github.io/LouisianaLingvo/Modals/yesyes.png',
	iconSize: [16, 16]
});
var answerYN = L.icon({
	iconUrl: 'https://aprigozhina.github.io/LouisianaLingvo/Modals/yesno.png',
	iconSize: [16, 16]
});
var answerNY = L.icon({
	iconUrl: 'https://aprigozhina.github.io/LouisianaLingvo/Modals/noyes.png',
	iconSize: [16, 16]
});
var answerNN = L.icon({
	iconUrl: 'https://aprigozhina.github.io/LouisianaLingvo/Modals/nono.png',
	iconSize: [16, 16]
});

// Add GeoJSON with markers
// Layer 1
let lingvoData = 'https://aprigozhina.github.io/LouisianaLingvo/Modals/adverbs.geojson'
jQuery.getJSON(lingvoData, function (data) {
	answerSet1 = L.geoJson(data, {
		onEachFeature: onEachFeature1,
		pointToLayer: function (feature, latlng) {
				var markerType = feature.properties.marker_type
				if (markerType === 1) { return L.marker(latlng, { icon: answerYY }) }
				if (markerType === 2) { return L.marker(latlng, { icon: answerYN }) }
				if (markerType === 3) { return L.marker(latlng, { icon: answerNY }) }
				if (markerType === 4) { return L.marker(latlng, { icon: answerNN }) }
					pane: 'markers'
		}
	})
})

// Layer 2
let lingvoData2 = 'https://aprigozhina.github.io/LouisianaLingvo/Modals/negations.geojson'
jQuery.getJSON(lingvoData2, function (data) {
	answerSet2 = L.geoJson(data, {
		onEachFeature: onEachFeature2,
		pointToLayer: function (feature,latlng){
			var markerType = feature.properties.marker_type
			if (markerType === 1) { return L.marker(latlng, { icon: answerYY }) }
			if (markerType === 2) { return L.marker(latlng, { icon: answerYN }) }
			if (markerType === 3) { return L.marker(latlng, { icon: answerNY }) }
			if (markerType === 4) { return L.marker(latlng, { icon: answerNN }) }
				pane: 'markers'
		}
	})
})

// Layer 3
let lingvoData3 = 'https://aprigozhina.github.io/LouisianaLingvo/Modals/questions.geojson'
jQuery.getJSON(lingvoData3, function (data) {
	answerSet3 = L.geoJson(data, {
		onEachFeature: onEachFeature3,
		pointToLayer: function(feature,latlng){
			var markerType = feature.properties.marker_type
			if (markerType === 1) { return L.marker(latlng, { icon: answerYY }) }
			if (markerType === 2) { return L.marker(latlng, { icon: answerYN }) }
			if (markerType === 3) { return L.marker(latlng, { icon: answerNY }) }
			if (markerType === 4) { return L.marker(latlng, { icon: answerNN }) }
				pane: 'markers'
			}
	})
})

// Layer 4
let lingvoData4 = 'https://aprigozhina.github.io/LouisianaLingvo/Modals/double.geojson'
jQuery.getJSON(lingvoData4, function (data) {
	answerSet4 = L.geoJson(data, {
		 onEachFeature: onEachFeature4,
			pointToLayer: function (feature,latlng){
			var colors = {
					"TRUE": "#1A9850",
					"FALSE": "#D73027"
			};
			return L.circleMarker(latlng, {
				radius: 7,
				fillColor: colors[feature.properties.acceptability],
				color: colors[feature.properties.acceptability],
				weight: 1,
				opacity: 1,
				fillOpacity: 0.7,
				clickable: true,
				pane: 'markers'
			});
		}
	})
})

// Parishes
let parishUrl = 'https://aprigozhina.github.io/LouisianaLingvo/ParishSimple.geojson'
jQuery.getJSON(parishUrl, function (data) {
	let parishes = function (feature) {
			let parishColor = '#6867F1'
						return {
							fillColor: parishColor,
							color: '#808B96',
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

// add pop-ups Parishes names
let onEachFeature6 = function (feature, layer) {
			let name = feature.properties.NAMELSAD
				 	layer.bindPopup(name)
		parishesLayer.addLayer(layer)
 }

// ZIP codes
let zipUrl = 'https://aprigozhina.github.io/LouisianaLingvo/ZIPSimple.geojson'
jQuery.getJSON(zipUrl, function (data) {
 	let zipCodes = function (feature) {
 			let zipColor = '#3360A3'
 						return {
 							fillColor: zipColor,
 							color: '#808B96',
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

 // add pop-ups ZIP codes
 let onEachFeature7 = function (feature, layer) {
 			let name = feature.properties.ZIP
 				 	layer.bindPopup('ZIP: ' + name)
 		zipCodeLayer.addLayer(layer)
  }

// make highlight and restore
function onEachFeature1 (feature, layer){
	layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlight
	})
	survey1.addLayer(layer)
}

function onEachFeature2(feature, layer){
	layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlight
	})
		survey2.addLayer(layer)
}

function onEachFeature3(feature, layer){
	layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlight
	})
	survey3.addLayer(layer)
}

function onEachFeature4(feature, layer){
	layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlight
	})
		survey4.addLayer(layer)
}

function highlightFeature(e) {
    var layer = e.target
    	// layer.setStyle({
      //   weight: 2,
      //   color: '#717D7E',
      //   fillOpacity: 0.7
    	// })
    	// if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      // layer.bringToFront()
    	//}
		info.update(layer.feature.properties)
}

function resetHighlight(e) {
    answerSet1.resetStyle(e.target),
		answerSet2.resetStyle(e.target),
		answerSet3.resetStyle(e.target),
		answerSet4.resetStyle(e.target)
		info.update()
}

// add layer control
let baseLayers = {
}

let overlays = {
	"Adverbs": survey1,
	"Negations": survey2,
	"Questions": survey3,
	"Double Modals": survey4,
	"Parishes": parishesLayer,
	"ZIP codes": zipCodeLayer,
	"Base Map": OpenStreetMap_Mapnik
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

// update the infoPad based on feature properties
info.update = function (props) {
    this._div.innerHTML = '<h4>Double Modals Survey</h4>' +  (props ?
        '<b>Adverbs / Negations Intervening Acceptability: </b>' + props.question1 +
				'<br><b>Adverbs / Negations Following Acceptability: </b>' + props.question2 +
				'<br><b>Questions Single Modal Intervening Acceptability: </b>' + props.single +
				'<br><b>Questions Both Modals Acceptability: </b>' + props.both +
				'<br><b>Double Modals Acceptability: </b>' + props.acceptability +
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
