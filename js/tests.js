/*
 * Catálogo de pruebas psicométricas.
 * Cada prueba define: tipo de ítem, ítems, calificación (score) y tiempo límite opcional.
 * Tipos soportados por el aplicador (prueba.html): 'disc', 'likert', 'choice'.
 */

const DISC_FACTORS = {
  D: { nombre: 'Dominancia', color: 'var(--d)',
    desc: 'Cómo enfrenta los retos y problemas: orientación a resultados, decisión y control.',
    alto: 'Directo(a), decidido(a) y orientado(a) a metas. Acepta retos, asume riesgos y toma decisiones con rapidez. Área de desarrollo: escucha activa, paciencia y delegación con acompañamiento.',
    bajo: 'Prefiere el consenso y la colaboración antes de decidir. Evita la confrontación y analiza antes de actuar. Área de desarrollo: asertividad y toma de decisiones bajo presión.' },
  I: { nombre: 'Influencia', color: 'var(--i)',
    desc: 'Cómo se relaciona e influye en otras personas: sociabilidad, comunicación y optimismo.',
    alto: 'Comunicativo(a), entusiasta y persuasivo(a). Genera buen clima y motiva a los equipos. Área de desarrollo: organización, seguimiento de detalles y gestión del tiempo.',
    bajo: 'Reservado(a) y reflexivo(a); se comunica de forma concreta y basada en hechos. Área de desarrollo: networking y expresión de ideas en público.' },
  S: { nombre: 'Estabilidad', color: 'var(--s)',
    desc: 'Cómo responde al ritmo y a los cambios del entorno: constancia, paciencia y cooperación.',
    alto: 'Paciente, leal y constante. Aporta estabilidad, escucha y trabajo colaborativo. Área de desarrollo: adaptación a cambios rápidos y expresión de desacuerdos.',
    bajo: 'Dinámico(a), flexible y a gusto con la variedad y el cambio. Área de desarrollo: constancia en tareas rutinarias y paciencia en procesos largos.' },
  C: { nombre: 'Cumplimiento', color: 'var(--c)',
    desc: 'Cómo responde a reglas y procedimientos: precisión, análisis y calidad.',
    alto: 'Analítico(a), preciso(a) y orientado(a) a la calidad y a las normas. Área de desarrollo: flexibilidad ante la ambigüedad y toma de decisiones con información incompleta.',
    bajo: 'Independiente y práctico(a); prioriza el resultado sobre el procedimiento. Área de desarrollo: atención al detalle y apego a lineamientos.' }
};

const BIG5_FACTORS = {
  E: { nombre: 'Extraversión', color: 'var(--i)',
    alto: 'Disfruta la interacción social, se expresa con facilidad y gana energía en entornos dinámicos y con personas.',
    medio: 'Combina momentos de interacción social con trabajo individual según lo requiera la situación.',
    bajo: 'Prefiere entornos tranquilos, interacción en grupos pequeños y trabajo concentrado.' },
  A: { nombre: 'Amabilidad', color: 'var(--s)',
    alto: 'Empático(a), cooperativo(a) y sensible a las necesidades de las demás personas.',
    medio: 'Equilibra la cooperación con la defensa de sus propios puntos de vista.',
    bajo: 'Directo(a) y objetivo(a); prioriza la tarea y puede mostrarse más crítico(a) o competitivo(a).' },
  C: { nombre: 'Responsabilidad', color: 'var(--c)',
    alto: 'Organizado(a), ordenado(a) y constante en el cumplimiento de tareas y compromisos.',
    medio: 'Organizado(a) en lo esencial, con cierta flexibilidad en la planificación.',
    bajo: 'Flexible y espontáneo(a); puede requerir apoyo en planificación, orden y seguimiento.' },
  N: { nombre: 'Estabilidad emocional', color: 'var(--mas)',
    alto: 'Se mantiene sereno(a) ante la presión y se recupera con facilidad de situaciones de estrés.',
    medio: 'Maneja adecuadamente el estrés cotidiano, con reacciones emocionales ocasionales ante alta presión.',
    bajo: 'Vive las emociones con intensidad; puede beneficiarse de entornos con apoyo y herramientas de manejo del estrés.' },
  O: { nombre: 'Apertura / Intelecto', color: 'var(--d)',
    alto: 'Imaginativo(a), curioso(a) y a gusto con ideas abstractas y nuevas.',
    medio: 'Abierto(a) a nuevas ideas manteniendo un enfoque práctico.',
    bajo: 'Práctico(a) y concreto(a); prefiere lo conocido y las ideas aplicables de inmediato.' }
};

