# Question Setting App
A technical guide for a browser-based question setting app. This app helps the user to create a new
question about a location, add possible answers and upload questions to a database on the web
server. By using this app, the location of a question could be input by either clicking on a point on a
Leaflet map or manually typing latitudes and longitudes. This app is also able to retrieve existed
questions of certain characteristics and information of users from the database.

## Table of Contents
1. System Requirements
2. Deployment
3. Testing
4. File description
5. Code reference

## 1. System Requirements
In order to enable the full functionality of this app, a browser that supports geolocation access
via http connection is required. Some browsers (such as Safari) block geolocation access via
http connection. As a result, the app cannot locate and zoom into user positions if it is opened
in those browsers. Therefore, it is recommended to use Chrome(Version 73.0.3683.75 or above)
or Firefox(Version 65.0.2 or above) for this app.

This app requires to make connections to a Ubuntu Server (Virtual Machine). You could
use BitVise, Pycharm (Version 2018.3.5 Professional Edition) or other SSH software to connect
to the Ubuntu Server.

If you are going to use this app outside the UCL campus (not connected to Eduroam), make
sure you are connected to UCL VPN by following the instructions
at https://www.ucl.ac.uk/isd/services/get-connected/remote-working-services/ucl-virtualprivate-network-vpn.

## 2. Deployment
Procedures to deploy this app:
1. Clone the source code of this question setting app from Github to CEGE server at home/studentuser/code by typing in the command line (terminal) window for Ubuntu:

     cd /home/studentuser/code </br>
     git clone https://github.com/ucl-geospatial/cege0043-apps-ShanghuiXu49 -b master 
     
 2. Clone the source code of the corresponding dataAPI server from Github to CEGE server at home/studentuser/code.
     cd /home/studentuser/code </br>
     git clone https://github.com/ucl-geospatial/cege0043-data-api-ShanghuiXu49 -b master
     
 3. Go to the cege0043-data-api-ShanghuiXu49 folder and start the dataAPI server.
     cd /home/studentuser/code/cege0043-data-api-ShanghuiXu49 </br>
     pm2 start dataAPI.js

 4. Make sure the dataAPI server is successfully started. If any error occurs, you could enter the debug mode through the command line window by typing
     cd /home/studentuser/code/cege0043-data-api-ShanghuiXu49 </br>
     node dataAPI.js

## 3. Testing
Procedures to test this app:

1. Make sure your device is connected to UCL Wifi or UCL VPN.
2. Make sure the dataAPI server is active.
3. Mask sure use laptop to start question setting app.
3. In a browser that supports geolocation access via https connection (such as Chromeor Firefox),
type the following address to use the question setting
app.https://developer.cege.ucl.ac.uk:31097/bootStrap.html
4. While testing the functionality of this map, use of Inspect or Developer mode of the browser
to see if any error occurs.

## 4. Question setting part file description
The files associated te this question setting app are located in the cege0043-apps-ShanghuiXu49 folder and several subfolders.

~/cege0043-apps-ShanghuiXu49 </br>
       bootStrap.html : The main html file of this app, through which user could use all the question
       setting functionality. It interconnects all of the resources within the ~/cege0043-apps-ShanghuiXu49 folder        and makes use of them. This html contains several divs and menu buttons.
    
### DIV   
| id  | Description |
| ------------- | ------------- |
| mapid  | Hold the leaflet map.  |
| collapseMenu | Hold a sub-menu button for user to load or remove data|

### Menu Button
| name  | Description |
| ------------- | ------------- |
| Add questions  | Tell the user to fill out the form at below the map through alert|
| Show Question Points | Load all the existing quiz points created by the current user.|
| Remove Question Points | Remove the existing quiz points created by the current user. |
| All User Participation Rate | Show a histogram of daily participation rates of the current user during last week, including how many questions have been answered and how many answers were correct.|
| My User Participation Rate | Show a histogram of daily participation rates of all users in the database during the past week, including how many questions have been answered and how many answers were correct.|
| Show All Question Points | Display question points added last week by any user in bthe database.|
| Remove All Question Points| Remove question points added last week.|
| 5 Hardest Questions| Show a list of the 5 most difficult questions in the database through alert.|
| Help | Load a new user guide web page for question seting|
help_question.html : Containing a user guide for question setting. This html file is referenced as 'Help' within index.html .


