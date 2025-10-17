window.addEventListener('DOMContentLoaded', () => {
    const setActive = () => {
        const scroll = window.scrollY + 120;
        let current = sections[0].id;
        for (const s of sections) { if (s.offsetTop <= scroll) current = s.id; }
        navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
    };
    document.addEventListener('scroll', setActive);
    setActive();


    // === Theme toggle ===
    const themeToggle = document.getElementById('themeToggle');
    const root = document.documentElement;
    const DARK = { bg: '#0b0c1b', panel: '#14173a', text: '#e9e9ff', muted: '#aab1ff' };
    const LIGHT = { bg: '#f7f7ff', panel: '#ffffff', text: '#14162e', muted: '#5b6299' };
    const applyTheme = (t) => {
        root.style.setProperty('--bg', t.bg);
        root.style.setProperty('--panel', t.panel);
        root.style.setProperty('--text', t.text);
        root.style.setProperty('--muted', t.muted);
        document.body.style.background = t === LIGHT ? '#f3f4ff' : 'radial-gradient(1000px 600px at 10% 0%, #12143a 0%, var(--bg) 60%), var(--bg)';
    }
    const saved = localStorage.getItem('theme') || 'dark';
    if (saved === 'light') applyTheme(LIGHT);
    themeToggle.addEventListener('click', () => {
        const current = localStorage.getItem('theme') || 'dark';
        const next = current === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', next);
        applyTheme(next === 'dark' ? DARK : LIGHT);
    });


    // === Animate skill bars ===
    const fills = document.querySelectorAll('.fill');
    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.style.width = e.target.dataset.value + '%';
            }
        })
    }, { threshold: .6 });
    fills.forEach(el => io.observe(el));


    // === Back to top button ===
    const btt = document.getElementById('backToTop');
    btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    document.addEventListener('scroll', () => {
        if (window.scrollY > 500) btt.classList.add('show'); else btt.classList.remove('show');
    });


    // === Contact form ===
    const form = document.getElementById('contactForm');
    const statusEl = document.getElementById('formStatus');
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        const fd = new FormData(form);
        const data = Object.fromEntries(fd.entries());
        if (!data.name || !data.email || !data.message) {
            statusEl.textContent = 'Please fill all fields.';
            statusEl.style.color = 'salmon';
            return;
        }
        statusEl.textContent = 'Thanks! Your message is ready to be sent.';
        statusEl.style.color = 'aquamarine';
        form.reset();
    });


    // === Year ===
    document.getElementById('year').textContent = new Date().getFullYear();


    // === GitHub link auto-update ===
    if (window.GITHUB_USERNAME) {
        document.getElementById('githubLink').href = `https://github.com/${window.GITHUB_USERNAME}`;
    }
})