const TESTS = {
  disc: {
    id: 'disc',
    tipo: 'disc',
    nombre: 'Perfil Conductual DISC',
    corto: 'DISC',
    categoria: 'Personalidad / Conducta',
    duracion: '15–20 min',
    descripcion: 'Identifica el estilo conductual predominante en el trabajo: Dominancia, Influencia, Estabilidad y Cumplimiento.',
    instrucciones: 'En cada uno de los <strong>28 grupos</strong> de palabras, marque con <strong>MÁS</strong> la palabra que mejor le describe y con <strong>MENOS</strong> la que menos le describe. Debe seleccionar exactamente <strong>una opción por columna</strong> en cada grupo y no puede ser la misma palabra. No hay respuestas correctas ni incorrectas.',
    // Clave de calificación: cada palabra está asociada a un factor D, I, S o C.
    grupos: [
      [['Entusiasta','I'],['Rápido(a)','D'],['Lógico(a)','C'],['Apacible','S']],
      [['Cauteloso(a)','C'],['Decidido(a)','D'],['Receptivo(a)','I'],['Bondadoso(a)','S']],
      [['Amigable','I'],['Preciso(a)','C'],['Franco(a)','D'],['Tranquilo(a)','S']],
      [['Elocuente','I'],['Controlado(a)','C'],['Tolerante','S'],['Decisivo(a)','D']],
      [['Atrevido(a)','D'],['Concienzudo(a)','C'],['Comunicativo(a)','I'],['Moderado(a)','S']],
      [['Ameno(a)','S'],['Ingenioso(a)','I'],['Investigador(a)','C'],['Acepta riesgos','D']],
      [['Expresivo(a)','I'],['Cuidadoso(a)','C'],['Dominante','D'],['Sensible','S']],
      [['Extrovertido(a)','I'],['Precavido(a)','C'],['Constante','S'],['Impaciente','D']],
      [['Discreto(a)','C'],['Complaciente','S'],['Encantador(a)','I'],['Insistente','D']],
      [['Valeroso(a)','D'],['Anima a los demás','I'],['Pacífico(a)','S'],['Perfeccionista','C']],
      [['Reservado(a)','C'],['Atento(a)','S'],['Osado(a)','D'],['Alegre','I']],
      [['Estimulante','I'],['Gentil','S'],['Perceptivo(a)','C'],['Independiente','D']],
      [['Competitivo(a)','D'],['Considerado(a)','S'],['Alegre','I'],['Sagaz','C']],
      [['Meticuloso(a)','C'],['Obediente','S'],['Ideas firmes','D'],['Alentador(a)','I']],
      [['Popular','I'],['Reflexivo(a)','C'],['Tenaz','D'],['Calmado(a)','S']],
      [['Analítico(a)','C'],['Audaz','D'],['Leal','S'],['Promotor(a)','I']],
      [['Sociable','I'],['Paciente','S'],['Autosuficiente','D'],['Certero(a)','C']],
      [['Adaptable','S'],['Resuelto(a)','D'],['Prevenido(a)','C'],['Vivaz','I']],
      [['Agresivo(a)','D'],['Impetuoso(a)','I'],['Amistoso(a)','S'],['Discerniente','C']],
      [['De trato fácil','I'],['Compasivo(a)','S'],['Cauto(a)','C'],['Habla directo','D']],
      [['Evaluador(a)','C'],['Generoso(a)','S'],['Animado(a)','I'],['Persistente','D']],
      [['Impulsivo(a)','I'],['Cuida los detalles','C'],['Enérgico(a)','D'],['Tranquilo(a)','S']],
      [['Sociable','I'],['Sistemático(a)','C'],['Vigoroso(a)','D'],['Tolerante','S']],
      [['Cautivador(a)','I'],['Contento(a)','S'],['Exigente','D'],['Apegado(a) a las normas','C']],
      [['Le agrada discutir','D'],['Metódico(a)','C'],['Comedido(a)','S'],['Desenvuelto(a)','I']],
      [['Jovial','I'],['Preciso(a)','C'],['Directo(a)','D'],['Ecuánime','S']],
      [['Inquieto(a)','D'],['Amable','S'],['Elocuente','I'],['Cuidadoso(a)','C']],
      [['Prudente','C'],['Pionero(a)','D'],['Espontáneo(a)','I'],['Colaborador(a)','S']]
    ],
    score(resp) {
      // resp: [{mas: idx, menos: idx}, ...]
      const mas = { D: 0, I: 0, S: 0, C: 0 }, menos = { D: 0, I: 0, S: 0, C: 0 };
      resp.forEach((r, g) => {
        mas[this.grupos[g][r.mas][1]]++;
        menos[this.grupos[g][r.menos][1]]++;
      });
      const dif = {};
      Object.keys(mas).forEach(k => { dif[k] = mas[k] - menos[k]; });
      const orden = Object.keys(dif).sort((a, b) => dif[b] - dif[a]);
      const perfil = orden.filter(k => dif[k] > 0).slice(0, 2).join('') || orden[0];
      return { mas, menos, dif, perfil, resumen: `Perfil ${perfil}` };
    }
  },

  bigfive: {
    id: 'bigfive',
    tipo: 'likert',
    nombre: 'Cinco Grandes Factores (Mini-IPIP)',
    corto: 'Big Five',
    categoria: 'Personalidad',
    duracion: '5–8 min',
    descripcion: 'Evalúa cinco rasgos amplios de personalidad: Extraversión, Amabilidad, Responsabilidad, Estabilidad emocional y Apertura.',
    instrucciones: 'A continuación encontrará <strong>20 afirmaciones</strong>. Indique qué tan de acuerdo está con cada una, pensando en cómo es usted <strong>habitualmente</strong>, no en cómo le gustaría ser. No hay respuestas correctas ni incorrectas.',
    escala: ['Totalmente en desacuerdo', 'En desacuerdo', 'Ni de acuerdo ni en desacuerdo', 'De acuerdo', 'Totalmente de acuerdo'],
    // Mini-IPIP (Donnellan et al., 2006), ítems de dominio público del IPIP. f = factor, r = ítem inverso.
    // N se califica como Estabilidad emocional (se invierte el polo de Neuroticismo).
    items: [
      { t: 'Soy el alma de las reuniones sociales.', f: 'E' },
      { t: 'Me identifico con los sentimientos de otras personas.', f: 'A' },
      { t: 'Realizo mis tareas de inmediato.', f: 'C' },
      { t: 'Tengo cambios de humor frecuentes.', f: 'N', r: true },
      { t: 'Tengo una imaginación vívida.', f: 'O' },
      { t: 'No hablo mucho.', f: 'E', r: true },
      { t: 'No me interesan los problemas de otras personas.', f: 'A', r: true },
      { t: 'A menudo olvido poner las cosas en su lugar.', f: 'C', r: true },
      { t: 'Me mantengo relajado(a) la mayor parte del tiempo.', f: 'N' },
      { t: 'No me interesan las ideas abstractas.', f: 'O', r: true },
      { t: 'En las reuniones converso con muchas personas diferentes.', f: 'E' },
      { t: 'Percibo las emociones de las demás personas.', f: 'A' },
      { t: 'Me gusta el orden.', f: 'C' },
      { t: 'Me altero con facilidad.', f: 'N', r: true },
      { t: 'Me cuesta comprender ideas abstractas.', f: 'O', r: true },
      { t: 'Prefiero pasar desapercibido(a).', f: 'E', r: true },
      { t: 'Realmente no me interesan las demás personas.', f: 'A', r: true },
      { t: 'Suelo desordenar las cosas.', f: 'C', r: true },
      { t: 'Rara vez me siento triste o decaído(a).', f: 'N' },
      { t: 'No tengo mucha imaginación.', f: 'O', r: true }
    ],
    score(resp) {
      // resp: [0..4, ...] → puntaje 1..5 por ítem; 4 ítems por factor → rango 4..20
      const puntajes = { E: 0, A: 0, C: 0, N: 0, O: 0 };
      resp.forEach((v, i) => {
        const it = this.items[i];
        puntajes[it.f] += it.r ? 5 - v : v + 1;
      });
      const niveles = {};
      Object.keys(puntajes).forEach(k => {
        const p = puntajes[k];
        niveles[k] = p <= 9 ? 'bajo' : p <= 14 ? 'medio' : 'alto';
      });
      const altos = Object.keys(niveles).filter(k => niveles[k] === 'alto').map(k => BIG5_FACTORS[k].nombre);
      return { puntajes, niveles, resumen: altos.length ? 'Alto: ' + altos.join(', ') : 'Sin rasgos altos' };
    }
  },

  razonamiento: {
    id: 'razonamiento',
    tipo: 'choice',
    nombre: 'Razonamiento General',
    corto: 'Razonamiento',
    categoria: 'Aptitud',
    duracion: '15 min (cronometrada)',
    tiempoLimite: 15 * 60,
    descripcion: 'Mide razonamiento numérico, verbal y lógico mediante 15 ejercicios de opción múltiple con tiempo límite.',
    instrucciones: 'Resuelva los <strong>15 ejercicios</strong> eligiendo una sola respuesta. Dispone de <strong>15 minutos</strong>; al terminar el tiempo la prueba se enviará automáticamente con las respuestas marcadas. Puede usar papel para cálculos, pero no calculadora.',
    items: [
      { t: '¿Qué número continúa la serie? 2, 4, 8, 16, …', o: ['24', '30', '32', '36'], a: 2, area: 'Numérico' },
      { t: '¿Qué número continúa la serie? 3, 6, 11, 18, …', o: ['25', '27', '29', '24'], a: 1, area: 'Numérico' },
      { t: '¿Qué número continúa la serie? 5, 10, 8, 16, 14, …', o: ['28', '12', '20', '32'], a: 0, area: 'Numérico' },
      { t: '¿Qué número continúa la serie? 1, 1, 2, 3, 5, 8, …', o: ['11', '12', '13', '15'], a: 2, area: 'Numérico' },
      { t: '¿Qué número continúa la serie? 2, 6, 12, 20, 30, …', o: ['40', '42', '44', '36'], a: 1, area: 'Numérico' },
      { t: '«Libro» es a «leer» como «cuchillo» es a…', o: ['cocina', 'cortar', 'metal', 'afilado'], a: 1, area: 'Verbal' },
      { t: '¿Cuál es el antónimo de «efímero»?', o: ['breve', 'fugaz', 'duradero', 'veloz'], a: 2, area: 'Verbal' },
      { t: '¿Qué palabra no pertenece al grupo?', o: ['Manzana', 'Pera', 'Zanahoria', 'Uva'], a: 2, area: 'Verbal' },
      { t: '«Médico(a)» es a «hospital» como «docente» es a…', o: ['alumnado', 'escuela', 'libro', 'pizarra'], a: 1, area: 'Verbal' },
      { t: 'Todos los A son B y algunos B son C. Por lo tanto…', o: ['Todos los A son C', 'Algunos A son C', 'Ningún A es C', 'No se puede concluir que algún A sea C'], a: 3, area: 'Lógico' },
      { t: 'Ana es mayor que Luis y Luis es mayor que Carmen. ¿Quién es la persona menor?', o: ['Ana', 'Luis', 'Carmen', 'No se puede saber'], a: 2, area: 'Lógico' },
      { t: 'Si hoy es miércoles, ¿qué día será dentro de 10 días?', o: ['Viernes', 'Sábado', 'Domingo', 'Lunes'], a: 1, area: 'Lógico' },
      { t: 'Una camisa cuesta $40 y tiene un 25 % de descuento. ¿Cuál es el precio final?', o: ['$10', '$25', '$30', '$35'], a: 2, area: 'Numérico' },
      { t: 'Si 3 personas elaboran 3 informes en 3 horas, ¿cuántas horas tardan 6 personas en elaborar 6 informes?', o: ['1', '3', '6', '9'], a: 1, area: 'Lógico' },
      { t: 'Un vehículo recorre 180 km en 2 horas y 30 minutos. ¿Cuál es su velocidad promedio?', o: ['60 km/h', '72 km/h', '75 km/h', '90 km/h'], a: 1, area: 'Numérico' }
    ],
    score(resp) {
      // resp: [idx | null, ...]
      let correctas = 0;
      const porArea = {};
      this.items.forEach((it, i) => {
        porArea[it.area] = porArea[it.area] || { correctas: 0, total: 0 };
        porArea[it.area].total++;
        if (resp[i] === it.a) { correctas++; porArea[it.area].correctas++; }
      });
      const total = this.items.length;
      const pct = Math.round((correctas / total) * 100);
      const nivel = pct >= 80 ? 'Superior' : pct >= 60 ? 'Promedio alto' : pct >= 40 ? 'Promedio' : 'En desarrollo';
      return { correctas, total, pct, nivel, porArea, resumen: `${correctas}/${total} (${nivel})` };
    }
  }
};

