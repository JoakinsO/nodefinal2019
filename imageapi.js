const axios = require('axios')

var getImages = (imgname) => {
    return new Promise(async (resolve, reject) => {
        try {
            let myArray = [];
            const imgs = await axios.get(`https://images-api.nasa.gov/search?q=${imgname}&media_type=image`);
            for (i in imgs.data.collection.items){
                e = imgs.data.collection.items[i].links[0].href;
                if (e.substring(0,36) === 'https://images-assets.nasa.gov/image')
                    myArray.push(e);
            }

            var objects = [];
            for (var i = 0; i < myArray.length; i ++) {
                objects[i] = {image: myArray[i], link: myArray[i]};
            }
            resolve(objects)
        } catch (e) {

            reject(e);
        }
    })
};

module.exports = {
	getImages
};