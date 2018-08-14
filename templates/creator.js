const html = require('choo/html')

module.exports = function(creator, i){
  var type = creator.name

  // For some reason DatArchive.readdir() returns with its array an undefined item when using the opt
  // {stat: true}. To resolve this created a logic statement that filters out an undesirable objs.
  if (type !== "undefined") {
    return html `
      <img src="/img/${type}" id="${i}" class="movable">
    `
  }

}