/* ------------------------------------------------------------------
 * Utilidades para construir pruebas con ítems intercalados por factor
 * ------------------------------------------------------------------ */

// Intercala los ítems de cada factor (1.º de cada factor, luego 2.º, etc.)
function interleave(byFactor) {
  const keys = Object.keys(byFactor), out = [];
  const max = Math.max(...keys.map(k => byFactor[k].length));
  for (let i = 0; i < max; i++) keys.forEach(k => { if (byFactor[k][i]) out.push({ ...byFactor[k][i], f: k }); });
  return out;
}

const likertPts = (it, v) => it.r ? 5 - v : v + 1;

/* ------------------------------------------------------------------
 * 16 Factores de Personalidad (modelo de Cattell) — versión original
 * ------------------------------------------------------------------ */

const PF16_FACTORS = {
  A:  { nombre: 'Afabilidad', polos: ['Reservado(a)', 'Afable'],
        bajo: 'Tiende a la reserva y a la objetividad en el trato; se siente cómodo(a) en tareas con menor contacto interpersonal.',
        alto: 'Muestra calidez e interés por las personas; disfruta el trabajo que implica contacto humano.' },
  B:  { nombre: 'Razonamiento', polos: ['Pensamiento concreto', 'Pensamiento abstracto'],
        bajo: 'Puede requerir más tiempo o apoyo concreto para resolver problemas abstractos (escala breve: contraste con la prueba de Razonamiento General).',
        alto: 'Resuelve con facilidad problemas abstractos y aprende con rapidez.' },
  C:  { nombre: 'Estabilidad', polos: ['Reactivo(a) emocionalmente', 'Emocionalmente estable'],
        bajo: 'Tiende a reaccionar emocionalmente ante las dificultades; puede beneficiarse de apoyo en manejo del estrés.',
        alto: 'Afronta las demandas diarias con serenidad y madurez emocional.' },
  E:  { nombre: 'Dominancia', polos: ['Deferente', 'Dominante'],
        bajo: 'Cooperativo(a) y conciliador(a); evita el conflicto y tiende a ceder.',
        alto: 'Asertivo(a), influyente y competitivo(a); expresa y defiende sus opiniones.' },
  F:  { nombre: 'Animación', polos: ['Serio(a)', 'Animado(a)'],
        bajo: 'Serio(a), prudente y reflexivo(a); prefiere ambientes tranquilos.',
        alto: 'Entusiasta, espontáneo(a) y expresivo(a); aporta energía a los grupos.' },
  G:  { nombre: 'Atención a las normas', polos: ['Inconformista', 'Atento(a) a las normas'],
        bajo: 'Flexible frente a las normas; puede anteponer su criterio a los procedimientos establecidos.',
        alto: 'Respeta las normas y asume sus obligaciones con sentido del deber.' },
  H:  { nombre: 'Atrevimiento', polos: ['Tímido(a)', 'Atrevido(a)'],
        bajo: 'Muestra cautela o timidez en situaciones sociales nuevas o de exposición.',
        alto: 'Se desenvuelve con soltura en situaciones sociales y frente a grupos.' },
  I:  { nombre: 'Sensibilidad', polos: ['Objetivo(a)', 'Sensible'],
        bajo: 'Objetivo(a) y práctico(a); decide con base en hechos y lógica.',
        alto: 'Sensible, intuitivo(a) y atento(a) a los aspectos estéticos y emocionales.' },
  L:  { nombre: 'Vigilancia', polos: ['Confiado(a)', 'Suspicaz'],
        bajo: 'Confiado(a); tiende a creer en las buenas intenciones de los demás.',
        alto: 'Vigilante y escéptico(a) respecto de las intenciones ajenas.' },
  M:  { nombre: 'Abstracción', polos: ['Práctico(a)', 'Imaginativo(a)'],
        bajo: 'Práctico(a) y centrado(a) en lo concreto y en soluciones realistas.',
        alto: 'Imaginativo(a) y orientado(a) a las ideas; puede distraerse de lo concreto.' },
  N:  { nombre: 'Privacidad', polos: ['Abierto(a)', 'Discreto(a)'],
        bajo: 'Abierto(a) y natural; comparte con facilidad información personal.',
        alto: 'Discreto(a) y reservado(a) respecto de su vida personal.' },
  O:  { nombre: 'Aprensión', polos: ['Seguro(a)', 'Aprensivo(a)'],
        bajo: 'Seguro(a) de sí y poco propenso(a) a la culpa.',
        alto: 'Tiende a la preocupación y a la autocrítica.' },
  Q1: { nombre: 'Apertura al cambio', polos: ['Tradicional', 'Abierto(a) al cambio'],
        bajo: 'Valora lo tradicional y los métodos probados.',
        alto: 'Abierto(a) al cambio, crítico(a) y experimentador(a).' },
  Q2: { nombre: 'Autosuficiencia', polos: ['Orientado(a) al grupo', 'Autosuficiente'],
        bajo: 'Orientado(a) al grupo; valora el apoyo y la compañía de otras personas.',
        alto: 'Autosuficiente; prefiere trabajar y decidir por su cuenta.' },
  Q3: { nombre: 'Perfeccionismo', polos: ['Flexible', 'Perfeccionista'],
        bajo: 'Flexible con el orden; tolera la improvisación.',
        alto: 'Organizado(a), planificador(a) y perfeccionista.' },
  Q4: { nombre: 'Tensión', polos: ['Relajado(a)', 'Tenso(a)'],
        bajo: 'Relajado(a), paciente y tranquilo(a).',
        alto: 'Muestra tensión, impaciencia o sensación de urgencia.' }
};

