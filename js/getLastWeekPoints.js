function removeLastWeekPoints() {
    alert("Last week added question points will be removed");
    mymap.removeLayer(lastPointsLayer);
};

function getLastWeekPoints() {
    var serviceUrl = "https://developer.cege.ucl.ac.uk:"+ httpsPortNumberAPI + "/getLastWeekPoints";
   $.ajax({
    url: serviceUrl,
    crossDomain: true,
    type: "GET",
    success: function(result){
    	console.log(result); 
    	loadLastPointsData(result);
    }}); //end of the AJAX call
}// end of getLastWeekPoints

function processLastPointsData(result){
    var LastPointsData = result.responseText; 
    loadFormData(LastPointsData); 
}

// we can also use this to determine distance for the proximity alert
var lastPointsLayer;

function loadLastPointsData(result) {
// convert the text received from the server to JSON

// load the geoJSON layer
    lastPointsLayer = L.geoJson(result,
        {       

// use point to layer to create the points
            pointToLayer: function (feature, latlng)
            {
            // using the values in the data
            var htmlString = "<DIV id='popup'"+ feature.properties.id + "</h4><br>";
            htmlString = htmlString + "<h4>"+feature.properties.question_text + "</h4><br>";
            htmlString = htmlString + "</div>";
            return L.marker(latlng).bindPopup(htmlString);
            },
        }).addTo(mymap);
    mymap.fitBounds(lastPointsLayer.getBounds());
}