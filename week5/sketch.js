let capture;
let pixelSize = 10;
let keyPressCount = 0;

function setup() {
  createCanvas(640, 480);
  capture = createCapture(VIDEO);
  rectMode(CENTER);
}

function draw() {
  background(50);

   capture.loadPixels();


   if (keyIsDown(UP_ARROW) && keyPressCount < 10) {
    pixelSize++;
    keyPressCount++;
   }

    for (let y =0; y <capture.height; y+=pixelSize){
        for (let x=0; x<capture.width; x+=pixelSize){
            const index =(x+y*capture.width)*4;
            const r =capture.pixels[index+0];
            const g =capture.pixels[index+1];
            const b =capture.pixels[index+2];

            let brightness =(r+g+b)/3 /255;

             if(brightness >0.8){
                fill(189,183,107); // khaki (coin color)
              }else if(brightness >0.6){
                fill(139,69,19); // saddle brown (brick color)
              }else if(brightness >0.4){
                fill(220,20 ,60); // crimson (mario's clothes color)
              }else if(brightness >0.2){
                fill(34 ,139 ,34); // forest green (pipe color)
              }else{
                fill(70 ,130 ,180); // steel blue (sky color)
              }
              
             rect(x,y,pixelSize,pixelSize);
         }
     }
}
