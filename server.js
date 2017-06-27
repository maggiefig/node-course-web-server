const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express(); //creates an app

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n');
	next(); //must be called in order for the other middlewear to continue
});

// app.use((req, res, next) => {
// 	res.render('maintenance.hbs');
// });

//takes the middlewear function you want to use
app.use(express.static(__dirname+ '/public')); //__dirname holds the directory where your project is held


// Takes 2 arguemnts--the name of the helper and the function to run
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear('');
});

hbs.registerHelper('screamIt', (text) => {
		return text.toUpperCase();
});

//registers a handler. 
//Takes 2 arguments. First is the url (in our case the root of the app), and second is the function to run it
//function is what tells express what to send back to the person who made the request
app.get('/', (req, res) => {
	 //res.send('<h1>Hello Express!</h1>'); //what shows up on the body of the local host
	 
	 //allows you to send a JSON object
	 // res.send({
	 // 	name: 'Maggie',
	 // 	likes: [
	 // 	'Biking',
	 // 	'Cities'
	 // 	]
	 // });

	 res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome to the page!'
	 });
});


//specifies the about route (localhost:3000/about)
app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page',
	}); //renders the about.hbs page
});

app.get('/projects', (req, res) => {
	res.render('projects.hbs', {
		pageTitle: 'Projects Page',
	});
} );


//create a route at /bad
//send back json data with an errorMessage property
app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Unable to handle request'
	});
})

//binds the application to a part on the machine
app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
}); //the local host