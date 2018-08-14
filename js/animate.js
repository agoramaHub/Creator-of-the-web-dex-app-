var parent = document.getElementById('mover-container');
var parentX = parent.offsetWidth;
var parentY = parent.offsetHeight;

var animation = setTimeout(function() {
  var movables = document.querySelectorAll(".movable");

  for (var i = 0; i < movables.length; i++) {
    var movable = movables[i];
    animateMovable(movable);
  }

},100);

function animateMovable(movable) {
  var xMax = parentX - 100;
  var yMax = parentY - 100;

  movable.keyframes = [{
    opacity: 0,
    transform: "translate3d(" + (Math.random() * xMax) + "px, " + (Math.random() * yMax) + "px, 0px)"
  }, {
    opacity: 1,
    transform: "translate3d(" + (Math.random() * xMax) + "px, " + (Math.random() * yMax) + "px, 0px)"
  }, {
    opacity: 0,
    transform: "translate3d(" + (Math.random() * xMax) + "px, " + (Math.random() * yMax) + "px, 0px)"
  }];

  movable.animProps = {
    duration: 1000 + Math.random() * 3000,
    easing: "ease-out",
    iterations: 1
  }

  var animationPlayer = movable.animate(movable.keyframes, movable.animProps);
  addFinishHandler(animationPlayer, movable);
}

function addFinishHandler(anim, el) {
  anim.addEventListener('finish', function(e) {
    animateMovable(el);
  }, false);
}
