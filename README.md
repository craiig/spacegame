Beginnings of space game framework

Working node.js game server with basic world step and transparent state sync using delta compression.

Go to the directory, then type:

node startServer.js

then visit in your browser: 
http://localhost:59473/
	-Three.js canvas client

http://localhost:59473/fireball.html
	-canvas client that looks like fire

http://localhost:59473/webgl.html
	-webgl client (broken)

(59473 kind of spells space, right?)

Areas:
	AlphaOmega - One big grav source near, One gigantic source far but approaching
	TwoPlusAFewBody - Two big grav sources with a bunch of smaller objects between them


Mousewheel or twofinger zoom works now on default client.
Click to clear the screen on default client.


Notes:
	-	Play with the Grav constant in SpaceMath.js to speed/slow things (esp. until we fix how time works)

Dependencies:
  	- Socket.io


Todo:

  - Implement a transparent-as possible client->server RPC. Without client->server RPC, we can't really perform actions on the server. Without a simple enough RPC method with minimum of copy and paste code, development will suck.

  - Find a way to share node.js code directly with client for easy development.

  - Find a way to easily serve files out of a given directory to ease addition of client-side HTML code. see Express.js for easy way to serve files

  - Oh yeah, make a game somewhere in here too.