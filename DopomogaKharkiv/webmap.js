let myMap = L.map('map').setView([50, 36.2], 11)

// Basemap tiles
let openStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  minZoom: 3,
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap)

// let esriWorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
//   minZoom: 3,
//   maxZoom: 19,
//   attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
// }).addTo(myMap)

// Set extend limits
// let southWest = L.latLng(55, 36)
// let northEast = L.latLng(56.5, 39)
// let bounds = L.latLngBounds(southWest, northEast)
// myMap.setMaxBounds(bounds)
// myMap.on('drag', function () {
//   myMap.panInsideBounds(bounds, { animate: true })
// })

// Create layer groups
let muniGroup = L.layerGroup()
let muniDEGGroup = L.layerGroup().addTo(myMap)

// Add GeoJSON data
let muniURL = './Msk_municipal_for_elections.geojson' // путь к файлу  JSON с результатами голосования на участках

// Polygon layer
jQuery.getJSON(muniURL, function (data) {
  let muniStyle = function (feature) {
    let electionResults = feature.properties.Results
    let municolor = '#004054' // Административный кандидат
    if (electionResults === 'УГ') { municolor = '#00AAE0' } // Кандидат от УГ
    if (electionResults === 'Нет результата') { municolor = 'grey' } // Выборы не проводились
    return {
      fillColor: municolor,
      color: municolor,
      weight: 0.7,
      fillOpacity: 0.7
    }
  }
  let muniOptions = {
    style: muniStyle,
    onEachFeature: onEachFeature
  }
  L.geoJSON(data, muniOptions).addTo(muniGroup)
})

jQuery.getJSON(muniURL, function (data) {
  let muniStyle = function (feature) {
    let electionResults = feature.properties.ResultsDEG
    let municolor = '#004054' // Административный кандидат
    if (electionResults === 'УГ') { municolor = '#00AAE0' } // Кандидат от УГ
    if (electionResults === 'Нет результата') { municolor = 'grey' } // Выборы не проводились
    return {
      fillColor: municolor,
      color: municolor,
      weight: 0.7,
      fillOpacity: 0.7
    }
  }
  let muniOptions = {
    style: muniStyle,
    onEachFeature: onEachFeature
  }
  L.geoJSON(data, muniOptions).addTo(muniDEGGroup)
})

// add pop-ups
let onEachFeature = function (feature, layer) {
  let areaName = feature.properties.name_short
  layer.bindPopup(
    '<b>Район: </b>' + areaName
  )
  muniGroup.addLayer(layer)
}

// add legend
// let legend = L.control({ position: 'bottomright' })
//
// legend.onAdd = function (map) {
//   let div = L.DomUtil.create('div', 'legend')
//
//   div.innerHTML += '<i style="background: #00AAE0"></i><span>Кандидат Умного голосования</span><br>'
//   div.innerHTML += '<i style="background: #004054"></i><span>Административный кандидат</span><br>'
//
//   return div
// }

// legend.addTo(myMap)

// add layer control
let baseLayers = {
  'Показать космический снимок': esriWorldImagery,
  'Показать базовую карту': openStreetMap
}

let groupedOverlays = {
  '<span class= "layerNames"> Результаты выборов</span>': {
    '<span class= "layerNames">Без электронного голосования</span>': muniGroup,
    '<span class= "layerNames">После подсчета электронного голосования</span>': muniDEGGroup
  }
}

let options = {
  // Make the group exclusive (use radio inputs)
  exclusiveGroups: ['<span class= "layerNames"> Результаты выборов</span>'],
  hideSingleBase: true,
  collapsed: false
}
