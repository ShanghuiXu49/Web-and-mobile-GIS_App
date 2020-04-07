function getCorrectAnswer() {
    var serviceUrl = "https://developer.cege.ucl.ac.uk:" + httpsPortNumberAPI + "/getCorrectAnswer/" + httpsPortNumberAPI
   $.ajax({
    url: serviceUrl,
    crossDomain: true,
    type: "GET",
    success: function(data){console.log(data); processCorrectAnswer();},
    data: postString
}); 
}

function processCorrectAnswer(){
	var correctNumber = client.responseText;
	alert("You have answered " + correctNumber + " questions correctly!")
	}