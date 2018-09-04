#!/bin/bash

GOOGLE_EARTH="$(which google-earth-pro)"
DRIVERS_LOCATION="/opt/google/earth/pro/drivers.ini"
QUERYFILE="/tmp/query.txt"
DRIVERS_STRING="ViewSync/queryFile=/tmp/query.txt""\n""ViewSync/send=true"
CURRENT_DIR="$(pwd)""/LGxVoiceControl"

if [ -z "$GOOGLE_EARTH" ]
then
	echo "Liquid Galaxy is not installed."
	exit 0
else
	echo "Found Liquid Galaxy, resuming installation..."
fi


sudo apt-get update
sudo apt-get install curl git
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs 

git clone 'https://github.com/KatherineAdair/LGxVoiceControl' 
sed -i '3 a '$DRIVERS_STRING'' $DRIVERS_LOCATION 

npm install firebase-admin fs python-shell

echo -e "LGxVoiceControl has been installed. To start using run the following command - \n \n cd '$CURRENT_DIR' | sudo node tools.js" 







