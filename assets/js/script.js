document.querySelectorAll('.lightbox-trigger').forEach(img => {
    img.addEventListener('click', () => {
        document.getElementById('lightboxImg').src = img.src;
        document.getElementById('lightboxImg').alt = img.alt;
        document.getElementById('lightbox').classList.add('open');
        document.body.style.overflow = 'hidden';
    });
});

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
});

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
    { name: 'ARMEDANGELS', cat: 'Mode', score: 9.0, badge: 'badge-great', label: 'Top', color: '#8a9a3c' },
    { name: 'Kuyichi', cat: 'Denim', score: 8.7, badge: 'badge-great', label: 'Top', color: '#8a9a3c' },
    { name: 'Kings of Indigo', cat: 'Denim', score: 8.5, badge: 'badge-great', label: 'Top', color: '#8a9a3c' },
    { name: 'Alchemist & Thought', cat: 'Dameskleding', score: 8.4, badge: 'badge-great', label: 'Top', color: '#8a9a3c' },
    { name: 'Thinking MU', cat: 'Mode', score: 8.3, badge: 'badge-great', label: 'Top', color: '#8a9a3c' },
    { name: 'Wunderwerk', cat: 'Mode', score: 8.2, badge: 'badge-great', label: 'Top', color: '#8a9a3c' },
    { name: 'Teym', cat: 'Basics', score: 8.0, badge: 'badge-great', label: 'Top', color: '#8a9a3c' },
    { name: 'New Optimist', cat: 'Duurzaam', score: 8.1, badge: 'badge-great', label: 'Top', color: '#8a9a3c' },
    { name: 'Skot', cat: 'Overhemden', score: 7.9, badge: 'badge-great', label: 'Goed', color: '#2e7a9a' },
    { name: 'Zeeman', cat: 'Basics', score: 6.0, badge: 'badge-ok', label: 'Matig', color: '#b85a30' },
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
let currentBrandResults = [...brands].sort((a, b) => b.score - a.score);

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

    currentBrandResults = (q
        ? brands.filter(b => b.name.toLowerCase().includes(q) || b.cat.toLowerCase().includes(q))
        : [...brands]).sort((a, b) => b.score - a.score);

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

