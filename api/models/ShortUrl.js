const mongoose = require('mongoose');

const ShortUrlSchema = new mongoose.Schema({
    original_url: {
        type: String,
        required: true
    },
    short_url: {
        type: Number,
        required: true
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('ShortUrl', ShortUrlSchema);