// load the POI layer
var POIlayer;

function removePOIData() {
    alert("POI data will be removed");
    mymap.removeLayer(POIlayer);
}

function getPOIData() {
    var testMarkerRed = L.AwesomeMarkers.icon({
        icon: 'play',
        markerColor: 'red'
    });
    var testMarkerBlack = L.AwesomeMarkers.icon({
        icon: 'play',
        markerColor: 'black'
    });


    var layerURL =
    "https://developer.cege.ucl.ac.uk:30297/getGeoJSON/london_poi/geom";
    $.ajax({url: layerURL, crossDomain: true,success: function(result){
        console.log(result); // check that the data is correct

        // add the JSON layer onto the map - it will appear using the default icons
        POIlayer = L.geoJson(result,
          {
            // use point to layer to create the points
            pointToLayer: function (feature, latlng) {
                var isParking = feature.properties.name.toLowerCase().indexOf("parking"); 
                console.log(isParking); 
                switch (true) { 
                    case (isParking > -1): 
                    return L.marker(latlng, 
                        {icon:testMarkerRed}).bindPopup("<b>"+feature.properties.name +"</b>"); 
                    break; 
                    default: 
                    return L.marker(latlng, 
                        {icon:testMarkerBlack}).bindPopup("<b>"+feature.properties.name +"</b>"); 
                    break; 
                }
            }// end of point to layer
        }).addTo(mymap);
        // change the map zoom so that all the data is shown
        mymap.fitBounds(POIlayer.getBounds());
        } // end of the inner function
    }); // end of the ajax request
} // end of the getEarthquakeData function