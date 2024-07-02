var canvas = document.getElementById("map");
var context = canvas.getContext("2d");

context.fillStyle = "#80ff21";
context.strokeStyle = "#152a06";

context.font = "bold 64px Arial";

context.textAlign = "center";
context.textBaseline = "middle";

var picked = null;

function Sprite(src, x, y) {
  var self = this;

  this.image = new Image();
  this.image.src = "map/" + src + ".png";
  this.image.onload = function () {
    self.width = this.width;
    self.height = this.height;
  };

  this.x = x;
  this.y = y;

  this.contains = function (x, y) {
    var containsX = false;
    var containsY = false;

    if (this.x <= x && x <= this.x + this.width) containsX = true;
    if (this.y <= y && y <= this.y + this.height) containsY = true;

    if (containsX && containsY) return true;
    else return false;
  };
}

var pss = [
  new Sprite("p1", 397, 239),
  new Sprite("p2", 344, 151),
  new Sprite("p3", 283, 191),
  new Sprite("p4", 249, 195),
  new Sprite("p5", 147, 148),
  new Sprite("p6", 135, 213),
  new Sprite("p7", 234, 436),
  new Sprite("p8", 340, 449),
];

var ess = new Array(8);

var iss = [
  new Sprite("i1", 480, 100),
  new Sprite("i2", 480, 50),
  new Sprite("i3", 480, 250),
  new Sprite("i4", 310, 50),
  new Sprite("i5", 480, 0),
  new Sprite("i6", 480, 150),
  new Sprite("i7", 310, 0),
  new Sprite("i8", 480, 200),
];

function draw(sprite) {
  if (sprite !== null) context.drawImage(sprite.image, sprite.x, sprite.y);
}

function update() {
  if (iss.every((sprite) => sprite === null)) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillText("ВЕРНО!", 320, 320);
    context.strokeText("ВЕРНО!", 320, 320);
  } else {
    context.clearRect(0, 0, canvas.width, canvas.height);
    pss.forEach(draw);
    ess.forEach(draw);
    iss.forEach(draw);
  }
}

canvas.onmousedown = function (event) {
  var x = event.pageX - this.offsetLeft;
  var y = event.pageY - this.offsetTop;

  for (var i = 0; i < iss.length; i++) {
    if (iss[i] !== null && iss[i].contains(x, y)) picked = i;
  }

  update();
};

canvas.onmousemove = function (event) {
  var x = event.pageX - this.offsetLeft;
  var y = event.pageY - this.offsetTop;

  if (picked !== null) {
    sprite = iss[picked];
    sprite.x = x - sprite.width / 2;
    sprite.y = y - sprite.height / 2;
  }

  update();
};

canvas.onmouseup = function (event) {
  var x = event.pageX - this.offsetLeft;
  var y = event.pageY - this.offsetTop;

  for (var i = 0; i < pss.length; i++) {
    if (pss[i].contains(x, y) && i == picked) {
      iss[i] = null;
      ess[i] = new Sprite("e" + (i + 1), 0, 0);
    }
  }

  picked = null;

  update();
};

setTimeout(update, 100);
