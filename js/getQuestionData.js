var client;

function getQuestionData(){
    client = new XMLHttpRequest();
    var url =  "https://developer.cege.ucl.ac.uk:"+ httpsPortNumberAPI + "/getQuestionData/" + httpsPortNumberAPI;
    client.open("GET", url, true);
    client.onreadystatechange = processFormData;
    try{
        client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    }
    catch (e){
    }
    client.send();
}

function processFormData(){
    //Waiting response from server
    if(client.readyState<4){
        console.log('waiting for form data')
    }
    else if (client.readyState === 4){
        if (client.status > 199 && client.status < 300){
            console.log('form data sent.')
            var FormData = client.responseText;
            loadFormData(FormData);
        }
    }
}


var xhrFormData;

function formDataResponse(){
    if (xhrFormData.readyState == 4) {
// once the data is ready, process the data
        var formData = xhrFormData.responseText;
        loadFormData(formData);
    }
        }


// we can also use this to determine distance for the proximity alert
var formLayer;

function loadFormData(formData) {
// convert the text received from the server to JSON
    var formJSON = JSON.parse(formData);
// load the geoJSON layer
    formLayer = L.geoJson(formJSON,
        {       

// use point to layer to create the points
            pointToLayer: function (feature, latlng)
            {
            // in this case, we build an HTML DIV string
            // using the values in the data
            var htmlString = "<DIV id='popup'"+ feature.properties.id + "><h2>" +
            feature.properties.question_title + "</h2><br>";
            htmlString = htmlString + "<h3>"+feature.properties.question_text +
            "</h3><br>";
            htmlString = htmlString + "<input type='radio' name='answer' id ='"+feature.properties.id+"_1'/>"+feature.properties.answer_1+"<br>";
            htmlString = htmlString + "<input type='radio' name='answer' id ='"+feature.properties.id+"_2'/>"+feature.properties.answer_2+"<br>";
            htmlString = htmlString + "<input type='radio' name='answer' id ='"+feature.properties.id+"_3'/>"+feature.properties.answer_3+"<br>";
            htmlString = htmlString + "<input type='radio' name='answer' id ='"+feature.properties.id+"_4'/>"+feature.properties.answer_4+"<br>";
            htmlString = htmlString + "<button onclick='checkAnswer(" + feature.properties.id + ");return false;'>Submit Answer</button>";
            // now include a hidden element with the answer
            // in this case the answer is alwasy the first choice
            // for the assignment this will of course vary - you can use feature.properties.correct_answer
            htmlString = htmlString + "<div id=answer" + feature.properties.correct_answer + " hidden>1</div>";
            htmlString = htmlString + "</div>";
            return L.marker(latlng).bindPopup(htmlString);
            },
        }).addTo(mymap);
    mymap.fitBounds(formLayer.getBounds());
}
