/**
 * Receptor de resultados en Google Sheets (opcional).
 *
 * 1. Cree una Hoja de Cálculo de Google y abra Extensiones > Apps Script.
 * 2. Pegue este código y guarde.
 * 3. Implementar > Nueva implementación > Tipo: Aplicación web.
 *    - Ejecutar como: Yo
 *    - Quién tiene acceso: Cualquier usuario
 * 4. Copie la URL de la aplicación web y péguela en js/config.js (endpointUrl).
 *
 * Cada evaluación se agrega como una fila en la hoja "Resultados".
 * Recuerde: esta hoja contiene datos personales; compártala solo con Talento Humano.
 */
function doPost(e) {
  var r = JSON.parse(e.postData.contents);
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName('Resultados') || ss.insertSheet('Resultados');
  if (sh.getLastRow() === 0) {
    sh.appendRow(['ID', 'Fecha', 'Prueba', 'Nombres', 'Documento', 'Correo', 'Cargo', 'Duración (min)', 'Resultado', 'Detalle (JSON)']);
  }
  var c = r.candidato || {};
  sh.appendRow([
    r.id, r.fecha, r.pruebaNombre, c.nombre, c.documento, c.correo, c.cargo,
    Math.round((r.duracionSeg || 0) / 6) / 10,
    r.resultado && r.resultado.resumen,
    JSON.stringify(r)
  ]);
  return ContentService.createTextOutput('ok');
}
