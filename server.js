const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const imgpage = require('./imageapi');
const cardpage = require('./cards');
const port = process.env.PORT || 8080;

var app = express();

app.set("view engine", "hbs");
var urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(bodyParser.json());


hbs.registerPartials(__dirname + '/views/partials/');
app.use(express.static(__dirname, + '/public/'));
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

app.get("/", (request, response) => {
	response.render('input.hbs', {
		title: "MyPage",
		welcome: 'Hello Heroku!'
	});
});


app.post('/card_form', urlencodedParser, async (request, response) => {
    try {
        let cards = await cardpage.getCards(request.body.card);
        response.render('page2.hbs', {
            title: "DeckCards",
            // welcome: `Your randomly picked ${card} are shown below`,
            objects: cards
        });
    }catch (e) {
        response.render('page2.hbs', {
            output: e
        });
    }

});


app.post('/image_form', urlencodedParser, async (request, response) => {
    try {
        let imagereq = await imgpage.getImages(request.body.image);
        response.render('page1.hbs', {
            title: "NasaGallery",
            // welcome: `Welcome to the Nasa Gallery of ${image} pictures`,
            objects: imagereq

        });
    }catch (e) {
        response.render('page1.hbs', {
            output: e
        });
    }

});



app.listen(port, () => {
	console.log(`Server is up on the port ${port}`);
})