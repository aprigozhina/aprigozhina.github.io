let myMap = L.map('macrosystems').setView([34.0, -118.25], 10)

// Basemap tiles
let openStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap)
let esriWorldTopoMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
}).addTo(myMap);

let genderRatio = L.layerGroup().addTo(myMap)

// Add Income data GeoJSON
let income_LA = 'https://aprigozhina.github.io/macrosystems/income_LA.geojson'
jQuery.getJSON(income_LA, function (data){
L.geoJSON(data).addTo(myMap)
})
// Add GeoJSON data
let stateDemographicsUrl = 'https://geog4046.github.io/portfolio/data/us_state_demographics_ESRI_2010A.geojson'
jQuery.getJSON(stateDemographicsUrl, function (data) {
	let stateStyle = function (feature) { // this function returns an object
		let males = feature.properties.MALES
		let females = feature.properties.FEMALES
			let genderComposition = males / females * 100
			let stateColor = '#bdc9e1'
				if ( genderComposition < 100 ) {stateColor = '#67a9cf'}
				if ( genderComposition < 97 ) { stateColor = '#02818a' }
						return {
							fillColor: stateColor,
							color: stateColor, //use the color variable above for the value
						 	weight: 1,
						 	fillOpacity: 0.4,
						 	dashArray: '3'
						}
		}
				let stateGeojsonOptions = {
					style: stateStyle,
		  		onEachFeature: onEachFeature
		 		}
	L.geoJSON(data, stateGeojsonOptions).addTo(myMap)
})

// add pop-ups
let onEachFeature = function (feature, layer) {
			let name = feature.properties.STATE_NAME
			let males = feature.properties.MALES
			let females = feature.properties.FEMALES
			let genderComposition = males / females * 100
			let genderCompositionRound = Math.round(genderComposition)
			 	layer.bindPopup('Males to females ratio of ' + name + ': ' + genderCompositionRound + '%' + '<br>National average: 97%')
		genderRatio.addLayer(layer)
 }

// add layer control
 let basemaps = {
  'OpenStreetMap': openStreetMap,
  'ESRI Topo Map': esriWorldTopoMap,
}

let layers = {
  'Males to Females Ratio': genderRatio
}

L.control.layers(basemaps, layers).addTo(myMap)
