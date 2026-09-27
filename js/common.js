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

// Envía el registro a Google Apps Script y confirma la recepción leyendo la respuesta ("ok").
// Devuelve { ok, detalle }. No se reintenta para evitar filas duplicadas en la hoja.
async function sendToEndpoint(rec) {
  if (!CONFIG.endpointUrl) return { ok: false, detalle: 'No hay URL de Google Sheets configurada.' };
  try {
    // text/plain evita el preflight CORS; Apps Script lee el cuerpo con e.postData.contents
    const res = await fetch(CONFIG.endpointUrl, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(rec) });
    const txt = (await res.text()).trim();
    if (txt === 'ok') return { ok: true, detalle: 'Registro recibido en Google Sheets.' };
    if (/doPost/.test(txt)) return { ok: false, detalle: 'Apps Script responde, pero la versión publicada no tiene el código (falta la función doPost). Publique una versión nueva.' };
    if (/getSheetByName/.test(txt)) return { ok: false, detalle: 'El script no está vinculado a una hoja. Debe crearse desde la hoja con Extensiones → Apps Script.' };
    return { ok: false, detalle: 'Respuesta inesperada de Apps Script: ' + txt.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(0, 200) };
  } catch (e) {
    return { ok: false, detalle: 'No se pudo conectar con Apps Script. Revise que el acceso sea "Cualquier usuario" y que la URL termine en /exec.' };
  }
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
