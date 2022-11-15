const image = document.querySelector('img')
const title = document.getElementById('title')
const artist = document.getElementById('artist')
const music = document.querySelector('audio')
const progressContainer = document.getElementById('progress-container')
const progress = document.getElementById('progress')
const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')
const currentTimeDisplay = document.getElementById('current-time')
const durationDisplay = document.getElementById('duration')

// Music
const songs = [
  {
    name: 'Enough to Believe',
    displayName: 'Enough to Believe',
    artist: 'Bob Moses',
  },
  {
    name: 'What If I Go in the Live Lounge',
    displayName: 'What If I Go in the Live Lounge',
    artist: 'Mura Masa & Bonzai',
  },
  {
    name: 'Make You Feel My Love',
    displayName: 'Make You Feel My Love',
    artist: 'Adele',
  },
  {
    name: 'Supergirl',
    displayName: 'Supergirl',
    artist: 'Anna Naklab feat. Alle Farben',
  },
  {
    name: 'Six Days',
    displayName: 'Six Days',
    artist: 'DJ Shadow',
  },
  {
    name: 'Iris',
    displayName: 'Iris',
    artist: 'Goo Goo Dolls',
  },
  {
    name: 'Faded',
    displayName: 'Faded',
    artist: 'Alan Walker',
  },
  {
    name: 'jacinto-1',
    displayName: 'Eletric Chill Machine',
    artist: 'Jacinto Design',
  },
  {
    name: 'Hanging On',
    displayName: 'Hanging On',
    artist: 'Bob Moses',
  },
  {
    name: 'Moonriver',
    displayName: 'Moonriver',
    artist: 'Instrumental',
  },
  {
    name: 'metric-1',
    displayName: 'Front Row (Remix)',
    artist: 'Metric/Jacinto Design',
  },
]

// Check if Playing
let isPlaying = false

// Play
const playSong = () => {
  isPlaying = true
  playBtn.classList.replace('fa-play', 'fa-pause')
  playBtn.setAttribute('title', 'Pause')
  music.play()
}

// Pause
const pauseSong = () => {
  isPlaying = false
  playBtn.classList.replace('fa-pause', 'fa-play')
  playBtn.setAttribute('title', 'Play')
  music.pause()
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()))

// Update DOM
const loadSong = (song) => {
  title.innerHTML = song.displayName
  artist.innerText = song.artist
  music.src = `music/${song.name}.mp3`
  image.src = `img/${song.name}.jpg`
}

// Current Song
let songIndex = 0

// Previous Song
const prevSong = () => {
  songIndex--
  if (songIndex < 0) {
    // songIndex = songs.length + songIndex
    songIndex = songs.length - 1
  }
  loadSong(songs[songIndex])
  playSong()
}

// Next Song
const nextSong = () => {
  songIndex++
  if (songIndex > songs.length - 1) {
    // songIndex = songIndex % songs.length
    songIndex = 0
  }
  loadSong(songs[songIndex])
  playSong()
}

// On Load - Select First Song
loadSong(songs[songIndex])

// Helper function
// 2 Digits Minutes and Seconds
const twoDigits = (time) => {
  if (time < 10) {
    time = `0${time}`
  }
  return time
}
const twoDigitsMinutes = (time) => {
  let minutes = Math.floor(time / 60)
  minutes = twoDigits(minutes)
  return minutes
}
const twoDigitsSeconds = (time) => {
  let seconds = Math.floor(time % 60)
  seconds = twoDigits(seconds)
  return seconds
}

// Update Progress Bar & Time
const updateProgressBar = (e) => {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement
    // Update Progress Bar width
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
    // Calculate display for duration
    const durationMinutes = twoDigitsMinutes(duration)
    const durationSeconds = twoDigitsSeconds(duration)
    // Delay switching duration Element to avoid NaN
    if (durationMinutes && durationSeconds) {
      durationDisplay.textContent = `${durationMinutes}:${durationSeconds}`
    }
    // Calculate current time
    const currentTimeMinutes = twoDigitsMinutes(currentTime)
    const currentTimeSeconds = twoDigitsSeconds(currentTime)
    currentTimeDisplay.textContent = `${currentTimeMinutes}:${currentTimeSeconds}`
  }
}

// Set Progress Bar
const setProgressBar = (e) => {
  const width = e.srcElement.clientWidth
  const clickX = e.offsetX
  const { duration } = music
  music.currentTime = (clickX / width) * duration
}

// Event Listener
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
music.addEventListener('ended', nextSong)
music.addEventListener('timeupdate', updateProgressBar)
progressContainer.addEventListener('click', setProgressBar)
