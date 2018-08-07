/*
NOTE::: there are two ways to initiate a async functio....
the first is:

async function main() {
  your code here....
}
main()

or!

(async function(){
  your code here....
})()

the difference is the first you have to call main() after the function to activate everything
the other does is automatically... either or is fine.

*/

(async  function () {

    // render prompt if not using Beaker
    if (!navigator.userAgent.includes('BeakerBrowser')) {
      renderUAPrompt()
      return
    }

    // setup global var for view dat
    let archive

    try {
      archive = new DatArchive(window.location)
      archiveInfo = await archive.getInfo()
    } catch (err) {
      updatePrompt('<p>Something went wrong.</p><a href="#">Report an issue</a>')
    }

    // render prompt functions, i.e. functions for telling the person to use beaker or something is very very wrong...
    // in addition this function being call also contains within it a document identifier that attachs the function
    // below to the button on the html page and listens to click events....
    renderApp()

    // Main create function... This allows for the user to create their own version of this application from fresh
    // how this works is first we set a constant, game, which with activate the beaker api and create a new dat
    // on the users local machine. After that we create several directories that will create the architecture for
    // the newly created app. Next we save this new url or dat url to the local machines library.
    // the next steps are actually reading the corresponding files that needed for the dat app and the animation, plus
    // the beginning img, Sir Tim Berners Lee. and other correspondng file...
    // we write them next to this newly create local version
    // Then we open this new site in a new browser window... Magic!
    async function onCreateGame (e) {

      // create a new Dat archive
      const game = await DatArchive.create()

      // Create architecture for application.
      await game.mkdir('/img')
      await game.mkdir('/css')
      await game.mkdir('/js')

      // Save our dat url to local library
      .then(archive => {
        localStorage.targetDatURL = game.url
        console.log('Created and saved!')
      })

      // Writing corresponding file for newly created app.
      const html = await archive.readFile('temp.html')
      const js = await archive.readFile('/js/index.js')
      const animation = await archive.readFile('/js/animate.js')
      const dragdrop = await archive.readFile('/js/dragdrop.js')
      const cssmain = await archive.readFile('/css/main.css')
      const img = await archive.readFile('/img/sir-tim-berners-lee.jpg', 'base64')
      await game.writeFile('index.html', html)
      await game.writeFile('/js/animate.js', animation)
      await game.writeFile('/js/index.js', js)
      await game.writeFile('/js/dragdrop.js', dragdrop)
      await game.writeFile('/css/main.css', cssmain)
      await game.writeFile('/img/sir-tim-berners-lee.jpg', img, 'base64')
      // await game.commit()

      // open newly created dat in browser window...
      window.location = game.url
    }

    // render app function ---- + document and event listen function....
    function renderApp () {
      // clear the prompt
      updatePrompt('')
      // renderImages()

      document.querySelectorAll('.create-game').forEach(el => el.addEventListener('click', onCreateGame))

    }

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

})()
