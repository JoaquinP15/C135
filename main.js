video = "";
Status = "";
objects = [];

function preload(){
   video = createVideo("video.mp4");
}

function setup(){
   canvas = createCanvas(480,380);
   canvas.center();

   video.hide();
}

function start(){
   object_detector =  ml5.objectDetector("cocossd",modelLoaded);
   document.getElementById("status").innerHTML = 'status : detecting objects';
}

function modelLoaded(){
   console.log("modelLoaded has been initialized");
   Status = true;
   video.speed(1);
   video.volume(0);
   video.loop();
}

function gotResults(error,results){
   if(error){
      console.log(error);
   }
   console.log(results);
   objects = results;
}

function draw(){
   image(video,0,0,480,380);
   if(Status != ""){
      object_detector.detect(video,gotResults);
      for(i = 0; i < objects.length; i++){
         document.getElementById("status").innerHTML = 'objects detected';
         document.getElementById("number_of_objects").innerHTML = 'number of objects' + objects.length;

         fill("red");
         percent = floor(objects[i].confidence * 100);
         text(objects[i].label + "" + percent + "%", objects[i].x +15 , objects[i].y +15);
         stroke("red");
         noFill();
         rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
      }
   }
}