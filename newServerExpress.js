const express = require('express');
const app = express();
const path = require('path');
const { logger } = require('./middleware/logEvent.js');
const PORT = process.env.PORT || 3500;
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler.js');

// custom middleware
app.use(logger);

// built-in middleware to handle urlencoded code
// in other words, form data:
// 'content-type: aplication/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false}));

// built-in middleware for json
app.use(express.json());

// cross origin resource sharing
const whitelist = ['https://www.yoursite.com', 'http://127.0.0.1:5500', 'https://localhost:3500'];
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
} 
app.use(cors(corsOptions));

// serve static files
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/subdir', express.static(path.join(__dirname, '/public')));

// routes
app.use('/', require('./routes/root'));
app.use('/subdir', require('./routes/subdir.js'));
app.use('/employees', require('./routes/api/employees'));

// Catch all Route
app.all(/.*/, (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, '05WebServer', 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.join({ error: "404 not found" });
    } else {
        res.type('txt').send("404 not found");
    } 
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));