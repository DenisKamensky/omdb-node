const fs = require('fs');
const path = require('path');

module.exports = function(templateName, data) {
    fs.readFile(path.resolve('templates', `${templateName}.html`), 'utf-8', (err, template) => {
        if (err) {
            this.statusCode = 500;
            this.setHeader('Content-Type', 'text/plane');
            return this.end('error');  
        }
        let html = template;
        if(data) {
            html = html.replace(/{{([^{}]*)}}/g, (placeholder, prop) => {
                return  data[prop] || placeholder
            })
        }

        this.statusCode = 200;
        this.setHeader('Content-Type', 'text/html');
        this.end(html);  
    })
}