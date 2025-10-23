
const grid = document.querySelector('.catalogo');
const searchInput = document.getElementById('searchInput');
const productCountEl = document.getElementById('productCount');

function updateCounter() {
  const visibleCards = document.querySelectorAll('.card:not([style*="display: none"])');
  productCountEl.textContent = visibleCards.length;
}

function createCard(p){
  const tags = (p.tags||[]).join(',');
  return `
  <article class="card" data-tags="${tags}" data-title="${(p.title||'').toLowerCase()}" data-sku="${(p.sku||'').toLowerCase()}">
    <div class="thumb">
      <img src="assets/${p.img}" alt="${p.title}" loading="lazy" />
      <span class="badge">${(p.tags && p.tags[0]) ? p.tags[0] : 'nuevo'}</span>
    </div>
    <div class="card-body">
      <div class="title">${p.title}</div>
      <div class="meta">
        <div class="price">${p.price || ''}</div>
        <div class="sku">${p.sku || ''}</div>
      </div>
      ${p.description ? `<div class="desc">${p.description}</div>` : ''}
      <div class="actions">
        <a class="btn" href="#" data-view="1">Ver</a>
        <a class="btn primary" href="https://wa.me/573117176068?text=Hola!%20Quiero%20info%20del%20producto%20${encodeURIComponent(p.sku||p.title)}" target="_blank" rel="noopener">WhatsApp</a>
      </div>
    </div>
  </article>`;
}

function render(list){
  grid.innerHTML = list.map(createCard).join('');
  grid.querySelectorAll('[data-view="1"]').forEach(btn => {
    btn.addEventListener('click', (e)=>{
      e.preventDefault();
      const card = e.target.closest('.card');
      const img = card.querySelector('img');
      openLightbox(img.src, card.querySelector('.title').textContent);
    });
  });
  updateCounter();
}
render(PRODUCTS);

// Filters
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    document.querySelectorAll('.card').forEach(c => {
      const tags = (c.dataset.tags || '');
      c.style.display = (f === 'all' || tags.includes(f)) ? '' : 'none';
    });
    updateCounter();
  });
});

// Search
if (searchInput) {
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    document.querySelectorAll('.card').forEach(c => {
      const hay = (c.dataset.title || '') + ' ' + (c.dataset.sku || '');
      c.style.display = hay.includes(q) ? '' : 'none';
    });
    updateCounter();
  });
}

// Lightbox
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lightbox-img');
const lbCap = document.getElementById('lightbox-caption');
document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
lb.addEventListener('click', (e)=>{ if(e.target===lb) closeLightbox(); });
function openLightbox(src, caption){
  lbImg.src = src; lbCap.textContent = caption || ''; lb.classList.add('open'); lb.setAttribute('aria-hidden','false');
}
function closeLightbox(){
  lb.classList.remove('open'); lb.setAttribute('aria-hidden','true');
}

// PDF helper
document.getElementById('downloadPdfBtn').addEventListener('click', (e)=>{
  e.preventDefault();
  alert('Sugerencia: imprime desde el navegador y elige "Guardar como PDF" para exportar este catálogo.');
});