const rankingPhotos = [
    {
        brand: 'Nudie Jeans',
        type: 'Man',
        file: 'assets/images/kleding/nudie jeans man 1.png',
        score: 8.6,
        label: 'Top',
        badge: 'badge-great',
        color: '#8a9a3c',
        desc: 'Duurzaam denimmerk met sterke focus op biologisch katoen en transparantie.'
    },
    {
        brand: 'Nudie Jeans',
        type: 'Man',
        file: 'assets/images/kleding/nudie jeans man 2.png',
        score: 8.6,
        label: 'Top',
        badge: 'badge-great',
        color: '#8a9a3c',
        desc: 'Sterk duurzaam profiel binnen denim en goed passend bij bewuste modekeuzes.'
    },
    {
        brand: 'Nudie Jeans',
        type: 'Vrouw',
        file: 'assets/images/kleding/nudie jeans vrouw 1.png',
        score: 8.6,
        label: 'Top',
        badge: 'badge-great',
        color: '#8a9a3c',
        desc: 'Hoog scorend merk in jouw database, met een duidelijke duurzame uitstraling.'
    },
    {
        brand: 'Nudie Jeans',
        type: 'Vrouw',
        file: 'assets/images/kleding/nudie jeans vrouw 2.png',
        score: 8.6,
        label: 'Top',
        badge: 'badge-great',
        color: '#8a9a3c',
        desc: 'Een sterke keuze binnen duurzame denim en circulaire mode.'
    },
    {
        brand: 'Thinking MU',
        type: 'Man',
        file: 'assets/images/kleding/Thinking MU man 1.png',
        score: 8.3,
        label: 'Top',
        badge: 'badge-great',
        color: '#8a9a3c',
        desc: 'Duurzaam modemerk met een hoge score en goede materiaalkeuzes.'
    },
    {
        brand: 'Thinking MU',
        type: 'Man',
        file: 'assets/images/kleding/Thinking MU man 2.png',
        score: 8.3,
        label: 'Top',
        badge: 'badge-great',
        color: '#8a9a3c',
        desc: 'Scoort sterk op duurzaamheid en past goed binnen jouw concept.'
    },
    {
        brand: 'Thinking MU',
        type: 'Vrouw',
        file: 'assets/images/kleding/Thinking MU vrouw 1.png',
        score: 8.3,
        label: 'Top',
        badge: 'badge-great',
        color: '#8a9a3c',
        desc: 'Goede duurzame score en geschikt als positief voorbeeld op de website.'
    },
    {
        brand: 'Thinking MU',
        type: 'Vrouw',
        file: 'assets/images/kleding/Thinking MU vrouw 2.png',
        score: 8.3,
        label: 'Top',
        badge: 'badge-great',
        color: '#8a9a3c',
        desc: 'Een merk dat hoog scoort en goed aansluit bij eco fashion.'
    },
    {
        brand: 'Zeeman',
        type: 'Man',
        file: 'assets/images/kleding/zeeman man 1.png',
        score: 6.0,
        label: 'Matig',
        badge: 'badge-ok',
        color: '#b85a30',
        desc: 'Betaalbaar merk met een middenpositie. Niet slecht, maar er zijn duurzamere alternatieven.'
    },
    {
        brand: 'Zeeman',
        type: 'Man',
        file: 'assets/images/kleding/zeeman man 2.png',
        score: 6.0,
        label: 'Matig',
        badge: 'badge-ok',
        color: '#b85a30',
        desc: 'Redelijke keuze, maar minder sterk dan de hoog scorende duurzame merken.'
    },
    {
        brand: 'Zeeman',
        type: 'Vrouw',
        file: 'assets/images/kleding/zeeman vrouw 1.png',
        score: 6.0,
        label: 'Matig',
        badge: 'badge-ok',
        color: '#b85a30',
        desc: 'Middenmoot binnen jouw ranking. Bewuster dan fast fashion, maar niet top.'
    },
    {
        brand: 'Zeeman',
        type: 'Vrouw',
        file: 'assets/images/kleding/zeeman vrouw 2.png',
        score: 6.0,
        label: 'Matig',
        badge: 'badge-ok',
        color: '#b85a30',
        desc: 'Prima als vergelijking met merken die hoger of lager scoren.'
    },
    {
        brand: 'Alchemist & Thought',
        type: 'Vrouw',
        file: 'assets/images/kleding/Alchemist vrouw 1.png',
        score: 8.4,
        label: 'Top',
        badge: 'badge-great',
        color: '#2e7a9a',
        desc: 'Sterk duurzaam merk met een hoge score in jouw merkdatabase.'
    },
    {
        brand: 'Alchemist & Thought',
        type: 'Vrouw',
        file: 'assets/images/kleding/Alchemist vrouw 2.png',
        score: 8.4,
        label: 'Top',
        badge: 'badge-great',
        color: '#2e7a9a',
        desc: 'Een hoog scorend merk dat goed laat zien wat duurzame fashion kan zijn.'
    },
    {
        brand: 'Kings of Indigo',
        type: 'Man',
        file: 'assets/images/kleding/Kings man 1.png',
        score: 8.5,
        label: 'Top',
        badge: 'badge-great',
        color: '#8a9a3c',
        desc: 'Hoogwaardige denim met sterke duurzaamheidsscore.'
    },
    {
        brand: 'Kings of Indigo',
        type: 'Man',
        file: 'assets/images/kleding/Kings man 2.png',
        score: 8.5,
        label: 'Top',
        badge: 'badge-great',
        color: '#8a9a3c',
        desc: 'Kings of Indigo combineert stijl met verantwoorde productie.'
    },
    {
        brand: 'Kings of Indigo',
        type: 'Vrouw',
        file: 'assets/images/kleding/Kings vrouw 1.png',
        score: 8.5,
        label: 'Top',
        badge: 'badge-great',
        color: '#8a9a3c',
        desc: 'Duurzame denim voor vrouwen met hoge milieunormen.'
    },
    {
        brand: 'Kings of Indigo',
        type: 'Vrouw',
        file: 'assets/images/kleding/Kings vrouw 2.png',
        score: 8.5,
        label: 'Top',
        badge: 'badge-great',
        color: '#8a9a3c',
        desc: 'Een sterke keuze voor wie stijlvol en duurzaam wil dragen.'
    },
    {
        brand: 'Teym',
        type: 'Man',
        file: 'assets/images/kleding/Teym man 1.png',
        score: 8.0,
        label: 'Top',
        badge: 'badge-great',
        color: '#8a9a3c',
        desc: 'Minimalistische basics met focus op duurzame materialen.'
    },
    {
        brand: 'Teym',
        type: 'Man',
        file: 'assets/images/kleding/Teym man 2.png',
        score: 8.0,
        label: 'Top',
        badge: 'badge-great',
        color: '#8a9a3c',
        desc: 'Teym scoort goed op transparantie en materiaalgebruik.'
    },
    {
        brand: 'Teym',
        type: 'Vrouw',
        file: 'assets/images/kleding/Teym vrouw 1.png',
        score: 8.0,
        label: 'Top',
        badge: 'badge-great',
        color: '#8a9a3c',
        desc: 'Tijdloze basics die lang meegaan en bewust zijn geproduceerd.'
    },
    {
        brand: 'Teym',
        type: 'Vrouw',
        file: 'assets/images/kleding/Teym vrouw 2.png',
        score: 8.0,
        label: 'Top',
        badge: 'badge-great',
        color: '#8a9a3c',
        desc: 'Duurzame essentials die perfect passen in een bewuste garderobe.'
    },
    {
        brand: 'Wunderwerk',
        type: 'Man',
        file: 'assets/images/kleding/Wunderwerk man 1.png',
        score: 8.2,
        label: 'Top',
        badge: 'badge-great',
        color: '#8a9a3c',
        desc: 'Duurzame mode met aandacht voor eerlijke productieketens.'
    },
    {
        brand: 'Wunderwerk',
        type: 'Man',
        file: 'assets/images/kleding/Wunderwerk man 2.png',
        score: 8.2,
        label: 'Top',
        badge: 'badge-great',
        color: '#8a9a3c',
        desc: 'Wunderwerk bewijst dat stijl en duurzaamheid samengaan.'
    },
    {
        brand: 'Wunderwerk',
        type: 'Vrouw',
        file: 'assets/images/kleding/Wunderwerk vrouw 1.png',
        score: 8.2,
        label: 'Top',
        badge: 'badge-great',
        color: '#8a9a3c',
        desc: 'Bewust geproduceerde kleding met een hoge duurzaamheidsscore.'
    },
    {
        brand: 'Wunderwerk',
        type: 'Vrouw',
        file: 'assets/images/kleding/Wunderwerk vrouw 2.png',
        score: 8.2,
        label: 'Top',
        badge: 'badge-great',
        color: '#8a9a3c',
        desc: 'Een solide keuze voor duurzame fashion met goede kwaliteit.'
    },
    {
        brand: 'Patagonia',
        type: 'Man',
        file: 'assets/images/kleding/patagonia man 1.png',
        score: 9.1,
        label: 'Top',
        badge: 'badge-great',
        color: '#8a9a3c',
        desc: 'Patagonia is een pionier in duurzame outdoor- en streetwear.'
    },
    {
        brand: 'Patagonia',
        type: 'Man',
        file: 'assets/images/kleding/patagonia man 2.png',
        score: 9.1,
        label: 'Top',
        badge: 'badge-great',
        color: '#8a9a3c',
        desc: 'Hoge score op milieu, eerlijk werk en circulaire principes.'
    },
    {
        brand: 'Patagonia',
        type: 'Vrouw',
        file: 'assets/images/kleding/patagonia vrouw 1.png',
        score: 9.1,
        label: 'Top',
        badge: 'badge-great',
        color: '#8a9a3c',
        desc: 'Een van de meest duurzame merken ter wereld.'
    },
    {
        brand: 'Patagonia',
        type: 'Vrouw',
        file: 'assets/images/kleding/patagonia vrouw 2.png',
        score: 9.1,
        label: 'Top',
        badge: 'badge-great',
        color: '#8a9a3c',
        desc: 'Patagonia zet de standaard voor verantwoorde modeproductie.'
    },
    {
        brand: 'Skot',
        type: 'Man',
        file: 'assets/images/kleding/skot man 1.png',
        score: 7.9,
        label: 'Goed',
        badge: 'badge-great',
        color: '#2e7a9a',
        desc: 'Duurzame overhemden met aandacht voor materiaal en productie.'
    },
    {
        brand: 'Skot',
        type: 'Man',
        file: 'assets/images/kleding/skot man 2.png',
        score: 7.9,
        label: 'Goed',
        badge: 'badge-great',
        color: '#2e7a9a',
        desc: 'Skot maakt bewuste keuzes in de productieketen.'
    }
];

