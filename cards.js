const axios = require('axios')

var getCards = (num) => {
    return new Promise(async (resolve, reject) => {
        try {
            const output = [];
            const deckurl = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
            const deck_id = deckurl.data.deck_id;
            const cards = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=${num}`);
            for (i in cards.data.cards)
                output.push(cards.data.cards[i].image);
            var objects = [];
            for (var i = 0; i < output.length; i ++) {
                objects[i] = {image: output[i], link: output[i]};
            }
            resolve(objects)
        } catch (e) {

            reject(e);
        }
    })
};

module.exports = {
    getCards
};