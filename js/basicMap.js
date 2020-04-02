// load the map
var mymap; // global variable to store the map


function loadLeafletMap() {
    mymap = L.map('mapid').setView([51.52, -0.13], 13);

    // load the tiles
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6I' +
        'mNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.streets'
    }).addTo(mymap);

    // now add the click event detector to the map
    mymap.on('click', onMapClick);

    // now call the code to add the markers
    addBasicMarkers();
    getFormData()

}//end code to add the leaflet map

// creat a test marker
var testMarkerPink = L.AwesomeMarkers.icon({
    icon: 'play',
    markerColor: 'pink'
});

function addBasicMarkers() {
    L.marker([51.5, -0.09]).addTo(mymap)
        .bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();
} // end code to add the basic markers

// create a custom popup
var popup = L.popup();


// create an event detector to wait for the user's click event and then use the popup to show them where they clicked
// note that you don't need to do any complicated maths to convert screen coordinates to real world coordiantes
// - the Leaflet API does this for you
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}


//Retrieve the data using AJAX
function getFormData() { 

$.ajax({url:"https://developer.cege.ucl.ac.uk:"+ httpsPortNumberAPI + 
"/getGeoJSON/formdata/location", 
    crossDomain: true, 
success: function(result){ 
        formDataResponse(result); 
    }}); //end of the AJAX call 
} // end of getFormData


//Process the data and create some HTML as a string that you then add to the popup for each point on the map
function formDataResponse(result){ 
    var formData = result.responseText; 
    loadFormData(formData); 
}

// keep the layer global so that we can automatically pop up a 
// pop-up menu on a point if necessary 
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
                var htmlString = "<DIV id='popup'"+ feature.properties.id + "><h2>" + feature.properties.name + "</h2><br>";
                htmlString = htmlString + "<h3>"+feature.properties.surname + "</h3><br>";
                htmlString = htmlString + "<input type='radio' name='answer' id ='"+feature.properties.id+"_1'/>"+feature.properties.module+"<br>";
                htmlString = htmlString + "<input type='radio' name='answer' id ='"+feature.properties.id+"_2'/>"+feature.properties.language+"<br>"; 
                htmlString = htmlString + "<input type='radio' name='answer' id ='"+feature.properties.id+"_3'/>"+feature.properties.lecturetime+"<br>"; 
                htmlString = htmlString + "<input type='radio' name='answer' id ='"+feature.properties.id+"_4'/>"+feature.properties.port_id+"<br>"; 
                htmlString = htmlString + "<button onclick='checkAnswer(" + feature.properties.id + ");return false;'>Submit Answer</button>";

                // now include a hidden element with the answer 
                // in this case the answer is alwasy the first choice 
                // for the assignment this will of course vary - you can use feature.properties.correct_answer 
                htmlString = htmlString + "<div id=answer" + feature.properties.id + " hidden>1</div>"; 
                htmlString = htmlString + "</div>"; 
                return L.marker(latlng).bindPopup(htmlString); 
            }, 
        }).addTo(mymap); 
    mymap.fitBounds(formLayer.getBounds()); 
}