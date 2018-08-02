const html = require('choo/html')

module.exports = prompt

function prompt(state) {
  return html `
  <div id="prompt">
    <div class="content">Loading...</div>
  </div>
  `
}
