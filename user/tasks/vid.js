// video-editing.js

let videoPlayer = document.getElementById('videoPlayer');
let canvas = document.getElementById('videoCanvas');
let context = canvas.getContext('2d');
let textInput = document.getElementById('textInput');
let filterSelect = document.getElementById('filterSelect');
let mixSelect = document.getElementById('mixSelect');
let videoList = document.getElementById('videoList');
let searchInput = document.getElementById('searchVideos');

// Handle video selection from list
videoList.addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
        let videoFile = event.target.getAttribute('data-video');
        let videoURL = `path/to/videos/${videoFile}`; // Adjust path accordingly
        videoPlayer.src = videoURL;
        videoPlayer.style.display = 'block';
        videoPlayer.addEventListener('loadeddata', function() {
            canvas.width = videoPlayer.videoWidth;
            canvas.height = videoPlayer.videoHeight;
            drawVideoFrame();
        });
    }
});

// Draw the current video frame on the canvas
function drawVideoFrame() {
    if (videoPlayer.paused || videoPlayer.ended) return;
    context.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
    requestAnimationFrame(drawVideoFrame);
}

// Play the video
function playVideo() {
    videoPlayer.play();
}

// Pause the video
function pauseVideo() {
    videoPlayer.pause();
}

// Stop the video
function stopVideo() {
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
}

// Add text overlay (placeholder)
function addTextOverlay() {
    if (!videoPlayer.src) return;

    let text = textInput.value;
    context.font = '30px Arial';
    context.fillStyle = '#FFFFFF';
    context.fillText(text, 50, 50);
}

// Add filter (placeholder)
function addFilter() {
    let filter = filterSelect.value;
    canvas.style.filter = filter;
}

// Add video mix (placeholder)
function addVideoMix() {
    if (!videoPlayer.src) return;

    let mixVideo = mixSelect.value;
    console.log('Mixing with:', mixVideo);
}

// Apply effects (placeholder)
function applyEffects() {
    if (!videoPlayer.src) return;

    console.log('Applying effects...');
}

// Enhance video functionality (placeholder)
function enhanceVideo() {
    if (!videoPlayer.src) return;

    console.log('Enhancing video...');
}

// Export video (placeholder)
function exportVideo() {
    if (!videoPlayer.src) return;

    console.log('Exporting video...');
}

// Event listeners
document.getElementById('playButton').addEventListener('click', playVideo);
document.getElementById('pauseButton').addEventListener('click', pauseVideo);
document.getElementById('stopButton').addEventListener('click', stopVideo);
document.getElementById('trimButton').addEventListener('click', function() {
    console.log('Trimming video...');
});
document.getElementById('addTextButton').addEventListener('click', addTextOverlay);
document.getElementById('addFilterButton').addEventListener('click', addFilter);
document.getElementById('exportButton').addEventListener('click', exportVideo);
document.getElementById('addMixButton').addEventListener('click', addVideoMix);
document.getElementById('applyEffectsButton').addEventListener('click', applyEffects);
document.getElementById('enhanceButton').addEventListener('click', enhanceVideo);

// Search functionality
searchInput.addEventListener('input', function() {
    let query = searchInput.value.toLowerCase();
    let items = videoList.querySelectorAll('li');
    items.forEach(item => {
        let videoName = item.textContent.toLowerCase();
        if (videoName.includes(query)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
});
