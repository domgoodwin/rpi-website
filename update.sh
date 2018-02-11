#!/bin/sh

docker stop $(docker ps -a -q)
git pull origin master
docker build -t node-server .
docker run --restart=always -p 3000:3000 -d node-server

