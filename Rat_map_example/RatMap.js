var myMap = L.map('RatMap').setView([42.35, -71.08], 13)

// Add a basemap
L.tileLayer('http://tiles.mapc.org/basemap/{z}/{x}/{y}.png',
	 {
		 attribution: 'Tiles by <a href="http://mapc.org">MAPC</a>, Data by <a href="http://mass.gov/mgis">MassGIS</a>',
		 maxZoom: 17,
		 minZoom: 9
	 }).addTo(myMap)

	 // load GeoJSON from an external file
	  $.getJSON("rodents.geojson",function(data){
	    // add GeoJSON layer to the map once the file is loaded
	    L.geoJson(data).addTo(myMap);
	  });
