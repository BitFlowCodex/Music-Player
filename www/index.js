// Cover ID Tags
const cover_image = document.getElementById("cover-image");
const artist_name = document.getElementById("artist-name");
const song_name = document.getElementById("song-name");

// Button ID Tags
const backward_button = document.getElementById("backward");
const stop_button = document.getElementById("stop");
const forward_button = document.getElementById("forward");

// Song ID Tags
const current_timestamp = document.getElementById("current");
const overall_timestamp = document.getElementById("overall");
const timestamp_range = document.getElementById("timestamp-range");

// Audio ID Tags
const volume_range = document.getElementById("volume-range");
const volume_button = document.getElementById("volume-button");

// Overall Variables
const audio_url = "";
const audio = new Audio(audio_url);

// Toggle Volume
volume_button.addEventListener("click", () => {
  if (volume_button.classList.contains("fa-volume-high")) {
    volume_button.classList.replace("fa-volume-high", "fa-volume-xmark");
  } else {
    volume_button.classList.replace("fa-volume-xmark", "fa-volume-high");
  }
});

// Toggle Play/Pause
stop_button.addEventListener("click", () => {
  if (stop_button.classList.contains("fa-play")) {
    stop_button.classList.replace("fa-play", "fa-stop");
  } else {
    stop_button.classList.replace("fa-stop", "fa-play");
    audio.play()
  }
});


//placeholder (remove after)
overall_timestamp.textContent = "04:00"

// params startTime, width, endTime
function slider_calc() {
    
}