~/www/css : Setting up styles of bootStrap.html (such as fonts and margins) and incorporating the CSS required for custom icon creation.

~/www/ScreenShoot : Containing images required for help_question.html

~/www/res </br >
port.xml : Contains user port id data of http and https connections.

~/www/js : Containing Javascript files required by bootStrap.html .


basicMap.js : Load Leaflet map and create custom icons. </br>
| function  | Description |
| ------------- | ------------- |
| onMapClick(e)  | When the user clicks on the map, show a marker at the clicked position and automatically enter the coordinates of the clicked location.|


leaflet.awesome-markers.js : Add colorful iconic markers for Leaflet.


dataUpload.js : Transfer the question form data into Json format and insert it into database. </br>
| function  | Description |
| ------------- | ------------- |
| startDataUpload()  | Convert the user input question data into string|
| processData(postString)  | Insert the question data string into database through AJAX 'POST' command|
| dataUploaded(data)  | Process the response from the data server and change the DIV to show the response|
| deleteRecord()  | Delete the question data string into database through AJAX 'POST' command|
| dataDeleted(data)  |  Process the response from the data server|
</br>

getQuestionData.js : Receive the inserted question data for current user in JSON format and display the data in leaflet map
| function  | Description |
| ------------- | ------------- |
| removeQuestionData()  | This function will remove the layer of current user's question data from the map container if the layer is passed into this function. It would notify the user that the layer will be removed or indicate that a particular layer has not been loaded. |
| getQuestionData()  | Get the current user input question data through AJAX 'GET' command|
| loadQuestionData(result)  | Display the question points into leaflet map and creat a pop-up form if user click the points|
</br>

getParticipationRate.js : Receive the Participation Rate data for current and all user in JSON format and display the data in D3 Graph
| function  | Description |
| ------------- | ------------- |
| getParticipationRateUser()  | Receive the Participation Rate data for current user from database and show the data in histogram of D3 Graph |
| getParticipationRateAll()  | Receive the Participation Rate data for all user from database and show the data in histogram of D3 Graph|
</br>

getLastWeekPoints.js : Receive the inserted question data for all user in JSON format and display the data in leaflet map
| function  | Description |
| ------------- | ------------- |
| removeLastWeekPoints()  | This function will remove the layer of all user's question data from the map container if the layer is passed into this function. It would notify the user that the layer will be removed or indicate that a particular layer has not been loaded. |
| getLastWeekPoints()  | Get the all user input question data through AJAX 'GET' command|
| loadLastPointsData(result)  | Display the question points into leaflet map |
</br>

getDifficultQuestion.js : Receive the inserted question data for all user in JSON format and display the data in leaflet map
| function  | Description |
| ------------- | ------------- |
| getDifficultQuestions()  | Get the 5 most difficult qustions among all user inserted question data through AJAX 'GET' command from database|
| loadDifficultQuestion(result)  | Process the 5 most difficult qustions data into alert |
</br>

utilities.js :
| function  | Description |
| ------------- | ------------- |
| getPort()  | Get user port numbers based on the type of connections (http or https), which are required to build database connections for data uploading and downloading.|

## 5. Quiz answering part file description

## 6. Code reference
A large proportion of codes are adapted from the lab notes of CEGE 0043 Web Mobile and
GIS by Calire Ellul, including

   1. Basic structures of bootStrap.html </br>
   2. Functions related to events detector, data downloading, data uploading, data processing,
      user location tracking, displaying map layers, and getting port numbers.

The utility of changing div contents of one .html by contents of another .html provided
by W3 schools.
</br>

The histograms showing daily user participation utilise D3 JavaScript library.
</br>

The legends of D3 graphs are adapted from stackoverflow, accessed 12th April 2020.
</br>

The axis labels of D3 graphs are adapted from bl.ocks.org, accessed 12th April 2020.
</br>

The way to automatically enter the coordinates of the clicked location are adapted from https://gis.stackexchange.com/questions/88273/triggering-click-event-on-leaflet-map, accessed 12th April 2020.
</br>

May layers of this app are based on Leaflet.
</br>

The base map data is based on Open Street Map.
