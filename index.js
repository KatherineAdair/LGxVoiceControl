//Firebase fulfillment for Dialogflow

'use strict';

const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'MY-DATABASE-URL' //replace
});


process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

   function sendLocation(agent) { //gets location parameter and uploads in a Firebase database
     const location = agent.parameters.location;
     return admin.database().ref('input').set({command : 'goto' , location : location});
   }
   
   function sendHTR(agent)
   {
        const value = agent.parameters.number;
        const command = agent.parameters.command;
        return admin.database().ref('input').set({command : command , value : value}); 
   }
   
   function sendMovement(agent)
   {
       const value = agent.parameters.number;
       const orientation = agent.parameters.orientation;
       return admin.database().ref('input').set({command : 'move' , value : value , orientation : orientation});
   }
   
   function sendScale(agent)
   {
       const value = agent.parameters.number;
       const level = agent.parameters.zoomValue; 
       return admin.database().ref('input').set({command : 'zoom' , value : value , level : level});
   }
   
  let intentMap = new Map();
  intentMap.set('Location', sendLocation);
  intentMap.set('Heading-Tilt-Roll', sendHTR);
  intentMap.set('Movement' , sendMovement);
  intentMap.set('Zoom' , sendScale);
  agent.handleRequest(intentMap);
});