// Dimensiones globales: combinación de factores primarios ('-' = se invierte el decatipo)
const PF16_GLOBALS = {
  EX: { nombre: 'Extraversión', f: ['A', 'F', 'H', '-N', '-Q2'],
        alto: 'Orientación hacia las personas y la interacción social.', bajo: 'Orientación hacia la actividad individual y la reflexión.' },
  AX: { nombre: 'Ansiedad', f: ['-C', 'L', 'O', 'Q4'],
        alto: 'Tendencia a experimentar tensión y preocupación.', bajo: 'Tendencia a la calma y a la serenidad.' },
  TM: { nombre: 'Dureza', f: ['-A', '-I', '-M', '-Q1'],
        alto: 'Enfoque objetivo, práctico y firme en sus puntos de vista.', bajo: 'Receptividad a ideas, emociones y nuevas perspectivas.' },
  IN: { nombre: 'Independencia', f: ['E', 'H', 'L', 'Q1'],
        alto: 'Tendencia a influir, decidir y actuar con autonomía.', bajo: 'Tendencia a acomodarse y a buscar acuerdos.' },
  SC: { nombre: 'Autocontrol', f: ['-F', 'G', '-M', 'Q3'],
        alto: 'Control de impulsos, apego a normas y planificación.', bajo: 'Espontaneidad y flexibilidad frente a normas y planes.' }
};

