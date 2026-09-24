'use strict';

(() => {
  const content = window.LVGL_ENTRANCE_CONTENT;
  if (!content || !Array.isArray(content.routes) || content.routes.length !== 2) {
    throw new Error('入口航线配置加载失败');
  }

  const byId = id => document.getElementById(id);
  const setText = (id, value) => { byId(id).textContent = value; };
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const stack = byId('routeStack');
  const tabs = byId('routeTabs');
  const viewport = byId('routeViewport');
  const status = byId('entranceStatus');
  const cards = [];
  const tabButtons = [];
  let activeIndex = 0;
  let wheelLock = false;
  let touchStart = null;

  document.body.dataset.journey = 'home';

  setText('entranceTitle', content.title);
  setText('entranceEyebrow', content.eyebrow);
  setText('entranceStatement', content.statement);
  setText('entranceAttribution', content.attribution);
  setText('entranceFooter', content.footer);

  const cardMarkup = route => `
    <div class="route-card-surface">
      <span class="route-card-glow" aria-hidden="true"></span>
      <header class="route-card-header">
        <p>${route.kicker}</p>
        <span>${route.order} / 02</span>
      </header>
      <div class="route-card-body">
        <div class="route-heading-row">
          <div><p class="route-subtitle">${route.subtitle}</p><h3>${route.title}</h3></div>
          <div class="route-stats">${route.stats.map(stat => `<p><strong>${stat.value}</strong><span>${stat.label}</span></p>`).join('')}</div>
        </div>
        <p class="route-summary">${route.summary}</p>
        <ol class="route-milestones" aria-label="学习阶段">${route.milestones.map((item, index) => `<li><span>0${index + 1}</span>${item}</li>`).join('')}</ol>
        <p class="route-insight"><span aria-hidden="true">✦</span>${route.insight}</p>
      </div>
      <footer class="route-card-footer">
        <span>MISSION ${route.order}</span>
        <button class="route-enter" type="button" data-href="${route.href}"><span>${route.cta}</span><i aria-hidden="true">↗</i></button>
      </footer>
    </div>`;

  content.routes.forEach((route, index) => {
    const tab = document.createElement('button');
    tab.type = 'button';
    tab.role = 'tab';
    tab.id = `routeTab${index}`;
    tab.innerHTML = `<span>${route.order}</span>${route.title}`;
    tab.addEventListener('click', () => selectRoute(index, 'tab'));
    tabs.appendChild(tab);
    tabButtons.push(tab);

    const card = document.createElement('article');
    card.className = 'route-card';
    card.id = `routePanel${index}`;
    card.role = 'tabpanel';
    card.setAttribute('aria-labelledby', tab.id);
    card.style.setProperty('--route-accent', route.accent);
    card.innerHTML = cardMarkup(route);
    card.addEventListener('click', event => {
      if (index !== activeIndex) {
        event.preventDefault();
        selectRoute(index, 'card');
      }
    });
    card.querySelector('.route-enter').addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      if (index !== activeIndex) {
        selectRoute(index, 'card');
        return;
      }
      status.textContent = `正在进入 ${route.title} 航线…`;
      document.body.classList.add('is-leaving');
      const target = new URL(route.href, document.baseURI).href;
      window.setTimeout(() => { window.location.assign(target); }, 140);
    });
    stack.appendChild(card);
    cards.push(card);
  });

  function selectRoute(nextIndex, source = 'control') {
    if (nextIndex < 0) nextIndex = content.routes.length - 1;
    if (nextIndex >= content.routes.length) nextIndex = 0;
    if (nextIndex === activeIndex && source !== 'initial') return;
    activeIndex = nextIndex;
    cards.forEach((card, index) => {
      const active = index === activeIndex;
      card.dataset.state = active ? 'active' : 'inactive';
      card.dataset.side = index < activeIndex ? 'before' : 'after';
      card.setAttribute('aria-hidden', active ? 'false' : 'true');
      card.querySelector('.route-enter').tabIndex = active ? 0 : -1;
    });
    tabButtons.forEach((tab, index) => {
      const active = index === activeIndex;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
      tab.tabIndex = active ? 0 : -1;
    });
    byId('routeProgress').style.transform = `scaleX(${(activeIndex + 1) / content.routes.length})`;
    viewport.dataset.active = content.routes[activeIndex].id;
    status.textContent = source === 'initial' ? '' : `已切换至 ${content.routes[activeIndex].title}`;
  }

  const rotate = direction => selectRoute(activeIndex + direction, 'control');
  byId('routePrevious').addEventListener('click', () => rotate(-1));
  byId('routeNext').addEventListener('click', () => rotate(1));
  byId('entranceTitle').addEventListener('click', () => { location.href = './Pro_X.html'; });

  viewport.addEventListener('wheel', event => {
    if (wheelLock || Math.abs(event.deltaX) + Math.abs(event.deltaY) < 18) return;
    event.preventDefault();
    wheelLock = true;
    rotate((Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY) > 0 ? 1 : -1);
    setTimeout(() => { wheelLock = false; }, 520);
  }, { passive: false });

  viewport.addEventListener('pointerdown', event => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    touchStart = { x: event.clientX, y: event.clientY };
  });
  viewport.addEventListener('pointerup', event => {
    if (!touchStart) return;
    const dx = event.clientX - touchStart.x;
    const dy = event.clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.25) rotate(dx < 0 ? 1 : -1);
  });
  viewport.addEventListener('pointercancel', () => { touchStart = null; });

  viewport.addEventListener('pointermove', event => {
    if (motion.matches || event.pointerType === 'touch') return;
    const card = cards[activeIndex];
    const surface = card.querySelector('.route-card-surface');
    const bounds = card.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
    const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
    surface.style.setProperty('--tilt-y', `${(x - .5) * 5}deg`);
    surface.style.setProperty('--tilt-x', `${(.5 - y) * 4}deg`);
    surface.style.setProperty('--pointer-x', `${x * 100}%`);
    surface.style.setProperty('--pointer-y', `${y * 100}%`);
  });
  viewport.addEventListener('pointerleave', () => {
    cards.forEach(card => {
      const surface = card.querySelector('.route-card-surface');
      surface.style.setProperty('--tilt-y', '0deg');
      surface.style.setProperty('--tilt-x', '0deg');
    });
  });

  document.addEventListener('keydown', event => {
    if (document.body.dataset.journey !== 'home' || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.target.closest('button') && !event.target.closest('.route-tabs')) return;
    if (event.key === 'ArrowRight' || event.key.toLowerCase() === 'd') { event.preventDefault(); rotate(1); }
    if (event.key === 'ArrowLeft' || event.key.toLowerCase() === 'a') { event.preventDefault(); rotate(-1); }
  });

  const requestedRoute = new URLSearchParams(location.search).get('route');
  const initialIndex = Math.max(0, content.routes.findIndex(route => route.id === requestedRoute));
  selectRoute(initialIndex, 'initial');
  requestAnimationFrame(() => document.body.classList.add('is-ready'));
})();
