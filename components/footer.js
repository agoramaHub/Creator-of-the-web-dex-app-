const html = require('choo/html')

module.exports = footer

function footer(state) {
  return html `
  <div>
    <script src="/js/animate.js"></script>
    <script src="/js/dragdrop.js"></script>
  </div>
  `
}
