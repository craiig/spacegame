19.Beginnings of space game framework

Working node.js game server with basic world step and transparent state sync using delta compression.

Go to the directory, then type:

node basicserver.js

then visit in your browser: http://localhost:59473/

(59473 kind of spells space, right?)

Notes:

 - No HTML interface at all yet. All output is done through the consoles on the server & client. Open Chrome Developer Tools and go to console to see output.

 - Only synced state at the moment is the world step, so your console log should reflect those messages.

 - World step is currently at 1 second, mainly for testing at a human readable rate.

Dependencies:

  - Socket.io


Todo:

  - Implement a transparent-as possible client->server RPC. Without client->server RPC, we can't really perform actions on the server. Without a simple enough RPC method with minimum of copy and paste code, development will suck.

  - Find a way to share node.js code directly with client for easy development.

  - Find a way to easily serve files out of a given directory to ease addition of client-side HTML code. see Express.js for easy way to serve files

  - Oh yeah, make a game somewhere in here too.