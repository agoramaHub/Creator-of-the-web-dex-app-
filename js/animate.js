var intervalId = setTimeout(function() {
  var circles = document.querySelectorAll("img.movable");
  console.log(circles);

  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];

    circle.keyframes = [{
      opacity: 0,
      transform: "translate3d(" + 90 * i + "px, 0px, 0px)"
    }, {
      opacity: 1,
      transform: "translate3d(" + 90 * i + "px, 200px, 0px)"
    }, {
      opacity: 0,
      transform: "translate3d(" + 90 * i + "px, 0px, 0px)"
    }];

    circle.animProps = {
      duration: 1000 + 500 * i,
      easing: "ease-in-out",
      iterations: Infinity
    }

    var animationPlayer = circle.animate(circle.keyframes, circle.animProps);
  }

},200);


//
// var parent = document.getElementById('mover-container'); // Element that holds the mover
// var mover = document.getElementsByClassName('movable'); // The mover, can be anything
// var dir2 = 1;
// var dir = 1; // The direction we are moving... 1 is right, -1 is left.
// var dist = 10; // The distance we move each "tick"
//
// // The ID will let us stop it later if we want.
// var intervalId = setInterval(function() {
//   for (var i = 0; i < mover.length; i++) {
//     var movable = mover[i]
//
//     // Get the left, remove the "px" from the end and convert it to an integer.
//     var posX = parseInt(movable.style.left.replace(/px$/, '')) || 0;
//     var posY = parseInt(movable.style.top.replace(/px$/, '')) || 0;
//
//     // Add dir * dist
//     posX += dir * dist;
//     posY += dir2 * dist;
//
//     // If we are moving right and we've gone over the right edge...
//     if (dir >= 1 && posX + movable.offsetWidth > parent.offsetWidth) {
//         // only move right to the edge...
//         posX -= posX + movable.offsetWidth - parent.offsetWidth;
//         // and change direction.
//         dir *= -1;
//     // If we are moving left and we've gone over the left edge...
//     } else if (dir == -1 && posX < 0) {
//         // stop at zero...
//         posX = 0;
//         // and change direction...
//         dir *= -1;
//     }
//
//
//     if (dir2 <= 1 && posY + movable.offsetHeight > parent.offsetHeight) {
//         // only move right to the edge...
//         posY -= posY + movable.offsetHeight - parent.offsetHeight;
//         // and change direction.
//         dir2 *= -1;
//
//     } else if (dir2 == -1 && posY < 0) {
//         // stop at zero...
//         posY = 0;
//         // and change direction...
//         dir2 *= -1;
//     }
//
//     // Set the new position
//     movable.style.left = posX + "px";
//     movable.style.top = posY + "px";
//   }
// }, 80); // this number is how many milliseconds in between each move.
// // Smaller interval time means smoother movement but slower performance.
