function getRanking() {
    var serviceUrl = "https://developer.cege.ucl.ac.uk:" + httpsPortNumberAPI + "/getRanking/" + httpsPortNumberAPI;
   $.ajax({
    url: serviceUrl,
    crossDomain: true,
    type: "GET",
    success: function(result){
    	console.log(result); 
    	processRanking(result);
    }}); //end of the AJAX call
}// end of getCorrectAnswer


function processRanking(result){ 
    alert("Your current ranking is " +  result);
}