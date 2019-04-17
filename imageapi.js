const request = require("request");
const axios = require('axios')

var getImages = (imgname) => {
    return new Promise(async (resolve, reject) => {
        try {
            let myArray = [];
            const imgs = await axios.get(`https://images-api.nasa.gov/search?q=${imgname}`);
            for (i in imgs.data.collection.items){
                e = imgs.data.collection.items[i].links[0].href;
                if (e.substring(0,36) === 'https://images-assets.nasa.gov/image')
                    myArray.push(e);
            }
            resolve(myArray)
        } catch (e) {

            reject(e);
        }
    })
};

module.exports = {
	getImages
};