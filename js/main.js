const esc = s => String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const pad = n => String(n).padStart(2, '0');
const chips = items => items.map(t => `<span class="chip">${esc(t)}</span>`).join('');

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

document.getElementById('skills').innerHTML = skillsData.map(g => `
    <div class="row">
        <dt>${esc(g.label)}</dt>
        <dd>${chips(g.items)}</dd>
    </div>
`).join('');

document.getElementById('projects-list').innerHTML = projectsData.map((p, i) => `
    <li class="project reveal">
        <span class="project-num" aria-hidden="true">${pad(i + 1)}</span>
        <div class="shot-wrap">
            <a class="shot tilt" href="${esc(p.image)}" target="_blank" rel="noopener noreferrer" title="Click to view full image">
                <img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy" decoding="async">
            </a>
        </div>
        <div class="project-body">
            <h3>${esc(p.title)}</h3>
            <p>${esc(p.description)}</p>
            <dl class="meta">
                <dt>Stack</dt>
                <dd>${chips(p.tags)}</dd>
            </dl>
            <a class="pill pill-line" href="${esc(p.githubUrl)}" target="_blank" rel="noopener noreferrer">GitHub Repo ↗</a>
        </div>
    </li>
`).join('');

document.getElementById('certs-list').innerHTML = certsData.map(c => `
    <article class="cert reveal">
        <a class="shot tilt" href="${esc(c.image)}" target="_blank" rel="noopener noreferrer" title="Click to view full certificate">
            <img src="${esc(c.image)}" alt="${esc(c.title)}" loading="lazy" decoding="async">
        </a>
        <p class="cert-issuer">${esc(c.issuer)}</p>
        <h3>${esc(c.title)}</h3>
        <p>${esc(c.description)}</p>
    </article>
`).join('');

const hideLoader = () => document.body.classList.remove('is-loading');
if (reducedMotion) hideLoader();
else setTimeout(hideLoader, 450);
setTimeout(() => document.querySelector('.preloader')?.remove(), 1200);

const menu = document.getElementById('menu');
const toggle = document.querySelector('.menu-toggle');
const setMenu = open => {
    toggle.setAttribute('aria-expanded', String(open));
    if (open) {
        menu.hidden = false;
        requestAnimationFrame(() => document.body.classList.add('menu-is-open'));
    } else {
        document.body.classList.remove('menu-is-open');
        menu.hidden = true;
    }
};
toggle.addEventListener('click', () => setMenu(menu.hidden));
menu.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !menu.hidden) { setMenu(false); toggle.focus(); } });

const revealEls = document.querySelectorAll('.reveal');
if (reducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(el => el.classList.add('is-in'));
} else {
    const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-in');
                io.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealEls.forEach(el => io.observe(el));
}

if (finePointer && !reducedMotion) {
    document.querySelectorAll('.tilt').forEach(card => {
        let raf = 0, x = 0, y = 0, rect = null;
        card.addEventListener('pointerenter', () => {
            rect = card.getBoundingClientRect();
            card.classList.add('is-tilting');
        });
        card.addEventListener('pointermove', e => {
            x = e.clientX; y = e.clientY;
            if (raf) return;
            raf = requestAnimationFrame(() => {
                raf = 0;
                if (!rect) return;
                const px = (x - rect.left) / rect.width - 0.5;
                const py = (y - rect.top) / rect.height - 0.5;
                card.style.setProperty('--ry', (px * 8).toFixed(2) + 'deg');
                card.style.setProperty('--rx', (-py * 8).toFixed(2) + 'deg');
            });
        });
        card.addEventListener('pointerleave', () => {
            cancelAnimationFrame(raf); raf = 0; rect = null;
            card.classList.remove('is-tilting');
            card.style.setProperty('--rx', '0deg');
            card.style.setProperty('--ry', '0deg');
        });
    });
}

