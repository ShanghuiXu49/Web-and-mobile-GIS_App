var unansweredLayer;

function removeUnanswered() {
    alert("Unanswered Points will be removed");
    mymap.removeLayer(unansweredLayer);
};


function getUnanswered() {
    var serviceUrl = "https://developer.cege.ucl.ac.uk:"+ httpsPortNumberAPI + "/getUnanswered/" + httpsPortNumberAPI;
   $.ajax({
    url: serviceUrl,
    crossDomain: true,
    type: "GET",
    success: function(result){
        console.log(result); 
        loadUnanswered(result);
    }}); //end of the AJAX call
}// end of getCorrectAnswer

// we can also use this to determine distance for the proximity alert

var unansweredLayer;
function loadUnanswered(result) {

// load the geoJSON layer
    unansweredLayer = L.geoJson(result,
        {       

// use point to layer to create the points
            pointToLayer: function (feature, latlng)
            {
            // in this case, we build an HTML DIV string
            // using the values in the data
            var htmlString = "<DIV id='popup'"+ feature.properties.id + "><h2>" +
            feature.properties.question_title + "</h2><br>";
            htmlString = htmlString + "<h3>"+feature.properties.question_text +
            "</h3><br>";
            htmlString = htmlString + "<input type='radio' name='answer' id ='"+feature.properties.id+"_1'/>"+feature.properties.answer_1+"<br>";
            htmlString = htmlString + "<input type='radio' name='answer' id ='"+feature.properties.id+"_2'/>"+feature.properties.answer_2+"<br>";
            htmlString = htmlString + "<input type='radio' name='answer' id ='"+feature.properties.id+"_3'/>"+feature.properties.answer_3+"<br>";
            htmlString = htmlString + "<input type='radio' name='answer' id ='"+feature.properties.id+"_4'/>"+feature.properties.answer_4+"<br>";
            htmlString = htmlString + "<button onclick='checkAnswer(" + feature.properties.id + ");return false;'>Submit Answer</button>";
            // now include a hidden element with the answer
            // in this case the answer is alwasy the first choice
            // for the assignment this will of course vary - you can use feature.properties.correct_answer
            htmlString = htmlString + "<div id=answer" + feature.properties.id + " hidden>" + feature.properties.correct_answer + "</div>";
            htmlString = htmlString + "</div>";
            return L.marker(latlng, {icon: testMarkerBlue}). bindPopup(htmlString);
            },
        }).addTo(mymap);
    mymap.fitBounds(unansweredLayer.getBounds());
    getUnansweredDistance();
};


// Calculate the distance from the user to quiz points
function getUnansweredDistance() {
    navigator.geolocation.getCurrentPosition(closestFormUnansweredPoint);
}

// The closestFormUnansweredPoint function is used to achieve Proximity Alert
function closestFormUnansweredPoint(position) {
    // take the leaflet formdata layer
    // go through each point one by one
    // and measure the distance to Warren Street
    // for the closest point show the pop up of that point
    var minDistance = 10;
    var closestFormUnansweredPoint = 0;

    // for this example, use the latitude/longitude of warren street
    // in your assignment replace this with the user's location    var userlng = -0.139924;
    unansweredLayer.eachLayer(function(layer) {
        var distance = calculateDistance(position.coords.latitude, position.coords.longitude,layer.getLatLng().lat, layer.getLatLng().lng, 'K');
        if (distance < minDistance){
            minDistance = distance;
            closestFormUnansweredPoint = layer.feature.properties.id;
        }
    });
            // for this to be a proximity alert, the minDistance must be
            // closer than a given distance - you can check that here
            // using an if statement
            // show the popup for the closest point
    unansweredLayer.eachLayer(function(layer) {
        if (layer.feature.properties.id == closestFormUnansweredPoint){
            layer.openPopup();

            // mymap.setView([position.coords.latitude, position.coords.longitude], 13);

        }
    });
}