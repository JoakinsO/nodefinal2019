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
        let cards = await cardpage.get_cards();
        response.render('page2.hbs', {
            link1: cards[0],
            link2: cards[1],
            link3: cards[2],
            link4: cards[3],
            link5: cards[4],
        });
    }catch (e) {
        response.render('page2.hbs', {
            output: e
        });
    }

});


app.post('/image_form', urlencodedParser, async (request, response) => {
    try {
        let imagereq = await imgpage.getImages(request.body.picture_input);
        response.render('page1.hbs', {
            output1: imgreq[0],
            output2: imgreq[1]

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