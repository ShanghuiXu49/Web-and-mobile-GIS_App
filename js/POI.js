// load the POI layer
var POIlayer;

function removePOIData() {
    alert("POI data will be removed");
    mymap.removeLayer(POIlayer);
}

function getPOIData() {
	var layerURL =
	"https://developer.cege.ucl.ac.uk:30297/getPOI";
	$.ajax({url: layerURL, crossDomain: true,success: function(result){
		console.log(result); // check that the data is correct

		// add the JSON layer onto the map - it will appear using the default icons
		POIlayer = L.geoJson(result).addTo(mymap);

		// change the map zoom so that all the data is shown
		mymap.fitBounds(POIlayer.getBounds());
		} // end of the inner function
	}); // end of the ajax request
} // end of the getEarthquakeData function