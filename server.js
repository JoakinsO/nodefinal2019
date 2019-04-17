const express = require('express');
const hbs = require('hbs');
const port = process.env.port || 8080;

var app = express();

app.set("view engine", "hbs");

hbs.registerPartials(__dirname + '/views/partials/');
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

app.get("/", (request, response) => {
	response.render('index.hbs', {
		title: "About page",
		welcome: 'Hello Heroku!'
	});
});

app.listen(port, () => {
	console.log(`Server is up on the port ${port}`);
})