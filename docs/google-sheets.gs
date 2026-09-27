/**
 * Receptor de resultados en Google Sheets.
 *
 * 1. Cree una Hoja de Cálculo de Google y abra Extensiones > Apps Script.
 * 2. Borre el contenido, pegue este código y guarde (ícono de disquete).
 * 3. Implementar > Nueva implementación > engranaje > Aplicación web.
 *    - Ejecutar como: Yo
 *    - Quién tiene acceso: Cualquier usuario
 * 4. Autorice los permisos y copie la URL que termina en /exec.
 *    Al abrirla en el navegador debe mostrar "Receptor de resultados activo".
 * 5. Pegue la URL en js/config.js (endpointUrl).
 *
 * Cada evaluación se agrega como una fila en la hoja "Resultados".
 * La hoja contiene datos personales: compártala solo con Talento Humano.
 */
var ENCABEZADOS = ['Fecha', 'Prueba', 'Nombres', 'Documento', 'Correo', 'Cargo',
  'Duración (min)', 'Resultado', 'Detalle', 'Terminó por tiempo', 'ID', 'Registro completo (JSON)'];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var r = JSON.parse(e.postData.contents);
    var sh = hoja_();
    var c = r.candidato || {};
    sh.appendRow([
      new Date(r.fecha), txt_(r.pruebaNombre), txt_(c.nombre), "'" + String(c.documento || ''), txt_(c.correo), txt_(c.cargo),
      Math.round((Number(r.duracionSeg) || 0) / 6) / 10,
      txt_(r.resultado && r.resultado.resumen),
      txt_(r.detalle),
      r.finalizadaPorTiempo ? 'Sí' : 'No',
      txt_(r.id),
      txt_(JSON.stringify(r))
    ]);
    return ContentService.createTextOutput('ok');
  } finally {
    lock.releaseLock();
  }
}

// Evita que un texto que empieza con =, +, - o @ se interprete como fórmula
function txt_(v) {
  v = String(v == null ? '' : v);
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

// Permite comprobar desde el navegador que la URL funciona
function doGet() {
  hoja_();
  return ContentService.createTextOutput('Receptor de resultados activo ✓');
}

function hoja_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName('Resultados') || ss.insertSheet('Resultados');
  if (sh.getLastRow() === 0) {
    sh.appendRow(ENCABEZADOS);
    sh.getRange(1, 1, 1, ENCABEZADOS.length).setFontWeight('bold').setBackground('#1A1814').setFontColor('#FFFFFF');
    sh.setFrozenRows(1);
    sh.getRange('A:A').setNumberFormat('dd/MM/yyyy HH:mm');
  }
  return sh;
}
