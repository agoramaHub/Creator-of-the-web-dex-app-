// Load Choo assets...
const choo = require('choo')

const html = require('choo/html')

const main = require('./templates/main')

// Beaker Bowser DatArchive API...
const archive = new DatArchive(window.location)

// Initialise choo applications
const app = choo()

app.use(function(state, emitter){
  state.creators = false
  state.domLoad = false

  emitter.on('get:creators', async function(){
    var data = await archive.readdir('img', {stat: true})
    state.creators = data
    emitter.emit('render')
  })

  emitter.on('DOMContentLoaded', function(){
    state.domLoad = true
    emitter.emit('render')
  })
})

app.route('/', main)
app.mount('body')
