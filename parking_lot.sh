#!/usr/bin/env bash

if [ -z '$1' ]; 
then
	read -p "Input Command: " answer
	arr=('create_parking_lot','park','leave','status','registration_numbers_for_cars_with_colour','slot_numbers_for_cars_with_colour','slot_number_for_registration_number')
	name=$(cut -d' ' -f1 <<< "$answer")
	if [[ ${arr[*]} =~ $name ]];
	then
		node server.js answer
	else
		echo "Wrong command. Try again!"
	fi
else
	node server.js $1
fi