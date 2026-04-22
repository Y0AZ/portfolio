const { createApp, ref, computed, onMounted, watch, nextTick } = Vue;

const translations = {
  fr: {
    nav: {
      profil: 'Profil',
      experiences: 'Expériences',
      competences: 'Compétences',
      formations: 'Formations',
      contact: 'Contact'
    },
    sidebar: {
      tagline: '« Apprendre, développer, tester,<br>les maîtres mots de ma motivation ! »',
      cvBtn: '↓ Télécharger mon CV'
    },
    sections: {
      profil: 'Profil',
      experiences: 'Expériences',
      competences: 'Compétences',
      formations: 'Formations',
      contact: 'Contact'
    },
    profile: {
      text: "Je suis Aymeric YAPI, <strong>jeune diplômé d'une licence en Informatique</strong>, je poursuis sur cette année universitaire 2025-2026 mon parcours avec ma première année de mastère en développement pour acquérir <strong>une expertise dans les systèmes d'informations et dans l'intégration de logiciels.</strong><br><br>Mon objectif est de joindre à cette formation une expérience professionnelle pour faire correspondre mes aptitudes techniques à un besoin réel et contribuer pleinement aux projets de l'entreprise hôte tout en perfectionnant mon savoir-faire.<br><br>Cette expérience sera pour moi le meilleur moyen de mettre en œuvre mes aptitudes, mais aussi, surtout, le tremplin pour lancer ma carrière professionnelle et développer mes compétences en milieu professionnel.<br><br><em>Le rythme proposé est de 2 semaines en entreprise et 1 semaine en école.</em>"
    },
    exp: {
      stageTitle: '[STAGE] Développement PLM',
      stageDesc: "Stage de juin à août 2025, développement en Java d'admin tools sur la base de l'API Windchill et customisation du logiciel PLM Windchill.",
      proj1Title: '[PROJET] League of Stones',
      proj1Desc: "Développement de l'interface graphique d'une application web de jeu, basée sur React, dotée d'un système de connexion.",
      proj2Title: '[PROJET] Évolution des communes',
      proj2Desc: 'Web scraping avec BeautifulSoup pour créer une base de données SQLite, API Flask Python et frontend Bootstrap.',
      proj3Title: '[PROJET] Gestion emploi du temps',
      proj3Desc: 'Application réalisée avec Java, Spring Boot et ReactJS. Gestion des rendus via GitLab.'
    },
    skills: {
      cat1: 'Langages / Scripts',
      cat2: 'Frameworks / Librairies',
      cat3: 'IDE / Outils',
      cat4: 'Bases de données'
    },
    edu: {
      edu1Title: 'Mastère Développement &amp; Architecture des SI',
      edu1Desc: "M1 d'expertise en développement pour l'année universitaire 2025-2026 à EPSI.",
      edu2Title: 'Licence Math-Informatique [MIASHS]',
      edu2Desc: "Licence Informatique à l'université de Toulouse de 2022 à 2025.",
      edu3Title: 'Bachelor Gestion / Finance',
      edu3Desc: "Bachelor en finance à l'ESG de Montpellier de 2020 à 2022."
    },
    contact: {
      emailLabel: 'Email',
      phoneLabel: 'Téléphone',
      githubLabel: 'GitHub',
      linkedinLabel: 'LinkedIn'
    },
    footer: '© 2026 Aymeric Yapi — Tous droits réservés.'
  },

  en: {
    nav: {
      profil: 'Profile',
      experiences: 'Experiences',
      competences: 'Skills',
      formations: 'Education',
      contact: 'Contact'
    },
    sidebar: {
      tagline: '"Learn, develop, test,<br>the keywords of my motivation!"',
      cvBtn: '↓ Download my CV'
    },
    sections: {
      profil: 'Profile',
      experiences: 'Experiences',
      competences: 'Skills',
      formations: 'Education',
      contact: 'Contact'
    },
    profile: {
      text: "Hello 👋🏾,<br><br>I am Aymeric YAPI, a <strong>recent graduate with a Bachelor's degree in Computer Science</strong>, and I am continuing my academic journey this year 2025-2026 with my first year of a Master's in Software Development, aiming to build <strong>expertise in information systems and software integration.</strong><br><br>My goal is to combine this training with professional experience, aligning my technical skills with real-world needs and fully contributing to my host company's projects while honing my know-how.<br><br>This experience will be my best opportunity to put my abilities into practice and, above all, the stepping stone to launch my professional career and develop my skills in a real-world environment.<br><br><em>The proposed schedule is 2 weeks at the company and 1 week at school.</em>"
    },
    exp: {
      stageTitle: '[INTERNSHIP] PLM Development',
      stageDesc: 'Internship from June to August 2025, Java development of admin tools based on the Windchill API and customisation of the PLM software Windchill.',
      proj1Title: '[PROJECT] League of Stones',
      proj1Desc: 'Development of the graphical interface of a web-based game application built with React, featuring a user authentication system.',
      proj2Title: '[PROJECT] Municipality Evolution',
      proj2Desc: 'Web scraping with BeautifulSoup to build a SQLite database, Flask Python API and Bootstrap frontend.',
      proj3Title: '[PROJECT] Schedule Management',
      proj3Desc: 'Application built with Java, Spring Boot and ReactJS. Version control managed via GitLab.'
    },
    skills: {
      cat1: 'Languages / Scripts',
      cat2: 'Frameworks / Libraries',
      cat3: 'IDE / Tools',
      cat4: 'Databases'
    },
    edu: {
      edu1Title: "Master's in Software Development &amp; IS Architecture",
      edu1Desc: "First year of Master's in Software Development for the 2025-2026 academic year at EPSI.",
      edu2Title: "Bachelor's in Mathematics &amp; Computer Science [MIASHS]",
      edu2Desc: 'Computer Science degree at the University of Toulouse from 2022 to 2025.',
      edu3Title: "Bachelor's in Management / Finance",
      edu3Desc: 'Finance degree at ESG Montpellier from 2020 to 2022.'
    },
    contact: {
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      githubLabel: 'GitHub',
      linkedinLabel: 'LinkedIn'
    },
    footer: '© 2026 Aymeric Yapi — All rights reserved.'
  }
};

