  // create a custom popup as a global variable
  var popup = L.popup();

  // create an event detector to wait for the user's click event and then use the popup to show them where they clicked 
  // note that you don't need to do any complicated maths to convert screen coordinates to real world coordiantes - the Leaflet API does this for you
  var earthquakeLayer; 
  function getEarthquakeData() { 
    var layerURL = 
      "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson"; 
    $.ajax({url: layerURL, crossDomain: true,success: function(result){ console.log(result); // check that the data is correct 

      // add the JSON layer onto the map - it will appear using the default icons 
      // load the geoJSON layer
      earthquakelayer = L.geoJson(result, 
      {
      // use point to layer to create the points
      pointToLayer: function (feature, latlng){
        // look at the GeoJSON file - specifically at the properties - to see the earthquake magnitude and use a different marker depending on this value 
        // also include a pop-up that shows the place value of the earthquakes
        if (feature.properties.mag > 1.75) {
          return L.marker(latlng,
          {icon:testMarkerRed}).bindPopup("<b>"+feature.properties.place +"</b>");
        }
        else {
        // magnitude is 1.75 or less
          return L.marker(latlng,
          {icon:testMarkerPink}).bindPopup("<b>"+feature.properties.place +"</b>");
        }
      }, // end of point to layer
    }).addTo(mymap);



      // change the map zoom so that all the data is shown 
      mymap.fitBounds(earthquakelayer.getBounds()); 
      } // end of the inner function 
    }); // end of the ajax request 
  } // end of the getEarthquakeData function

  function onMapClick(e) {
    popup
          .setLatLng(e.latlng) 
          .setContent("You clicked the map at " + e.latlng.toString()) 
          .openOn(mymap);
  }



  function loadLeafletMap() {
    mymap = L.map('mapid').setView([51.505, -0.09], 13);


  // now add the click event detector to the map 
  mymap.on('click', onMapClick);


  // now call the code to add the markers 
  addBasicMarkers();

  } //end code to add the leaflet map

  var testMarkerRed = L.AwesomeMarkers.icon({ 
    icon: 'play', 
    markerColor: 'red' 
  });
  var testMarkerPink = L.AwesomeMarkers.icon({
    icon: 'play', 
    markerColor: 'pink'
  });


  function addBasicMarkers() {
  // create a geoJSON feature -
  var geojsonFeature = {
    "type": "Feature",
    "properties": { 
      "name": "London", 
      "popupContent": "This is where UCL is based"
    },
    "geometry": { 
      "type": "Point", 
      "coordinates": [-0.133583, 51.524776] 
    } 
  }; 

  // and add it to the map 
  L.geoJSON(geojsonFeature).addTo(mymap).bindPopup("<b>"+geojsonFeature.properties.name+" "+geojsonFeature.properties.popupContent+"<b>");

  L.geoJSON(geojsonFeature, { 
    pointToLayer: function (feature, latlng) { 
      return L.marker(latlng, {icon:testMarkerPink});
    } 
  }).addTo(mymap).bindPopup("<b>"+geojsonFeature.properties.name+" "+geojsonFeature.properties.popupContent+"<b>");

  // add a point
  L.marker([51.5, -0.09]).addTo(mymap)
    .bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();

  // add a circle
  L.circle([51.508, -0.11], 500, {
     color: 'red', 
     fillColor: '#f03', 
     fillOpacity: 0.5
  }).addTo(mymap).bindPopup("I am a circle."); 

  // add a polygon with 3 end points (i.e. a triangle) 
  var myPolygon = L.polygon([ 
    [51.509, -0.08], 
    [51.503, -0.06], 
    [51.51, -0.047]
  ],{
    color: 'red', 
    fillColor: '#f03', 
    fillOpacity: 0.5 
  }).addTo(mymap).bindPopup("I am a polygon."); 
} // end code to add the basic markers
