// Get references to necessary DOM elements
const readyToTurnOnCamera = document.getElementById('readyToTurnOnCamera')
const webCam = document.getElementById('webCam')
const videoFromUserCamera = document.getElementById('videoFromUserCamera')
const toggleButtonToTurnOnOrOff = document.getElementById('toggleButton')
const camera = document.getElementById('camera')

let cameraTurnOn = true; // Boolean to track the current state of the camera (on/off)
let stream; // Variable to store the media stream

// Check if the device supports camera access
if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
  alert('this device does not support camera')
  }

// Async function to request camera access and start the video stream
async function turnOnCamera() {
  try {
    // Request camera access
    const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });

    // Store the media stream globally for later use
    stream = mediaStream; 
    
    // Set the video source to the media stream
    videoFromUserCamera.srcObject = stream;
    
    // Show the camera div when stream is active
    camera.style.display = 'flex'; 

    // Change the toggle button text to 'Turn Off Camera'
    toggleButtonToTurnOnOrOff.textContent = 'Turn Off Camera';

  } catch (error) {
    // Show error message if accessing the camera fails
    alert("Error accessing the camera\nPlease reload and allow access to the camera");
  }
}

// Function to pause the camera (stop displaying the stream without releasing the camera)
function pause(){
  videoFromUserCamera.srcObject = null;
};

// Function to resume the camera (display the stream again)
function resume(){
  videoFromUserCamera.srcObject = stream;
}

// Event listener "click" for the "I'm ready" button
readyToTurnOnCamera.addEventListener('click' ,  () => {
  // Hide the readiness prompt
  webCam.style.display = 'none';
  
  // Call the function to start the camera
  turnOnCamera(); 
})

// Event listener "click" for the toggle button to turn the camera on/off
toggleButtonToTurnOnOrOff.addEventListener('click' , () => {
  
  // If camera is currently on, pause the stream and toggle button to turn on
  if(cameraTurnOn == true){
    pause();
    toggleButtonToTurnOnOrOff.textContent= 'Turn On Camera';
  }

  // If camera is off, resume the stream and toggle to button to turn off
  else{
    resume();
    toggleButtonToTurnOnOrOff.textContent = 'Turn Off Camera';
  }

  // Change the state of camera
  cameraTurnOn = !cameraTurnOn
})
