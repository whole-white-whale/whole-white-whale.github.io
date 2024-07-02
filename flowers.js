var canvas = document.getElementById("flowers");
var context = canvas.getContext("2d");

context.fillStyle = "#80ff21";
context.strokeStyle = "#152a06";

context.font = "bold 64px Arial";

context.textAlign = "center";
context.textBaseline = "middle";

var current = 0;

function Sprite(src, x, y) {
  var self = this;

  this.image = new Image();
  this.image.src = "flowers/" + src + ".png";
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

var bss = [
  new Sprite("b1", 0, 0),
  new Sprite("b2", 0, 0),
  new Sprite("b3", 0, 0),
];
var iss = [
  new Sprite("i1", 480, 560),
  new Sprite("i2", 0, 560),
  new Sprite("i3", 240, 560),
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
    draw(bss[current]);
    iss.forEach(draw);
  }
}

canvas.onclick = function (event) {
  var x = event.pageX - this.offsetLeft;
  var y = event.pageY - this.offsetTop;

  for (var i = 0; i < iss.length; i++) {
    if (iss[i] !== null && iss[i].contains(x, y) && i == current) {
      iss[i] = null;
      current += 1;
    }
  }

  update();
};

setTimeout(update, 100);
