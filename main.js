function setup() {
  canvas = createCanvas(350, 350);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier= ml5.imageClassifier('MobileNet', modelLoaded);
}

function draw(){
  image(video,0, 0, 350, 350);
  classifier.classify(video, gotResults);
}

function modelLoaded(){
  console.log("Model has been loaded ")
}
pr="";

function gotResults(error,results){
if(error){
  console.log(error);
}
else{
  if((results[0].confidence > 0.5) && (pr!= results[0].label)){
    console.log(results);
    pr=results[0].label;
    var synth=window.speechSynthesis;
    speak_data="Object detected is " +results[0].label;

    var utterThis= new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
  document.getElementById('object').innerHTML= results[0].label;
  p=floor(results[0].confidence * 100);
  document.getElementById('accuracy').innerHTML= p + "%";
  }
}
}


