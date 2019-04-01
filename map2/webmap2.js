let myMap = L.map('map2').setView([31.00, -92.00], 7)

// Basemap tiles
var Esri_WorldTopoMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
}).addTo(myMap);

// Add web services (as pictures)
L.esri.featureLayer({
  url: 'https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/Public_Health_Departments/FeatureServer/0'
}).addTo(myMap)

L.esri.featureLayer({
  url: 'https://services9.arcgis.com/SDQDNhpG8jikA0D1/arcgis/rest/services/NewHIV/FeatureServer/0'
}).addTo(myMap)