const PF16_ITEMS = interleave({
  A: [
    { t: 'Disfruto conocer personas nuevas y conversar con ellas.' },
    { t: 'Prefiero trabajar con datos o cosas antes que con personas.', r: true },
    { t: 'Me gustan las tareas que implican ayudar o atender a otras personas.' },
    { t: 'Me resulta más cómodo mantener cierta distancia en el trato con los demás.', r: true },
    { t: 'Suelo mostrar calidez y cercanía en el trato con los demás.' },
    { t: 'Me cuesta expresar afecto a personas que no conozco bien.', r: true }
  ],
  B: [
    { t: '¿Qué número continúa la serie? 1, 4, 9, 16, …', o: ['20', '24', '25', '36'], a: 2 },
    { t: '«Frío» es a «calor» como «oscuridad» es a…', o: ['noche', 'luz', 'sombra', 'negro'], a: 1 },
    { t: 'Todas las personas del área de ventas usan uniforme. Pedro usa uniforme. Por lo tanto…', o: ['Pedro es de ventas', 'Pedro no es de ventas', 'No se puede asegurar que Pedro sea de ventas', 'Nadie más usa uniforme'], a: 2 },
    { t: '¿Qué palabra no pertenece al grupo?', o: ['Kilo', 'Metro', 'Litro', 'Balanza'], a: 3 },
    { t: '¿Qué número continúa la serie? 7, 14, 28, 56, …', o: ['84', '112', '98', '70'], a: 1 },
    { t: 'Un reloj se adelanta 2 minutos cada hora. ¿Cuánto se habrá adelantado en un día completo?', o: ['24 minutos', '36 minutos', '48 minutos', '2 horas'], a: 2 }
  ],
  C: [
    { t: 'Afronto los problemas cotidianos con calma.' },
    { t: 'Me afectan mucho las críticas, incluso las pequeñas.', r: true },
    { t: 'Cuando algo sale mal, me recupero con rapidez.' },
    { t: 'A menudo siento que las dificultades me superan.', r: true },
    { t: 'En general, me siento conforme con la forma en que manejo mis asuntos.' },
    { t: 'Mi estado de ánimo cambia con facilidad sin una razón clara.', r: true }
  ],
  E: [
    { t: 'Cuando no estoy de acuerdo, lo digo con firmeza.' },
    { t: 'Prefiero ceder antes que discutir.', r: true },
    { t: 'Me gusta tener el control de las situaciones en las que participo.' },
    { t: 'Suelo adaptarme a lo que decide el grupo, aunque no me convenza del todo.', r: true },
    { t: 'Defiendo mis ideas aunque la mayoría piense distinto.' },
    { t: 'Evito dar indicaciones a otras personas sobre lo que deben hacer.', r: true }
  ],
  F: [
    { t: 'Soy una persona entusiasta y espontánea.' },
    { t: 'Soy una persona más bien seria y sobria.', r: true },
    { t: 'Me gustan los ambientes animados y con mucha actividad.' },
    { t: 'Prefiero las actividades tranquilas a las fiestas o celebraciones.', r: true },
    { t: 'Suelo aportar buen humor en los grupos.' },
    { t: 'Rara vez actúo de manera impulsiva.', r: true }
  ],
  G: [
    { t: 'Cumplo las normas aunque nadie me esté supervisando.' },
    { t: 'Si una norma me parece poco útil, no dudo en saltármela.', r: true },
    { t: 'Considero que las reglas existen por una buena razón y deben respetarse.' },
    { t: 'Me molesta que me indiquen cómo deben hacerse las cosas.', r: true },
    { t: 'Me esfuerzo por cumplir siempre con mis obligaciones.' },
    { t: 'Algunas reglas pueden romperse si el fin es bueno.', r: true }
  ],
  H: [
    { t: 'Hablar frente a un grupo grande me resulta cómodo.' },
    { t: 'Ser el centro de atención me incomoda.', r: true },
    { t: 'Tomo la iniciativa para conversar con personas desconocidas.' },
    { t: 'Me cuesta presentarme ante personas que no conozco.', r: true },
    { t: 'Me animo con facilidad a participar en situaciones sociales nuevas.' },
    { t: 'En las reuniones prefiero escuchar antes que intervenir.', r: true }
  ],
  I: [
    { t: 'Me conmueven con facilidad las películas, la música o el arte.' },
    { t: 'Tomo decisiones basándome en hechos, no en sentimientos.', r: true },
    { t: 'Tomo en cuenta los sentimientos de las personas al decidir.' },
    { t: 'Prefiero actividades prácticas y concretas a las artísticas.', r: true },
    { t: 'Disfruto las actividades artísticas o creativas.' },
    { t: 'Pocas cosas logran conmoverme.', r: true }
  ],
  L: [
    { t: 'Creo que la mayoría de las personas actúa por interés propio.' },
    { t: 'Confío fácilmente en las personas.', r: true },
    { t: 'Sospecho cuando alguien es demasiado amable conmigo.' },
    { t: 'Creo que la mayoría de la gente es honesta.', r: true },
    { t: 'Es mejor no confiar del todo en alguien hasta conocerle bien.' },
    { t: 'Doy a los demás el beneficio de la duda.', r: true }
  ],
  M: [
    { t: 'Con frecuencia me pierdo en mis pensamientos e ideas.' },
    { t: 'Me concentro en lo práctico y en lo que se puede aplicar de inmediato.', r: true },
    { t: 'Me interesan más las ideas y teorías que los asuntos prácticos.' },
    { t: 'Presto mucha atención a los detalles concretos de mi entorno.', r: true },
    { t: 'A veces me distraigo por estar imaginando cosas.' },
    { t: 'Prefiero soluciones probadas a ideas novedosas pero poco realistas.', r: true }
  ],
  N: [
    { t: 'Prefiero guardar para mí mis asuntos personales.' },
    { t: 'Hablo abiertamente de mi vida personal.', r: true },
    { t: 'Me cuesta hablar de mis sentimientos con otras personas.' },
    { t: 'Me resulta fácil contar a otras personas lo que siento.', r: true },
    { t: 'Pienso bien qué información personal comparto y con quién.' },
    { t: 'La gente suele saber lo que pienso, porque soy muy transparente.', r: true }
  ],
  O: [
    { t: 'Con frecuencia me preocupa haber hecho algo mal.' },
    { t: 'Tengo confianza en mí y en mis capacidades.', r: true },
    { t: 'Me culpo cuando las cosas no salen como esperaba.' },
    { t: 'Rara vez me siento culpable.', r: true },
    { t: 'Me inquieta lo que las demás personas piensen de mí.' },
    { t: 'Casi nunca me preocupo por errores del pasado.', r: true }
  ],
  Q1: [
    { t: 'Me gusta probar nuevas formas de hacer las cosas.' },
    { t: 'Prefiero los métodos tradicionales que ya han demostrado funcionar.', r: true },
    { t: 'Me interesan las ideas que cuestionan lo establecido.' },
    { t: 'Me incomoda que cambien la forma habitual de trabajar.', r: true },
    { t: 'Los cambios en el trabajo me parecen oportunidades.' },
    { t: 'Las costumbres deben mantenerse.', r: true }
  ],
  Q2: [
    { t: 'Prefiero trabajar de forma individual antes que en equipo.' },
    { t: 'Me gusta consultar con otras personas antes de decidir.', r: true },
    { t: 'Tomo mis decisiones sin necesitar la opinión de otras personas.' },
    { t: 'Rindo mejor cuando trabajo en equipo.', r: true },
    { t: 'Disfruto pasar tiempo a solas.' },
    { t: 'Busco la compañía de otras personas para realizar mis actividades.', r: true }
  ],
  Q3: [
    { t: 'Planifico con detalle antes de empezar una tarea.' },
    { t: 'Suelo dejar las cosas para el último momento.', r: true },
    { t: 'Me gusta tener todo organizado y en su lugar.' },
    { t: 'No me molesta trabajar en un entorno desordenado.', r: true },
    { t: 'Reviso mi trabajo varias veces antes de entregarlo.' },
    { t: 'Prefiero improvisar antes que planificar.', r: true }
  ],
  Q4: [
    { t: 'Con frecuencia me siento con tensión o con prisa.' },
    { t: 'Por lo general mantengo la calma y la tranquilidad.', r: true },
    { t: 'Me impaciento cuando tengo que esperar.' },
    { t: 'Tengo mucha paciencia.', r: true },
    { t: 'Me irrito con facilidad cuando las cosas no avanzan.' },
    { t: 'Las demoras no me alteran.', r: true }
  ],
  // Escala de manejo de imagen (deseabilidad social)
  MI: [
    { t: 'Nunca he dicho una mentira.' },
    { t: 'Siempre soy amable, incluso con quienes me desagradan.' },
    { t: 'Jamás me he enojado con nadie.' },
    { t: 'Nunca he llegado tarde a un compromiso.' }
  ]
});

TESTS.pf16 = {
  id: 'pf16',
  tipo: 'likert',
  nombre: 'Cuestionario de 16 Factores de Personalidad',
  corto: '16 Factores',
  categoria: 'Personalidad',
  duracion: '20–30 min',
  descripcion: 'Basado en el modelo de 16 factores de Cattell: perfil de 16 rasgos primarios y 5 dimensiones globales (Extraversión, Ansiedad, Dureza, Independencia y Autocontrol).',
  instrucciones: 'Encontrará <strong>100 preguntas</strong>. En las afirmaciones, indique qué tan de acuerdo está pensando en cómo es usted <strong>habitualmente</strong>. Algunas preguntas son ejercicios con una respuesta correcta: elija la opción que considere acertada. Responda con sinceridad y sin detenerse demasiado en cada pregunta.',
  escala: ['Totalmente en desacuerdo', 'En desacuerdo', 'Ni de acuerdo ni en desacuerdo', 'De acuerdo', 'Totalmente de acuerdo'],
  items: PF16_ITEMS,
  score(resp) {
    const raw = {}, n = {};
    resp.forEach((v, i) => {
      const it = this.items[i];
      raw[it.f] = raw[it.f] || 0; n[it.f] = (n[it.f] || 0) + 1;
      raw[it.f] += it.o ? (v === it.a ? 1 : 0) : likertPts(it, v);
    });
    // Decatipo referencial (1–10) por transformación lineal del puntaje directo; no reemplaza un baremo normativo
    const decatipos = {};
    Object.keys(PF16_FACTORS).forEach(k => {
      const min = k === 'B' ? 0 : n[k], max = k === 'B' ? n[k] : n[k] * 5;
      decatipos[k] = Math.min(10, Math.max(1, Math.round(1 + (raw[k] - min) * 9 / (max - min))));
    });
    const globales = {};
    Object.entries(PF16_GLOBALS).forEach(([g, def]) => {
      const vals = def.f.map(f => f[0] === '-' ? 11 - decatipos[f.slice(1)] : decatipos[f]);
      globales[g] = Math.round(vals.reduce((a, b) => a + b, 0) / vals.length * 10) / 10;
    });
    const mi = raw.MI || 0; // rango 4–20
    const extremos = Object.keys(decatipos).filter(k => decatipos[k] <= 3 || decatipos[k] >= 8)
      .map(k => PF16_FACTORS[k].polos[decatipos[k] >= 8 ? 1 : 0]);
    return {
      directos: raw, decatipos, globales, manejoImagen: mi, manejoImagenAlto: mi >= 16,
      resumen: (extremos.length ? extremos.slice(0, 4).join(', ') : 'Perfil promedio') + (mi >= 16 ? ' · ⚠ MI alto' : '')
    };
  },
  detalle(x) { return Object.entries(x.decatipos).map(([k, v]) => `${k}:${v}`).join(' '); }
};

