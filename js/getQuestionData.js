function getQuestionData() { 
    $.ajax({url:"https://developer.cege.ucl.ac.uk:"+ httpsPortNumberAPI + "/getQuestionData/" + httpsPortNumberAPI, 
    crossDomain: true, 
    success: function(result){
    console.log(result) 
    loadQuestionData(result); 
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
function loadQuestionData(result) {

    // load the geoJSON layer
	questionLayer = L.geoJson(result).addTo(mymap); 

	mymap.fitBounds(questionLayer.getBounds()); 
}



