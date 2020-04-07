function getCorrectAnswer() {
    var serviceUrl = "https://developer.cege.ucl.ac.uk:" + httpsPortNumberAPI + "/getCorrectAnswer/" + httpsPortNumberAPI;
   $.ajax({
    url: serviceUrl,
    crossDomain: true,
    type: "GET",
    success: function(result){
    	console.log(result); 
    	processCorrectAnswer(result);
    }}); //end of the AJAX call
}// end of getCorrectAnswer


function processCorrectAnswer(result){ 
    alert("You have answered " + result + " questions correctly!");
}