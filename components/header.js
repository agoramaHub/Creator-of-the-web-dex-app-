const html = require('choo/html')

module.exports = header

function header(state) {
  return html `
    <header>
      <h1>Creators of the Web Game!</h1>
      <button class="create-game">Create Your Own Game Space</button>
    </header>
  `
}
