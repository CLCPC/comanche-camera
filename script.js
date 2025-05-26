let model;
const video = document.getElementById('video');
const output = document.getElementById('output');
const dictionary = {
  "dog": "sarii",
  "cat": "waʔoo",
  "car": "nabukuwaa"
};

function playAudio(word) {
  const audio = new Audio(`audio/${word}.mp3`);
  audio.play();
}

function startCamera() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream;
    })
    .catch(err => {
      output.textContent = "Camera access denied or not available.";
    });
}

async function detectFrame() {
  const predictions = await model.detect(video);
  if (predictions.length > 0) {
    const label = predictions[0].class;
    const comancheWord = dictionary[label];
    if (comancheWord) {
      output.textContent = `${label} → ${comancheWord}`;
      playAudio(comancheWord);
    } else {
      output.textContent = `Detected: ${label} (no Comanche match)`;
    }
  } else {
    output.textContent = "No objects detected.";
  }
  requestAnimationFrame(detectFrame);
}

async function loadModelAndStart() {
  model = await cocoSsd.load();
  output.textContent = "Model loaded.";
  detectFrame();
}

startCamera();
loadModelAndStart();