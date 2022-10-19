let myMap = L.map('map').setView([50, 36.2], 11)

// Basemap tiles
let openStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  minZoom: 3,
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap)

let esriWorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  minZoom: 3,
  maxZoom: 19,
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
}).addTo(myMap)

// Set extend limits
// let southWest = L.latLng(55, 36)
// let northEast = L.latLng(56.5, 39)
// let bounds = L.latLngBounds(southWest, northEast)
// myMap.setMaxBounds(bounds)
// myMap.on('drag', function () {
//   myMap.panInsideBounds(bounds, { animate: true })
// })

// // // // DATA SOURCES
// Create layer groups
let regionGroup = L.layerGroup().addTo(myMap)
let requestGroup = L.layerGroup().addTo(myMap)

// Add GeoJSON data
let regionURL = 'https://aprigozhina.github.io/DopomogaKharkiv/KharkivAndRegion.geoJSON' // путь к файлу  JSON с районами города и области
let requestURL = 'https://aprigozhina.github.io/DopomogaKharkiv/RequestsExample.geojson' // путь к файлу  JSON с таблицей заявок

// // // // REGIONS LAYER
jQuery.getJSON(regionURL, function (data) {
  let regionStyle = function (feature) {
    let regionColor = '#6867F1'
    return {
      fillColor: regionColor,
      color: regionColor,
      weight: 1,
      fillOpacity: 0
    }
  }
  let regionOptions = {
    style: regionStyle,
    onEachFeature: onEachFeature
  }
  regionNames = L.geoJSON(data, regionOptions).addTo(regionGroup)
})

// add pop-ups названия районов
// let onEachFeature = function (feature, layer) {
//   let name = feature.properties.name
//   let region = feature.properties.region
//   layer.bindPopup(
//     '<b>Район: </b>' + name +
//     '<br><b>Мiсто / область: </b>' + region
//   )
//   regionGroup.addLayer(layer)
// }

// make highlight and restore
function onEachFeature (feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight
  })
  regionGroup.addLayer(layer)
}
function highlightFeature (e) {
  let layer = e.target
  // layer.setStyle({
  //   weight: 2,
  //   color: '#717D7E',
  //   fillOpacity: 0.7
  // })
  // if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
  // layer.bringToFront()
  // }
  info.update(layer.feature.properties)
}
function resetHighlight (e) {
  regionNames.resetStyle(e.target)
  info.update()
}

// add info pane
let info = L.control({ position: 'bottomleft' })

info.onAdd = function (map) {
  this._div = L.DomUtil.create('div', 'info') // create a div with a class "info"
  this.update()
  return this._div
}

// update the infoPad based on feature properties
info.update = function (props) {
  this._div.innerHTML = '<h4>Мiсто і район</h4>' + (props ?
    '<b>Мiсто / область: </b>' + props.region +
    '<br><b>Район: </b>' + props.name
    : 'Розташування курсору')
}

info.addTo(myMap)

// // // // REQUESTS LAYER

let statusActive = {
  radius: 7,
  fillColor: '#045a8d',
  color: '#045a8d',
  weight: 1,
  opacity: 1,
  fillOpacity: 0.7,
  clickable: true
}

let statusDone = {
  radius: 7,
  fillColor: 'green',
  color: 'green',
  weight: 1,
  opacity: 1,
  fillOpacity: 0.7,
  clickable: true
}

let statusNotActive = {
  radius: 7,
  fillColor: 'grey',
  color: 'grey',
  weight: 1,
  opacity: 1,
  fillOpacity: 0.7,
  clickable: true
}

// let statusNotActive = L.icon({
//   iconUrl: 'https://aprigozhina.github.io/LouisianaLingvo/Modals/nono.png',
//   iconSize: [16, 16]
// })

jQuery.getJSON(requestURL, function (data) {
  requestsAll = L.geoJson(data, {
    onEachFeature: onEachFeatureRequests,
    pointToLayer: function (feature, latlng) {
      let markerType = feature.properties.status
      if (markerType === 'В роботі') { return L.circleMarker(latlng, statusActive) }
      if (markerType === 'Зроблено') { return L.circleMarker(latlng, statusDone) }
      if (markerType === 'Не дозвон') { return L.circleMarker(latlng, statusActive) }
      if (markerType === 'Не актуально') { return L.circleMarker(latlng, statusNotActive) }
      if (markerType === 'Виконано запит з їжі') { return L.circleMarker(latlng, statusDone) }
      if (markerType === 'Виконано запит з ліків') { return L.circleMarker(latlng, statusDone) }
      if (markerType === 'Частково виконано запит з ліків') { return L.circleMarker(latlng, statusActive) }
      if (markerType === 'Зроблено частково') { return L.circleMarker(latlng, statusActive) }
      if (markerType === 'Замовлено ліки') { return L.circleMarker(latlng, statusActive) }
      if (markerType === 'Замовлена частина ліків') { return L.circleMarker(latlng, statusActive) }
      if (markerType === 'Потребує повтору') { return L.circleMarker(latlng, statusDone) }
      if (markerType === 'Відмова') { return L.circleMarker(latlng, statusNotActive) }
      if (markerType === 'В роботі, виконано запит з їжі') { return L.circleMarker(latlng, statusActive) }
      if (markerType === 'В роботі, виконано запит з ліків') { return L.circleMarker(latlng, statusActive) }
      if (markerType === 'Актуально') { return L.circleMarker(latlng, statusActive) }
      // pane: 'markers'
    }
  }).addTo(requestGroup)
})

// add pop-ups к слою запросов
let onEachFeatureRequests = function (feature, layer) {
  let requestStatus = feature.properties.status
  let requestAddress = feature.properties.address
  let requestText = feature.properties.text
  let requestTag = feature.properties.tag
  let requestComment = feature.properties.volunteerComment
  let requestPatronizedExperience = feature.properties.patronizedExperience
  layer.bindPopup(
    '<b>Статус: </b>' + requestStatus +
    '<br><b>Адрес: </b>' + requestAddress +
    '<br><b>Текст: </b>' + requestText +
    '<br><b>Тег: </b>' + requestTag +
    '<br><b>Коментар волонтера: </b>' + requestComment +
    '<br><b>Досвід допомоги: </b>' + requestPatronizedExperience
  )
  regionGroup.addLayer(layer)
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
  'Показати космічний знімок': esriWorldImagery,
  'Показати базову карту': openStreetMap
}

let overlays = {
  'Райони': regionGroup,
  'Запити': requestGroup
}

L.control.layers(baseLayers, overlays, {
  hideSingleBase: true,
  collapsed: false
}).addTo(myMap)
