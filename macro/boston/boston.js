//  Fit the map to the map placeholder, determin a map variable, provide [x,y] coordinates of center point and default scale level
let myMap = L.map('boston_sites').setView([42.3, -71.0], 10)

// Basemap tiles - add basemaps from free of charge sources
let openStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	minZoom: 4,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap)
let esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	minZoom: 4,
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
}).addTo(myMap);
let esriWorldTopoMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
	minZoom: 4,
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
}).addTo(myMap);

// Create layer groups
let plotsGroup = L.layerGroup().addTo(myMap)

// Create panes to determin layers order (markers on top of a choropleth)
myMap.createPane('markers')
myMap.getPane('markers').style.zIndex = 650

let allSites = 'https://aprigozhina.github.io/macro/sites_all.geojson'
jQuery.getJSON(allSites, function (data){
	points = L.geoJson(data, {
		onEachFeature: sitesPopUp,
		filter: function (feature, layer) {
			if (feature.properties.city === "Boston") { return true } // Filters objects from this city from a whole set
		},
		pointToLayer: function(feature,latlng){ // Shows colored markers, the color depends on object properties
			var objectType = feature.properties.treatment
			var colors
			if (objectType === "High management") { colors = "#165228" }
			if (objectType === "Low management") { colors = "#16B281" }
			if (objectType === "Reference") { colors = "#810f7c" }
			if (objectType === "Interstitial") { colors = "#af8dc3" }
			if (objectType === "Wildlife") { colors = "#f1a340" }
			if (objectType === "Hydrology") { colors = "#045a8d" }
			return L.circleMarker(latlng, {
				radius: 7,
				fillColor: colors,
				color: colors,
				weight: 1,
				opacity: 1,
				fillOpacity: 0.7,
				clickable: true,
				pane: 'markers'
			})
		}
	}).addTo(myMap)
})

// add pop-ups
let sitesPopUp = function (feature, layer) {
	let siteType = feature.properties.treatment
	let siteName = feature.properties.name
	let siteID = feature.properties.id
	let siteContact = feature.properties.pi_contact
	layer.bindPopup(
		'<b>Plot type: </b>' + siteType +
		'<br><b>Name: </b>' + siteName +
		'<br><b>ID: </b>' + siteID +
		'<br><b>PI contact: </b>' + siteContact)
		plotsGroup.addLayer(layer)
	}


	// add layer control
	let basemaps = {
		'OpenStreetMap': openStreetMap,
		'ESRI Imagery': esri_WorldImagery,
		'ESRI Topo Map': esriWorldTopoMap
	}

	let layers = {
		'Experimental Plots': plotsGroup
	}

	L.control.layers(basemaps, layers).addTo(myMap)
