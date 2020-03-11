var highwayLayer; 

function removeHighwayData() {
    alert("Highway data will be removed");
    mymap.removeLayer(highwaylayer);
}

function getHighwayData() { 
    var layerURL = 
    "https://developer.cege.ucl.ac.uk:30297/getGeoJSON/london_highway/geom"; 
    $.ajax({url: layerURL, crossDomain: true,success: function(result){ 
        console.log(result); // check that the data is correct 

        // add the JSON layer onto the map - it will appear using the default icons 
        highwaylayer = L.geoJson(result).addTo(mymap); 

        // change the map zoom so that all the data is shown 
        mymap.fitBounds(highwaylayer.getBounds()); 
        } // end of the inner function 
   }); // end of the ajax request 

} // end of the getEarthquakeData function