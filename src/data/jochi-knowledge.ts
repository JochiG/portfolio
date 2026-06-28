// Knowledge base for the "Jochi" chatbot. Each entry maps keywords to an
// answer (first person — Jochi *is* Jose). Some entries are surfaced as
// suggested questions in the chat. Edit freely to teach Jochi new answers.

export type JochiQA = {
  id: string;
  keywords: string[];
  suggestion?: string; // if set, shown as a clickable chip in the chat
  answer: string;
};

export const jochiGreeting =
  '¡Hola! 👋 Soy Jochi. Preguntame lo que quieras sobre José — su stack, sus proyectos, qué busca o cómo contactarlo.';

export const jochiFallback =
  'Uff, esa no me la sé 😅. Probá preguntarme por mi stack, mis proyectos, qué busco o cómo contactarme. O escribime directo por la sección Contacto.';

export const jochiKnowledge: JochiQA[] = [
  {
    id: 'buscas',
    keywords: ['buscas', 'busca', 'trabajo', 'empleo', 'puesto', 'contratar', 'junior', 'laburo', 'oportunidad'],
    suggestion: '¿Qué estás buscando?',
    answer:
      'Busco mi primer trabajo formal como junior fullstack o frontend. Full-time, remoto (donde sea) o presencial en CABA. Con muchas ganas de sumar a un equipo y crecer.',
  },
  {
    id: 'porque-programo',
    keywords: ['por que', 'porque', 'programas', 'motiva', 'pasion', 'gusta programar', 'te gusta'],
    suggestion: '¿Por qué programás?',
    answer:
      'Programar me hace sentir un inventor, un creador de soluciones. Me apasiona la tecnología y la innovación: siempre busco destacar, sea en lo técnico, en la personalidad o como sea.',
  },
  {
    id: 'apodo',
    keywords: ['jochi', 'apodo', 'sobrenombre', 'nombre', 'te dicen', 'origen'],
    suggestion: "¿De dónde sale 'Jochi'?",
    answer:
      '"Jochi" me lo empezó a decir mi familia de chiquito y quedó para siempre. Solo mis viejos me dicen José Ignacio 😄',
  },
  {
    id: 'stack',
    keywords: ['stack', 'tecnologias', 'tecnologia', 'lenguajes', 'usas', 'herramientas', 'manejas', 'tech'],
    suggestion: '¿Qué stack manejás?',
    answer:
      'Frontend: React, Next.js, Vite y Tailwind. Backend y datos: Supabase, PostgreSQL, MongoDB. Mobile: React Native, Expo y Flutter. Lenguajes: JavaScript/TypeScript, Python y Java. Y mi obsesión del momento: n8n.',
  },
  {
    id: 'tech-favorita',
    keywords: ['favorita', 'favorito', 'n8n', 'automatiza', 'preferida'],
    answer:
      'Hoy mi tech favorita es n8n — me copa automatizar todo. Y próximamente quiero meterme más en ventas y Meta Ads.',
  },
  {
    id: 'aprender',
    keywords: ['aprender', 'aprendiendo', 'futuro', 'proximamente', 'estudiando ahora'],
    answer:
      'Quiero profundizar en automatización (n8n) e IA, y aprender más sobre ventas y Meta Ads.',
  },
  {
    id: 'proyectos',
    keywords: ['proyectos', 'proyecto', 'hiciste', 'trabajaste', 'portfolio', 'construiste'],
    suggestion: 'Contame de tus proyectos',
    answer:
      'Hice varios: Beacon AI (CRM inmobiliario con IA), NS Inversiones, Paolo Masajes, Naturave (sistema de gestión) y Subastas+ (app móvil). Tocá las cards en Proyectos o preguntame por uno puntual.',
  },
  {
    id: 'beacon',
    keywords: ['beacon', 'crm', 'inmobiliaria', 'ia'],
    answer:
      'Beacon AI es un CRM SaaS para inmobiliarias integrado con IA: automatiza el trabajo repetitivo, se conecta con Google Calendar y corre sobre Supabase. Está en beacon-ia.com.',
  },
  {
    id: 'naturave',
    keywords: ['naturave', 'gestion', 'inventario', 'erp'],
    answer:
      'Naturave es un sistema de gestión a medida: inventario, ventas, clientes, proveedores y caja, con backend en Supabase. Un panel central para administrar todo el negocio.',
  },
  {
    id: 'paolo',
    keywords: ['paolo', 'masajes', 'calendar', 'turnos'],
    answer:
      'Paolo Masajes es una web a medida para un masajista de Arrecifes, integrada con Google Calendar (agenda de turnos) y Google Maps (ubicación y horarios disponibles). Está en paolomasajes.com.',
  },
  {
    id: 'nsinversiones',
    keywords: ['inversiones', 'nacho', 'suarez', 'analista', 'economico'],
    answer:
      'NS Inversiones es un sitio a medida para Nacho Suárez, analista económico, con gestión de usuarios y mucho foco en SEO. Entregado en tiempo y forma. Está en nsinversiones.com.',
  },
  {
    id: 'subastas',
    keywords: ['subastas', 'app movil', 'expo', 'react native', 'facultad'],
    answer:
      'Subastas+ es una app móvil de subastas en tiempo real, un proyecto de facultad. Front en React Native, back en Supabase, testeado con Expo.',
  },
  {
    id: 'como-trabajo',
    keywords: ['trabajas', 'fuerte', 'fortaleza', 'superpoder', 'diferencia', 'cliente', 'feedback', 'mejor'],
    suggestion: '¿Cuál es tu fuerte?',
    answer:
      'Mi fuerte es entregar en serio: hablo con el cliente, capto feedback real y lo hago sentir parte del proyecto. Lo guío cuando no tiene claro qué quiere y velo siempre por sus gustos. No me conformo con cumplir el objetivo — soy realista y detecto oportunidades de mejora todo el tiempo.',
  },
  {
    id: 'branding',
    keywords: ['branding', 'marca', 'diseno', 'identidad'],
    answer:
      'Sí, además del desarrollo ofrezco servicios de branding para quien lo necesite.',
  },
  {
    id: 'hobbies',
    keywords: ['hobbies', 'hobby', 'libre', 'fuera', 'gustos', 'automovilismo', 'motos', 'karting', 'futbol', 'diverti'],
    suggestion: '¿Qué hacés fuera del código?',
    answer:
      'Me copa el automovilismo y las motos, hago karting y juego al fútbol con los pibes. Soy re sociable, me adapto a cualquier grupo y me gusta charlar de todo.',
  },
  {
    id: 'estudios',
    keywords: ['estudias', 'estudio', 'universidad', 'uade', 'educacion', 'carrera', 'titulo'],
    answer:
      'Estudio la Licenciatura en Gestión de Tecnología de la Información en UADE (graduación estimada 2026). También tengo una certificación SAP IBP.',
  },
  {
    id: 'idiomas',
    keywords: ['idiomas', 'idioma', 'ingles', 'english', 'hablas'],
    answer: 'Español nativo e inglés fluido (certificado).',
  },
  {
    id: 'disponibilidad',
    keywords: ['disponibilidad', 'horario', 'horarios', 'disponible', 'cuando', 'empezar'],
    answer:
      'Disponibilidad inmediata y full-time. Mis horarios: lunes, martes, miércoles, viernes y sábado de 12 a 19h.',
  },
  {
    id: 'ubicacion',
    keywords: ['donde', 'ubicacion', 'vivis', 'ciudad', 'caba', 'buenos aires', 'pais', 'remoto'],
    answer:
      'Estoy en Buenos Aires, Argentina. Abierto a trabajo remoto (donde sea) o presencial en CABA.',
  },
  {
    id: 'contacto',
    keywords: ['contacto', 'contactar', 'mail', 'email', 'whatsapp', 'linkedin', 'cv', 'hablar', 'escribir', 'telefono'],
    suggestion: '¿Cómo te contacto?',
    answer:
      'Escribime por WhatsApp, LinkedIn o mail — está todo en la sección Contacto, acá abajo. También podés bajar mi CV en español o inglés. ¡Hablemos! 🤝',
  },
];
