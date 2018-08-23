# LGxVoiceControl



## Overview
(Some) code for an Action for the Google Assistant to control a Liquid Galaxy setuup.


## How it works
* A Dialogflow webhook is set up to Firebase - `index.js`. When a user command is encountered, relevant data is extracted and stored in the Firebase database. 
* Meanwhile the script, `tools.js` ,running on the master computer of the Liquid Galaxy setup gets data from the database whenever it is updated and stores it as as a JSON file, while triggerring another script, `write-query.py`, which processes the data and writes the required command in the queryFile of Google Earth - which then reads and executes it. 
