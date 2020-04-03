function startDataUpload() { 
	alert ("start data upload"); 
	//now get the geometry values
	var latitude=document.getElementById('latitude').value;
	var longitude=document.getElementById('longitude').value;
	var postString='latitude='+latitude+'&longitude='+longitude;
	
	//upload the questions and answers options also the correct answers
	var question_title=document.getElementById('question_title').value;
	var question_text=document.getElementById('question_text').value;
	var answer_1=document.getElementById('answer_1').value;
	var answer_2=document.getElementById('answer_2').value;
	var answer_3=document.getElementById('answer_3').value;
	var answer_4=document.getElementById('answer_4').value;
	var correct_answer=document.getElementById('correct_answer').value;
	
	postString=postString+'&question_title='+question_title+'&question_text='+question_text+
	'&answer_1='+answer_1+'&answer_2='+answer_2+'&answer_3='+answer_3+'&answer_4='+answer_4+'&correct_answer='+correct_answer;

	// finally add the port id 
	postString = postString +"&port_id="+httpsPortNumberAPI;

	try{		//NB try and catch is a couple, should use together or it doesn't work, adapted from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
	if (question_title == "" || question_text == "" || answer_1 == "" || answer_2 == "" || answer_3 == "" || answer_4 == "" || correct_answer == "") throw 'Please fill in all the blankets.'
	if (correct_answer != "1" && correct_answer != "2" && correct_answer != "3" && correct_answer != "4") throw 'Please modify your correct answer, the correct answer should be choosen from the number 1/2/3/4.'
		
	alert (postString);
	processData(postString);		
	}	catch(err) {
		alert(err);
	}
}


function processData(postString) {
	var serviceUrl= "https://developer.cege.ucl.ac.uk:"+ httpsPortNumberAPI+"/uploadQuestion"
   $.ajax({
    url: serviceUrl,
    crossDomain: true,
    type: "POST",
    success: function(data){console.log(data); dataUploaded(data);},
    data: postString
}); 
}

// create the code to process the response from the data server
function dataUploaded(data) {
    // change the DIV to show the response
    document.getElementById("dataUploadResult").innerHTML = JSON.stringify(data);
}