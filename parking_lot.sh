#!/usr/bin/env bash

npm install
npm test
if [ "$#" -ne 1 ]; 
then
	node server.js true
else
	node server.js $1
fi