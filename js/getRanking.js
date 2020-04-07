function getRanking() {
    var serviceUrl = "https://developer.cege.ucl.ac.uk:" + httpsPortNumberAPI + "/getRanking/" + httpsPortNumberAPI;
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
    alert("Your current ranking is No." +  result);
}