(() => {
    const canvas = document.getElementById('field');
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const nav = navigator;
    const weak = (nav.hardwareConcurrency && nav.hardwareConcurrency <= 2)
        || (nav.deviceMemory && nav.deviceMemory <= 2)
        || (nav.connection && nav.connection.saveData);
    let animated = !reducedMotion && !weak;

    const COLS = 64, ROWS = 26;
    const BG = '#050505';
    const levels = 8;
    const shades = Array.from({ length: levels }, (_, i) => `rgba(173,250,167,${(0.08 + i * 0.075).toFixed(3)})`);
    const buckets = Array.from({ length: levels }, () => []);

    let w = 0, h = 0, mx = 0, my = 0, tx = 0, ty = 0;
    let running = false, last = 0, t = 0, raf = 0;
    let slowFrames = 0, sampled = 0;

    const resize = () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
        if (!running) draw();
    };

    function draw() {
        ctx.fillStyle = BG;
        ctx.fillRect(0, 0, w, h);
        for (const b of buckets) b.length = 0;

        mx += (tx - mx) * 0.06;
        my += (ty - my) * 0.06;

        const horizon = h * (0.52 + my * 0.04);
        const fov = h * 0.9;
        const camY = 1.4;
        const size = Math.max(1.5, Math.min(w, h) / 380);

        for (let r = 0; r < ROWS; r++) {
            const z = 1.2 + r * 0.42;
            const scale = fov / z;
            const depthFade = 1 - r / ROWS;
            for (let c = 0; c < COLS; c++) {
                const xw = (c / (COLS - 1) - 0.5) * 22 + mx * 1.5;
                const wave = Math.sin(xw * 0.55 + t * 1.1) * 0.22
                           + Math.cos(z * 0.9 - t * 0.8) * 0.2
                           + Math.sin((xw + z) * 0.3 + t * 0.5) * 0.15;
                const sx = w / 2 + xw * scale * 0.5;
                if (sx < -4 || sx > w + 4) continue;
                const sy = horizon + (camY - wave) * scale * 0.5;
                if (sy > h + 4) continue;
                const lum = Math.max(0, Math.min(1, (wave + 0.55) / 1.1)) * depthFade;
                const li = Math.min(levels - 1, (lum * levels) | 0);
                buckets[li].push(sx, sy, size * (0.55 + depthFade * 0.6));
            }
        }
        for (let i = 0; i < levels; i++) {
            const b = buckets[i];
            if (!b.length) continue;
            ctx.fillStyle = shades[i];
            for (let k = 0; k < b.length; k += 3) {
                const s = b[k + 2];
                ctx.fillRect(b[k] - s / 2, b[k + 1] - s / 2, s, s);
            }
        }
    }

    const FRAME = 1000 / 30;
    function loop(now) {
        raf = requestAnimationFrame(loop);
        const dt = now - last;
        if (dt < FRAME) return;
        last = now - (dt % FRAME);
        t += 0.033;

        const t0 = performance.now();
        draw();
        if (sampled < 90) {
            sampled++;
            if (performance.now() - t0 > 12) slowFrames++;
            if (sampled === 90 && slowFrames > 30) { animated = false; stop(); }
        }
    }
    function start() { if (!animated || running) return; running = true; last = performance.now(); raf = requestAnimationFrame(loop); }
    function stop() { running = false; cancelAnimationFrame(raf); }

    window.addEventListener('resize', resize, { passive: true });
    resize();

    const hero = document.getElementById('home');
    let heroVisible = true;
    new IntersectionObserver(([e]) => {
        heroVisible = e.isIntersecting;
        document.body.classList.toggle('field-dim', !heroVisible);
        heroVisible && !document.hidden ? start() : stop();
    }).observe(hero);

    if (!animated) return;

    if (finePointer) {
        window.addEventListener('pointermove', e => {
            tx = e.clientX / w - 0.5;
            ty = e.clientY / h - 0.5;
        }, { passive: true });
    }
    document.addEventListener('visibilitychange', () => {
        document.hidden || !heroVisible ? stop() : start();
    });
    start();
})();
