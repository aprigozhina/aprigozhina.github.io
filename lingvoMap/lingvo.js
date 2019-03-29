let myMap = L.map('lingvoMap').setView([40.00, -95.00], 4)

// Basemap tiles
var Esri_WorldTopoMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
}).addTo(myMap);

let lingvoData = 'https://aprigozhina.github.io/lingvoMap/data.geojson'
jQuery.getJSON(lingvoData, function (data) {
  L.geoJSON(data).addTo(myMap)
})
