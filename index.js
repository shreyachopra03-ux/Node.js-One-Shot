const fsPromises = require('fs').promises;
const path = require('path');

const fileOps = async() => {
    try {
        const data = await fsPromises.readFile(path.join(__dirname, '02FileSystem', 'starter.txt'), 'utf-8');
        console.log(data);
        await fsPromises.unlink(path.join(__dirname, '02FileSystem', 'starter.txt'));
        await fsPromises.writeFile(path.join(__dirname, '02FileSystem', 'promiseWrite.txt'), data);
        await fsPromises.appendFile(path.join(__dirname, '02FileSystem', 'promiseWrite.txt'), '\n\nYes it is.');
        await fsPromises.rename(path.join(__dirname, '02FileSystem', 'promiseWrite.txt'), (path.join(__dirname, '02FileSystem', 'promiseNew.txt')));
        const newData = await fsPromises.readFile(path.join(__dirname, '02FileSystem', 'promiseNew.txt'), 'utf-8');
        console.log(newData);
    } catch(err) {
        console.error(err);
    }
}
fileOps();

// fs.readFile(path.join(__dirname, '02FileSystem', 'starter.txt'), 'utf-8', (err, data) => {
//     if(err) throw err;
//     console.log(data);
// });

// Path name -> content we want to display -> callback function
// append -> used to append content of an existing file, & also create a new file if it doesn't exists
// This is looking like a callback hell.
// fs.writeFile(path.join(__dirname, '02FileSystem', 'reply.txt'), 'Nice to meet you', (err) => {
//     if (err) throw err;
//     console.log('Write complete');

//     fs.appendFile(path.join(__dirname, '02FileSystem', 'reply.txt'), '\n\nyes it is', (err) => {
//          if (err) throw err;
//          console.log('append complete');
   
         // for renaming file's name
//         fs.rename(path.join(__dirname, '02FileSystem', 'reply.txt'), path.join(__dirname, '02FileSystem', 'newReply.txt'), (err) => {
//                if (err) throw err;
//                console.log('rename complete');
//         })
//     })
// })

// exit on uncaught errors
// This is written to give proper error statements.
process.on('uncaughtException', err => {
    console.error(`There was an uncaught error: ${err}`);
    process.exit(1);
});

