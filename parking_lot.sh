#!/usr/bin/env bash

parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
npm --prefix $parent_path install
npm --prefix $parent_path test
if [ "$#" -ne 1 ]; 
then
	node $parent_path/server.js true
else
	node $parent_path/server.js $1
fi