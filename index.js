// Cover ID Tags
const cover_image = document.getElementById("cover-image");
const artist_name = document.getElementById("artist-name");
const song_name = document.getElementById("song-name");
const background_image = document.getElementById("background-image");

// Button ID Tags
const previous_button = document.getElementById("previous");
const stop_button = document.getElementById("stop");
const next_button = document.getElementById("next");

// Song ID Tags
const current_timestamp = document.getElementById("current");
const duration_timestamp = document.getElementById("overall");
const timestamp_range = document.getElementById("timestamp-range");

// Audio ID Tags
const volume_range = document.getElementById("volume-range");
const volume_button = document.getElementById("volume-button");

// Audio Class & List Example
const music = new Audio();
const songs = [
  {
    path: "./assets/1.mp3",
    artist_name: "Ghost",
    song_name: "Mary on a cross",
    image_src: "./assets/images/Ghost.jpg",
  },
  {
    path: "./assets/2.mp3",
    artist_name: "The Stranglers",
    song_name: "Golden Brown",
    image_src: "./assets/images/Golden.jpg",
  },
  {
    path: "./assets/3.mp3",
    artist_name: "Mr.Kitty",
    song_name: "After Dark",
    image_src: "./assets/images/Dark.jpg",
  },
];
let song_index = 0;

// Wait til the page is fully loaded
window.addEventListener("DOMContentLoaded", () => {
  // Toggle Volume
  volume_button.addEventListener("click", () => {
    if (!music.muted) {
      volume_button.classList.replace("fa-volume-high", "fa-volume-xmark");
      music.volume = 0;
    } else {
      volume_button.classList.replace("fa-volume-xmark", "fa-volume-high");
      music.volume = volume_range.value / 100;
    }
  });

  // Toggle Play/Pause
  stop_button.addEventListener("click", () => {
    if (music.paused) {
      music.play();
      cover_image.style.animationPlayState = "running";
      stop_button.classList.replace("fa-play", "fa-stop");
    } else {
      music.pause();
      cover_image.style.animationPlayState = "paused";
      stop_button.classList.replace("fa-stop", "fa-play");
    }
  });

  // Calculates time difference with pads
  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }

  // Calculates the progress bar
  function progressBar() {
    let percentage = (music.currentTime / music.duration) * 100;
    timestamp_range.value = percentage;
    current_timestamp.textContent = formatTime(music.currentTime);
  }

  // Updates the current time on click & motion
  timestamp_range.addEventListener("input", () => {
    music.currentTime = (timestamp_range.value / 100) * music.duration;
  });

  // Updates the progress bar and loads next song when previous one finishes
  music.addEventListener("timeupdate", progressBar);

  // Auto load next song on end
  music.addEventListener("ended", nextLoad);

  // Activates once music gets its needed data (duration, size etc)
  music.addEventListener("loadedmetadata", () => {
    timestamp_range.max = 100;
    duration_timestamp.textContent = formatTime(music.duration);
  });

  function loadSong(index) {
    const s = songs[index];
    music.src = s.path;
    music.load();
    cover_image.src = s.image_src;
    artist_name.textContent = s.artist_name;
    song_name.textContent = s.song_name;
    background_image.src = s.image_src;
    music.play();
  }

  // Will load once either the music ends OR if we press the previous/forward buttons
  function nextLoad() {
    if (music.currentTime >= music.duration) {
      song_index++;
      stop_button.classList.replace("fa-play", "fa-stop");
      music.play();
      if (song_index >= songs.length) song_index = 0;
      loadSong(song_index);
    }
  }

  next_button.addEventListener("click", () => {
    stop_button.classList.replace("fa-play", "fa-stop");
    song_index++;
    if (song_index >= songs.length) song_index = 0;
    loadSong(song_index);
  });

  previous_button.addEventListener("click", () => {
    stop_button.classList.replace("fa-play", "fa-stop");
    song_index--;
    if (song_index < 0) song_index = songs.length - 1;
    loadSong(song_index);
  });

  volume_range.addEventListener("input", () => {
    music.volume = volume_range.value / 100; // Calculates real value
    if (isMuted) {
      volume_button.classList.replace("fa-volume-xmark", "fa-volume-high");
      isMuted = false;
    }
  });

  loadSong(song_index); // Auto load first song
});
