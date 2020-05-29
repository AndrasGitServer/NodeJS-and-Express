/*
	Create an API using EXPRESS
	***************************

    (Run | Start) the app
    *********************

    $  node  server.js
            or
    $  nodemon  server.js
            or
    $  npm  start

    Any changes to the source-code server.js 
	the App has to be restarted (restarted the server) !
	& all data stored in RAM is cleared ! 

	If we hit save, then the server restarts (note its console message),
	then the list is empty again,
	none of the information is persisting,
	it's only sticking around so long as this instance 
	of the server is running.

    While developing use NODEMON.

    modify package.json 
    *******************

    "scripts": 
    {
        "start" : "nodemon server.js"
    }

*/


// The app object conventionally denotes the Express application. 
// Create it by calling the top-level express() function exported by the Express module.


const express = require('express');					// Import the Express module
const app     = express();							// Create an Express application
const port    = 8000;


app.locals.greetings = "Greetings !";				// app.locals.PROPERTIES are local variables within the application
console.log( app.locals );							// .greetings property has been added to the object
console.log( '\n' + app.locals.greetings + '\n' );


//  const server = app.listen( port , () => {
// 		console.log(`** Server App listening at http://localhost:${port}`);
//  });
app.listen( port , () => console.log(`** Server App listening at http://localhost:${port}`) );


// *** class to hold data in RAM *************************************
// In order to add birds into our JSON files (array)
// we can pass them is as ROUTE PARAMETERS ! (using the URL)
// (without creating a form)

class Bird {

	constructor( id , name , special) {
		this.id       = id   ,
		this.name     = name ,
		this.special  = special
	}
	
}

const Birds_array = [];


//*** ROUTES *********************************************************


app.get( '/', (req, res) => res.send(`<h1> Hello World ! </h1> <p> ${ app.locals.greetings } </p>`) );


app.get( '/api/bird' , (req,res) => {
	res.json( 
		{ 
			name : "Roadrunner" , 
			bird : "Yes"        ,
			cute : "Bigbird" 
		}
	);
});


app.get( '/api' , ( req , res ) => {
	res.json( Birds_array );
});


// id  &  name  &  special  are route parameters

app.get( '/api/:id/:name/:special' , ( req , res ) => {
	Birds_array.push( new Bird( req.params.id , req.params.name , req.params.special ) );
	res.send( '** Bird added ! **' );
});


app.get(  '/show' , ( req , res ) => {
	res.redirect( '/api' );
});


/*

The app object has methods for:

Routing HTTP requests; see for example, app.METHOD and app.param.
Configuring middleware; see app.route.
Rendering HTML views; see app.render.
Registering a template engine; see app.engine.
It also has settings (properties) that affect how the application behaves
(for more information, see Application settings)


Basic routing
*************

Routing refers to determining how an application responds to a client request 
to a particular endpoint, 
which is a URI (or path) and a specific HTTP request method (GET, POST, and so on).

Each route can have one or more handler functions, 
which are executed when the route is matched.

Route definition takes the following structure:     app.METHOD( PATH , HANDLER )

- app is an instance of express.
- METHOD is an HTTP request method, in lowercase.
- PATH is a path on the server.
- HANDLER is the function executed when the route is matched.


The following examples illustrate defining simple routes.

Respond with Hello World! on the homepage:

app.get('/', function (req, res) {
  res.send('Hello World!')
})

Respond to POST request on the root route (/), the application’s home page:

app.post('/', function (req, res) {
  res.send('Got a POST request')
})

Respond to a PUT request to the /user route:

app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user')
})

Respond to a DELETE request to the /user route:

app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user')
})

*/

