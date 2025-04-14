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

// Handle mouse up event - reset the mouse position and store the current percentage
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
  
  // Convert mouse movement to a percentage (-100 to 0)
  const percentage = (mouseDelta / windowWidth) * -100;
  // Ensure the percentage stays within bounds
  targetPercentage = Math.min(Math.max(parseFloat(track.dataset.prevPercentage) + percentage, -100), 0);
  
  // Store the new percentage
  track.dataset.percentage = targetPercentage;
  
  // Start animation if not already running
  if (!isAnimating) {
    isAnimating = true;
    animate();
  }
}

// Animation function using requestAnimationFrame
function animate() {
  // Smoothly interpolate between current and target percentage
  currentPercentage += (targetPercentage - currentPercentage) * 0.07;
  
  // Apply the transform to move the track
  track.style.transform = `translate(${currentPercentage}%, -50%)`;
  
  // Continue animation if we haven't reached the target
  if (Math.abs(targetPercentage - currentPercentage) > 0.1) {
    requestAnimationFrame(animate);
  } else {
    isAnimating = false;
  }
}

// Handle mouse wheel event for horizontal scrolling
window.addEventListener('wheel', (e) => {
  // Prevent default vertical scrolling
  e.preventDefault();
  
  // Get current scroll position
  const currentScrollPercentage = parseFloat(track.dataset.percentage || 0);
  // Convert vertical scroll to horizontal movement (adjust 0.1 to change speed)
  // Negative sign reverses the direction
  const scrollAmount = -e.deltaY * 0.1;
  // Ensure the percentage stays within bounds
  targetPercentage = Math.min(Math.max(currentScrollPercentage + scrollAmount, -100), 0);
  
  // Store the new percentage
  track.dataset.percentage = targetPercentage;
  
  // Start animation if not already running
  if (!isAnimating) {
    isAnimating = true;
    animate();
  }
}, { passive: false }); // passive: false allows us to prevent default scrolling 