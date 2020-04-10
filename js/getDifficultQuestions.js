function getDifficultQuestions() {
    var serviceUrl = "https://developer.cege.ucl.ac.uk:"+ httpsPortNumberAPI + "/getDifficultQuestions";
   $.ajax({
    url: serviceUrl,
    crossDomain: true,
    type: "GET",
    success: function(result){
        console.log(result); 
        loadDifficultQuestion(result);
    }}); //end of the AJAX call
}// end of getCorrectAnswer

// we can also use this to determine distance for the proximity alert


function loadDifficultQuestion(result) {
    var difficultQuiz = result[0].array_to_json
    var difficultQuestionString
    for(var i =0;i<difficultQuiz.length;i++)
    {
        difficultQuestionString +=  "Question from: " + difficultQuiz[i].port_id + "\nQuestion Text: " + difficultQuiz[i].question_text;
        difficultQuestionString += "\nPossible Answers: " + "1. " + difficultQuiz[i].answer_1 + " 2. " + difficultQuiz[i].answer_2 + " 3. " + difficultQuiz[i].answer_3 + " 4. " + difficultQuiz[i].answer_4;
        difficultQuestionString += "\nCorrect Answer: " + difficultQuiz[i]["answer_" + difficultQuiz[i].correct_answer]+"\n\n";
    }
    // List the 5 most difficult questions in alert
    alert(difficultQuestionString);

}