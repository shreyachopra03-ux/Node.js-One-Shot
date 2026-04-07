const fs = require('fs');

// making a new directory
if(!fs.existsSync('./new')) {
    fs.mkdir('./new', (err) => {
       if (err) throw err;
       console.log('Directory made');
    });
};

// for deleting directory
if(fs.existsSync('./new')) {
    fs.rmdir('./new', (err) => {
        if(err) throw err;
        console.log('Directory removed');
    });
};