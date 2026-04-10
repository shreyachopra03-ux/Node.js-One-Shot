const express = require('express');
const router = express.Router();
const path = require('path');

router.get(/^\/($|index(.html)?)/, (req, res) => {
    res.sendFile(path.join(__dirname, '..', '05WebServer', 'views', 'subdir', 'index.html'));
});

router.get(/\/test(.html)?/, (req, res) => {
    res.sendFile(path.join(__dirname, '..', '05WebServer', 'views', 'subdir', 'test.html'));
});

module.exports = router;