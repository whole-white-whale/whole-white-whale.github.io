var canvas = document.getElementById("trees");
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
  this.image.src = "trees/" + src + ".png";
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
  new Sprite("p1", 0, 560),
  new Sprite("p2", 240, 560),
  new Sprite("p3", 480, 560),
];
var iss = [
  new Sprite("i1", 480, 0),
  new Sprite("i2", 0, 0),
  new Sprite("i3", 240, 0),
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
    if (pss[i].contains(x, y) && i == picked) iss[i] = null;
  }

  picked = null;

  update();
};

setTimeout(update, 100);
