// Rose Sketch
let rose = new p5((sketch) => {
  let a = 100;
  sketch.setup = () => {
    cn2 = sketch.createCanvas(340, 280).parent("ros-canv");
    nS = sketch.createSlider(1, 10, 8, 1).parent("ros-slid1");
    dS = sketch.createSlider(1, 10, 10, 1).parent("ros-slid2");
    sketch.frameRate(7);
  };
  sketch.draw = () => {
    n = nS.value();
    d = dS.value();
    k = n / d;
    sketch.background(51);
    sketch.textSize(15);
    sketch.noStroke();
    sketch.fill(255, 255, 255);
    sketch.text("n Value : " + nS.value(), 10, 19);
    sketch.text("d Value : " + dS.value(), sketch.width - 90, 19);
    sketch.translate(sketch.width / 2, sketch.height / 2);
    sketch.noFill();
    sketch.beginShape();
    for (let th = 0; th < sketch.PI * 2 * d; th += 0.1) {
      let r = a * sketch.cos(k * th);
      sketch.stroke(
        sketch.random(0, 50),
        sketch.random(200, 255),
        sketch.random(0, 255)
      );
      sketch.strokeWeight(1);
      sketch.vertex(r * sketch.cos(th), r * sketch.sin(th));
    }
    sketch.endShape(sketch.CLOSE);
  };
});
// Sparkline Sketch
let sparkline = new p5((sketch) => {
  sketch.setup = () => {
    cn = sketch.createCanvas(400, 280).parent("spark-canv");
    sl = sketch.createSlider(1, 50, 45, 1).parent("spark-slid1");
    fsl = sketch.createSlider(1, 60, 6, 1).parent("spark-slid2");
  };
  sketch.draw = () => {
    sketch.frameRate(fsl.value());
    sketch.background(51);
    sketch.noFill();
    sketch.stroke(
      sketch.random(0, 50),
      sketch.random(200, 255),
      sketch.random(0, 255)
    );
    sketch.beginShape();
    for (var x = 0; x <= sketch.width; x += sl.value()) {
      sketch.vertex(x, sketch.random(100, 200));
      var txtsz = sketch.map(sl.value(), 1, 50, 1, 20);
      sketch.textSize(txtsz);
      sketch.noStroke();
      sketch.fill(240);
      sketch.text(x, x + 8, 225);
      sketch.noFill();
      sketch.stroke(
        sketch.random(0, 50),
        sketch.random(200, 255),
        sketch.random(0, 255)
      );
    }
    sketch.vertex(sketch.width, 160);
    sketch.endShape();
    sketch.stroke(240);
    sketch.line(0, 95, sketch.width, 95);
    sketch.line(0, 205, sketch.width, 205);
  };
});
// Seek Sketch
let seek = new p5((sketch) => {
  let img_siz = 40;
  sketch.preload = () => {
    img = sketch.loadImage(
"https://www.i2clipart.com/cliparts/a/e/6/4/clipart-target-512x512-ae64.png"
    );
  };
  sketch.setup = () => {
    cn=sketch.createCanvas(400, 300).parent('seek-canv');
    vehicle = new Vehicle(200, 200);
  };
  sketch.draw = () => {
    sketch.background(51);
    sketch.textSize(32);
    sketch.text("Seek the target.", 50, 87);
    sketch.fill(255, 0, 255);
    sketch.noStroke();
    target = sketch.createVector(sketch.mouseX, sketch.mouseY);
    imgX = target.x - img_siz / 2;
    imgY = target.y - img_siz / 2;
    sketch.image(img, imgX, imgY, img_siz, img_siz);
    vehicle.seek(target);
    vehicle.update();
    vehicle.show();
    sketch.textSize(15);
    sketch.noStroke();
  };
  class Vehicle {
    constructor(x, y) {
      this.pos = sketch.createVector(x, y);
      this.vel = sketch.createVector(0, 0);
      this.acc = sketch.createVector(0, 0);
      this.maxSpeed = 4;
      this.maxForce = 0.30;
      this.r = 16;
    }
    seek(target) {
      let force = p5.Vector.sub(target, this.pos);
      force.setMag(this.maxSpeed);
      force.sub(this.vel);
      force.limit(this.maxForce);
      this.acc.add(force);
    }
    update() {
      this.vel.add(this.acc);
      this.vel.limit(this.maxSpeed);
      this.pos.add(this.vel);
      this.acc.set(0, 0);
    }
    show() {
      sketch.stroke(255);
      sketch.strokeWeight(2);
      sketch.fill(255);
      sketch.push();
      sketch.translate(this.pos.x, this.pos.y);
      sketch.rotate(this.vel.heading());
      sketch.triangle(-this.r, -this.r / 2, -this.r, this.r / 2, this.r, 0);
      sketch.pop();
    }
  }
});
