/**
NOTE:: Currently this error check function is in place for when the site is navigated to thuurgh
       http ports. Currently in the state the app is in its not available to pin to hashbase or homebase
       as for some reason it plays with the storage capacity and maxes it out...
**/
const html = require('choo/html')

module.exports = function(state) {

  if (!navigator.userAgent.includes('BeakerBrowser')) {
    renderUAPrompt()
    return
  }

    return html `
    <div id="prompt">
      <div class="content"></div>
    </div>
    `
    // Prompt functions for telling user to use BEAKER!!!!! Get with the programme....
    function renderUAPrompt () {
      updatePrompt('<p>Sorry >.< This app only works in the Beaker Browser.</p><a class="btn primary" href="https://beakerbrowser.com/docs/install/">Install Beaker</a>')
    }

    function updatePrompt (html) {
      if (typeof html !== 'string') return
      if (html.length) {
        document.querySelector('#prompt').innerHTML = `<div class="content">${html}</div>`
      } else {
        document.querySelector('#prompt').innerHTML = html
      }
    }
}
