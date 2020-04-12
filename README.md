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

## 4. File description
The files associated te this question setting app are located in the cege0043-apps-ShanghuiXu49 folder and several subfolders.

~/cege0043-apps-ShanghuiXu49
    bootStrap.html : The main html file of this app, through which user could use all the question
    setting functionality. It interconnects all of the resources within the ~/cege0043-apps-ShanghuiXu49 folder       and makes use of them. This html contains several divs and menu buttons.
    
###DIV   
| id  | Description |
| ------------- | ------------- |
| mapid  | Hold the leaflet map.  |
| buttons  | Hold a button below the map to zoom to user's current location. </br> Hold a button to removes all layers except the base map and user location marker. |
