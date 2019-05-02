let myMap = L.map('losangeles_sites').setView([34.0, -118.3], 10)

// Basemap tiles
let openStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap)
let esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
}).addTo(myMap);
let esriWorldTopoMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
}).addTo(myMap);

let incomeLAGroup = L.layerGroup().addTo(myMap)

// Add Income data GeoJSON
let income_LA = 'https://aprigozhina.github.io/macrosystems/losangeles/income_LA.geojson'
jQuery.getJSON(income_LA, function (data){
	let tractStyle = function (feature) { // this function returns an object
		let householdMedianIncome = feature.properties.Households_Median_income
				let tractColor = '#bd0026'
				if ( householdMedianIncome < 250000 ) { tractColor = '#f03b20'}
				if ( householdMedianIncome < 200000 ) { tractColor = '#fd8d3c' }
				if ( householdMedianIncome < 150000 ) { tractColor = '#feb24c' }
				if ( householdMedianIncome < 100000 ) { tractColor = '#fed976' }
				if ( householdMedianIncome < 50000 ) { tractColor = '#ffffb2' }
				if ( householdMedianIncome < 5000 ) { tractColor = '#636363' }
						return {
							fillColor: tractColor,
							color: tractColor, //use the color variable above for the value
						 	weight: 1,
						 	fillOpacity: 0.5,
						}
		}
				let incomeOptions = {
					style: tractStyle,
		  		onEachFeature: onEachFeature
		 		}
L.geoJSON(data, incomeOptions).addTo(myMap)
})
// Add GeoJSON data
// let stateDemographicsUrl = 'https://geog4046.github.io/portfolio/data/us_state_demographics_ESRI_2010A.geojson'
// jQuery.getJSON(stateDemographicsUrl, function (data) {
// 	let stateStyle = function (feature) { // this function returns an object
// 		let males = feature.properties.MALES
// 		let females = feature.properties.FEMALES
// 			let genderComposition = males / females * 100
// 			let stateColor = '#bdc9e1'
// 				if ( genderComposition < 100 ) {stateColor = '#67a9cf'}
// 				if ( genderComposition < 97 ) { stateColor = '#02818a' }
// 						return {
// 							fillColor: stateColor,
// 							color: stateColor, //use the color variable above for the value
// 						 	weight: 1,
// 						 	fillOpacity: 0.4,
// 						 	dashArray: '3'
// 						}
// 		}
// 				let stateGeojsonOptions = {
// 					style: stateStyle,
// 		  		onEachFeature: onEachFeature
// 		 		}
// 	L.geoJSON(data, stateGeojsonOptions).addTo(myMap)
// })

// add pop-ups
let onEachFeature = function (feature, layer) {
			let householdMedianIncome = feature.properties.Households_Median_income
			 	layer.bindPopup('Median Households Income:' + householdMedianIncome)
		incomeLAGroup.addLayer(layer)
 }

// add layer control
let basemaps = {
  'OpenStreetMap': openStreetMap,
	'ESRI Imagery': esri_WorldImagery,
  'ESRI Topo Map': esriWorldTopoMap
}

let layers = {
  'Median Income': incomeLAGroup
}

L.control.layers(basemaps, layers).addTo(myMap)
