const http = require('http');
const { public, home, search, notFound } = require('./routes');
const { render } = require('./libs');

http.ServerResponse.prototype.render = render;

const server = http.createServer((req, res) => {
    const reqUrl = req.url.match(/\.(html|css|js|png)$/);
    if (reqUrl) {
        public(req, res);
    } else if(req.url === '/') {
       home(res);
    } else if (req.url.startsWith('/search')) {
        search(req, res);
    } else {
        notFound(res, new Error('Page not found'))
    }
});


server.listen(3000, () => {
    console.log('сервер запущен');
});