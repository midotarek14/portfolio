/* ==========================================================
   Mobile Menu Toggle
   ========================================================== */
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

/* ==========================================================
   Portfolio View Switcher
   ========================================================== */
const portfolioTabs = document.querySelectorAll('.portfolio-tab');
const graphicPortfolio = document.getElementById('graphic-portfolio');
const fullstackPortfolio = document.getElementById('fullstack-portfolio');

function showPortfolio(view) {
    const showingGraphic = view === 'graphic';

    graphicPortfolio.hidden = !showingGraphic;
    fullstackPortfolio.hidden = showingGraphic;
    document.body.classList.toggle('graphic-active', showingGraphic);
    document.body.classList.toggle('fullstack-active', !showingGraphic);

    portfolioTabs.forEach(tab => {
        const isActive = tab.dataset.view === view;
        tab.classList.toggle('active', isActive);
        tab.setAttribute('aria-selected', String(isActive));
    });

    document.title = showingGraphic
        ? 'Ahmed Tarek | Graphic Designer'
        : 'Ahmed Tarek | Full Stack Developer';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

portfolioTabs.forEach(tab => tab.addEventListener('click', () => showPortfolio(tab.dataset.view)));
document.body.classList.add('graphic-active');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

/* ==========================================================
   Scroll Sections Active Link & Sticky Navbar
   ========================================================== */
const sections = fullstackPortfolio.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');
const header = document.querySelector('.header');

window.onscroll = () => {
    // Active Link
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                const activeLink = document.querySelector('header nav a[href*=' + id + ']');
                activeLink?.classList.add('active');
            });
        }
    });

    // Sticky Navbar
    if(window.scrollY > 100) {
        header.classList.add('sticky');
    } else {
        header.classList.add('sticky'); // Actually, let's keep it sticky but maybe change background slightly
        // For a transparent to blur effect:
        header.classList.toggle('sticky', window.scrollY > 50);
    }

    // Remove toggle icon and navbar when click navbar link (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

/* ==========================================================
   Dark / Light Mode Toggle
   ========================================================== */
const themeButtons = document.querySelectorAll('.theme-toggle');
const body = document.body;

// Check for saved theme preference in localStorage
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
    if (savedTheme === 'light') {
        body.classList.replace('dark-mode', 'light-mode');
        themeButtons.forEach(button => button.querySelector('i').classList.replace('bx-sun', 'bx-moon'));
    }
}

themeButtons.forEach(themeButton => themeButton.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
        // Switch to Light Mode
        body.classList.replace('dark-mode', 'light-mode');
        themeButtons.forEach(button => button.querySelector('i').classList.replace('bx-sun', 'bx-moon'));
        localStorage.setItem('theme', 'light');
    } else {
        // Switch to Dark Mode
        body.classList.replace('light-mode', 'dark-mode');
        themeButtons.forEach(button => button.querySelector('i').classList.replace('bx-moon', 'bx-sun'));
        localStorage.setItem('theme', 'dark');
    }
}));

/* ==========================================================
   Scroll Fade-in Animations (Intersection Observer)
   ========================================================== */
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            // observer.unobserve(entry.target); // Uncomment to animate only once
        } else {
            entry.target.classList.remove('show'); // Comment this to animate only once
        }
    });
}, observerOptions);

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));


/* ==========================================================
   Typed.js Interaction
   ========================================================== */
if (typeof Typed !== 'undefined') {
    const typed = new Typed('.text-animation span', {
        strings: ['Full Stack Developer', 'Discord Bot Developer', 'Founder of AeroScript'],
        typeSpeed: 70,
        backSpeed: 50,
        backDelay: 1500,
        loop: true
    });
}

/* ==========================================================
   Set Current Year in Footer
   ========================================================== */
document.getElementById('current-year').textContent = new Date().getFullYear();


/* ==========================================================
   Custom Cursor Logic
   ========================================================== */
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    if (cursorDot && cursorOutline) {
        // Move dot instantly
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Move outline with smooth animation (can be done in css or js)
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    }
});

// Cursor Hover Effects (Glow up when touching links/buttons)
const interactables = document.querySelectorAll('a, button, .project-card, .skill-item');

interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline?.classList.add('hovered');
        cursorDot?.classList.add('hovered');
    });
    el.addEventListener('mouseleave', () => {
        cursorOutline?.classList.remove('hovered');
        cursorDot?.classList.remove('hovered');
    });
});
