const express = require('express');
const app = express();
const path = require('path');
const { logger } = require('./middleware/logEvent.js');
const PORT = process.env.PORT || 3500;

// custom middleware
app.use(logger);

// built-in middleware to handle urlencoded code
// in other words, form data:
// 'content-type: aplication/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false}));

// built-in middleware for json
app.use(express.json());

// serve static files
app.use(express.static(path.join(__dirname, '/public')));

app.get(/^\/($|index(.html)?)/, (req, res) => {
    // 1st way 
    // res.sendFile('./05WebServer/views/index.html' , { root: __dirname });

    // 2nd way
    res.sendFile(path.join(__dirname, '05WebServer', 'views', 'index.html'));
});

app.get(/\/new-page(.html)?/, (req, res) => {
    res.sendFile(path.join(__dirname, '05WebServer', 'views', 'new-page.html'));
});

app.get(/\/old-page(.html)?/, (req, res) => {
    // This will redirect old page to the new page.
    res.redirect(301, '/new-page.html'); // 302 by default
});

// Route Handlers
app.get(/\/hello(.html)?/, (req, res, next) => {
    console.log('attempted to load hello.html');
    next()
}, (req, res) => {
    res.send('Hello world!');
});

// chaining route handlers
const one = (req, res, next) => {
    console.log('one');
    next();
};

const two = (req, res, next) => {
    console.log('two');
    next();
};

const three = (req, res) => {
    console.log('three');
    res.send('Finished !!');
};

app.get(/\/chain(.html)?/, [one, two, three]);

// Catch all Route
app.get(/.*/, (req, res) => {
    res.status(404).sendFile(path.join(__dirname, '05WebServer', 'views', '404.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));