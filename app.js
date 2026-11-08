
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

// --- 3. Tab Switching Logic ---
const tabButtons = document.querySelectorAll('.tab-btn');
const tabSections = document.querySelectorAll('.content-section');

tabButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevents notch from collapsing on tab click
    
    tabButtons.forEach(b => b.classList.remove('active'));
    tabSections.forEach(s => s.classList.remove('active'));

    btn.classList.add('active');
    const targetTab = btn.getAttribute('data-tab');
    document.getElementById(`tab-${targetTab}`).classList.add('active');
  });
});

// --- 4. File Drag & Drop Shelf ---
const dropZone = document.getElementById('dropZone');
const fileList = document.getElementById('fileList');

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.style.borderColor = '#3b82f6';
});

dropZone.addEventListener('dragleave', () => {
  dropZone.style.borderColor = 'rgba(255, 255, 255, 0.12)';
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.style.borderColor = 'rgba(255, 255, 255, 0.12)';
  
  const files = e.dataTransfer.files;
  for (let file of files) {
    const li = document.createElement('li');
    li.textContent = file.name;
    fileList.appendChild(li);
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
      li.textContent = text.length > 30 ? text.substring(0, 30) + '...' : text;
      clipList.prepend(li);
    }
  } catch (err) {
    console.log('Clipboard access error:', err);
  }
});