/* ------------------------------------------------------------------
 * Inteligencia Emocional (modelo de Goleman) — versión original
 * ------------------------------------------------------------------ */

const IE_DIMS = {
  AC: { nombre: 'Autoconocimiento', color: 'var(--c)',
        desc: 'Reconocer las propias emociones, fortalezas y límites, y su efecto en el desempeño.',
        alto: 'Identifica con claridad sus emociones y su impacto; tiene una autovaloración realista y está abierto(a) a la retroalimentación.',
        medio: 'Reconoce sus emociones en la mayoría de situaciones; puede profundizar en la identificación de sus reacciones bajo presión.',
        bajo: 'Puede beneficiarse de espacios de reflexión y retroalimentación para identificar sus emociones y su efecto en el trabajo.' },
  AR: { nombre: 'Autorregulación', color: 'var(--s)',
        desc: 'Manejar los impulsos y las emociones, adaptarse y mantener la integridad.',
        alto: 'Mantiene la calma bajo presión, piensa antes de reaccionar y se adapta con flexibilidad.',
        medio: 'Regula sus emociones adecuadamente en situaciones habituales; bajo alta presión puede requerir más esfuerzo.',
        bajo: 'Puede reaccionar de forma impulsiva ante situaciones de presión; se sugiere desarrollo en manejo emocional y del estrés.' },
  MO: { nombre: 'Motivación', color: 'var(--i)',
        desc: 'Orientarse al logro, perseverar ante los obstáculos y mantener el optimismo.',
        alto: 'Se plantea metas desafiantes, persevera ante las dificultades y mantiene una actitud optimista.',
        medio: 'Muestra motivación por el logro, con variaciones según el interés de la tarea.',
        bajo: 'Puede perder el impulso ante los obstáculos; conviene explorar sus fuentes de motivación en la entrevista.' },
  EM: { nombre: 'Empatía', color: 'var(--d)',
        desc: 'Comprender los sentimientos y perspectivas de otras personas y valorar la diversidad.',
        alto: 'Percibe los sentimientos de los demás, escucha activamente y valora la diversidad.',
        medio: 'Comprende a los demás en la mayoría de situaciones; puede fortalecer la escucha activa.',
        bajo: 'Puede centrarse más en la tarea que en las personas; se sugiere desarrollo en escucha y toma de perspectiva.' },
  HS: { nombre: 'Habilidades sociales', color: 'var(--mas)',
        desc: 'Comunicar con asertividad, manejar conflictos y construir relaciones de colaboración.',
        alto: 'Se comunica con asertividad, gestiona conflictos buscando acuerdos y construye buenas relaciones.',
        medio: 'Se relaciona adecuadamente; puede fortalecer el abordaje de conversaciones difíciles.',
        bajo: 'Puede evitar el conflicto o tener dificultad para construir relaciones; se sugiere desarrollo en comunicación asertiva.' }
};

TESTS.ie = {
  id: 'ie',
  tipo: 'likert',
  nombre: 'Inteligencia Emocional',
  corto: 'Int. Emocional',
  categoria: 'Competencias socioemocionales',
  duracion: '8–10 min',
  descripcion: 'Evalúa cinco dimensiones de la inteligencia emocional (modelo de Goleman): autoconocimiento, autorregulación, motivación, empatía y habilidades sociales.',
  instrucciones: 'Lea cada una de las <strong>25 afirmaciones</strong> e indique <strong>con qué frecuencia</strong> le ocurre. Piense en situaciones reales de su vida laboral y personal. No hay respuestas correctas ni incorrectas.',
  escala: ['Nunca', 'Rara vez', 'A veces', 'Con frecuencia', 'Siempre'],
  items: interleave({
    AC: [
      { t: 'Identifico con claridad lo que siento en cada momento.' },
      { t: 'Reconozco cómo mis emociones influyen en mi desempeño.' },
      { t: 'Me cuesta entender por qué me siento de determinada manera.', r: true },
      { t: 'Conozco mis fortalezas y mis áreas de mejora.' },
      { t: 'Recibo la retroalimentación como una oportunidad para mejorar.' }
    ],
    AR: [
      { t: 'Mantengo la calma en situaciones de presión.' },
      { t: 'Cuando me enojo, digo cosas de las que luego me arrepiento.', r: true },
      { t: 'Pienso antes de reaccionar cuando algo me molesta.' },
      { t: 'Me adapto con facilidad cuando los planes cambian.' },
      { t: 'Cumplo mis compromisos aunque no tenga ganas.' }
    ],
    MO: [
      { t: 'Me propongo metas desafiantes y trabajo para alcanzarlas.' },
      { t: 'Pierdo el interés rápidamente cuando una tarea se vuelve difícil.', r: true },
      { t: 'Ante un fracaso, busco aprender y vuelvo a intentarlo.' },
      { t: 'Mantengo una actitud optimista ante las dificultades.' },
      { t: 'Encuentro sentido y satisfacción en lo que hago.' }
    ],
    EM: [
      { t: 'Me doy cuenta de cómo se sienten otras personas aunque no lo digan.' },
      { t: 'Me cuesta ponerme en el lugar de los demás.', r: true },
      { t: 'Escucho con atención sin interrumpir.' },
      { t: 'Considero el punto de vista de otras personas aunque sea distinto al mío.' },
      { t: 'Respeto y valoro la diversidad de las personas con quienes trabajo.' }
    ],
    HS: [
      { t: 'Resuelvo los conflictos buscando acuerdos en los que todas las partes ganen.' },
      { t: 'Evito conversaciones difíciles aunque sean necesarias.', r: true },
      { t: 'Expreso mis opiniones de forma clara y respetuosa.' },
      { t: 'Establezco buenas relaciones de trabajo con facilidad.' },
      { t: 'Apoyo a mis compañeras y compañeros para lograr objetivos comunes.' }
    ]
  }),
  score(resp) {
    const puntajes = { AC: 0, AR: 0, MO: 0, EM: 0, HS: 0 };
    resp.forEach((v, i) => { const it = this.items[i]; puntajes[it.f] += likertPts(it, v); });
    const nivel = p => p >= 20 ? 'alto' : p >= 13 ? 'medio' : 'bajo'; // rango 5–25
    const niveles = {};
    Object.keys(puntajes).forEach(k => { niveles[k] = nivel(puntajes[k]); });
    const total = Object.values(puntajes).reduce((a, b) => a + b, 0); // rango 25–125
    const nivelTotal = total >= 100 ? 'alto' : total >= 65 ? 'medio' : 'bajo';
    return { puntajes, niveles, total, nivelTotal, resumen: `CE ${total}/125 (${nivelTotal})` };
  },
  detalle(x) { return Object.entries(x.puntajes).map(([k, v]) => `${IE_DIMS[k].nombre}:${v}`).join(' '); }
};

