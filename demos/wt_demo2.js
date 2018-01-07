// wt create enables dependencies automatically if package.json is found

var request = require('request-promise');

module.exports = function(ctx, cb) {
  var opts = {
    url: 'https://api.mercadolibre.com/items/MLA606927509',
    json: true
  };
  request.get(opts)
    .then(item => {
      cb(null, item);    
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};