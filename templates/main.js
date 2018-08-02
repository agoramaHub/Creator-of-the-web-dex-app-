const html = require('choo/html')
const prompt = require('../components/prompt')
const header = require('../components/header')
const footer = require('../components/footer')

module.exports = function(state) {
  return html `
    <body>
      ${prompt(state)}
      ${header(state)}

      <div class="container" id="drop_zone" ondrop="dropHandler(event);" ondragover="dragOverHandler(event);">
          <!-- <img class="movable" id="mover" src="/img/sir-tim-berners-lee.jpg"> -->
      </div>

      ${footer(state)}
    </body>
  `
}
