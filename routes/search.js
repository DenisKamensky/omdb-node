const url = require('url');
const { omdb }  = require('../libs');
const notFound = require('./notFound');
module.exports = function home(req, res) {
    const movie = url.parse(req.url, true).query;
    omdb.get(movie.title, (err, data) => {
        if(err) {
            return notFound(res, new Error(err));
        } 
        return res.render('movie', data);
    });
}