// script.js - Full XP Simulation
const boot = document.getElementById('boot');
const login = document.getElementById('login');
const desktop = document.getElementById('desktop');
const startmenu = document.getElementById('startmenu');
const programsMenu = document.getElementById('programsMenu');
const allProgramsBtn = document.getElementById('allProgramsBtn');
const clock = document.getElementById('clock');

// Boot → Login
setTimeout(() => {
  document.querySelector('.progress-bar > div').style.width = '100%';
  setTimeout(() => {
    boot.style.display = 'none';
    login.style.display = 'flex';
  }, 800);
}, 200);

// Login
function checkLogin() {
  const pass = document.getElementById('passwordInput').value;
  if (pass === '1234' || pass === '' || event.key === 'Enter') {
    login.style.display = 'none';
    desktop.style.display = 'block';
    updateClock();
    setInterval(updateClock, 1000);
  }
}
document.getElementById('passwordInput').addEventListener('keypress', e => { if(e.key==='Enter') checkLogin(); });

// Clock
function updateClock() {
  const now = new Date();
  clock.textContent = now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
}

// Start Menu
function toggleStart() {
  const visible = startmenu.style.display === 'block';
  startmenu.style.display = visible ? 'none' : 'block';
  programsMenu.style.display = 'none';
}
document.addEventListener('click', e => {
  if (!e.target.closest('.start-btn') && !e.target.closest('.start-menu')) {
    startmenu.style.display = 'none';
    programsMenu.style.display = 'none';
  }
});

// All Programs submenu
allProgramsBtn.addEventListener('mouseenter', () => programsMenu.style.display = 'block');
allProgramsBtn.addEventListener('mouseleave', delayHide);
programsMenu.addEventListener('mouseenter', () => clearTimeout(window.hideTimer));
programsMenu.addEventListener('mouseleave', delayHide);
function delayHide() {
  window.hideTimer = setTimeout(() => programsMenu.style.display = 'none', 400);
}

// My Computer Window
function openMyComputer() {
  document.getElementById('myComputerWin').style.display = 'block';
}
function closeWindow(id) {
  document.getElementById(id).style.display = 'none';
}

// Drag windows
let draggedWin = null;
function dragWindow(e, titleBar) {
  draggedWin = titleBar.parentElement;
  const rect = draggedWin.getBoundingClientRect();
  const offsetX = e.clientX - rect.left;
  const offsetY = e.clientY - rect.top;
  document.onmousemove = ev => {
    draggedWin.style.left = (ev.clientX - offsetX) + 'px';
    draggedWin.style.top = (ev.clientY - offsetY) + 'px';
  };
  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;
  };
}
// ==== FUNCTIONAL APPS CODE (paste this) ====

function openApp(app) {
  document.getElementById('app-' + app).style.display = 'block';
}

function closeApp(id) {
  document.getElementById(id).style.display = 'none';
}

// Notepad Save
function saveText() {
  const text = document.getElementById('notepad-text').value;
  const blob = new Blob([text], {type: 'text/plain'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'note.txt'; a.click();
}

// Calculator
let calcMemory = '';
function calcNum(n) { document.getElementById('calc-display').value += n; }
function calcOp(op) { document.getElementById('calc-display').value += op; }
function calcEqual() { 
  try { document.getElementById('calc-display').value = eval(document.getElementById('calc-display').value.replace('×','*')); }
  catch { document.getElementById('calc-display').value = 'Error'; }
}
function calcClear() { document.getElementById('calc-display').value = ''; }
function calcBack() { document.getElementById('calc-display').value = document.getElementById('calc-display').value.slice(0,-1); }

// Paint
const canvas = document.getElementById('paint-canvas');
const ctx = canvas.getContext('2d');
let painting = false;
canvas.addEventListener('mousedown', e => { painting = true; draw(e); });
canvas.addEventListener('mouseup', () => painting = false);
canvas.addEventListener('mousemove', draw);
function draw(e) {
  if (!painting) return;
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.strokeStyle = document.getElementById('paint-color').value;
  ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}
function clearCanvas() { ctx.clearRect(0,0,canvas.width,canvas.height); }

// Internet Explorer URL
document.getElementById('ie-url').addEventListener('change', function() {
  document.querySelector('#app-ie iframe').src = this.value;
});

// Command Prompt
document.getElementById('cmd-input').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    const cmd = this.value.toLowerCase();
    const output = document.getElementById('cmd-output');
    output.innerHTML += '<br>' + cmd + '<br>';
    if (cmd === 'help') output.innerHTML += 'dir  cls  whoami  rickroll  clear<br>';
    else if (cmd === 'whoami') output.innerHTML += 'User\\YourName<br>';
    else if (cmd === 'rickroll') window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ','_blank');
    else if (cmd === 'cls' || cmd === 'clear') output.innerHTML = 'Microsoft Windows XP [Version 5.1.2600]<br><br>C:\\Documents and Settings\\User>';
    else output.innerHTML += 'Command not recognized.<br>';
    output.innerHTML += '<br>C:\\Documents and Settings\\User>';
    this.value = '';
    output.scrollTop = output.scrollHeight;
  }
});

