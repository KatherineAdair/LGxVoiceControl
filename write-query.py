#!/usr/bin/env python

import os, json

userid=os.getuid() 

with open('data.json') as json_data: #getting data from firebase
    data = json.load(json_data)

query = open("/tmp/query.txt", "w") #creating query.txt
os.chown("/tmp/query.txt", userid, userid) #changing file owner to prevent google earth from re-reading the file

command_type = data["command"]

if command_type=="heading":
	query.write("flytoview=<LookAt><heading>"+str(data["value"]["0"])+"</heading></LookAt>")

elif command_type=="goto":
	a= str(data["location"]) #getting location
	a1="': u'"
	a2="'}"
	query.write("search="+a[(a.index(a1)+len(a1)):a.index(a2)])

else:
	query.write(" ")

query.close()
