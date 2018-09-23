const fs = require('fs');
const path = require('path');

const loadMime = fs.createReadStream(path.join(__dirname, 'mime-types.json'));
let mimeTypes = '';
loadMime.on('data', (data) => {mimeTypes+= data});
loadMime.on('end', () => {
    mimeTypes = JSON.parse(mimeTypes)
})

function public(req, res) {
    const ext = path.extname(req.url).replace(/\./, '');
    const file = fs.createReadStream(path.resolve('public', req.url.replace(/\//, '')));
    file.on('error', (error) => {
       return createResponse({res, error});
    })
    createResponse({res, type: ext, file});
}

function createResponse({res, type, error, file}) {
    if(error) {
        if(error.code === 'ENOENT') {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end(error.message);
        } else {
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end(error.message);
        }
    } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', mimeTypes[type])
        file.pipe(res);
    }
}

module.exports = public;