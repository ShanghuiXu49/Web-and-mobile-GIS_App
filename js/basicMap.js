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

}//end code to add the leaflet map

// creat a test marker
var testMarkerPink = L.AwesomeMarkers.icon({
    icon: 'play',
    markerColor: 'pink'
});

function addBasicMarkers() {

    // create a geoJSON feature -
    var geojsonFeature = {
        "type": "Feature",
        "properties": {
            "name": "London",
            "popupContent": "This is where UCL is based"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [-0.132630, 51.522449]
        }
    };

    // and add geoJSON feature using test pink marker to the map
    L.geoJSON(geojsonFeature, {
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: testMarkerPink});
        }
    }).addTo(mymap).bindPopup("<b>" + geojsonFeature.properties.name + " " + geojsonFeature.properties.popupContent + "<b>");


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

