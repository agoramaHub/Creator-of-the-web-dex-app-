const html = require('choo/html')

module.exports = function(state){

    return html `
    <div>
      <script src="/js/animate.js"></script>
      <script src="/js/dragdrop.js"></script>
      <script src="/js/beakerapi.js"></script>
    </div>
    `
}
