const fs = require('fs');
const path = require('path');
module.exports = (res, err) => {
    res.render('error', err)
}