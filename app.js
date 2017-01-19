var cfenv = require( 'cfenv' );  
var express = require( 'express' );  
var http = require( 'http' );  
var ws = require( 'ws' );

// Environment
var environment = cfenv.getAppEnv();

// Web
var app = express();

// Static
app.use( '/', express.static( 'public' ) );

// Sockets
var server = http.createServer();  
var sockets = new ws.Server( {  
  server: server
} );

// Listeners
sockets.on( 'connection', function( client ) {  
  // Debug
  console.log( 'Connection.' );

  // Echo messages to all clients
  client.on( 'message', function( message ) {
    for( var c = 0; c < sockets.clients.length; c++ ) {
      sockets.clients[c].send( message );   
    }
  } );
} );

// Start
server.on( 'request', app );  
server.listen( 9000, function() {  
  console.log( environment.url );
} );