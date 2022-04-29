Webcam.set ({
    width:350,
    height:300,
    img_format: 'png',
    image_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach ('#camera');

Webcam.snap(function (data_uri){
    document.getElementById("result").innerHTML = '<img id="captured image" src="'+data_uri+'"/>'
});

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/8V8dIDQC8/',modelLoaded);

function modelLoaded() {
    console.log('Model Loaded!')
}
console.log('ml5 version:', ml5.version)

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The prediction is" + prediction1;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById('captured image');
    classifier.classify(img, gotResults);
}

function gotResult(error, results) 
{
    if (error) {
        console.error(error);
    }

    else {
        console.log(results);
        document.getElementById("result_hand_gesture_name").innerHTML = results[0].label;
        prediction_1 = results[0].label;
        speak();
        if(results[0].label == "Thumbs up")
        {
            document.getAnimations("update_hand_gesture").innerHTML = "&#128077;";
        }
        if(results[0].label == "Thumbs down")
        {
            document.getAnimations("update_hand_gesture").innerHTML = "&#128078;";
        }
        if(results[0].label == "Amazing")
        {
            document.getAnimations("update_hand_gesture").innerHTML = "&#128076;";
        }
        if(results[0].label == "Victory")
        {
            document.getAnimations("update_hand_gesture").innerHTML = "&#9996;";
        }
    }
}