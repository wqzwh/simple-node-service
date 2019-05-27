#!/bin/sh

cd /Users/wangqi/myself/node-backend/server-1/logs
cp access.log $(date +%Y-%m-%d).access.log
echo '' > access.log