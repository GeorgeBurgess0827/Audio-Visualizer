var pieces, radius, fft, toggleBtn, slider;
//var colorPalette = ["#000", "rgba(22, 59, 72, 0.5)", "#00a6e0", "#002a38"];
//var colorPalette = ["#000", "#2a9d8f", "#e9c46a", "#e76f51"];
//var colorPalette = ["#ccc5b9", "#403d39", "#252422", "#eb5e28"];
var colorPalette = ["#03045e", "#0077b6", "#48cae4", "#caf0f8"];


let audio, audio2, audio3, audio4, audio5;
let currentAudio;




function preload() {
  audio = loadSound("songs/siesta.mp3");
  audio2 = loadSound("songs/lofi-study-112191.mp3");
  audio3 = loadSound("songs/cinematic-time-lapse-115672.mp3");
  audio4 = loadSound("songs/meditative-rain-114484.mp3");
  audio5 = loadSound("songs/noise-epic-drone-125428.mp3");
}



function setup() {

  createCanvas(windowWidth, windowHeight);

  toggleBtn = createButton("Play / Pause");

  toggleBtn.addClass("toggle-btn");

  toggleBtn.mousePressed(toggleAudio);
  slider = createSlider(0, 1, 0.5, 0.01);
  slider.addClass("slider");

  

  fft = new p5.FFT();
  analyzer = new p5.Amplitude();

  currentAudio = audio; // set initial audio source
  currentAudio.loop(); // start playing audio
  currentAudio.stop();
  

}

function draw() {

  

  currentAudio.setVolume(slider.value())
  background(colorPalette[0]);

  noFill();

  fft.analyze();
  level = analyzer.getLevel();

  let pieces = 4;
  let radius = 300;

  var bass = fft.getEnergy("bass");
  var treble = fft.getEnergy("treble");
  var mid = fft.getEnergy("mid");

  var mapMid = map(mid, 0, 255, -radius, radius);
  var scaleMid = map(mid, 0, 255, 1, 1.5);

  var mapTreble = map(treble, 0, 255, -radius, radius);
  var scaleTreble = map(treble, 0, 255, 1, 1.5);

  var mapbass = map(bass, 0, 255, -100, 800);
  var scalebass = map(bass, 0, 255, 0, 0.8);


  translate(windowWidth / 2, windowHeight / 2);

  strokeWeight(1);

  for (i = 0; i < pieces; i += 0.5) {

    rotate(TWO_PI / pieces);


    /*----------  BASS  ----------*/
    push();
    strokeWeight(5);
    stroke(colorPalette[1]);
    scale(scalebass);
    //rotate(frameCount * -0.5);
    rotate(frameCount * 0.01);
    line(mapbass, radius / 2, radius, radius);
    line(-mapbass, -radius / 2, radius, radius);
    //point(mapbass, radius);
   //point (-mapbass, radius);

    square(mouseX, mouseY, 33, 33);



    pop();



    /*----------  MID  ----------*/
    push();
    strokeWeight(0.5);
    stroke(colorPalette[2]);
    scale(scaleMid);
    rotate(frameCount * 0.01);
    line(mapMid, radius / 2, radius, radius);
    line(-mapMid, -radius / 2, radius, radius);
    //square(mouseX, mouseY, 33);
    pop();

    push();
    strokeWeight(5);
    stroke(colorPalette[2]);
    scale(scaleMid);
    rotate(-frameCount * 0.01);
    point(mapMid, radius);
    point(mapMid, -radius);
    point(mapMid + 20, radius * 2);
    point(mapMid + 20, -radius * 2);

    pop();


    /*----------  TREMBLE  ----------*/
    push();
    stroke(colorPalette[3]);
    scale(scaleTreble);
    rotate(frameCount * -0.02);
    //line(mapTreble, radius / 2, radius, radius);
    //line(-mapTreble, -radius / 2, radius, radius);
    //rect(mapTreble/5, radius * 0.5, radius, mapTreble/2); 
    bezier(mapTreble * 2 - i, 20, 10, 20, 100, 50, mapTreble * 2, radius);
    //ellipse(mouseX, mouseY, 33, 33);
    //point(mapTreble, radius/2);
    //point(-mapTreble, -radius/4);
    pop();

  }

}

function toggleAudio() {
  if (currentAudio.isPlaying()) {
    currentAudio.pause();
  } else {
    currentAudio.play();
  }
}


const lofi = document.getElementById('lofi');
const classical = document.getElementById('classical');
const rain = document.getElementById('rain');
const whitenoise = document.getElementById('whitenoise');

lofi.addEventListener('click', () => {
    switchAudio(audio2);
});

classical.addEventListener('click', () => {
    switchAudio(audio3);
});

rain.addEventListener('click', () => {
    switchAudio(audio4);
});

whitenoise.addEventListener('click', () => {
    switchAudio(audio5);
});


function switchAudio(audio) {
  currentAudio.stop(); // stop current audio
  if (audio === audio2) {
    colorPalette = ["#03045e", "#0077b6", "#48cae4", "#caf0f8"];
  } else if (audio === audio3) {
    colorPalette = ["#000", "rgba(22, 59, 72, 0.5)", "#00a6e0", "#002a38"];
  } else if (audio === audio4) {
    colorPalette = ["#000", "#2a9d8f", "#e9c46a", "#e76f51"]
  } else if (audio === audio5) {
    colorPalette = ["#232946", "#6EB257", "##5B2E48", "#ffd803"];
  } else {
    colorPalette = ["#004643", "#e16162", "#f9bc60", "#abd1c6"];
  }
  currentAudio = audio; // set new audio source
  currentAudio.loop(); // start playing new audio
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


const loader = document.querySelector('.loader');
const main = document.querySelector('.main');


