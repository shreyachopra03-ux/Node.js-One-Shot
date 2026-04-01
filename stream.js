const fs = require('fs');

const rs = fs.createReadStream('./02FileSystem/lorem.txt', { encoding: 'utf-8' });

const ws = fs.createWriteStream('./02FileSystem/new-lorem.txt');

rs.on('data', (dataChunk) => {
    ws.write(dataChunk); 
})