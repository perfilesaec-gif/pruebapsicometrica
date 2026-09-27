/* Utilidades compartidas: almacenamiento, escape de HTML y envío de resultados. */

const STORAGE_KEY = 'psico_resultados_v1';

function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function loadResults() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch (e) { return []; }
}

function saveResults(list) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); return true; }
  catch (e) { return false; }
}

function addResult(rec) {
  const list = loadResults();
  list.push(rec);
  return saveResults(list);
}

function newId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

async function sendToEndpoint(rec) {
  if (!CONFIG.endpointUrl) return false;
  try {
    // text/plain evita el preflight CORS; Apps Script lee el cuerpo con e.postData.contents
    await fetch(CONFIG.endpointUrl, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify(rec) });
    return true;
  } catch (e) { return false; }
}

function downloadFile(name, content, type) {
  const blob = new Blob([content], { type });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

function slug(s) {
  return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_|_$/g, '').toLowerCase();
}

function fmtDate(iso) {
  const d = new Date(iso);
  return isNaN(d) ? iso : d.toLocaleString('es-EC', { dateStyle: 'medium', timeStyle: 'short' });
}

function fmtDur(sec) {
  const m = Math.floor(sec / 60), s = sec % 60;
  return `${m} min ${String(s).padStart(2, '0')} s`;
}
