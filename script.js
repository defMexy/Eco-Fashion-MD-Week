document.querySelectorAll('.form-chips').forEach(group => {
    group.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', () => {
            group.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
        });
    });
});

function checkSustainability() {
    const mat = document.querySelector('#materialChips .chip.active');
    const freq = document.getElementById('wearFreq').value;
    const orig = document.querySelector('#originChips .chip.active');
    const cert = document.querySelector('#certChips .chip.active');
    const brand = document.getElementById('brandInput').value;

    if (!mat || !freq || !orig || !cert) {
        showToast('Vul alle velden in om je score te berekenen.');
        return;
    }

    let score = 0;
    score += parseInt(mat.dataset.val || 0);
    score += parseInt(freq);
    score += parseInt(orig.dataset.val || 0);
    score += parseInt(cert.dataset.val || 0);

    const maxScore = 9 + 9 + 8 + 3;
    const pct = Math.round((score / maxScore) * 10 * 10) / 10;
    const display = Math.min(10, pct).toFixed(1);
    const pctBar = Math.min(100, (score / maxScore) * 100);

    const box = document.getElementById('resultBox');
    const scoreEl = document.getElementById('resultScore');
    const barEl = document.getElementById('resultBar');
    const verdictEl = document.getElementById('resultVerdict');
    const tipsEl = document.getElementById('resultTips');

    box.classList.add('show');

    let color, verdict, tips;
    if (pct >= 7.5) {
        color = '#8a9e7a';
        verdict = `Uitstekend! ${brand ? brand + ' scoort' : 'Dit kledingstuk scoort'} zeer goed op duurzaamheid. Je maakt bewuste keuzes die het milieu sparen.`;
        tips = ['Deel dit kledingstuk met de community als inspiratie!', 'Overweeg ook lokale reparatie als het kapot gaat'];
    } else if (pct >= 5) {
        color = '#b85a30';
        verdict = `Redelijk. Er zijn verbeterpunten mogelijk. Met betere materiaalkeuzes of hogere draagsels haal je een hogere score.`;
        tips = ['Probeer het vaker te dragen om de impact te spreiden', 'Let bij de volgende aankoop op duurzame materialen', 'Zoek naar certificeringen bij twijfelachtige merken'];
    } else {
        color = '#c45070';
        verdict = `Dit kledingstuk heeft een hoge milieu-impact. Overweeg de volgende keer voor een duurzamer alternatief te kiezen.`;
        tips = ['Draag het zo lang mogelijk om de impact te minimaliseren', 'Overweeg tweedehands bij de volgende aankoop', 'Geef het door of verruil via een swap event als je het niet meer draagt'];
    }

    scoreEl.textContent = display + '/10';
    scoreEl.style.color = color;
    barEl.style.width = pctBar + '%';
    barEl.style.background = color;
    verdictEl.textContent = verdict;
    tipsEl.innerHTML = tips.map(t => `<div class="result-tip">${t}</div>`).join('');
    box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

const brands = [
    { name: 'Organic Basics', cat: 'Basics', score: 9.4, badge: 'badge-great', label: 'Top', color: '#8a9a3c' },
    { name: 'Patagonia', cat: 'Outdoor', score: 9.1, badge: 'badge-great', label: 'Top', color: '#8a9a3c' },
    { name: 'Mud Jeans', cat: 'Denim', score: 8.9, badge: 'badge-great', label: 'Top', color: '#8a9a3c' },
    { name: 'Stella McCartney', cat: 'Luxury', score: 8.8, badge: 'badge-great', label: 'Top', color: '#8a9a3c' },
    { name: 'Nudie Jeans', cat: 'Denim', score: 8.6, badge: 'badge-great', label: 'Top', color: '#8a9a3c' },
    { name: 'Tentree', cat: 'Casual', score: 8.5, badge: 'badge-great', label: 'Top', color: '#8a9a3c' },
    { name: 'People Tree', cat: 'Fair Trade', score: 8.7, badge: 'badge-great', label: 'Top', color: '#8a9a3c' },
    { name: 'Eileen Fisher', cat: 'Duurzaam', score: 8.3, badge: 'badge-great', label: 'Top', color: '#8a9a3c' },
    { name: 'Allbirds', cat: 'Schoenen', score: 8.2, badge: 'badge-great', label: 'Top', color: '#8a9a3c' },
    { name: 'Girlfriend Collective', cat: 'Sportswear', score: 8.1, badge: 'badge-great', label: 'Top', color: '#8a9a3c' },
    { name: 'Reformation', cat: 'Mode', score: 7.9, badge: 'badge-great', label: 'Goed', color: '#2e7a9a' },
    { name: 'Arket', cat: 'Mode', score: 7.8, badge: 'badge-great', label: 'Goed', color: '#2e7a9a' },
    { name: 'Everlane', cat: 'Basics', score: 7.6, badge: 'badge-great', label: 'Goed', color: '#2e7a9a' },
    { name: 'Filippa K', cat: 'Scandinavisch', score: 7.4, badge: 'badge-great', label: 'Goed', color: '#2e7a9a' },
    { name: 'COS', cat: 'Minimalistisch', score: 7.2, badge: 'badge-great', label: 'Goed', color: '#2e7a9a' },
    { name: 'Madewell', cat: 'Casual', score: 7.0, badge: 'badge-great', label: 'Goed', color: '#2e7a9a' },
    { name: '& Other Stories', cat: 'Mode', score: 6.8, badge: 'badge-great', label: 'Goed', color: '#2e7a9a' },
    { name: 'Weekday', cat: 'Casual', score: 6.2, badge: 'badge-ok', label: 'Matig', color: '#b85a30' },
    { name: 'Uniqlo', cat: 'Basics', score: 6.5, badge: 'badge-ok', label: 'Matig', color: '#b85a30' },
    { name: 'Monki', cat: 'Casual', score: 5.5, badge: 'badge-ok', label: 'Matig', color: '#b85a30' },
    { name: 'Adidas', cat: 'Sport', score: 5.8, badge: 'badge-ok', label: 'Matig', color: '#b85a30' },
    { name: 'Levi\'s', cat: 'Denim', score: 5.8, badge: 'badge-ok', label: 'Matig', color: '#b85a30' },
    { name: 'Nike', cat: 'Sport', score: 5.1, badge: 'badge-ok', label: 'Matig', color: '#b85a30' },
    { name: 'Puma', cat: 'Sport', score: 5.4, badge: 'badge-ok', label: 'Matig', color: '#b85a30' },
    { name: 'Vans', cat: 'Schoenen', score: 4.9, badge: 'badge-ok', label: 'Matig', color: '#b85a30' },
    { name: 'ASOS', cat: 'Online Mode', score: 4.8, badge: 'badge-ok', label: 'Matig', color: '#b85a30' },
    { name: 'Under Armour', cat: 'Sport', score: 4.2, badge: 'badge-bad', label: 'Slecht', color: '#c45070' },
    { name: 'Mango', cat: 'Mode', score: 4.5, badge: 'badge-bad', label: 'Slecht', color: '#c45070' },
    { name: 'Pull&Bear', cat: 'Fast Fashion', score: 3.8, badge: 'badge-bad', label: 'Slecht', color: '#c45070' },
    { name: 'Bershka', cat: 'Fast Fashion', score: 3.5, badge: 'badge-bad', label: 'Slecht', color: '#c45070' },
    { name: 'H&M', cat: 'Fast Fashion', score: 3.4, badge: 'badge-bad', label: 'Slecht', color: '#c45070' },
    { name: 'Reserved', cat: 'Fast Fashion', score: 3.2, badge: 'badge-bad', label: 'Slecht', color: '#c45070' },
    { name: 'Zara', cat: 'Fast Fashion', score: 2.9, badge: 'badge-terrible', label: 'Zeer slecht', color: '#c4503a' },
    { name: 'Primark', cat: 'Fast Fashion', score: 2.1, badge: 'badge-terrible', label: 'Zeer slecht', color: '#c4503a' },
    { name: 'Temu', cat: 'Ultra Fast Fashion', score: 1.4, badge: 'badge-terrible', label: 'Zeer slecht', color: '#c4503a' },
    { name: 'Shein', cat: 'Ultra Fast Fashion', score: 1.2, badge: 'badge-terrible', label: 'Zeer slecht', color: '#c4503a' },
];

let visibleBrands = 8;
const brandsPerLoad = 8;
let currentBrandResults = [...brands];

function renderBrands(list) {
    const grid = document.getElementById('brandsGrid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');

    if (list.length === 0) {
        grid.innerHTML = '<div class="brand-no-results">Geen merken gevonden</div>';
        loadMoreBtn.style.display = 'none';
        return;
    }

    const visibleList = list.slice(0, visibleBrands);

    grid.innerHTML = visibleList.map(b => `
    <div class="brand-card" onclick="showBrandToast('${b.name}', ${b.score})">
      <div class="brand-initial" style="background: ${b.color};">${b.name[0]}</div>
      <div class="brand-name">${b.name}</div>
      <div class="brand-category">${b.cat}</div>
      <div class="brand-score-row">
        <span class="brand-score" style="color: ${b.color};">${b.score}/10</span>
        <span class="brand-badge ${b.badge}">${b.label}</span>
      </div>
    </div>
  `).join('');

    if (visibleBrands >= list.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'inline-block';
    }
}

function filterBrands() {
    const q = document.getElementById('brandSearch').value.toLowerCase();

    currentBrandResults = q
        ? brands.filter(b => b.name.toLowerCase().includes(q) || b.cat.toLowerCase().includes(q))
        : [...brands];

    visibleBrands = 8;
    renderBrands(currentBrandResults);
}

function loadMoreBrands() {
    visibleBrands += brandsPerLoad;
    renderBrands(currentBrandResults);
}

function showBrandToast(name, score) {
    showToast(`${name}: ${score}/10`);
}

renderBrands(currentBrandResults);

const outfits = [
    { user: 'Emma V.', desc: 'Vintage Levi\'s + GOTS-katoen shirt', score: '8.9', color: '#8a9a3c', votes: 24 },
    { user: 'Lars M.', desc: 'Zara blazer + H&M broek (30x gedragen)', score: '5.2', color: '#b85a30', votes: 11 },
    { user: 'Sofia K.', desc: 'Kringloop jurk + lokale schoenen', score: '9.4', color: '#2e7a9a', votes: 38 },
    { user: 'Noah B.', desc: 'Nudie jeans + biologisch katoenen hoodie', score: '8.1', color: '#6a7840', votes: 19 },
];

function renderOutfits() {
    document.getElementById('outfitsFeed').innerHTML = outfits.map((o, i) => `
    <div class="outfit-card">
      <div class="outfit-avatar" style="background: ${o.color};">${o.user[0]}</div>
      <div class="outfit-info">
        <div class="outfit-user">${o.user}</div>
        <div class="outfit-desc">${o.desc}</div>
        <div class="outfit-votes">
          <button class="vote-btn" onclick="vote(this, ${i})"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/></svg> ${o.votes}</button>
          <button class="vote-btn" onclick="showToast('Feedback verzonden!')"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> Reageer</button>
        </div>
      </div>
      <div class="outfit-score-badge" style="background: ${o.color}22; color: ${o.color};">${o.score}</div>
    </div>
  `).join('');
}

function vote(btn, idx) {
    if (btn.classList.contains('voted')) return;
    btn.classList.add('voted');
    outfits[idx].votes++;
    btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/></svg> ' + outfits[idx].votes;
    showToast('Stem geregistreerd!');
}

renderOutfits();

let currentRating = 0;
function setRating(val) {
    currentRating = val;
    document.querySelectorAll('.star').forEach((s, i) => {
        s.classList.toggle('active', i < val);
    });
}

function submitOutfit() {
    const desc = document.getElementById('outfitDesc').value;
    const name = document.getElementById('userName').value;
    if (!desc || !name || !currentRating) {
        showToast('Vul alle velden in.');
        return;
    }
    const colors = ['#8a9a3c','#2e7a9a','#e8865a','#c45070','#b85a30'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const score = (4 + currentRating * 0.8 + Math.random()).toFixed(1);
    outfits.unshift({ user: name, desc, score, color, votes: 0 });
    renderOutfits();
    document.getElementById('outfitDesc').value = '';
    document.getElementById('userName').value = '';
    setRating(0);
    showToast('Outfit gedeeld met de community!');
}

function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
}

function toggleMenu() {
    const btn = document.getElementById('hamburger');
    const menu = document.getElementById('navMobile');
    btn.classList.toggle('open');
    menu.classList.toggle('open');
}

const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            const children = e.target.querySelectorAll('.reveal');
            children.forEach((c, i) => {
                setTimeout(() => c.classList.add('visible'), i * 100);
            });
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));