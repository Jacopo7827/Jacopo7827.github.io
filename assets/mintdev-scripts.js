/* ======================================================
   MintDev — elenco degli script usato da /showcase/ e /docs/
   Per aggiungere uno script basta aggiungere una riga a SCRIPTS: compare in tutte e due le pagine.

   name: nome · version: versione · type: 'script' oppure 'evento' (filtro dello showcase)
   badge: etichetta sull'immagine · isNew: true = etichetta evidenziata
   banner: immagine 16:9 · icon: immagine quadrata oppure 'eye' / 'drop' (icone incluse)
   color: colore dello script · ink: colore del testo sui bottoni colorati (default scuro)
   desc: descrizione · fw: framework e dipendenze
   page: pagina dello script (es. 'halloween/' o '#autolavaggio' per la home); se manca, il bottone principale apre lo store
   docs: pagina della documentazione · topics: argomenti mostrati nella card della documentazione
   Tutti i percorsi sono relativi alla cartella principale del sito.
   ====================================================== */
(function () {
  const LINKS = {
    discord: 'https://discord.gg/UNeFWPYmEq',
    tebex: 'https://mintdev.tebex.store/',
  };

  const SCRIPTS = [
    { name: 'Advanced Hide', version: '1.1.0', type: 'script', badge: 'Nuovo', isNew: true, color: '#5fe3b4',
      banner: 'assets/advanced-hide.webp', icon: 'eye',
      desc: "Nasconditi ovunque con ox_target: sotto qualsiasi veicolo, nel bagagliaio, nei cassonetti, nei bagni chimici e nei cespugli. Istantaneo e senza interfaccia, con camera libera e perquisizione.",
      fw: ['ESX', 'QBCore', 'Qbox', 'Standalone', 'ox_target'],
      docs: 'docs/advanced-hide/', topics: ['Installazione', 'Nascondigli', 'Perquisizione', 'Export e statebag'] },

    { name: 'Autolavaggio', version: '1.0.0', type: 'script', badge: 'Script FiveM', color: '#5fe3b4',
      banner: 'assets/autolavaggio.webp', icon: 'drop',
      desc: "Car wash self-service con idropulitrice a mano: lavi davvero il veicolo, zona per zona. Schiuma attiva, risciacquo ad alta pressione e cera protettiva.",
      fw: ['ESX', 'QBCore', 'Qbox', 'Standalone', 'ox_target'],
      page: '#autolavaggio', docs: 'docs/autolavaggio/', topics: ['Installazione', 'Stazioni', 'Programmi e prezzi', 'Notifiche'] },

    { name: 'Dolcetto o Scherzetto', version: '1.0.0', type: 'evento', badge: 'Evento · Halloween', color: '#ff7a1a',
      banner: 'assets/halloween/og.jpg', icon: 'assets/halloween/icons/hw_zucca_lanterna.webp',
      desc: "L'evento di Halloween per il tuo server: bussa alle porte, raccogli caramelle e scambiale con soldi, cibo stregato e pozioni. Con 11 prop 3D originali.",
      fw: ['ESX', 'QBCore', 'Qbox', 'ox_inventory'],
      page: 'halloween/', docs: 'halloween/docs/', topics: ['Installazione', 'Case e Bottega', 'Comandi admin', 'Prop 3D'] },

    { name: 'Caccia ai Regali', version: '1.0.0', type: 'evento', badge: 'Evento · Natale', color: '#e3253c', ink: '#fff',
      banner: 'assets/natale/og.jpg', icon: 'assets/natale/icons/xm_regalo.webp',
      desc: "L'evento di Natale per il tuo server: regali nascosti in città da trovare con il rilevatore, calendario dell'Avvento e Mercatino di Natale.",
      fw: ['ESX', 'QBCore', 'Qbox', 'ox_inventory'],
      page: 'natale/', docs: 'natale/docs/', topics: ['Installazione', 'Mercatino', 'Calendario', 'Comandi admin'] },
  ];

  /* ---------- da qui in giù non serve modificare ---------- */

  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const svg = p => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
  const ICONS = {
    eye: svg('<path d="M9.9 4.24A9 9 0 0 1 12 4c7 0 10 8 10 8a13 13 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.5 13.5 0 0 0 2 12s3 8 10 8a9.7 9.7 0 0 0 5.39-1.61"/><path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/><path d="m2 2 20 20"/>'),
    drop: svg('<path d="M12 3s6 6.4 6 11a6 6 0 0 1-12 0c0-4.6 6-11 6-11Z"/><path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5"/>'),
  };
  const ARROW = svg('<path d="M5 12h14M13 6l6 6-6 6"/>');
  const BOOK = svg('<path d="M4 19.5V5a2 2 0 0 1 2-2h13v16H6.5a2.5 2.5 0 0 0 0 5H19"/>');
  const isExt = p => /^https?:/i.test(p);
  const url = (p, base) => !p ? '' : /^(https?:|mailto:|\/)/i.test(p) ? p : base + p;
  const hex = c => /^#[0-9a-f]{3,8}$/i.test(c || '');
  const style = s => { let v = ''; if (hex(s.color)) v += `--pc:${s.color};`; if (hex(s.ink)) v += `--pi:${s.ink};`; return v ? ` style="${v}"` : ''; };
  const target = p => isExt(p) ? ' target="_blank" rel="noopener"' : '';

  function showcaseCard(s, base) {
    const page = url(s.page, base), docs = url(s.docs, base);
    const main = page
      ? `<a class="btn primary" href="${esc(page)}">Scopri lo script ${ARROW}</a>`
      : `<a class="btn primary" href="${esc(LINKS.tebex)}" target="_blank" rel="noopener">Vai allo store ${ARROW}</a>`;
    const media = page || docs || LINKS.tebex;
    return `<article class="ss-card reveal" data-type="${esc(s.type || 'script')}"${style(s)}>
      <a class="ss-media" href="${esc(media)}"${target(media)} tabindex="-1" aria-hidden="true">
        <img src="${esc(url(s.banner, base))}" alt="" loading="lazy">
      </a>
      <div class="ss-body">
        ${s.badge ? `<span class="ss-badge${s.isNew ? ' new' : ''}">${esc(s.badge)}</span>` : ''}
        <div class="ss-top"><h2>${esc(s.name)}</h2>${s.version ? `<span class="ss-ver">v${esc(s.version)}</span>` : ''}</div>
        <p>${esc(s.desc)}</p>
        <div class="ss-fw">${(s.fw || []).map(f => `<span>${esc(f)}</span>`).join('')}</div>
        <div class="ss-actions">${main}${docs ? `<a class="btn ghost" href="${esc(docs)}">${BOOK}Documentazione</a>` : ''}</div>
      </div>
    </article>`;
  }

  function docCard(s, base) {
    const ic = ICONS[s.icon] || (s.icon ? `<img src="${esc(url(s.icon, base))}" alt="" loading="lazy">` : ICONS.drop);
    const search = [s.name, s.desc, ...(s.topics || []), ...(s.fw || [])].join(' ').toLowerCase();
    return `<a class="doc-card reveal" href="${esc(url(s.docs, base))}" data-search="${esc(search)}"${style(s)}>
      <span class="doc-ic">${ic}</span>
      <div>
        <h2>${esc(s.name)}</h2>
        <div class="doc-meta">Documentazione${s.version ? ` · v${esc(s.version)}` : ''}</div>
        <div class="doc-topics">${(s.topics || []).map(t => `<span>${esc(t)}</span>`).join('')}</div>
      </div>
      <span class="doc-go" aria-hidden="true">${ARROW}</span>
    </a>`;
  }

  window.MintDev = {
    LINKS,
    SCRIPTS,
    links() { document.querySelectorAll('[data-link]').forEach(a => { if (LINKS[a.dataset.link]) a.href = LINKS[a.dataset.link]; }); },
    showcase(el, base = '') { el.innerHTML = SCRIPTS.map(s => showcaseCard(s, base)).join(''); },
    docs(el, base = '') { el.innerHTML = SCRIPTS.filter(s => s.docs).map(s => docCard(s, base)).join(''); },

    // link, anno nel footer e menu mobile delle pagine Showcase e Documentazione
    page() {
      const root = document.documentElement;
      root.classList.add('js');
      this.links();
      const yr = document.getElementById('yr');
      if (yr) yr.textContent = new Date().getFullYear();

      // il menu si nasconde scorrendo verso il basso e riappare scorrendo verso l'alto
      const nav = document.getElementById('nav');
      let lastY = scrollY;
      if (nav) addEventListener('scroll', () => {
        const y = scrollY;
        nav.classList.toggle('hide', y > lastY && y > 200 && !root.classList.contains('menu-open'));
        lastY = y;
      }, { passive: true });

      const btn = document.getElementById('burger'), panel = document.getElementById('mnav');
      if (!btn || !panel) return;
      const set = open => {
        root.classList.toggle('menu-open', open);
        btn.setAttribute('aria-expanded', open);
        btn.setAttribute('aria-label', open ? 'Chiudi il menu' : 'Apri il menu');
        panel.setAttribute('aria-hidden', !open);
      };
      btn.addEventListener('click', () => set(!root.classList.contains('menu-open')));
      panel.addEventListener('click', e => { if (e.target.closest('a')) set(false); });
      addEventListener('keydown', e => { if (e.key === 'Escape') set(false); });
      matchMedia('(min-width:1021px)').addEventListener('change', e => { if (e.matches) set(false); });
    },

    // fa comparire le card quando entrano nello schermo
    reveal(scope = document) {
      const els = [...scope.querySelectorAll('.reveal:not(.in)')];
      if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
      const io = new IntersectionObserver(entries => entries.forEach(en => {
        if (!en.isIntersecting) return;
        en.target.classList.add('in');
        io.unobserve(en.target);
        setTimeout(() => { en.target.style.transitionDelay = ''; }, 900);
      }), { rootMargin: '0px 0px -8% 0px' });
      els.forEach((e, i) => { e.style.transitionDelay = `${(i % 2) * 90}ms`; io.observe(e); });
    },
  };
})();