let visibleRankings = 6;
const rankingsPerLoad = 6;
let currentRankingResults = [...rankingPhotos].sort((a, b) => b.score - a.score);

function renderRankings(list) {
    const grid = document.getElementById('rankingsGrid');
    const loadMoreBtn = document.getElementById('loadMoreRankingsBtn');

    if (!grid || !loadMoreBtn) return;

    if (list.length === 0) {
        grid.innerHTML = '<div class="ranking-no-results">Geen foto rankings gevonden</div>';
        loadMoreBtn.style.display = 'none';
        return;
    }

    const visibleList = list.slice(0, visibleRankings);

    grid.innerHTML = visibleList.map(item => `
        <div class="ranking-card">
            <div class="ranking-image-wrap">
                <img
                    src="${item.file}"
                    alt="${item.brand} ${item.type}"
                    class="ranking-image lightbox-trigger"
                    onclick="openLightboxFromSrc('${item.file}', '${item.brand} ${item.type}')"
                />
                <div class="ranking-score-badge" style="background:${item.color}22; color:${item.color}; border:1px solid ${item.color}33;">
                    ${item.score}/10
                </div>
            </div>
            <div class="ranking-content">
                <div class="ranking-brand">${item.brand}</div>
                <div class="ranking-type">${item.type}</div>

                <div class="ranking-row">
                    <span class="ranking-score" style="color:${item.color};">${item.score}/10</span>
                    <span class="ranking-label ${item.badge}">${item.label}</span>
                </div>

                <p class="ranking-desc">${item.desc}</p>
            </div>
        </div>
    `).join('');

    loadMoreBtn.style.display = visibleRankings >= list.length ? 'none' : 'inline-block';
}

