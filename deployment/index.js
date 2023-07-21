const express = require('express');
const app = express();

require('dotenv').config();
const dns = require('dns');
const { parseURL } = require('whatwg-url');
const mongoose = require('mongoose');
const ShortUrl = require('./models/ShortUrl');
mongoose.connect(process.env.MONGO_URI);

const PORT = process.env.PORT || 4000;

// for fcc tests
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('build'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/build/index.html');
});


app.post('/api/shorturl', async (req, res) => {
    const original_url = req.body.url;

    try {
        const parsedUrl = parseURL(original_url).host;

        dns.lookup(parsedUrl, (err, address) => {
            if (err) {
                res.json({ error: 'Invalid URL' });
            }
        });

        const short_url = await ShortUrl.countDocuments({});
        const urlDoc = await ShortUrl.create({ original_url, short_url });

        res.json(urlDoc);

    } catch (error) {
        res.json({ error: 'Invalid URL' });
    }
});

app.get('/api', async (req, res) => {

    try {
        const urls = await ShortUrl.find()
            .sort({ 'createdAt': -1 })
            .limit(10);

        res.json(urls);
    } catch (error) {
        res.json(error)
    }
});

app.get('/api/shorturl/:short_url', async (req, res) => {
    let { short_url } = req.params;

    const urlDoc = await ShortUrl.findOne({ short_url });
    if (!urlDoc) {
        res.json({ error: "Invalid URL" });
    } else {
        urlDoc.clicks++;
        await urlDoc.updateOne(urlDoc);

        res.redirect(urlDoc.original_url);
    }
});

app.listen(PORT, console.log('app listening on:', PORT));