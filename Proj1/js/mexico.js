var mymap = L.map('mapdiv')
mymap.setView([19.4, -99.1], 11)

var backgroundLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png')
mymap.addLayer(backgroundLayer)

var zocaloMarker = L.marker([19.43278, -99.13333])
zocaloMarker.addTo(mymap)
// zocaloMarker.bindPopup('Zocalo')

// var zocaloMarker = L.marker([19.43278, -99.13333]).addTo(mymap).bindPopup('Zocalo')

zocaloMarker.bindPopup("<h3 class='text-center'>Zocalo</h3><hr><a href='https://en.wikipedia.org/wiki/Z%C3%B3calo' target='blank'><img src=portaded.jpg' width='200px'></a>")

$('#zoomToZocalo').click(function () { // $ - choose DOM element , #element by id, click - method or event, function - what to perform
  mymap.setView([19.43278, -99.13333], 17) // variable mymap is a map object that has setView method
}) // use .click method instead of .on ('click')
// click is so popular, that in has each own method

// Shows Lat and Lon on the footer -
// event handler function, where "e" is an event
mymap.on('mousemove', function (e) { // choose variable, method and event
  var str = 'Latitude: ' + e.latlng.lat.toFixed(5) + ' Longitude: ' + e.latlng.lng.toFixed(5) + ' Zoom Level: ' + mymap.getZoom() //
  $('#map_coords').html(str) // select DOM element by ID, method html, replace by var str
})

// Adds a popup by mouse click
// mymap.on('click', function (e) { // choose variable, method and event
//   var mar = L.marker([e.latlng.lat, e.latlng.lng]).addTo(mymap)
//   mar.bindPopup('Latitude: ' + e.latlng.lat.toFixed(5) + '<br>Longitude: ' + e.latlng.lng.toFixed(5) + '<br>Zoom Level: ' + mymap.getZoom()) /
// })
