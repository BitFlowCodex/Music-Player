// Cover ID Tags
const cover_image = document.getElementById("cover-image");
const artist_name = document.getElementById("artist-name");
const song_name = document.getElementById("song-name");
const background_image = document.getElementById("background-image");

// Button ID Tags
const backward_button = document.getElementById("backward");
const stop_button = document.getElementById("stop");
const forward_button = document.getElementById("forward");

// Song ID Tags
const current_timestamp = document.getElementById("current");
const duration_timestamp = document.getElementById("overall");
const timestamp_range = document.getElementById("timestamp-range");

// Audio ID Tags
const volume_range = document.getElementById("volume-range");
const volume_button = document.getElementById("volume-button");

const music = new Audio();
let isPlaying = false;
let isMuted = false;

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

window.addEventListener("load", () => {
  // Toggle Volume
  volume_button.addEventListener("click", () => {
    if (!isMuted) {
      volume_button.classList.replace("fa-volume-high", "fa-volume-xmark");
      music.volume = 0;
      isMuted = true;
    } else {
      volume_button.classList.replace("fa-volume-xmark", "fa-volume-high");
      music.volume = volume_range.value / 100;
      isMuted = false;
    }
  });

  // Toggle Play/Pause
  stop_button.addEventListener("click", () => {
    if (music.paused) {
      music.play();
      cover_image.style.animation = "rotation 3s linear infinite"
      stop_button.classList.replace("fa-play", "fa-stop");
    } else {
      music.pause();
      stop_button.classList.replace("fa-stop", "fa-play");
      cover_image.style.animation = "none"
    }
  });

  timestamp_range.min = 0;
  timestamp_range.max = music.duration;
  music.currentTime = timestamp_range.value;
  duration_timestamp.textContent = formatTime(music.duration);
  current_timestamp.textContent = formatTime(music.currentTime);

  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }

  function progressBar() {
    let percentage = (music.currentTime / music.duration) * 100;
    timestamp_range.value = percentage;
    current_timestamp.textContent = formatTime(music.currentTime);
  }

  timestamp_range.addEventListener("input", () => {
    music.currentTime = (timestamp_range.value / 100) * music.duration;
  });

  music.addEventListener("timeupdate", () => {
    progressBar();
    nextLoad();
  });
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
  }

  function nextLoad() {
    if (music.currentTime >= music.duration) {
      song_index++;
      if (song_index >= songs.length) song_index = 0;
      loadSong(song_index);
      music.play();
      stop_button.classList.replace("fa-play", "fa-stop");
    }
  }

  forward_button.addEventListener("click", () => {
    if (song_index <= songs.length) {
      song_index++;
      loadSong(song_index);
    }
  });

  backward_button.addEventListener("click", () => {
    if (song_index > 0) {
      song_index--;
      loadSong(song_index);
    }
  });

  volume_range.addEventListener("input", () => {
    music.volume = volume_range.value / 100;
    if (isMuted) {
      volume_button.classList.replace("fa-volume-xmark", "fa-volume-high");
      isMuted = false;
    }
  });

  loadSong(song_index);
});
