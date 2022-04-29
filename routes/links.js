const express = require('express');
const router = express.Router();
const Link = require('../models/link');
const shortID = require('shortid');

const PORT = process.env.PORT || 3000;
router.post('/short', async (req, res) => {
    const { link } = req.body;

    try {
        const findLink = await Link.findOne({ source: link })

        if (findLink) {
            return res.json(findLink)
        }

        const id = shortID.generate();
        const shortUrl = `localhost:${PORT}/links/${id}`;
        const url = new Link({
            code: id,
            source: link,
            short: shortUrl,
        });

        await url.save();
        return res.json(url);
    } catch (e) {
        return res.status(500).json({
            status: 500,
            message: JSON.stringify(e)
        })
    }
})

router.get('/:code', async (req, res) => {
    const { code } = req.params;
    const link = await Link.findOne({ code });

    if (link) return res.redirect(link.source);
    return res.status(404).json({
        status: 404,
        message: 'Link not found',
    })
})

module.exports = router;