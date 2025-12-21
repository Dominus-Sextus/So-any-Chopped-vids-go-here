// Please work 😭😭. If you don't work I'm cooked
// Get video element
const video = document.getElementById('mainVideo');
let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// Add event listeners for video interactions
video.addEventListener('loadedmetadata', function() {
    console.log('Video loaded successfully');
    console.log('Duration: ' + formatTime(video.duration));
    
    // Set video attributes for better mobile performance
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    
    if (isMobile) {
        console.log('Mobile device detected - optimizing video controls');
    }
});

video.addEventListener('play', function() {
    console.log('Video started playing');
});

video.addEventListener('pause', function() {
    console.log('Video paused');
});

video.addEventListener('ended', function() {
    console.log('Video ended');
    // Optional: Add replay button or other end behaviors
});

// Error handling
video.addEventListener('error', function() {
    console.error('Error loading video');
    alert('There was an error loading the video. Please check the video file path or format.');
});

// Handle orientation changes on mobile
window.addEventListener('orientationchange', function() {
    setTimeout(() => {
        // Recalculate layout on orientation change 
        console.log('Orientation changed to ' + window.orientation);
    }, 100);
});

// Helper function to format time
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// I Don't know if this will work but here goes nothing, even if it works I'm not sure if it'll stay working
// Keyboard controls for desktop devices
if (!isMobile) {
    document.addEventListener('keydown', function(e) {
        switch(e.key) {
            case ' ':
                e.preventDefault();
                if (video.paused) {
                    video.play();
                } else {
                    video.pause();
                }
                break;
            case 'ArrowRight':
                video.currentTime += 5;
                break;
            case 'ArrowLeft':
                video.currentTime -= 5;
                break;
            case 'f':
                if (video.requestFullscreen) {
                    video.requestFullscreen();
                } else if (video.webkitRequestFullscreen) {
                    video.webkitRequestFullscreen();
                }
                break;
            case 'm':
                video.muted = !video.muted;
                break;
        }
    });
}

// for if you open on mobile
if (isMobile) {
    let lastTap = 0;
    video.addEventListener('touchend', function(e) {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        if (tapLength < 300 && tapLength > 0) {
            // Double tap detected
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        }
        lastTap = currentTime;
    });
}