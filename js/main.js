const esc = s => String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const pad = n => String(n).padStart(2, '0');

document.getElementById('skills').innerHTML = skillsData.map(g => `
    <div class="row">
        <dt>${esc(g.label)}</dt>
        <dd>${g.items.map(esc).join(', ')}</dd>
    </div>
`).join('');

document.getElementById('projects-list').innerHTML = projectsData.map((p, i) => `
    <li class="project">
        <a class="shot" href="${esc(p.image)}" target="_blank" rel="noopener noreferrer" title="Click to view full image">
            <img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy">
        </a>
        <div>
            <span class="project-num">Project ${pad(i + 1)}</span>
            <h3>${esc(p.title)}</h3>
            <p>${esc(p.description)}</p>
            <p class="tags">${p.tags.map(t => `<span>${esc(t)}</span>`).join('')}</p>
            <a class="text-link" href="${esc(p.githubUrl)}" target="_blank" rel="noopener noreferrer">GitHub Repo ↗</a>
        </div>
    </li>
`).join('');

document.getElementById('certs-list').innerHTML = certsData.map(c => `
    <article class="cert">
        <a class="shot" href="${esc(c.image)}" target="_blank" rel="noopener noreferrer" title="Click to view full certificate">
            <img src="${esc(c.image)}" alt="${esc(c.title)}" loading="lazy">
        </a>
        <p class="cert-issuer">${esc(c.issuer)}</p>
        <h3>${esc(c.title)}</h3>
        <p>${esc(c.description)}</p>
    </article>
`).join('');
