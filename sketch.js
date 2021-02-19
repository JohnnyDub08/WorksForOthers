/*Dominic Florack - Feb 2021 */

let c,bC;
let i;


let bubbles = [];
let bubbleSize = 120;
let size;
let colors = ['#065143','#129490','#70B77E', '#E0A890','#CE1483'];
let colors2 = ['#129490','#70B77E', '#E0A890','#CE1483','#065143'];

function setup() {


  i = 0
  c = color('#065143');    // <--- HIER FARBE ÄNDERN!
  bC = color('#129490');  // <---- HINTERGRUND

  setAttributes('antialias', true);
  canvas = createCanvas(windowWidth, windowHeight,WEBGL)
  canvas.position(0, 0);
  canvas.style('z-index', '-1')
  canvas.elt.style.position = "fixed"
  background(bC);
  noStroke();
  fill(c)
  size = height/9;   // <--- Größe der Bubble!!!
  bubbleSize = map(sin(frameCount * 0.08), -1, 1, size-1, size+1)
  ellipse(0, 0, bubbleSize * 2, bubbleSize * 2);

}

function windowResized() {
  canvas = createCanvas(windowWidth, windowHeight,WEBGL)
  canvas.position(0, 0);
  canvas.style('z-index', '-1')
}

function colorChanges() {
  if (frameCount% 210 == 0) {
    i++;
    if (i > colors.length-1) i = 0;
    c = color(colors[i]);
    bC = color(colors2[i]);
  }
}

function draw() {

  colorChanges()    // <--- Das auskommentieren.

  background(bC);
  noStroke();
  fill(c)
  bubbleSize = map(sin(frameCount * 0.08), -1, 1, size-1, size+1)
  ellipse(0, 0, bubbleSize * 2, bubbleSize * 2);
  if (frameCount % 3 == 0)
  bubbles.push(new Bubble());
  push();
  for (let bubble of bubbles) {
    bubble.updateMe();
    bubble.resizeMe();
    bubble.showMe();
  }
  pop();
}

function Bubble() {
  let xRange = width / 2.618   // <- SPAWNBREITE X ACHSE
  let yRange = height / 2  // <- SPAWNBREITE Y ACHSE
  this.loc = createVector(random(-xRange, xRange), random(-yRange, yRange));
  this.size = 0;
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.c = color(127);
  this.growth = random(0.2179, 0.2193);  // <--- WACHSTUMSRATE
  this.dist = random(size-1,size+2)
  this.showMe = function () {
    noStroke();
    fill(c);
    ellipse(this.loc.x, this.loc.y, this.size, this.size);
  }
  this.updateMe = function () {
    let distance = dist(this.loc.x, this.loc.y, 0, 0)
    let distForce = map(distance,size,height,7.3,2.1)
    let mass = map(this.size,0,10,1.06,0.85)
    if (distance > this.dist ) {
      let speed = 0.013; // <---- ANZIEHUNG GESCHWINDIGKEIT
    this.acc = p5.Vector.sub(createVector(0, 0), this.loc);this.acc.setMag(speed*mass*distForce);
      //this.acc.setMag(0.037);
      this.vel.add(this.acc);
      this.vel.limit(5);
      this.loc.add(this.vel);
    } else {
      this.growth = -0.83;      // <--- SCHRUMPFSRATE
    }
    if (this.size < 0) {
      let index = bubbles.indexOf(this);
      delete bubbles[index];
    }
    bubbles = arrayRemove(bubbles, undefined);
  }
  this.resizeMe = function () {
    this.size += this.growth;
  }
}

function arrayRemove(arr, value) {
  return arr.filter(function (ele) {
    return ele != value;
  });
}
