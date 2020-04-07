function getCorrectAnswer() {
    var serviceUrl = "https://developer.cege.ucl.ac.uk:" + httpsPortNumberAPI + "/getCorrectAnswer/" + httpsPortNumberAPI;
   $.ajax({
    url: serviceUrl,
    crossDomain: true,
    type: "GET",
    success: function(num_questions){
    	console.log(num_questions); 
    	processCorrectAnswer(num_questions);
    }}); //end of the AJAX call
}// end of getCorrectAnswer


function processCorrectAnswer(num_questions){ 
 alert("You have answered " + num_questions + " questions correctly!");
 }