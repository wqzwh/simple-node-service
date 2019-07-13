#!/bin/sh

cd /Users/wangqi/myself/simple-node-service/server-koa2/logs
cp access.log $(date +%Y-%m-%d).access.log
echo '' > access.log