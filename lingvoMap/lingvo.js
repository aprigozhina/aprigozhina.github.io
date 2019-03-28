let myMap = L.map('map2').setView([31.00, -92.00], 7)

// Basemap tiles
var Esri_WorldTopoMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
}).addTo(myMap);
//
// var geojsonFeature = {
//     "type": "Feature",
//     "properties": {
//         "name": "Coors Field",
//         "amenity": "Baseball Stadium",
//         "popupContent": "This is where the Rockies play!"
//     },
//     "geometry": {
//         "type": "Point",
//         "coordinates": [-104.99404, 39.75621]
//     }
// };
// L.geoJSON(geojsonFeature).addTo(myMap)
//
//
// var data = fetchJSON('test.json')
//             .then(function(data) { return data })

// var = L.geoJSON(t2)
// 						L.geoJSON(t2).addTo(myMap);
//
var geojsonLayer = new L.GeoJSON.AJAX("t2.json");

						getJSON("t2.json", function(data) {
						    var geojson = L.geoJson(data, {
						      onEachFeature: function (feature, layer) {
						        layer.bindPopup(feature.properties.name);
						      }
						    });
						    var map = L.map('map2').fitBounds(geojson.getBounds());
						    geojson.addTo(myMap);
						  });