/* ------------------------------------------------------------------
 * Competencias — metodología de gestión por competencias (Martha Alles):
 * competencias cardinales, grados A (alto), B (bueno), C (mínimo necesario), D (insatisfactorio),
 * análisis de brechas frente al perfil del puesto y entrevista por competencias.
 * Definiciones y casos son originales.
 * ------------------------------------------------------------------ */

const GRADOS = {
  A: { nombre: 'A — Alto', pts: 4, color: 'var(--mas)' },
  B: { nombre: 'B — Bueno, por encima del estándar', pts: 3, color: 'var(--s)' },
  C: { nombre: 'C — Mínimo necesario', pts: 2, color: 'var(--i)' },
  D: { nombre: 'D — Insatisfactorio', pts: 1, color: 'var(--d)' }
};

const COMPETENCIAS = {
  COM: { nombre: 'Compromiso', tipo: 'Cardinal',
    def: 'Sentir como propios los objetivos de la organización y actuar para alcanzarlos, cumpliendo con responsabilidad los compromisos asumidos.',
    preguntas: ['Cuénteme de una ocasión en que hizo más de lo que le correspondía para cumplir un objetivo de su organización. ¿Qué hizo exactamente y cuál fue el resultado?',
                'Descríbame una situación en la que tuvo que cumplir un compromiso en condiciones difíciles. ¿Cómo lo resolvió?'] },
  ETI: { nombre: 'Ética e integridad', tipo: 'Cardinal',
    def: 'Actuar con honestidad, transparencia y coherencia con los valores de la organización y las normas, incluso cuando no hay supervisión.',
    preguntas: ['Relate una situación en la que tuvo que tomar una decisión difícil por razones éticas. ¿Qué consideró y qué hizo?',
                'Cuénteme de una vez en que detectó una práctica incorrecta en su trabajo. ¿Cómo actuó?'] },
  CLI: { nombre: 'Orientación al cliente', tipo: 'Cardinal',
    def: 'Identificar y satisfacer las necesidades de clientes internos y externos, anticipándose a ellas y buscando soluciones.',
    preguntas: ['Cuénteme sobre un cliente particularmente difícil que haya atendido. ¿Qué hizo y cómo terminó la situación?',
                'Deme un ejemplo de una mejora que usted propuso para atender mejor a sus clientes.'] },
  RES: { nombre: 'Orientación a resultados', tipo: 'Cardinal',
    def: 'Orientar el trabajo al logro de objetivos con calidad y eficiencia, fijándose metas desafiantes y buscando la mejora continua.',
    preguntas: ['Hábleme de la meta más desafiante que haya alcanzado. ¿Cómo la planificó y qué obstáculos superó?',
                'Cuénteme de una ocasión en que no logró un objetivo. ¿Qué aprendió y qué cambió después?'] },
  EQU: { nombre: 'Trabajo en equipo', tipo: 'Cardinal',
    def: 'Colaborar con otras personas y áreas, compartiendo información y priorizando los objetivos comunes sobre los individuales.',
    preguntas: ['Describa un proyecto en equipo del que se sienta orgulloso(a). ¿Cuál fue exactamente su aporte?',
                'Cuénteme de un desacuerdo con una persona de su equipo. ¿Cómo lo manejaron?'] },
  ADA: { nombre: 'Adaptabilidad al cambio', tipo: 'Cardinal',
    def: 'Adaptarse con flexibilidad a situaciones nuevas, cambios de prioridades y distintos contextos, manteniendo la efectividad.',
    preguntas: ['Relate un cambio importante en su trabajo (procesos, sistemas, jefaturas). ¿Cómo se adaptó?',
                'Cuénteme de una vez en que sus prioridades cambiaron de forma repentina. ¿Qué hizo?'] },
  LID: { nombre: 'Liderazgo', tipo: 'Específica',
    def: 'Orientar, motivar y desarrollar a las personas y equipos hacia el logro de objetivos, generando un clima de confianza.',
    preguntas: ['Cuénteme de una situación en la que tuvo que guiar a un grupo para lograr un objetivo. ¿Cómo lo hizo?',
                'Describa cómo ha apoyado el desarrollo de alguna persona de su equipo.'] },
  CMU: { nombre: 'Comunicación eficaz', tipo: 'Específica',
    def: 'Transmitir ideas e información de forma clara, oportuna y adaptada a la audiencia, escuchando activamente y verificando la comprensión.',
    preguntas: ['Cuénteme de una vez en que tuvo que explicar algo complejo a personas sin conocimiento técnico. ¿Cómo lo hizo?',
                'Relate una situación en la que un malentendido afectó su trabajo. ¿Qué hizo para resolverlo?'] }
};

