
const html = require('choo/html')
const prompt = require('../components/prompt')
const header = require('../components/header')
const footer = require('../components/footer')
const creator = require('./creator')

module.exports = function(state, emit) {
    var t = {
      off: 'Loading.....'
    }

    if (!state.creators) {
      emit('get:creators')
    }
    // check state.creators load status. returns value false if still loading, returns a second time once
    // state.creators is loaded... Wonder if this double return is a glitch?
    console.log(state.creators)

    // While state.creators is loading, load html text with obj replacement. Once loaded end while and load
    // application as per usual...
    while (!state.creators) {
      return html `
        <body>
          ${prompt(state)}
          ${header(state)}

          <div class="container" id="drop_zone" ondrop="dropHandler(event);" ondragover="dragOverHandler(event);">
              <div id="mover-container">
                <p>${t.off}</p>
              </div>
          </div>

          ${footer(state)}
        </body>
  `
    }
        return html `
          <body>
            ${prompt(state)}
            ${header(state)}

            <div class="container" id="drop_zone" ondrop="dropHandler(event);" ondragover="dragOverHandler(event);">
                <div id="mover-container">
                  ${state.creators.map(creator)}
                </div>
            </div>

            ${footer(state)}
          </body>
    `
}
