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