// Casos situacionales: cada opción está asociada a un grado (A–D). El orden de presentación varía por caso.
const SJT_RAW = [
  ['COM', 'Faltan dos horas para terminar la jornada y usted detecta que un informe que su área debe entregar mañana tiene errores que no son de su responsabilidad. ¿Qué hace?', [
    'Informo a mi jefatura, propongo una solución y me organizo con la persona que lo elaboró para corregirlo a tiempo.',
    'Corrijo los errores que alcanzo a revisar hoy y aviso a la persona responsable.',
    'Aviso a la persona que elaboró el informe para que lo corrija.',
    'No intervengo, porque no es mi tarea.']],
  ['COM', 'La organización plantea un nuevo objetivo institucional que implica un esfuerzo adicional para su área. ¿Cómo actúa?', [
    'Analizo con mi equipo cómo contribuir y propongo acciones concretas para alcanzarlo.',
    'Cumplo las tareas que se me asignen para ese objetivo y me mantengo disponible.',
    'Hago lo que se me pida, siempre que no afecte mis tareas habituales.',
    'Considero que es responsabilidad de la gerencia y continúo con mi trabajo habitual.']],
  ['ETI', 'Un proveedor le ofrece un obsequio costoso poco antes de que usted participe en la evaluación de ofertas. ¿Qué hace?', [
    'Rechazo el obsequio con cortesía, informo a mi jefatura y dejo constancia según las políticas.',
    'Rechazo el obsequio y continúo con la evaluación de forma objetiva.',
    'Lo acepto si las políticas no lo prohíben de forma explícita.',
    'Lo acepto; es una práctica común y no influirá en mi decisión.']],
  ['ETI', 'Descubre que una persona de su área registra horas extra que no trabajó. ¿Qué hace?', [
    'Converso con esa persona para que lo corrija y, si no lo hace, lo reporto por los canales establecidos.',
    'Lo reporto de forma confidencial a mi jefatura.',
    'Le comento que no está bien, pero no hago nada más.',
    'No es asunto mío; no digo nada.']],
  ['CLI', 'Un cliente llega molesto por un error que cometió otra área de la empresa. ¿Cómo lo atiende?', [
    'Escucho, me disculpo en nombre de la organización, gestiono la solución con el área responsable y doy seguimiento hasta cerrarla.',
    'Escucho y lo derivo al área responsable, asegurándome de que lo atiendan.',
    'Le indico a qué área debe dirigirse.',
    'Le explico que el error no fue de mi área.']],
  ['CLI', 'Nota que muchos clientes hacen la misma consulta sobre un trámite. ¿Qué hace?', [
    'Propongo y elaboro una guía o mejora del proceso para anticiparme a esa necesidad.',
    'Respondo a cada cliente con claridad y comento la situación a mi jefatura.',
    'Respondo cada consulta cuando se presenta.',
    'Respondo lo mínimo; si necesitan más información, que la busquen.']],
  ['RES', 'A mitad de mes su avance es del 40 % de la meta. ¿Qué hace?', [
    'Analizo las causas, ajusto mi plan con acciones concretas y hago seguimiento semanal para cumplir o superar la meta.',
    'Aumento mi esfuerzo para alcanzar la meta a fin de mes.',
    'Continúo trabajando igual; espero que el ritmo mejore.',
    'Considero que la meta no es realista y lo comento.']],
  ['RES', 'Una tarea puede hacerse de la forma habitual o con un método más eficiente que requiere aprender algo nuevo. ¿Qué elige?', [
    'Aprendo el nuevo método, mido los resultados y comparto la mejora con el equipo.',
    'Pruebo el nuevo método si tengo tiempo.',
    'Uso el método habitual porque funciona.',
    'Uso el método habitual y evito cambios que me generen más trabajo.']],
  ['EQU', 'Una persona de su equipo está sobrecargada y el proyecto común corre el riesgo de retrasarse. ¿Qué hace?', [
    'Ofrezco apoyo, redistribuimos tareas con el equipo y nos aseguramos de cumplir el plazo común.',
    'Le ayudo con parte de sus tareas cuando termino las mías.',
    'Le ayudo si me lo pide.',
    'Me concentro en mis tareas; cada quien debe cumplir con lo suyo.']],
  ['EQU', 'En una reunión, el equipo elige una solución distinta a la que usted propuso. ¿Cómo actúa?', [
    'Apoyo la decisión, aporto mi experiencia para mejorarla y me comprometo con su éxito.',
    'Acepto la decisión y cumplo con mi parte.',
    'Acepto la decisión, aunque participo menos.',
    'Sigo trabajando según mi propuesta porque creo que es mejor.']],
  ['ADA', 'La empresa implementa un nuevo sistema informático que cambia su forma de trabajar. ¿Cómo reacciona?', [
    'Me capacito pronto, ayudo a otras personas a adaptarse y propongo mejoras en su uso.',
    'Asisto a la capacitación y lo uso adecuadamente.',
    'Lo uso cuando es obligatorio, pero mantengo mis registros anteriores.',
    'Pido seguir con el sistema anterior porque me resulta más cómodo.']],
  ['ADA', 'A última hora le asignan una prioridad distinta a la planificada. ¿Qué hace?', [
    'Reorganizo mis actividades, comunico el impacto a las partes involucradas y atiendo la nueva prioridad.',
    'Atiendo la nueva prioridad y luego retomo lo planificado.',
    'La atiendo, aunque me cuesta reorganizarme.',
    'Termino lo planificado antes de atender la nueva prioridad.']],
  ['LID', 'Su equipo no logra ponerse de acuerdo y el proyecto está detenido. ¿Qué hace?', [
    'Convoco una reunión, facilito el diálogo, defino con el equipo una dirección clara y distribuyo responsabilidades.',
    'Propongo una solución y pido al equipo que la adopte.',
    'Espero a que la jefatura tome la decisión.',
    'Dejo que el equipo lo resuelva por su cuenta.']],
  ['LID', 'Una persona nueva se integra a su equipo. ¿Cómo la recibe?', [
    'Planifico su inducción, le asigno acompañamiento y doy seguimiento a su progreso y bienestar.',
    'Le explico sus funciones y quedo a disposición para sus dudas.',
    'Le pido que revise los manuales y pregunte si necesita algo.',
    'Considero que la inducción corresponde a Talento Humano.']],
  ['CMU', 'Debe explicar un cambio de procedimiento a un grupo con distintos niveles de conocimiento. ¿Cómo lo hace?', [
    'Adapto el mensaje a la audiencia, uso ejemplos, verifico la comprensión y dejo material de respaldo.',
    'Explico el procedimiento con claridad y respondo preguntas.',
    'Envío el procedimiento por correo.',
    'Asumo que lo leerán en el sistema.']],
  ['CMU', 'Recibe un correo con instrucciones poco claras para una tarea importante. ¿Qué hace?', [
    'Pido una aclaración puntual, confirmo por escrito lo acordado y lo comparto con quienes también participan.',
    'Pido una aclaración a quien lo envió.',
    'Interpreto las instrucciones lo mejor que puedo.',
    'Espero a que otra persona pregunte.']]
];

// Permutaciones fijas para que la opción de grado A no aparezca siempre en la misma posición
const SJT_PERMS = [[2, 0, 3, 1], [1, 3, 0, 2], [3, 1, 2, 0], [0, 2, 1, 3], [1, 0, 3, 2], [2, 3, 1, 0], [3, 2, 0, 1], [0, 3, 2, 1]];
const SJT_ITEMS = SJT_RAW.map(([comp, t, opts], i) => ({
  comp, t, o: SJT_PERMS[(i * 3) % SJT_PERMS.length].map(j => ({ t: opts[j], n: 'ABCD'[j] }))
}));
// Se alternan competencias para no presentar dos casos seguidos de la misma
const SJT_ORDER = [0, 2, 4, 6, 8, 10, 12, 14, 1, 3, 5, 7, 9, 11, 13, 15];

TESTS.competencias = {
  id: 'competencias',
  tipo: 'choice',
  nombre: 'Evaluación de Competencias',
  corto: 'Competencias',
  categoria: 'Competencias (metodología M. Alles)',
  duracion: '15–20 min',
  descripcion: 'Casos situacionales que estiman el grado (A, B, C o D) en 6 competencias cardinales y 2 específicas, para comparar con el perfil del puesto e identificar brechas.',
  instrucciones: 'Se presentan <strong>16 situaciones laborales</strong>. En cada una, elija la opción que describe <strong>lo que usted realmente haría</strong>, no lo que considera ideal. Todas las opciones son posibles; no hay tiempo límite.',
  items: SJT_ORDER.map(i => SJT_ITEMS[i]),
  score(resp) {
    const acc = {};
    resp.forEach((v, i) => {
      const it = this.items[i];
      acc[it.comp] = acc[it.comp] || [];
      if (v !== null && v !== undefined) acc[it.comp].push(GRADOS[it.o[v].n].pts);
    });
    const promedios = {}, grados = {};
    Object.keys(COMPETENCIAS).forEach(k => {
      const a = acc[k] || [];
      promedios[k] = a.length ? Math.round(a.reduce((x, y) => x + y, 0) / a.length * 100) / 100 : 0;
      grados[k] = promedios[k] >= 3.5 ? 'A' : promedios[k] >= 2.5 ? 'B' : promedios[k] >= 1.5 ? 'C' : 'D';
    });
    const cuenta = Object.values(grados).reduce((m, g) => (m[g] = (m[g] || 0) + 1, m), {});
    return { promedios, grados, resumen: 'ABCD'.split('').filter(g => cuenta[g]).map(g => `${cuenta[g]}${g}`).join(' · ') };
  },
  detalle(x) { return Object.entries(x.grados).map(([k, g]) => `${COMPETENCIAS[k].nombre}:${g}`).join(' '); }
};
