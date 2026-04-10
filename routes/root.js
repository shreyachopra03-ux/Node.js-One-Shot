const express = require('express');
const router = express.Router();
const path = require('path');

router.get(/^\/($|index(.html)?)/, (req, res) => {
    res.sendFile(path.join(__dirname, '..', '05WebServer', 'views', 'index.html'));
});

router.get(/\/new-page(.html)?/, (req, res) => {
    res.sendFile(path.join(__dirname, '..', '05WebServer', 'views', 'new-page.html'));
});

router.get(/\/old-page(.html)?/, (req, res) => {
    // This will redirect old page to the new page.
    res.redirect(301, '/new-page.html'); // 302 by default
});

module.exports = router;