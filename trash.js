var canvas = document.getElementById("trash");
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
  this.image.src = "trash/" + src + ".png";
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
  new Sprite("p1", 0, 390),
  new Sprite("p2", 155, 390),
  new Sprite("p3", 310, 390),
  new Sprite("p4", 465, 390),
];

var iss = [
  [new Sprite("i1-1", 160, 0), new Sprite("i1-2", 0, 0)],
  [new Sprite("i2-1", 320, 0), new Sprite("i2-2", 480, 0)],
  [new Sprite("i3-1", 480, 160), new Sprite("i3-2", 0, 160)],
  [new Sprite("i4-1", 160, 60), new Sprite("i4-2", 320, 160)],
];

function draw(sprite) {
  if (sprite !== null) context.drawImage(sprite.image, sprite.x, sprite.y);
}

function update() {
  if (iss.every((group) => group.every((sprite) => sprite === null))) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillText("ВЕРНО!", 320, 320);
    context.strokeText("ВЕРНО!", 320, 320);
  } else {
    context.clearRect(0, 0, canvas.width, canvas.height);
    pss.forEach(draw);
    iss.forEach((group) => group.forEach(draw));
  }
}

canvas.onmousedown = function (event) {
  var x = event.pageX - this.offsetLeft;
  var y = event.pageY - this.offsetTop;

  for (var i = 0; i < iss.length; i++) {
    for (var j = 0; j < iss[i].length; j++) {
      if (iss[i][j] !== null && iss[i][j].contains(x, y)) picked = [i, j];
    }
  }

  update();
};

canvas.onmousemove = function (event) {
  var x = event.pageX - this.offsetLeft;
  var y = event.pageY - this.offsetTop;

  if (picked !== null) {
    sprite = iss[picked[0]][picked[1]];
    sprite.x = x - sprite.width / 2;
    sprite.y = y - sprite.height / 2;
  }

  update();
};

canvas.onmouseup = function (event) {
  var x = event.pageX - this.offsetLeft;
  var y = event.pageY - this.offsetTop;

  for (var i = 0; i < pss.length; i++) {
    if (pss[i].contains(x, y) && i == picked[0]) iss[i][picked[1]] = null;
  }

  picked = null;

  update();
};

setTimeout(update, 100);