function filterRankings() {
    const q = document.getElementById('rankingSearch').value.toLowerCase();

    currentRankingResults = (q
        ? rankingPhotos.filter(item =>
            item.brand.toLowerCase().includes(q) ||
            item.type.toLowerCase().includes(q) ||
            item.file.toLowerCase().includes(q)
        )
        : [...rankingPhotos]).sort((a, b) => b.score - a.score);

    visibleRankings = 6;
    renderRankings(currentRankingResults);
}

function loadMoreRankings() {
    visibleRankings += rankingsPerLoad;
    renderRankings(currentRankingResults);
}

function openLightboxFromSrc(src, alt) {
    document.getElementById('lightboxImg').src = src;
    document.getElementById('lightboxImg').alt = alt;
    document.getElementById('lightbox').classList.add('open');
    document.body.style.overflow = 'hidden';
}

renderRankings(currentRankingResults);

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

// Brand autocomplete
(function() {
    const input = document.getElementById('brandInput');
    const list = document.getElementById('brandSuggestions');
    let activeIdx = -1;

    function scoreColor(b) {
        if (b.score >= 7.5) return '#8a9a3c';
        if (b.score >= 5) return '#b85a30';
        return '#c45070';
    }

    function show(matches) {
        activeIdx = -1;
        if (!matches.length) { list.classList.remove('open'); return; }
        list.innerHTML = matches.slice(0, 6).map(b => `
            <li data-name="${b.name}">
                <span>${b.name} <small style="opacity:0.45;font-size:0.78rem;">${b.cat}</small></span>
                <span class="autocomplete-score" style="background:${scoreColor(b)}22;color:${scoreColor(b)}">${b.score}</span>
            </li>`).join('');
        list.classList.add('open');
        list.querySelectorAll('li').forEach(li => {
            li.addEventListener('mousedown', e => {
                e.preventDefault();
                input.value = li.dataset.name;
                list.classList.remove('open');
            });
        });
    }

    input.addEventListener('input', () => {
        const q = input.value.toLowerCase().trim();
        if (!q) { list.classList.remove('open'); return; }
        show(brands.filter(b => b.name.toLowerCase().includes(q)));
    });

    input.addEventListener('keydown', e => {
        const items = list.querySelectorAll('li');
        if (!items.length) return;
        if (e.key === 'ArrowDown') { activeIdx = Math.min(activeIdx + 1, items.length - 1); }
        else if (e.key === 'ArrowUp') { activeIdx = Math.max(activeIdx - 1, 0); }
        else if (e.key === 'Enter' && activeIdx >= 0) {
            input.value = items[activeIdx].dataset.name;
            list.classList.remove('open'); return;
        } else if (e.key === 'Escape') { list.classList.remove('open'); return; }
        items.forEach((li, i) => li.classList.toggle('active', i === activeIdx));
    });

    document.addEventListener('click', e => {
        if (!input.parentElement.contains(e.target)) list.classList.remove('open');
    });
})();

// Custom select: wearFreq
(function() {
    const dropdown = document.getElementById('wearFreqDropdown');
    const trigger = document.getElementById('wearFreqTrigger');
    const label = document.getElementById('wearFreqLabel');
    const options = document.querySelectorAll('#wearFreqOptions .custom-select-option');
    const hidden = document.getElementById('wearFreq');

    trigger.addEventListener('click', () => dropdown.classList.toggle('open'));

    options.forEach(opt => {
        opt.addEventListener('click', () => {
            options.forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');
            hidden.value = opt.dataset.value;
            label.textContent = opt.childNodes[0].textContent.trim();
            label.style.color = 'var(--cream)';
            dropdown.classList.remove('open');
        });
    });

    document.addEventListener('click', e => {
        if (!dropdown.contains(e.target)) dropdown.classList.remove('open');
    });
})();

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

