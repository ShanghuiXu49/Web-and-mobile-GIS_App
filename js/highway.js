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

    var style1 = { 
        "color": "#ff4444", 
        "weight": 5, 
        "opacity": 0.65 
      }; 
    var style2 = { 
        "color": "#ffff44", 
        "weight": 5, 
        "opacity": 0.65 
      }; 
    var style3 = { 
        "color": "#114444", 
        "weight": 5, 
        "opacity": 0.65 
      };


        // load the geoJSON layer 
        highwaylayer = L.geoJSON().addTo(mymap);
        highwaylayer.addData(result);

        // iterate over the lines and set style depending on district
        highwaylayer.eachLayer(function(layer) { 
            console.log(layer);
            var nullName = false; 
            if (!layer.feature.properties.name){ 
                nullName = true; 
            } 
            switch (true) { 
                case (nullName === true): 
                    layer.setStyle(style3); 
                    break; 
                default: 
            // all streets with actual names 
            var highStreet = layer.feature.properties.name.toLowerCase().indexOf("high"); 
            switch (true) { 
                case (highStreet > -1) : 
                    layer.setStyle(style1); 
                    break; 
                default: 
                    layer.setStyle(style2); 
                } 
            }; // end outer switch
        });
        
        // change the map zoom so that all the data is shown 
            mymap.fitBounds(highRiskCrashZones.getBounds());
        } // end of the inner function
    }); // end of the ajax request
} // end of the get crash zones function