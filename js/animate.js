
var parent = document.getElementById('drop_zone'); // Element that holds the mover
var mover = document.getElementsByClassName('movable'); // The mover, can be anything
var dir2 = 1;
var dir = 1; // The direction we are moving... 1 is right, -1 is left.
var dist = 10; // The distance we move each "tick"

// The ID will let us stop it later if we want.
var intervalId = setInterval(function() {
  for (var i = 0; i < mover.length; i++) {
    var movable = mover[i]

    // Get the left, remove the "px" from the end and convert it to an integer.
    var posX = parseInt(movable.style.left.replace(/px$/, '')) || 0;
    var posY = parseInt(movable.style.bottom.replace(/px$/, '')) || 0;

    // Add dir * dist
    posX += dir * dist;
    posY += dir2 * dist;

    // If we are moving right and we've gone over the right edge...
    if (dir >= 1 && posX + movable.offsetWidth > parent.offsetWidth) {
        // only move right to the edge...
        posX -= posX + movable.offsetWidth - parent.offsetWidth;
        // and change direction.
        dir *= -1;
    // If we are moving left and we've gone over the left edge...
    } else if (dir == -1 && posX < 0) {
        // stop at zero...
        posX = 0;
        // and change direction...
        dir *= -1;
    }


    if (dir2 <= 1 && posY + movable.offsetHeight > parent.offsetHeight) {
        // only move right to the edge...
        posY -= posY + movable.offsetHeight - parent.offsetHeight;
        // and change direction.
        dir2 *= -1;

    } else if (dir2 == -1 && posY < 0) {
        // stop at zero...
        posY = 0;
        // and change direction...
        dir2 *= -1;
    }

    // Set the new position
    movable.style.left = posX + "px";
    movable.style.bottom = posY + "px";
  }
}, 80); // this number is how many milliseconds in between each move.
// Smaller interval time means smoother movement but slower performance.
