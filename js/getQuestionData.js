function getQuestionData() { 
    $.ajax({url:"https://developer.cege.ucl.ac.uk:"+ httpsPortNumberAPI + "/getGeoJSON/quizquestions/location", 
    crossDomain: true, 
    success: function(result){ 
    questionDataResponse(result); 
    }}); //end of the AJAX call 
} // end of getQuestionData

function questionDataResponse(result){ 
	var questionData = result.responseText; 
	loadQuestionData(questionData); 
}

// keep the layer global so that we can automatically pop up a 
// pop-up menu on a point if necessary 
// we can also use this to determine distance for the proximity alert

var questionLayer;
function loadQuestionData(questionData) {

	// convert the text received from the server to JSON 
	var questionJSON = JSON.parse(questionData);

    // load the geoJSON layer
	questionLayer = L.geoJson(questionJSON,
	{
		// use point to layer to create the points
		pointToLayer: function (feature, latlng)
		{
			// in this case, we build an HTML DIV string 
			// using the values in the data
			var htmlString = "<DIV id='popup'"+ feature.properties.id + "><h2>" + feature.properties.name + "</h2><br>"; 
			htmlString = htmlString + "<h3>"+feature.properties.surname + "</h3><br>"; 
			htmlString = htmlString + "<input type='radio' name='answer' id ='"+feature.properties.id+"_1'/>"+feature.properties.module+"<br>"; 
			htmlString = htmlString + "<input type='radio' name='answer' id ='"+feature.properties.id+"_2'/>"+feature.properties.language+"<br>"; 
			htmlString = htmlString + "<input type='radio' name='answer' id ='"+feature.properties.id+"_3'/>"+feature.properties.lecturetime+"<br>"; 
			htmlString = htmlString + "<input type='radio' name='answer' id ='"+feature.properties.id+"_4'/>"+feature.properties.port_id+"<br>"; 
			htmlString = htmlString + "<button onclick='checkAnswer(" + feature.properties.id + ");return false;'>Submit Answer</button>";

			// now include a hidden element with the answer 
			// in this case the answer is alwasy the first choice 
			// for the assignment this will of course vary - you can use
			htmlString = htmlString + "<div id=answer" + feature.properties.id + " hidden>1</div>"; 
			htmlString = htmlString + "</div>";
			return L.marker(latlng).bindPopup(htmlString); 
		}, 
	}).addTo(mymap); 
	mymap.fitBounds(questionLayer.getBounds()); 
}



