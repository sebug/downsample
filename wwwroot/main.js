'use strict';

// Put variables in global scope to make them available to the browser console.
const video = document.querySelector('video');
const canvas = window.canvas = document.querySelector('canvas');
canvas.width = 480;
canvas.height = 360;

function RGBToGrayScale(red,green,blue) {
    //return red * 0.2126 + green * 0.7152 + blue * 0.0722;
    return (red * 6966 + green * 23436 + blue * 2366) >> 15;
}  

const button = document.querySelector('button');
button.onclick = function() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  let transformCanvas = document.createElement('canvas');
  transformCanvas.width = 160;
  transformCanvas.height = 120;
  let transformCtx = transformCanvas.getContext('2d');
  transformCtx.drawImage(video, 0, 0, transformCanvas.width, transformCanvas.height);

  let imageData = transformCtx.getImageData(0, 0, transformCanvas.width, transformCanvas.height);
  const pixels = imageData.data;
  for (var i = 0; i < pixels.length; i += 4) {

    let lightness = parseInt((pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3);

    pixels[i] = lightness;
    pixels[i + 1] = lightness;
    pixels[i + 2] = lightness;
  }
  transformCtx.putImageData(imageData, 0, 0);

  let ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  ctx.drawImage(transformCanvas, 0, 0, canvas.width, canvas.height);
};

const constraints = {
  audio: false,
  video: true
};

function handleSuccess(stream) {
  window.stream = stream; // make stream available to browser console
  video.srcObject = stream;
}

function handleError(error) {
  console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
}

navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);

