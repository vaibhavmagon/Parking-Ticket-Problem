#!/usr/bin/env bash

if [ "$#" -ne 1 ]; 
then
	node server.js true
else
	node server.js $1
fi