//  MAP 1

let myMap = L.map('losangeles_sites').setView([34.0, -118.35], 10)

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
let plotsGroup = L.layerGroup().addTo(myMap)


// Add Income data GeoJSON
let income_LA = 'https://aprigozhina.github.io/macro/losangeles/income_LA.geojson'
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
		  		onEachFeature: incomePopUp
		 		}
				L.geoJSON(data, incomeOptions).addTo(myMap)
})

// add Income pop-ups
let incomePopUp = function (feature, layer) {
			let householdMedianIncome = feature.properties.Households_Median_income
			 	layer.bindPopup('Median Households Income: ' + householdMedianIncome)
		incomeLAGroup.addLayer(layer)
 }


// Add Redidential Sites GeoJSON
let residentialSites = 'https://aprigozhina.github.io/macro/losangeles/residential_sites.geojson'
jQuery.getJSON(residentialSites, function (data){
	residentialPoints = L.geoJson(data, {
		onEachFeature: residentialPopUp,
		 pointToLayer: function(feature,latlng){
			 var colors
			 return L.circleMarker(latlng, {
				 radius: 7,
				 fillColor: '#045a8d',
				 color: '#045a8d',
				 weight: 1,
				 opacity: 1,
				 fillOpacity: 0.7,
				 clickable: true
			 });
		 }
 }).addTo(myMap)
})

// add pop-ups
let residentialPopUp = function (feature, layer) {
		 let residentialType = feature.properties.Type
		 let residentialName = feature.properties.Name
		 let residentialZIP = feature.properties.ZIP
		 let residentialLawns = feature.properties.Nomber_lawns
		 let residentialYard = feature.properties.Yard_type
			 layer.bindPopup(
				 '<b>Plot type: </b>' + residentialType +
				 '<br><b>Name: </b>' + residentialName +
				 '<br><b>ZIP code: </b>' + residentialZIP +
				 '<br><b>Number of lawns: </b>' + residentialLawns +
				 '<br><b>Yard type: </b>' + residentialYard)
	 plotsGroup.addLayer(layer)
 }


// Add Inderstitial Sites GeoJSON
let interstitialSites = 'https://aprigozhina.github.io/macro/losangeles/interstitial_sites.geojson'
jQuery.getJSON(interstitialSites, function (data){
	interstitialPoints = L.geoJson(data, {
		onEachFeature: interstitialPopUp,
		 pointToLayer: function(feature,latlng){
			 var colors
			 return L.circleMarker(latlng, {
				 radius: 7,
				 fillColor: '#31a354',
				 color: '#31a354',
				 weight: 1,
				 opacity: 1,
				 fillOpacity: 0.7,
				 clickable: true
			 });
		 }
 }).addTo(myMap)
})

// add pop-ups
let interstitialPopUp = function (feature, layer) {
		 let interstitialType = feature.properties.Type
		 let interstitialName = feature.properties.Name
			 layer.bindPopup(
				 '<b>Plot type: </b>' + interstitialType +
				 '<br><b>Name: </b>' + interstitialName
				)
	 plotsGroup.addLayer(layer)
 }

 // Add Reference Sites GeoJSON
 let referenceSites = 'https://aprigozhina.github.io/macro/losangeles/reference_sites.geojson'
 jQuery.getJSON(referenceSites, function (data){
 	referencePoints = L.geoJson(data, {
 		onEachFeature: referencePopUp,
 		 pointToLayer: function(feature,latlng){
 			 var colors
 			 return L.circleMarker(latlng, {
 				 radius: 7,
 				 fillColor: '#810f7c',
 				 color: '#810f7c',
 				 weight: 1,
 				 opacity: 1,
 				 fillOpacity: 0.7,
 				 clickable: true
 			 });
 		 }
  }).addTo(myMap)
 })

 // add pop-ups
 let referencePopUp = function (feature, layer) {
 		 let referenceType = feature.properties.Type
 		 let referenceName = feature.properties.Name
 			 layer.bindPopup(
 				 '<b>Plot type: </b>' + referenceType +
 				 '<br><b>Name: </b>' + referenceName
 				)
 	 plotsGroup.addLayer(layer)
  }





// add layer control
let basemaps = {
  'OpenStreetMap': openStreetMap,
	'ESRI Imagery': esri_WorldImagery,
  'ESRI Topo Map': esriWorldTopoMap
}

let layers = {
	'Median Income': incomeLAGroup,
	'Experimental Plots': plotsGroup
  }

L.control.layers(basemaps, layers).addTo(myMap)



//  MAP 2

let pMap = L.map('losangeles_parking').setView([34.0, -118.35], 10)

// Basemap tiles
let openStreetMap2 = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(pMap)

let parkingGroup = L.layerGroup().addTo(pMap)

// Add Parking locations GeoJSON
let parkingSpots = 'https://aprigozhina.github.io/macro/losangeles/parking_spots.geojson'
jQuery.getJSON(parkingSpots, function (data){
	parkingPoints = L.geoJson(data, {
		onEachFeature: parkingPopUp,
		 pointToLayer: function(feature,latlng){
			 var colors
			 return L.circleMarker(latlng, {
				 radius: 7,
				 fillColor: '#045a8d',
				 color: '#045a8d',
				 weight: 1,
				 opacity: 1,
				 fillOpacity: 0.7,
				 clickable: true
			 });
		 }
 }).addTo(pMap)
})

// add pop-ups
let parkingPopUp = function (feature, layer) {
		 let parkingType = feature.properties.Type
		 let parkingName = feature.properties.Name
			 layer.bindPopup(
				 '<b>Plot type: </b>' + parkingType +
				 '<br><b>Name: </b>' + parkingName
				)
	parkingGroup.addLayer(layer)
 }