// Make windows draggable (if not already)
function dragStart(e) {
  const win = e.target.parentElement;
  let posX = e.clientX - win.offsetLeft;
  let posY = e.clientY - win.offsetTop;
  function drag(e) {
    win.style.left = (e.clientX - posX) + 'px';
    win.style.top = (e.clientY - posY) + 'px';
  }
  document.onmousemove = drag;
  document.onmouseup = () => document.onmousemove = null;
}
// GRANT FULL INTERNET ACCESS TO APPS (paste this)
document.addEventListener('DOMContentLoaded', () => {
  // Remove any Content Security Policy that might block iframes
  const meta = document.createElement('meta');
  meta.httpEquiv = "Content-Security-Policy";
  meta.content = "default-src * 'self' 'unsafe-inline' 'unsafe-eval' data: blob:; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src *; img-src * data: blob:; frame-src *;";
  document.head.appendChild(meta);

  // Allow all features in iframe (popups, downloads, etc.)
  const iframe = document.getElementById('ie-frame');
  if (iframe) {
    iframe.sandbox = "allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads allow-modals allow-top-navigation";
  }
});
// Smart URL bar – auto-add https:// and search fallback
document.getElementById('ie-url-bar').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    let url = this.value.trim();
    if (!url) return;

    // If no protocol and no dots → treat as Google search
    if (!url.includes(' ') && !url.includes('.') && !url.startsWith('http')) {
      url = 'https://www.google.com/search?q=' + encodeURIComponent(url);
    }
    // If no protocol → add https://
    else if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    document.getElementById('ie-frame').src = url;
    this.value = url;
  }
});
// OPEN REAL PHONE FOLDERS (Documents, Pictures, Music)
function openFolder(type) {
  const picker = document.getElementById('filePicker');
  const win = document.getElementById('realFolderWin');
  const list = document.getElementById('realFileList');
  const title = document.getElementById('folderTitle');

  // Set title
  if(type === 'documents') title.textContent = "My Documents";
  if(type === 'pictures') title.textContent = "My Pictures";
  if(type === 'music') title.textContent = "My Music";

  list.innerHTML = `<p style="color:#0066cc;font-weight:bold;">Select your ${type === 'pictures' ? 'Pictures' : type === 'music' ? 'Music' : 'Documents'} folder from your phone:</p>`;

  picker.onchange = function(e) {
    list.innerHTML = '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:15px;">';
    const files = e.target.files;
    
    for (let file of files) {
      const isFolder = file.webkitRelativePath.split('/').length > 1;
      const name = file.webkitRelativePath.split('/').pop() || file.name;
      
      const div = document.createElement('div');
      div.style.textAlign = 'center';
      div.style.padding = '10px';
      div.style.border = '1px dashed #ccc';
      div.style.borderRadius = '8px';
      
      if (file.type.includes('image')) {
        const url = URL.createObjectURL(file);
        div.innerHTML = `<img src="\( {url}" style="width:80px;height:80px;object-fit:cover;border-radius:6px;"><br><small> \){name}</small>`;
      } else if (file.type.includes('audio')) {
        div.innerHTML = `Music File<br><small>\( {name}</small><br><audio controls src=" \){URL.createObjectURL(file)}" style="width:100%"></audio>`;
      } else {
        div.innerHTML = `Document File<br><small>${name}</small>`;
      }
      
      list.querySelector('div').appendChild(div);
    }
  };

  win.style.display = 'block';
  picker.click(); // Open phone's real file picker
}