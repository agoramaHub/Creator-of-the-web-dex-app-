const choo = require('choo')

const html = require('choo/html')

const main = require('./templates/main')

// Initialise choo applications
const app = choo()

app.route('/', main)
app.mount('body')
