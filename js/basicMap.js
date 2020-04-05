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
}//end code to add the leaflet map

// creat a test marker
var testMarkerPink = L.AwesomeMarkers.icon({
    icon: 'play',
    markerColor: 'pink'
});


// create a custom popup
var popup = L.popup();
var coord;
var latitude;
var longitude;

// create an event detector to wait for the user's click event and then use the popup to show them where they clicked
// note that you don't need to do any complicated maths to convert screen coordinates to real world coordiantes
// - the Leaflet API does this for you
function onMapClick(e){
    popup.setLatLng(e.latlng);
    
    coord = e.latlng.toString();
    coord = coord.substr(7, coord.length - 1);   //limited the coordinates display way
    coord = coord.split(')')[0]; 
    
    latitude = coord.split(',')[0];

    longitude = coord.split(',')[1];
    
    popup.setContent('Coordinates: ' + latitude + ' ,  ' + longitude);
    popup.openOn(mymap);
    
    document.getElementById('latitude').value=latitude
    document.getElementById('longitude').value=longitude
    }



