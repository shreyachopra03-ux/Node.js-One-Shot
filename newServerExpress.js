const express = require('express');
const app = express();
const path = require('path');
const { logger } = require('./middleware/logEvent.js');
const PORT = process.env.PORT || 3500;
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler.js');
const corsOptions = require('./config/corsOptions.js');

// custom middleware
app.use(logger);

// built-in middleware to handle urlencoded code form data
app.use(express.urlencoded({ extended: false}));

// built-in middleware for json
app.use(express.json());

// cross origin resource sharing
app.use(cors(corsOptions));

// serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

// routes
app.use('/', require('./routes/root'));
app.use('/employees', require('./api/employees'));

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