const quizData = [
    {
        question: 'Hoeveel water is nodig om één katoenen T-shirt te produceren?',
        options: ['70 liter', '700 liter', '2.700 liter', '7.000 liter'],
        correct: 2,
        explanation: '2.700 liter — genoeg drinkwater voor 2,5 jaar voor één persoon.'
    },
    {
        question: 'Welk keurmerk garandeert dat textiel biologisch én eerlijk geproduceerd is?',
        options: ['OEKO-TEX', 'GOTS', 'ISO 9001', 'CE-markering'],
        correct: 1,
        explanation: 'GOTS (Global Organic Textile Standard) controleert het hele productieproces.'
    },
    {
        question: 'Hoeveel procent van de wereldwijde CO₂-uitstoot komt van de mode-industrie?',
        options: ['2%', '5%', '10%', '20%'],
        correct: 2,
        explanation: '10% — meer dan alle internationale vluchten en scheepvaart samen!'
    },
    {
        question: 'Wat is de meest duurzame manier om kleding te kopen?',
        options: ['Nieuwe collectie kopen bij een duurzaam merk', 'Tweedehands / vintage kopen', 'Fast fashion maar weinig kopen', 'Online bestellen en wat past houden'],
        correct: 1,
        explanation: 'Tweedehands kopen gebruikt geen nieuwe grondstoffen, water of transport.'
    },
    {
        question: 'Hoeveel ton kledingafval wordt er wereldwijd per jaar geproduceerd?',
        options: ['9 miljoen ton', '45 miljoen ton', '92 miljoen ton', '200 miljoen ton'],
        correct: 2,
        explanation: '92 miljoen ton — genoeg om elke seconde een vrachtwagen te vullen.'
    }
];

let quizCurrent = 0;
let quizScore = 0;
let quizAnswered = false;

function renderQuiz() {
    const q = quizData[quizCurrent];
    document.getElementById('quizCounter').textContent = `Vraag ${quizCurrent + 1} van ${quizData.length}`;
    document.getElementById('quizProgressBar').style.width = `${(quizCurrent / quizData.length) * 100}%`;
    document.getElementById('quizQuestion').textContent = q.question;
    document.getElementById('quizOptions').innerHTML = q.options.map((opt, i) =>
        `<button class="quiz-option" onclick="answerQuiz(${i})">${opt}</button>`
    ).join('');
    document.getElementById('quizResult').style.display = 'none';
    quizAnswered = false;
}

function answerQuiz(index) {
    if (quizAnswered) return;
    quizAnswered = true;
    const q = quizData[quizCurrent];
    const buttons = document.querySelectorAll('.quiz-option');
    buttons.forEach(b => b.disabled = true);
    buttons[q.correct].classList.add('correct');
    if (index !== q.correct) {
        buttons[index].classList.add('wrong');
    } else {
        quizScore++;
    }
    setTimeout(() => {
        quizCurrent++;
        if (quizCurrent < quizData.length) {
            renderQuiz();
        } else {
            showQuizResult();
        }
    }, 1400);
}

function showQuizResult() {
    document.getElementById('quizProgressBar').style.width = '100%';
    document.getElementById('quizQuestion').textContent = '';
    document.getElementById('quizOptions').innerHTML = '';
    document.getElementById('quizCounter').textContent = 'Resultaat';
    const pct = Math.round((quizScore / quizData.length) * 100);
    let msg;
    if (quizScore === 5) msg = 'Perfect! Jij bent een echte duurzame mode-expert. Deel jouw kennis met anderen!';
    else if (quizScore >= 3) msg = 'Goed bezig! Je weet al veel over duurzame fashion. Lees onze tips om nog bewuster te worden.';
    else msg = 'Er valt nog wat te leren — maar dat is precies waarom deze website bestaat. Bekijk de tips en probeer het opnieuw!';
    document.getElementById('quizScoreNum').textContent = `${quizScore}/5`;
    document.getElementById('quizScoreMsg').textContent = msg;
    document.getElementById('quizResult').style.display = 'block';
}

function restartQuiz() {
    quizCurrent = 0;
    quizScore = 0;
    renderQuiz();
}

renderQuiz();