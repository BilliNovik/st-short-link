const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.render(__dirname + '/views/index.html');
})

module.exports = router;