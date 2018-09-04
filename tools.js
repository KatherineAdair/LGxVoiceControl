var admin = require("firebase-admin");
var PythonShell = require('python-shell');
var fs = require('fs');

// Fetch the service account key JSON file contents
var serviceAccount = require("serviceAccountKey.json");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp
({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "DATABASE-URL"
});

var database = admin.database();
var ref = database.ref("/input");

ref.on("value", function(snapshot) //listen for changes in database
{	
	var data = snapshot.toJSON(); //get JSON data
	fs.writeFile("data.json", JSON.stringify(data) , function(err) //write data to file
  	{
    		if(err) 
		{
        		return console.log(err);
    		}
	});
	PythonShell.run('write-query.py', function (err) //run write-query.py
	{
  		if (err) throw err;
	}); 
}, function (errorObject) 
{
	console.log("The read failed: " + errorObject.code);
});
