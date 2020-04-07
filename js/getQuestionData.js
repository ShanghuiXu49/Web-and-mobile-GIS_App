var client;

function removeQuestionData() {
    alert("Question data will be removed");
    mymap.removeLayer(questionLayer);
};

function getQuestionData() {
    var serviceUrl = "https://developer.cege.ucl.ac.uk:"+ httpsPortNumberAPI + "/getQuestionData/" + httpsPortNumberAPI;
   $.ajax({
    url: serviceUrl,
    crossDomain: true,
    type: "GET",
    success: function(result){
        console.log(result); 
        loadQuestionData(result);
    }}); //end of the AJAX call
}// end of getCorrectAnswer

function processQuestionData(result){
    var questionData = result.responseText; 
    loadQuestionData(questionData); 
}

// we can also use this to determine distance for the proximity alert
var questionLayer;

function loadQuestionData(result) {

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
            return L.marker(latlng).bindPopup(htmlString);
            },
        }).addTo(mymap);
    mymap.fitBounds(questionLayer.getBounds());
}

var answer;
var correct_Answer;
var answerSelected;
var postString;
function checkAnswer(questionID) {
    // get the answer from the hidden div 
    // NB - do this BEFORE you close the pop-up as when you close the pop-up the DIV is destroyed 
    var answer=document.getElementById("answer"+questionID).innerHTML;
    // now check the question radio buttons 
    var correct_Answer = false; 
    var answerSelected = 0; 
    for (var i=1; i < 5; i++) { 
        if (document.getElementById(questionID+"_"+i).checked){ 
            answerSelected = i;
            postString = "port_id=" + httpsPortNumberAPI;
            postString = postString + '&question_id=' + questionID;
            postString = postString + "&answer_selected=" + i;
            postString = postString + '&correct_answer=' + answer;
            } 

        if ((document.getElementById(questionID+"_"+i).checked) && (i == answer)) { 
            alert ("Well done"); 
            correct_Answer = true;

            //Alert the correct answer number that the user get so far
            getCorrectAnswer();

            //Change the puiz point marker to green if the user answer is correct
            formLayer.eachLayer(function(layer){
                if (layer.feature.properties.id == questionID){
                    return L.marker([layer.getLatLng().lat, layer.getLatLng().lng], {icon: testMarkerGreen}).addTo(mymap); 
                }
            })
        }
    }
        if (correct_Answer === false) { 
            // they didn't get it right 
            alert("Better luck next time");

            //Alert the correct answer number that the user get so far
            getCorrectAnswer(); 
            
            //Change the puiz point marker to green if the user answer is correct
            formLayer.eachLayer(function(layer){
                if (layer.feature.properties.id == questionID){
                    return L.marker([layer.getLatLng().lat, layer.getLatLng().lng], {icon: testMarkerRed}).addTo(mymap); 
                }
            })
        }

    // now close the popup 
    mymap.closePopup();
    startAnswerupload()
    // the code to upload the answer to the server would go here 
    // call an AJAX routine using the data 
    // the answerSelected variable holds the number of the answer 
    //that the user picked 
}

function startAnswerupload() {
    alert ("start answer upload");
    alert (postString);
    processAnswers(postString);
}

function processAnswers(postString) {
    var serviceUrl= "https://developer.cege.ucl.ac.uk:"+ httpsPortNumberAPI+"/uploadAnswers"
   $.ajax({
    url: serviceUrl,
    crossDomain: true,
    type: "POST",
    success: function(data){console.log(data); answerUploaded(data);},
    data: postString
}); 
}

// create the code to process the response from the data server
function answerUploaded(data) {
    // change the DIV to show the response
    document.getElementById("dataUploadResult").innerHTML = JSON.stringify(data);
}


// The closestFormPoint function is used to achieve Proximity Alert
function closestFormPoint(position) {
    // take the leaflet formdata layer
    // go through each point one by one
    // and measure the distance to Warren Street
    // for the closest point show the pop up of that point
    var minDistance = 0.3;
    var closestFormPoint = 0;

    // for this example, use the latitude/longitude of warren street
    // in your assignment replace this with the user's location    var userlng = -0.139924;
    formLayer.eachLayer(function(layer) {
        var distance = calculateDistance(position.coords.latitude, position.coords.longitude,layer.getLatLng().lat, layer.getLatLng().lng, 'K');
        if (distance < minDistance){
            minDistance = distance;
            closestFormPoint = layer.feature.properties.id;
        }
    });
            // for this to be a proximity alert, the minDistance must be
            // closer than a given distance - you can check that here
            // using an if statement
            // show the popup for the closest point
    formLayer.eachLayer(function(layer) {
        if (layer.feature.properties.id == closestFormPoint){
            layer.openPopup();

            // mymap.setView([position.coords.latitude, position.coords.longitude], 13);

        }
    });
}