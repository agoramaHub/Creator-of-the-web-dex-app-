var container = document.getElementById('drop_zone')
// var newImg = document.createElement('img');

// drag over event listener //
container.addEventListener('dragover', async function(event){
  console.log('File(s) in drop zone')

  // Prevent default behavior (Prevent file from being opened)
  event.preventDefault()
}, false);

// Drop event Listener //
container.addEventListener('drop', async function(event){
  console.log('File(s) dropped into zone')

  // Prevent default behavior (Prevent file from being opened)
  event.stopPropagation()
  event.preventDefault()

  // handle dropped files....
  var dt = event.dataTransfer;
    var files = dt.files;
    if (files.length > 1) {
      alert("you can only upload one file at a time...")
    }
  console.log(files)
  handleFiles(files)
}, false);

// Handle dropped files function.... //
async function handleFiles(files){
  // lets check if user is owner of the site or news to create own site for their use...
    const archive = await DatArchive.load(window.location)
    const archiveInfo = await archive.getInfo()

    // remove header if not archive/site owner
      if (!archiveInfo.isOwner) {
        document.body.removeChild(document.querySelector('header'))
        console.log('Sorry you do not have permissions to update this site... Please create our own game site by clicking the button above...')
      }
    //confirm that user is infact the archive/aites owner.
    console.log('You are the owner of this site!')

    // While we are only allowing a single file upload at a time. We still run a for loop for scaling purposes.
    // This way is we choose to allow uses to upload in mass we can simply remove the limit at the drop event.
    for (let i = 0; i < files.length; i += 1) {
        const reader = new FileReader()
        const file = files[i]

        reader.onload = async function () {
                console.log('starting path uplaod')
                const path = `/img/${file.name}`
                const orientation = readOrientationMetadata(reader.result)

                // write the orientiation metadata to localStorage
                localStorage.setItem(`${archive.url}${path}`, orientation)

                // only write the file if it doesn't already exist
                try {
                  await archive.stat(path)
                } catch (e) {
                  await archive.writeFile(path, reader.result)
                  // Currently I am reloading the target window to allow for the application to load the
                  // new image element. However in the future it would be nice to have this loading function to
                  // to me updates by a state machine....
                  window.location.reload()
                }
              }
        reader.readAsArrayBuffer(file)
      }
}


function readOrientationMetadata (buf) {
  const scanner = new DataView(buf)
  let idx = 0
  let value = 1 // Non-rotated is the default

  if(buf.length < 2 || scanner.getUint16(idx) != 0xFFD8) {
    // not a JPEG
    return
  }

  idx += 2

  let maxBytes = scanner.byteLength;
  while(idx < maxBytes - 2) {
    let uint16 = scanner.getUint16(idx);
    idx += 2
    switch(uint16) {
      case 0xFFE1: // Start of EXIF
        var exifLength = scanner.getUint16(idx)
        maxBytes = exifLength - idx
        idx += 2
        break
      case 0x0112: // Orientation tag
        // Read the value, its 6 bytes further out
        // See page 102 at the following URL
        // http://www.kodak.com/global/plugins/acrobat/en/service/digCam/exifStandard2.pdf
        value = scanner.getUint16(idx + 6, false)
        maxBytes = 0; // Stop scanning
        break
    }
  }
  return value
}
