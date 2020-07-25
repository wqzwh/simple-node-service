#!/usr/bin/env node

/**
 * Module dependencies.
 */

const App = require('../app.ts');
const http = require('http');

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
// app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(App.callback());

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: any) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
