// Get references to necessary DOM elements
const ready = document.getElementById('ready')
const webCam = document.getElementById('webCam')
const videoElement = document.getElementById('videoElement')
const toggleButton = document.getElementById('toggleButton')
const camera = document.getElementById('camera')

let cameraState = true; // Boolean to track the current state of the camera (on/off)
let stream; // Variable to store the media stream

// Check if the device supports camera access
if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
  alert('this device does not support camera')
  }

// Function to request camera access and start the video stream
function turnOnCamera(){
  navigator.mediaDevices.getUserMedia({video : true})
  .then(function(mediaStream){
    camera.style.display = 'flex'; // Show the camera div when stream is active
    stream = mediaStream; // Store the media stream globally for later use
    videoElement.srcObject = stream;
    toggleButton.textContent = 'Turn Off Camera';
    })
  
  .catch(function(error) {
    // Show error message if accessing the camera fails
    alert("Error accessing the camera\nPlease reloading and allow to access camera")
    })
};

// Function to pause the camera (stop displaying the stream without releasing the camera)
function pause(){
  videoElement.srcObject = null;
};

// Function to resume the camera (display the stream again)
function resume(){
  videoElement.srcObject = stream;
}

// Event listener for the "I'm ready" button
ready.addEventListener('click' ,  () => {
  webCam.style.display = 'none'; // Hide the readiness prompt
  videoElement.style.display = 'block'; // Show the video element
  turnOnCamera(); // Call the function to start the camera
})


// Event listener for the toggle button to turn the camera on/off
toggleButton.addEventListener('click' , () => {
  if(cameraState == true){
    // If camera is currently on, pause the stream
    pause();
    toggleButton.textContent= 'Turn On Camera';
  }
  else{
    // If camera is off, resume the stream
    resume();
    toggleButton.textContent = 'Turn Off Camera';
  }

  cameraState = !cameraState
})

