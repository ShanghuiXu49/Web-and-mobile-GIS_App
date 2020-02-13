 
  var mymap; // global variable to store the map
  var earthquakeLayer;

  
  
  function getEarthquakeData() { 
    var layerURL = 
      "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson"; 
    $.ajax({url: layerURL, crossDomain: true,success: function(result){ console.log(result);  
      earthquakelayer = L.geoJson(result, 
      {     
      pointToLayer: function (feature, latlng){
        if (feature.properties.mag > 1.75) {
          return L.marker(latlng,
          {icon:testMarkerRed}).bindPopup("<b>"+feature.properties.place +"</b>");
        }
        else {
          return L.marker(latlng,
          {icon:testMarkerPink}).bindPopup("<b>"+feature.properties.place +"</b>");
        }
      }, 
    }).addTo(mymap);



 
      mymap.fitBounds(earthquakelayer.getBounds()); 
      } 
    });  
  } 

  var testMarkerRed = L.AwesomeMarkers.icon({ 
    icon: 'play', 
    markerColor: 'red' 
  });
  var testMarkerPink = L.AwesomeMarkers.icon({
    icon: 'play', 
    markerColor: 'pink'
  });



