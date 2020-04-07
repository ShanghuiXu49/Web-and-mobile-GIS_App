function getTop5Socers() {
    var serviceUrl = "https://developer.cege.ucl.ac.uk:" + httpsPortNumberAPI + "/getTop5Scorers/";
   $.ajax({
    url: serviceUrl,
    crossDomain: true,
    type: "GET",
    success: function(result){
    	console.log(result); 
    	processTop5Scorers(result);
    }}); //end of the AJAX call
}// end of getCorrectAnswer


function processTop5Scorers(result){ 
    alert("The Top 5 Scorers are " +  result);
}