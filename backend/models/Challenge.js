const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    starterCode: { type: String, default: '' },
    starterCss: { type: String, default: '' },

    /* canonical answer – what we compare against */
    solution: {
        code: String,
        css: String
    },
    /* fine-grained tests for extra certainty / hints */
    tests: [{
        selector: { type: String, required: true },   // e.g. 'h1'
        rule: { type: String, required: true },   // innerText | has-class …
        equals: { type: String, required: true }
    }]
},{_id: true});        // embedded inside Subject
