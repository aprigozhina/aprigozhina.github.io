let myMap = L.map('map1').setView([30.415, -91.175], 14)

// Basemap tiles
var OpenStreetMap_BlackAndWhite = L.tileLayer('https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Objects
	let geoBuild = L.marker([30.4117, -91.1788]).addTo(myMap)
	let urec = L.marker([30.4106, -91.1690]).addTo(myMap)
	let tigerMike = L.marker([30.4134, -91.1850]).addTo(myMap)
	let icc = L.marker([30.417, -91.1713]).addTo(myMap)
	let lake = L.polygon([
	  [30.4089, -91.17],
	  [30.4075, -91.1645],
	  [30.4143, -91.1581],
		[30.4280, -91.1654],
		[30.4295, -91.1687],
		[30.4220, -91.1693],
		[30.4192, -91.1714],
		[30.4093, -91.1665]
	]).addTo(myMap)
	let aroundRoad = [
	    [30.4134, -91.1850],
	    [30.4117, -91.1788],
	    [30.4106, -91.1690],
			[30.417, -91.1713]
	];
	let polyline = L.polyline(aroundRoad, {color: 'purple'}).addTo(myMap);

//PopUp notes
		lake.bindPopup('<i>University Lake</i>')
		geoBuild.bindPopup('<em>Department of Geography&Anthropology</em>')
		urec.bindPopup('<em>UREC</em>')
		tigerMike.bindPopup('<em>Mike the Tigers Habitat</em>')
		icc.bindPopup('<em>International Cultural Center</em>')
