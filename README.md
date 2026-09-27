# Pruebas Psicométricas — Perfiles AEC

Aplicación web para aplicar y calificar pruebas psicométricas en procesos de selección.
No requiere servidor ni instalación: son archivos HTML, CSS y JavaScript que funcionan
en cualquier navegador y pueden publicarse gratis con **GitHub Pages**.

## Pruebas incluidas

| Prueba | Tipo | Ítems | Tiempo | Resultado |
|---|---|---|---|---|
| **DISC** — Perfil conductual | Personalidad / conducta | 28 grupos (MÁS / MENOS) | 15–20 min | Puntajes D, I, S, C (MÁS, MENOS, diferencia) y perfil predominante |
| **Cinco Grandes (Mini-IPIP)** | Personalidad | 20 afirmaciones (Likert 1–5) | 5–8 min | Extraversión, Amabilidad, Responsabilidad, Estabilidad emocional, Apertura |
| **Razonamiento General** | Aptitud | 15 ejercicios | 15 min cronometrados | Aciertos totales y por área (numérico, verbal, lógico) |
| **16 Factores de Personalidad** (modelo Cattell) | Personalidad | 100 (96 de rasgos + 4 de manejo de imagen) | 20–30 min | Perfil de 16 factores en decatipos, 5 dimensiones globales y alerta de manejo de imagen |
| **Inteligencia Emocional** (modelo Goleman) | Competencias socioemocionales | 25 afirmaciones (frecuencia) | 8–10 min | Autoconocimiento, Autorregulación, Motivación, Empatía, Habilidades sociales y coeficiente global |
| **Evaluación de Competencias** (metodología M. Alles) | Competencias | 16 casos situacionales | 15–20 min | Grado A/B/C/D en 8 competencias, brechas contra el perfil del puesto y guía de entrevista por competencias |

## Cómo se usa

1. **Portal** (`index.html`): la persona candidata elige la prueba indicada.
2. **Aplicación** (`prueba.html?t=disc`, `?t=bigfive`, `?t=razonamiento`, `?t=pf16`, `?t=ie`, `?t=competencias`): registra sus datos,
   acepta el consentimiento de tratamiento de datos y responde. Puede enviar el enlace directo
   de una prueba a cada postulante.
3. **Panel de Talento Humano** (`panel.html`): listado con búsqueda y filtro, informe
   individual con gráficos e interpretación, impresión / PDF, exportación a Excel (CSV)
   y respaldo en JSON.

### ¿Dónde quedan guardados los resultados?

- **En el navegador** donde se rindió la prueba (útil si las evaluaciones se rinden en un
  equipo de la oficina y se revisan en ese mismo equipo).
- **Archivo .json**: al terminar, la persona puede descargar su archivo de respuestas y
  enviarlo por correo; Talento Humano lo importa en el panel (la calificación se recalcula
  a partir de las respuestas).
- **Google Sheets (recomendado para evaluaciones a distancia)**: siga las instrucciones de
  `docs/google-sheets.gs` y pegue la URL en `js/config.js` → `endpointUrl`.

## Publicar con GitHub Pages

En el repositorio: **Settings → Pages → Source: Deploy from a branch → rama `main`, carpeta `/ (root)`**.
La aplicación quedará disponible en `https://<usuario>.github.io/pruebapsicometrica/`.

> ⚠️ El panel no tiene contraseña: cualquier persona que abra `panel.html` en un navegador
> verá los resultados guardados **en ese** navegador. Para evaluaciones a distancia use
> Google Sheets con acceso restringido al equipo de Talento Humano.

## Personalización

- `js/config.js`: nombre de la organización, correo de contacto para derechos de datos, URL de Google Sheets.
- `js/tests.js`: ítems, claves de calificación e interpretaciones. Para agregar una prueba nueva,
  añada un objeto con `tipo` `'disc'`, `'likert'` o `'choice'` y su función `score`.

## Marco ético y legal (Ecuador)

- **Consentimiento informado** conforme a la Ley Orgánica de Protección de Datos Personales (LOPDP):
  finalidad exclusiva de selección y canal para ejercer derechos de acceso, rectificación,
  eliminación y oposición. El panel permite eliminar registros.
- **No discriminación** (Constitución art. 11.2, Código del Trabajo, Acuerdo Ministerial
  MDT-2017-0082): no se solicitan edad, sexo, estado civil, embarazo, etnia, religión,
  orientación sexual, condición de salud ni otros datos que puedan generar discriminación.
- **Lenguaje inclusivo** en ítems e informes.
- **Ajustes razonables** para personas con discapacidad (Ley Orgánica de Discapacidades).
- Los resultados son **orientativos y complementarios**: deben ser interpretados por
  profesionales de psicología o Talento Humano y contrastarse con entrevista por
  competencias y referencias. Ningún perfil es "mejor" que otro.

### Notas técnicas sobre los instrumentos

- **DISC**: la asignación de cada palabra a D/I/S/C se hizo por el significado de cada
  adjetivo (cada grupo contiene uno de cada factor). Valídela con un profesional de
  psicología antes de usarla para decisiones.
- **Mini-IPIP**: Donnellan, Oswald, Baird y Lucas (2006), ítems de dominio público del
  International Personality Item Pool (ipip.ori.org). Traducción propia; los niveles
  son referenciales y no hay baremos para población ecuatoriana.
- **Razonamiento**: ítems originales; niveles por porcentaje de aciertos, sin baremos normativos.
- **16 Factores**: cuestionario **original** basado en el modelo teórico de Cattell. **No es el 16PF-5
  oficial**, que es propiedad de IPAT/PSI (en español lo distribuye TEA Ediciones) y requiere licencia y
  personal habilitado. Los decatipos son una transformación lineal del puntaje directo (referenciales).
  Incluye una escala de manejo de imagen (deseabilidad social) que alerta sobre respuestas complacientes.
- **Inteligencia Emocional**: ítems originales según las cinco dimensiones de Goleman; autoinforme sin baremo.
- **Competencias**: aplica la metodología de gestión por competencias de Martha Alles (competencias
  cardinales y específicas, grados A–D, brechas frente al perfil del puesto y entrevista por incidentes
  críticos). Las definiciones y casos son originales; no reproducen el *Diccionario de competencias*
  (obra protegida). En el informe, Talento Humano selecciona el grado requerido por competencia y la
  aplicación calcula la brecha. Para ampliar a otras competencias, edite `COMPETENCIAS` y `SJT_RAW` en `js/tests.js`.
