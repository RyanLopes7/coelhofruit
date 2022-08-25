const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var rope;
var fruit;
var fruitCon;
var bgImg, fruitImg, rabbitImg;
var rabbit;
var button;

function preload() {
  bgImg = loadImage("background.png");
  fruitImg = loadImage("melon.png");
  rabbitImg = loadImage("Rabbit-01.png");
}

function setup() {
  createCanvas(500, 700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;

  button = createImg("cut_btn.png");
  button.position(220, 30);
  button.size(50, 50);
  button.mouseClicked(drop);

  ground = new Ground(200, 690, 600, 20);
  rope = new Rope(6, { x: 245, y: 30 });

  fruitOptions = {
    density: 0.001,
  };

  fruit = Bodies.circle(300, 300, 15, fruitOptions);
  Composite.add(rope.body, fruit);

  fruitCon = new Link(rope, fruit);

  rabbit = createSprite(250, 650, 100, 100);
  rabbit.addImage(rabbitImg);
  rabbit.scale = 0.2;

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);

  imageMode(CENTER);
}

function draw() {
  background(51);
  image(bgImg, width / 2, height / 2, 500, 700);
  ground.show();
  rope.show();

  image(fruitImg, fruit.position.x, fruit.position.y, 60, 60);

  Engine.update(engine);

  drawSprites();
}

function drop() {
  rope.break();
  fruitCon.detach();
  fruitCon = null;
}
