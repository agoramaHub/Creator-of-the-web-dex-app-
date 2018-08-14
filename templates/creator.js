const html = require('choo/html')

module.exports = function(creator, i){
  var type = creator.name

  // Parent container element
  const parent = document.getElementById('mover-container')
  var parentX = parent.offsetWidth
  var parentY = parent.offsetHeight

  // Start position for imgs variable
  var x = startX(parentX)
  var y = startY(parentY)


  // For some reason DatArchive.readdir() returns with its array an undefined item when using the opt
  // {stat: true}. To resolve this created a logic statement that filters out an undesirable objs.
  if (type !== "undefined") {
    return html `
      <img src="/img/${type}" id="${i}" class="movable" style="left: ${x}px; top: ${y}px;">
    `
  }

  // Start img position functions...
  // The logical element of this function determines were the end of the img
  // is in relation to the parent elements current width, which is called by
  // DomElement.offsetWidth (we use Hiegh for y parameter). If the remainder of
  // the multi subtract the pos random number is less than 100 we know the edge
  // of the img's right side is past the edge of the parent element.
  // NOTE: current img size is set to 100px, 100px.
  function startX(parentX){
    var multi = parentX
    var pos = Math.floor((Math.random() * multi) + 1)
    if (multi - pos < 100) {
      pos = multi - 100
    }
    return pos
  }

  function startY(parentY){
    var multi = parentY
    var pos = Math.floor((Math.random() * multi) + 1)
    if (pos < 100) {
      pos = 100
    }
    return pos
  }

}
