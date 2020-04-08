function removeClosest5Points() {
    alert("Closest 5 Quiz Points will be removed");
    mymap.removeLayer(closestPointLayer);
};



function getClosest5Points() {
    var serviceUrl = "https://developer.cege.ucl.ac.uk:"+ httpsPortNumberAPI + "/getClosest5Points/" + user_longitude + '/'+ user_latitude;
   $.ajax({
    url: serviceUrl,
    crossDomain: true,
    type: "GET",
    success: function(result){
        console.log(result); 
        loadClosestPoint(result);
    }}); //end of the AJAX call
}// end of getCorrectAnswer

// we can also use this to determine distance for the proximity alert
var closestPointLayer;

function loadClosestPoint(result) {

// load the geoJSON layer
    questionLayer = L.geoJson(result,
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
            return L.marker(latlng, {icon: testMarkerOrange}). bindPopup(htmlString);
            },
        }).addTo(mymap);
    mymap.fitBounds(closestPointLayer.getBounds());
}