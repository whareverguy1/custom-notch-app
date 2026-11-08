// --- 1. Real-Time Clock ---
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
    e.stopPropagation(); // Don't trigger notch collapse on tab click
    
    tabButtons.forEach(b => b.classList.remove('active'));
    tabSections.forEach(s => s.classList.remove('active'));

    btn.classList.add('active');
    const targetTab = btn.getAttribute('data-tab');
    document.getElementById(`tab-${targetTab}`).classList.add('active');
  });
});

// --- 4. Interactive File Drop Shelf ---
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

// --- 5. Clipboard Snippets ---
const addClipBtn = document.getElementById('addClipBtn');
const clipList = document.getElementById('clipList');

addClipBtn.addEventListener('click', async (e) => {
  e.stopPropagation();
  try {
    const text = await navigator.clipboard.readText();
    if (text) {
      const li = document.createElement('li');
      li.innerHTML = `<span>📋 ${text.length > 25 ? text.substring(0, 25) + '...' : text}</span>`;
      clipList.prepend(li);
    }
  } catch (err) {
    console.log('Clipboard read blocked or empty:', err);
  }
});
