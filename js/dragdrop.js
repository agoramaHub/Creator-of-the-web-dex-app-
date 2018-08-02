var container = document.getElementById('drop_zone');
var newImg = document.createElement('img');

/*
This is the original drag drop functionality... replacing for simplier version with file loading
capabilities and document appending operations, i.e. to index.html.
*/
async function dragOverHandler(ev) {
  console.log('File(s) in drop zone');

  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();
}

async function dropHandler(ev) {
  console.log('File(s) dropped');

  // Prevent default behavior (Prevent file from being opened)
  ev.stopPropagation();
  ev.preventDefault();

  var dt = ev.dataTransfer;
  var files = dt.files;
  // if (files.length > 1) {
  //   alert("you can only upload one file at a time...")
  // }

  handleFiles(files)
}

// New event hander function....
async function handleFiles(files) {

  // lets check if user is owner of the site or news to create own site for their use...
  const archive = await DatArchive.load(window.location)
  const archiveinfo = await archive.getInfo()
  // remove header if not archive owner
    if (!archiveInfo.isOwner) {
      document.body.removeChild(document.querySelector('header'))
      console.log('Sorry you do not have permissions to update this site... Please create our own game site by clicking the button above...')
    }

  // message for telling us that the user is in fact the owner and can proceed as normal..
  console.log('Found dat url and uploading new img file')

  for (let i = 0; i < files.length; i += 1) {
    const reader = new FileReader()
    const file = files[i]

    reader.onload = async function () {
            console.log('starting path uplaod');
            const path = `/img/${file.name}`
            const orientation = readOrientationMetadata(reader.result)

            // write the orientiation metadata to localStorage
            localStorage.setItem(`${archive.url}${path}`, orientation)

            // only write the file if it doesn't already exist
            try {
              await archive.stat(path)
            } catch (e) {
              await archive.writeFile(path, reader.result)
              // await archive.commit()
              // appendImage(path, orientation)
              window.location.reload()
            }
          }
    reader.readAsArrayBuffer(file)
  }

}

function appendImage(src, orientation=1) {
  if (typeof src !== 'string') return

  const el = document.getElementById('drop_zone')

  const img = document.createElement('img')
  img.src = src
  img.classList.add("movable")
  img.setAttribute("id","mover")
  // img.style.transform = IMAGE_ROTATION[orientation]
  // img.addEventListener('click', onToggleSelected)

  el.appendChild(img)
  // document.querySelector('.album-images').appendChild(el)
  console.log('appending image to index.html')
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
