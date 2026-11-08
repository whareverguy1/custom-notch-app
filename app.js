// --- 1. Real-Time Clock & Date ---
function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  document.getElementById('pillClock').textContent = `${hours}:${minutes}`;
}
setInterval(updateClock, 1000);
updateClock();

// --- 2. Notch Expansion Toggle ---
const notch = document.getElementById('notch');
const notchPill = document.getElementById('notchPill');

notchPill.addEventListener('click', () => {
  notch.classList.toggle('expanded');
});

// --- 3. Segmented Tab Switcher ---
const tabButtons = document.querySelectorAll('.tab-btn');
const tabSections = document.querySelectorAll('.content-section');

tabButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent notch collapse on tab click
    
    tabButtons.forEach(b => b.classList.remove('active'));
    tabSections.forEach(s => s.classList.remove('active'));

    btn.classList.add('active');
    const targetTab = btn.getAttribute('data-tab');
    document.getElementById(`tab-${targetTab}`).classList.add('active');
  });
});

// --- 4. Interactive Music Player Simulation ---
const playlist = [
  { title: "Blinding Lights", artist: "The Weeknd" },
  { title: "Starboy", artist: "The Weeknd ft. Daft Punk" },
  { title: "Do I Wanna Know?", artist: "Arctic Monkeys" }
];
let currentTrackIndex = 0;
let isPlaying = false;

const songTitleEl = document.getElementById('songTitle');
const artistNameEl = document.getElementById('artistName');
const pillTrackEl = document.getElementById('pillTrack');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function updateTrackDisplay() {
  const track = playlist[currentTrackIndex];
  songTitleEl.textContent = track.title;
  artistNameEl.textContent = track.artist;
  pillTrackEl.textContent = `${track.title} - ${track.artist}`;
}

playBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  isPlaying = !isPlaying;
  playBtn.textContent = isPlaying ? "⏸" : "▶";
});

nextBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  updateTrackDisplay();
});

prevBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
  updateTrackDisplay();
});

updateTrackDisplay();

// --- 5. Interactive File Drop Shelf ---
const dropZone = document.getElementById('dropZone');
const fileList = document.getElementById('fileList');

['dragenter', 'dragover'].forEach(eventName => {
  dropZone.addEventListener(eventName, (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-active');
  });
});

['dragleave', 'drop'].forEach(eventName => {
  dropZone.addEventListener(eventName, (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-active');
  });
});

dropZone.addEventListener('drop', (e) => {
  const files = e.dataTransfer.files;
  for (let file of files) {
    const li = document.createElement('li');
    li.innerHTML = `<span>📁 ${file.name}</span><span style="color:var(--text-secondary); font-size:0.75rem;">${(file.size / 1024).toFixed(1)} KB</span>`;
    fileList.prepend(li);
  }
});

// --- 6. Clipboard History Manager ---
const addClipBtn = document.getElementById('addClipBtn');
const clipList = document.getElementById('clipList');

addClipBtn.addEventListener('click', async (e) => {
  e.stopPropagation();
  try {
    const text = await navigator.clipboard.readText();
    if (text) {
      const li = document.createElement('li');
      li.innerHTML = `<span>📋 ${text.length > 22 ? text.substring(0, 22) + '...' : text}</span>`;
      clipList.prepend(li);
    } else {
      alert("Clipboard is empty!");
    }
  } catch (err) {
    // Fallback if browser blocks automatic read permissions
    const manualText = prompt("Enter snippet to add to clipboard shelf:");
    if (manualText) {
      const li = document.createElement('li');
      li.innerHTML = `<span>📋 ${manualText}</span>`;
      clipList.prepend(li);
    }
  }
});
