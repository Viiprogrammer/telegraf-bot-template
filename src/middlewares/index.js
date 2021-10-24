const path = require('path');
const fs = require('fs');
const dir = fs.readdirSync(__dirname + path.sep)

dir.forEach(function(filename){
    if(path.extname(filename) === '.js' && filename !== 'index.js'){
        var exportAsName = path.basename(filename);
        module.exports[exportAsName] = require( path.join( __dirname, filename) );
    }
});