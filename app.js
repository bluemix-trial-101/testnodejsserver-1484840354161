 var ws = require('nodejs-websocket')
  
 // Secure Bluemix server from Scream server example: "hi" -> "HI!!!" 
 var server = ws.createServer( function (conn) {
     console.log("New connection")
     if (conn.headers["x-forwarded-proto"] === "http" ) {
         conn.sendText("Only Secure Web Sockets are allowed")
         conn.close(1002, "Only Secure Web Sockets are allowed")
     }
     
     conn.on("text", function (str) {
         console.log("Received "+str)
         conn.sendText(str.toUpperCase()+"!!!")
     })
     
     conn.on("close", function (code, reason) {
         console.log("Connection closed")
     })
 }).listen(3000)