// Swiper instances stored at module level so the Vue watch can call .update()
const swiperInstances = [];

function initSwipers() {
  document.querySelectorAll('.mySwiper').forEach(el => {
    try {
      const slideCount = el.querySelectorAll('.swiper-slide').length;
      const s = new Swiper(el, {
        slidesPerView: 3,
        spaceBetween: 20,
        loop: true,
        grabCursor: true,
        pagination: { el: el.querySelector('.swiper-pagination'), clickable: true },
        navigation: {
          nextEl: el.querySelector('.swiper-button-next'),
          prevEl: el.querySelector('.swiper-button-prev'),
        },
        breakpoints: {
          0:    { slidesPerView: 1 },
          768:  { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        },
      });
      swiperInstances.push(s);
    } catch (e) {
      console.warn('Swiper init error:', e);
    }
  });
}

// const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
// [...popoverTriggerList].forEach(el => new bootstrap.Popover(el));

// const swiper = new Swiper('.swiper', {
//     slidesPerView : 3,
//     spaceBetween: 25,
//     loop: true,
//     pagination: {
//       el: '.swiper-pagination',
//     },
//     navigation: {
//       nextEl: '.swiper-button-next',
//       prevEl: '.swiper-button-prev',
//     },
//   });

createApp({
  setup() {
    const activeSection = ref('profil');
    const lang = ref('fr');
    const t = computed(() => translations[lang.value]);
    const toggleLang = () => { lang.value = lang.value === 'fr' ? 'en' : 'fr'; };

    watch(lang, async () => {
      await nextTick();
      swiperInstances.forEach(s => { try { s.update(); } catch (e) {} });
    });

    onMounted(() => {
      const navToggle = document.getElementById('navToggle');
      const navLinks  = document.getElementById('navLinks');
      if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
          navLinks.classList.toggle('open');
          navToggle.classList.toggle('open');
        });
        navLinks.querySelectorAll('a').forEach(a => {
          a.addEventListener('click', () => {
            navLinks.classList.remove('open');
            navToggle.classList.remove('open');
          });
        });
      }

      const sections = ['profil', 'experiences', 'competences', 'formations', 'contact'];
      const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) activeSection.value = e.target.id;
        });
      }, { threshold: 0.3 });
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    });

    return { activeSection, lang, t, toggleLang };
  }
}).mount('#app');

// Double-RAF: first frame = Vue has committed DOM, second frame = browser layout done
requestAnimationFrame(() => requestAnimationFrame(initSwipers));
