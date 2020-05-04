// Declare map variable
let myMap = L.map('map', {
	zoom: 10,
	center:[30.5, -91.1]//,
//	timeDimension: true,
//	timeDimensionOptions: {
//		timeInterval: "2020-05-03/2020-08-11",
//		period: "P1D"
//	},
//	timeDimensionControl: true
})

let myMap2 = L.map('map2', {
	zoom: 10,
	center:[30.5, -91.1]
})
// Basemap tiles
// let openStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
// 	maxZoom: 19,
// 	minZoom: 7,
// 	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(myMap)

let esriWorldTopoMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
	maxZoom: 19,
	minZoom: 7,
//	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
attribution: 'Tiles &copy; Esri'
}).addTo(myMap)

let esriWorldTopoMap2 = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
	maxZoom: 19,
	minZoom: 7,
//	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
attribution: 'Tiles &copy; Esri'
}).addTo(myMap2)

let blockGroupsLayer = L.layerGroup().addTo(myMap)
let blockGroupsLayer2 = L.layerGroup().addTo(myMap2)

// var wmsUrl = "http://thredds.socib.es/thredds/wms/observational/hf_radar/hf_radar_ibiza-scb_codarssproc001_aggregation/dep0001_hf-radar-ibiza_scb-codarssproc001_L1_agg.nc"
// var wmsLayer = L.tileLayer.wms(wmsUrl, {
//     layers: 'sea_water_velocity',
//     format: 'image/png',
//     transparent: true,
//     attribution: 'SOCIB HF RADAR | sea_water_velocity'
// });


// Block Groups
let bgUrl = 'https://aprigozhina.github.io/EBR/EbrEpid.geojson'
jQuery.getJSON(bgUrl, function (data) {
	let blockGroups = function (feature) {
			let infected = feature.properties.I1 * 1000 / feature.properties.Population
			let baseColor = '#bd0026'
				if (infected < 150) { baseColor = '#f03b20' }
				if (infected < 100) { baseColor = '#fd8d3c' }
				if (infected < 65) { baseColor = '#fecc5c' }
				if (infected < 40) { baseColor = '#ffffb2' }
						return {
							fillColor: baseColor,
							color: '#808B96',
						 	weight: 1,
						 	fillOpacity: 0.8,
						}
		}
				let blockGroupsOptions = {
					style: blockGroups,
		  		onEachFeature: onEachFeature
		 		}
	L.geoJSON(data, blockGroupsOptions).addTo(myMap)
})

// add pop-ups Parishes names
let onEachFeature = function (feature, layer) {
			let parish = feature.properties.Parish
			let censusTract = feature.properties.CensusTrac
			let blockGroupName = feature.properties.BlockGroup
			let totalPop = feature.properties.Population
				layer.bindPopup(
				parish +
				'<br>' + censusTract +
				'<br>' + blockGroupName +
				'<br>Total Population: ' + totalPop
				)
		blockGroupsLayer.addLayer(layer)
 }

 // Block Groups
 let bgUrl2 = 'https://aprigozhina.github.io/EBR/EbrEpid.geojson'
 jQuery.getJSON(bgUrl2, function (data) {
 	let blockGroups = function (feature) {
 			let infected = feature.properties.I100 * 1000 / feature.properties.Population
 			let baseColor = '#bd0026'
 				if (infected < 150) { baseColor = '#f03b20' }
 				if (infected < 100) { baseColor = '#fd8d3c' }
 				if (infected < 65) { baseColor = '#fecc5c' }
 				if (infected < 40) { baseColor = '#ffffb2' }
 						return {
 							fillColor: baseColor,
 							color: '#808B96',
 						 	weight: 1,
 						 	fillOpacity: 0.8,
 						}
 		}
 				let blockGroupsOptions2 = {
 					style: blockGroups,
 		  		onEachFeature: onEachFeature2
 		 		}
 	L.geoJSON(data, blockGroupsOptions2).addTo(myMap2)
 })

 // add pop-ups Parishes names
 let onEachFeature2 = function (feature, layer) {
 			let parish = feature.properties.Parish
 			let censusTract = feature.properties.CensusTrac
 			let blockGroupName = feature.properties.BlockGroup
 			let totalPop = feature.properties.Population
 				layer.bindPopup(
 				parish +
 				'<br>' + censusTract +
 				'<br>' + blockGroupName +
 				'<br>Total Population: ' + totalPop
 				)
 		blockGroupsLayer2.addLayer(layer)
  }

 // Create and add a TimeDimension Layer to the map
// let timeLayer = L.timeDimension.layer.geoJson(bgUrl, {
// 	updateTimeDimension: true,
//   duration: 'PT2M',
// 	updateTimeDimensionMode: 'replace',
//   addlastPoint: true
// });
// 	timeLayer.addTo(myMap);


//add layer control
// let basemaps = {
//   'OpenStreetMap': openStreetMap,
//   'Dark': cartoDB_DarkMatter,
//   'ESRI Topo Map': esriWorldTopoMap
// }

// let layers = {
//   'Males to Females Ratio': genderRatio
// }

//L.control.layers(basemaps).addTo(myMap)
//L.control.attribution().addTo(myMap)
