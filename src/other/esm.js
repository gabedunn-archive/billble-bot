/*
 * Gabe Dunn 2019
 * File to run the other bot through ESM compatibility.
 */

require = require('esm')(module)

// Import the main module.
module.exports = require('./index.js')
