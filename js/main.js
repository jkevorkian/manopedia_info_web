// Interacciones principales: menú, accesibilidad, focus trap básico
(function () {
  const navToggle = document.getElementById('menu-toggle');
  const navList = document.getElementById('menu-list');

  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navList.classList.toggle('show');
  });

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  // Demo video lazy load controls
  const demoVideo = document.getElementById('demo-video');
  if (demoVideo) {
    demoVideo.addEventListener('loadedmetadata', () => {
      demoVideo.controls = true;
    });
  }

  // Skip link for accessibility
  const skip = document.createElement('a');
  skip.href = '#main';
  skip.className = 'skip-link';
  skip.textContent = 'Saltar al contenido';
  skip.style.position = 'absolute';
  skip.style.left = '-999px';
  skip.style.top = 'auto';
  skip.style.width = '1px';
  skip.style.height = '1px';
  skip.style.overflow = 'hidden';
  skip.addEventListener('focus', () => {
    skip.style.left = '12px';
    skip.style.width = 'auto';
    skip.style.height = 'auto';
    skip.style.background = '#fff';
    skip.style.color = '#000';
    skip.style.padding = '8px';
    skip.style.zIndex = 9999;
  });
  skip.addEventListener('blur', () => {
    skip.style.left = '-999px';
    skip.style.width = '1px';
    skip.style.height = '1px';
  });
  document.body.insertBefore(skip, document.body.firstChild);

  // === LANGUAGE SWITCHER ===
  const langSwitch = document.getElementById('lang-switch');

  const translations = {
    es: {
      "nav.about": "Qué es",
      "nav.how": "Cómo funciona",
      "nav.features": "Características",
      "hero.title": "Aprende, practica y comunica en <span class='highlight'>Lengua de Señas Argentina</span>.",
      "hero.description": "Manopedia es la app que enseña y traduce la Lengua de Señas Argentina (LSA) con inteligencia artificial — para que comunicar sea más fácil, rápido e inclusivo.",
      "hero.try": "Probar demo",
      "hero.join": "Unirme a la beta",
      "hero.soon": "Próximamente",
      "hero.caption": "De la seña a la palabra, en un instante.",
      "about.title": "¿Qué es Manopedia?",
      "about.p1": "Manopedia es una aplicación móvil desarrollada para conectar a la comunidad sorda con el mundo oyente. Combina inteligencia artificial con herramientas educativas para aprender LSA y traducir señas en tiempo real.",
      "about.p2": "Buscamos derribar barreras comunicativas, promoviendo una sociedad más accesible e inclusiva.",
      "about.p3": "<strong>🧩 Código abierto:</strong> tanto la <a href='https://github.com/jkevorkian/neural-network-manopedia' target='_blank'>red neuronal</a> como la <a href='https://github.com/jkevorkian/manopedia_onpremise' target='_blank'>aplicación móvil</a> de Manopedia son de código abierto. Creemos en la colaboración y en el desarrollo comunitario de herramientas inclusivas.",
      "how.title": "¿Cómo funciona?",
      "how.p1": "Manopedia utiliza inteligencia artificial para reconocer gestos y señas desde la cámara del dispositivo, interpretarlas mediante procesamiento de lenguaje natural y convertirlas en texto.",
      "features.title": "Características",
      "features.f1": "Traducción de señas individuales en tiempo real (instantánea).",
      "features.f2": "Construcción de frases teniendo en cuenta el contexto gramatical.",
      "features.f3": "Diccionario audiovisual en expansión.",
      "features.f4": "Lecciones interactivas, progresivas y gamificadas."
    },
    en: {
      "nav.about": "What is it",
      "nav.how": "How it works",
      "nav.features": "Features",
      "hero.title": "Learn, practice, and communicate in <span class='highlight'>Argentinian Sign Language</span>.",
      "hero.description": "Manopedia is the app that teaches and translates Argentinian Sign Language (LSA) using artificial intelligence — making communication easier, faster, and more inclusive.",
      "hero.try": "Try demo",
      "hero.join": "Join beta",
      "hero.soon": "Coming soon",
      "hero.caption": "From sign to word, in an instant.",
      "about.title": "What is Manopedia?",
      "about.p1": "Manopedia is a mobile app designed to connect the deaf community with the hearing world. It combines AI with educational tools to learn LSA and translate signs in real time.",
      "about.p2": "We aim to break communication barriers, promoting a more accessible and inclusive society.",
      "about.p3": "<strong>🧩 Open source:</strong> both the <a href='https://github.com/jkevorkian/neural-network-manopedia' target='_blank'>neural network</a> and the <a href='https://github.com/jkevorkian/manopedia_onpremise' target='_blank'>mobile app</a> of Manopedia are open source. We believe in collaboration and community-driven development of inclusive tools.",
      "how.title": "How does it work?",
      "how.p1": "Manopedia uses artificial intelligence to recognize gestures and signs from the device's camera, interpret them through natural language processing, and convert them into text.",
      "features.title": "Features",
      "features.f1": "Real-time translation of individual signs (instant).",
      "features.f2": "Phrase construction considering grammatical context.",
      "features.f3": "Expanding audiovisual dictionary.",
      "features.f4": "Interactive, progressive, and gamified lessons."
    }
  };

  let currentLang = localStorage.getItem('lang') || 'es';

  function setLanguage(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });
    langSwitch.textContent = lang === 'es' ? 'EN' : 'ES';
    localStorage.setItem('lang', lang);
  }

  if (langSwitch) {
    setLanguage(currentLang);
    langSwitch.addEventListener('click', () => {
      currentLang = currentLang === 'es' ? 'en' : 'es';
      setLanguage(currentLang);
    });
  }
})();
