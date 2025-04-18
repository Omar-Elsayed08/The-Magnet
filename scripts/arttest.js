// Get the image track element
const track = document.getElementById("image-track");

// Variables for smooth animation
let targetPercentage = 0;
let currentPercentage = 0;
let isAnimating = false;

// Handle mouse down event - store the initial X position
window.onmousedown = e => {
  track.dataset.mouseDownAt = e.clientX;
}

// Handle mouse up event - reset the mouse position and store the current position
window.onmouseup = () => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
}

// Handle mouse move event - calculate and apply the scroll position
window.onmousemove = e => {
  // If mouse is not pressed down, do nothing
  if(track.dataset.mouseDownAt === "0") return;
  
  // Calculate how far the mouse has moved
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
  const trackWidth = track.offsetWidth;
  const windowWidth = window.innerWidth;
  
  // Convert mouse movement to pixels
  const percentage = (mouseDelta/windowWidth) * -100;
  targetPercentage = Math.min(Math.max(parseFloat(track.dataset.prevPercentage || 0) + percentage, -100), 0);
  
  // Store the new position
  track.dataset.percentage = targetPercentage;
  
  // Start animation if not already running
  if (!isAnimating) {
    isAnimating = true;
    animate();
  }
}

// Animation function using requestAnimationFrame
function animate() {
  // Smoothly interpolate between current and target position
  currentPercentage += (targetPercentage - currentPercentage) * 0.07;
  
  // Apply the transform to move the track
  track.style.transform = `translate(${currentPercentage}%, -50%)`;
  
  // Move each image within its container for parallax effect
  for(const image of track.getElementsByClassName("image")) {
    image.style.objectPosition = `${currentPercentage + 100}% center`;
  }
  
  // Continue animation if we haven't reached the target
  if (Math.abs(targetPercentage - currentPercentage) > 0.1) {
    requestAnimationFrame(animate);
  } else {
    isAnimating = false;
  }
}

// Handle mouse wheel event for horizontal scrolling
window.addEventListener('wheel', (e) => {
  // Prevent default scrolling behavior
  e.preventDefault();
  
  // Get current percentage and calculate new target
  const currentPercentage = parseFloat(track.dataset.percentage || 0);
  const delta = -e.deltaY * 0.02; // Adjust this value to control scroll speed
  targetPercentage = Math.min(Math.max(currentPercentage - delta, -100), 0);
  
  // Store the new percentage
  track.dataset.percentage = targetPercentage;
  
  // Start animation if not already running
  if (!isAnimating) {
    isAnimating = true;
    animate();
  }
}, { passive: false });
