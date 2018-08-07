const html = require('choo/html')

module.exports = function(creator, i){
  var type = creator.name
  var x = Math.floor((Math.random() * 1000) + 1)
  var y = Math.floor((Math.random() * 1000) + 1)

  // For some reason DatArchive.readdir() returns with its array an undefined item when using the opt
  // {stat: true}. To resolve this created a logic statement that filters out an undesirable objs.
  if (type !== "undefined") {
    return html `
      <img src="/img/${type}" id="${i}" class="movable" style="left: ${x}px; top: ${x}px;">
    `
  }

}
