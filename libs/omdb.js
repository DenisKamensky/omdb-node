const http = require('http');
const get = (title, done) => {
    const req = http.get(`http://www.omdbapi.com/?t=${title}&apikey=8e6062cf`, (res) => {
        if (res.statusCode !== 200) {
            done(`Error: ${res.statusMessage} - ${res.statusCode}`)
            res.resume();
            return;
        }
        let response = '';
        res.on('data', (blob) => {response += blob});
        res.on('end', _ => {
            try {
                response = JSON.parse(response);
                if (response['Error'] === "Movie not found!") {
                    return done(`${title} - not found`)
                }
                done(null, response);
            } catch (err) {
                done(err.message);
            }
        })
    });
    req.on('error', (err) => {
        done(err.message);
    })
}

module.exports = {
    get
}