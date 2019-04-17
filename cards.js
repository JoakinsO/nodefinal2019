const axios = require('axios')

var get_cards = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const output = [];
            const deck_init = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
            const deck_id = deck_init.data.deck_id;
            const cards = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=5`);
            console.log(cards.data.cards[0].image);
            for (i in cards.data.cards)
                output.push(cards.data.cards[i].image);
            // const cards_data = _.find(cards.data.cards[0], 'image');
            // console.log(output);
            resolve(output)
        } catch (e) {

            reject(e);
        }
    })
};

module.exports = {
    get_cards
};