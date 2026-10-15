// ================== STATE ==================
const stack = document.getElementById("card-stack");
const TINTS = ["#FFE8A3", "#CFE3FF", "#FFD3DC", "#D5F5E3", "#E4D9FF"];

let deck = [];          // kartu yang sudah diacak
let els = [];           // elemen HTML tiap kartu
let idx = 0;            // kartu yang sedang di atas
let scores = {};        // skor tiap jurusan
let maxScores = {};     // skor maksimal tiap jurusan (untuk persentase)
let liked = [];         // kartu yang di-swipe kanan (untuk "kenapa cocok")
let ranking = [];
let busy = false;       // mencegah klik ganda saat animasi
let dragging = false, startX = 0, dx = 0;
let lastSwipe = null;   // kartu terakhir yang di-swipe (untuk undo)
let jalur = "";         // jalur akademik: IPA / IPS / Bahasa (opsional)
let friendLiked = null; // id kartu dari hasil teman (tautan #hasil=...)
const TRAIT_LABELS = ["Logika", "Kreativitas", "Sosial", "Alam", "Bisnis"];
let traitScores = {};   // akumulasi 5 dimensi minat dari kartu yang disukai

// ================== BANTUAN ==================
function $(id) { return document.getElementById(id); }
const sumPts = c => Object.values(c.points).reduce((a, b) => a + b, 0);

// Efek suara swipe dari file mp3 (geser kiri: cancel, geser kanan: confirm).
const sfx = { like: new Audio("swipe-confirm.mp3"), nope: new Audio("swipe-cancel.mp3") };
sfx.like.volume = sfx.nope.volume = 0.7;
function playSwipe(isRight) {
    const a = isRight ? sfx.like : sfx.nope;
    try { a.currentTime = 0; const p = a.play(); if (p && p.catch) p.catch(() => {}); }
    catch (e) { /* audio opsional: abaikan bila browser menolak */ }
}

function show(screenId) {
    const cur = document.querySelector(".screen:not(.hidden)");
    const next = $(screenId);
    if (!cur || cur === next) { next.classList.remove("hidden"); next.style.opacity = ""; return; }
    // fade-out layar lama, tukar, fade-in layar baru (reduced-motion ditangani CSS)
    cur.style.transition = "opacity .15s ease";
    cur.style.opacity = "0";
    setTimeout(() => {
        cur.classList.add("hidden");
        cur.style.transition = "";
        cur.style.opacity = "";
        next.classList.remove("hidden");
        next.style.transition = "opacity .15s ease";
        next.style.opacity = "0";
        requestAnimationFrame(() => requestAnimationFrame(() => next.style.opacity = "1"));
        window.scrollTo(0, 0);
    }, 150);
}

function shuffle(arr) { // Fisher-Yates
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// ================== PERSIAPAN GAME ==================
function initGame() {
    for (const m in majorData) scores[m] = 0;
    TRAIT_LABELS.forEach(t => traitScores[t] = 0);

    // Hitung skor maksimal tiap jurusan dari semua kartu
    cards.forEach(c => {
        for (const m in c.points) {
            if (!(m in majorData)) { console.warn("Jurusan tidak ada di majorData:", m); continue; }
            maxScores[m] = (maxScores[m] || 0) + c.points[m];
        }
    });

    deck = shuffle(cards.slice());
    $("card-count").innerText = deck.length;
    buildStack();
    updateProgress();
}

function buildStack() {
    stack.innerHTML = "";
    els = deck.map((c, i) => {
        const el = document.createElement("div");
        el.className = "absolute inset-0 rounded-[2rem] border-2 border-ink p-7 flex flex-col justify-between select-none touch-none cursor-grab shadow-[6px_6px_0_#1B1340]";
        el.style.background = TINTS[i % TINTS.length];
        el.innerHTML = `
            <div class="text-7xl leading-none pointer-events-none" aria-hidden="true">${c.emoji}</div>
            <p class="font-display text-3xl font-bold leading-tight pointer-events-none">${c.text}</p>
            <span class="stamp-like pointer-events-none absolute top-6 left-5 -rotate-12 rounded-xl border-4 border-mintInk bg-white px-3 py-1 font-display text-2xl font-extrabold text-mintInk opacity-0" aria-hidden="true">Suka</span>
            <span class="stamp-nope pointer-events-none absolute top-6 right-5 rotate-12 rounded-xl border-4 border-coralInk bg-white px-3 py-1 font-display text-2xl font-extrabold text-coralInk opacity-0" aria-hidden="true">Lewat</span>`;
        stack.appendChild(el);
        return el;
    });
    layoutStack();
}

// Atur posisi tumpukan: kartu di bawah terlihat sedikit mengintip
function layoutStack() {
    els.forEach((el, i) => {
        const d = i - idx;
        // hanya kartu teratas yang dibacakan ke pembaca layar
        el.setAttribute("aria-hidden", d === 0 ? "false" : "true");
        if (d < 0) return; // kartu yang sudah dilempar jangan diganggu
        el.style.zIndex = 100 - d;
        if (d > 2) { el.style.opacity = 0; return; }
        el.style.opacity = 1;
        el.style.transition = "transform .3s ease";
        el.style.transform = `translateY(${d * 14}px) scale(${1 - d * 0.05})`;
    });
}

function updateProgress() {
    const now = Math.min(idx + 1, deck.length);
    $("progress-text").innerText = `Kartu ${now} dari ${deck.length}`;
    $("progress-bar").style.width = (now / deck.length * 100) + "%";
    // satu pengumuman per geseran untuk pembaca layar (teks kartu tidak terbaca karena opacity)
    const cur = deck[idx];
    if (cur) $("card-announce").innerText = `Kartu ${now} dari ${deck.length}: ${cur.text}`;
}

// ================== INTERAKSI (mouse + sentuh via Pointer Events) ==================
stack.addEventListener("pointerdown", (e) => {
    if (busy || idx >= deck.length) return;
    dragging = true;
    startX = e.clientX;
    dx = 0;
    els[idx].style.transition = "none";
    els[idx].style.cursor = "grabbing";
    e.preventDefault();
});

document.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    dx = e.clientX - startX;
    const el = els[idx];
    el.style.transform = `translateX(${dx}px) rotate(${dx / 15}deg)`;
    el.querySelector(".stamp-like").style.opacity = Math.min(Math.max(dx / 90, 0), 1);
    el.querySelector(".stamp-nope").style.opacity = Math.min(Math.max(-dx / 90, 0), 1);
});

function endDrag() {
    if (!dragging) return;
    dragging = false;
    const el = els[idx];
    if (!el) return;
    el.style.cursor = "grab";
    if (Math.abs(dx) > 90) {
        swipe(dx > 0);
    } else { // kurang jauh: kembali ke tengah
        el.querySelector(".stamp-like").style.opacity = 0;
        el.querySelector(".stamp-nope").style.opacity = 0;
        layoutStack();
    }
}
document.addEventListener("pointerup", endDrag);
document.addEventListener("pointercancel", endDrag);

// Tombol Z = undo (swipe pakai tombol/drag; panah keyboard dihapus)
document.addEventListener("keydown", (e) => {
    if ($("quiz-screen").classList.contains("hidden")) return;
    if (e.key === "z" || e.key === "Z") undo();
});

function swipeRight() { swipe(true); }
function swipeLeft() { swipe(false); }

// Jalur akademik (opsional): dipakai untuk memberi catatan bila jurusan butuh IPA
$("jalur-picker").addEventListener("click", (e) => {
    const btn = e.target.closest(".jalur-btn");
    if (!btn) return;
    jalur = btn.dataset.jalur === jalur ? "" : btn.dataset.jalur; // tekan lagi = batal pilih
    document.querySelectorAll(".jalur-btn").forEach(b => {
        const on = b.dataset.jalur === jalur;
        b.classList.toggle("bg-sun", on);
        b.classList.toggle("bg-white", !on);
        b.setAttribute("aria-pressed", on);
    });
});

// ================== PROSES SWIPE & SKOR ==================
function swipe(isRight) {
    if (busy || idx >= deck.length) return;
    busy = true;

    const el = els[idx];
    const card = deck[idx];
    const dir = isRight ? 1 : -1;

    if (isRight) {
        liked.push(card);
        for (const m in card.points) if (m in scores) scores[m] += card.points[m];
        for (const t in card.traits) if (t in traitScores) traitScores[t] += card.traits[t];
    }
    lastSwipe = { card, el, wasRight: isRight };

    if (navigator.vibrate) navigator.vibrate(50); // haptic di ponsel
    playSwipe(isRight);                            // sfx: cancel (kiri) / confirm (kanan)

    el.querySelector(isRight ? ".stamp-like" : ".stamp-nope").style.opacity = 1;
    el.style.transition = "transform .35s ease, opacity .35s ease";
    el.style.transform = `translateX(${dir * 600}px) rotate(${dir * 25}deg)`;
    el.style.opacity = 0;

    idx++;
    updateProgress();
    layoutStack();
    updateUndo();

    setTimeout(() => {
        el.style.pointerEvents = "none"; // jangan di-remove: dibutuhkan undo
        // Kartu sudah tak terlihat (opacity 0); kembalikan posisinya supaya tidak melebarkan
        // area gulir dokumen — pemicu halaman yang bisa digeser ke kiri/kanan di hp.
        el.style.transition = "none";
        el.style.transform = "none";
        busy = false;
        updateUndo();
        if (idx >= deck.length) finish();
    }, 350);
}

// ================== UNDO ==================
function undo() {
    if (busy || dragging || !lastSwipe || idx === 0) return;
    const { card, el, wasRight } = lastSwipe;
    lastSwipe = null;

    if (wasRight) {
        liked.splice(liked.indexOf(card), 1);
        for (const m in card.points) if (m in scores) scores[m] -= card.points[m];
        for (const t in card.traits) if (t in traitScores) traitScores[t] -= card.traits[t];
    }

    idx--;
    el.style.pointerEvents = "";
    el.style.cursor = "grab";
    el.style.transition = "transform .3s ease, opacity .3s ease";
    el.style.opacity = 1;
    el.querySelector(".stamp-like").style.opacity = 0;
    el.querySelector(".stamp-nope").style.opacity = 0;
    updateProgress();
    layoutStack();
    updateUndo();
}

function updateUndo() {
    $("undo-btn").disabled = busy || !lastSwipe || idx === 0;
}

// ================== ANALISIS (jeda dramatis) ==================
function finish() {
    show("loading-screen");
    setTimeout(showResult, 1900); // biar animasi "menganalisis" sempat terlihat
}

// ================== HASIL ==================
function showResult() {
    ranking = Object.keys(scores).map(m => ({
        major: m,
        raw: scores[m],
        percent: maxScores[m] ? Math.round(scores[m] / maxScores[m] * 100) : 0
    })).sort((a, b) => b.percent - a.percent || b.raw - a.raw);

    // Easter egg: semua kartu di-swipe kiri
    if (ranking[0].raw === 0) { show("easter-egg-screen"); return; }

    show("result-screen");

    // Confetti sekali jalan, warna senada tema (dilewati bila pengguna minta less motion)
    if (window.confetti && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
        confetti({ particleCount: 140, spread: 75, origin: { y: 0.6 },
            colors: ["#5B3DF5", "#FFD23F", "#19C37D", "#FF5A6E"] });
    }

    const top3 = ranking.slice(0, 3);
    $("top-matches").innerHTML = top3.map((r) => `
        <button type="button" data-major="${r.major}" aria-pressed="false" class="match-btn rounded-2xl border-2 border-ink bg-white p-3 text-left transition focus-visible:outline focus-visible:outline-4 focus-visible:outline-violet">
            <div class="flex items-baseline justify-between gap-3">
                <span class="font-display text-lg font-bold leading-tight">${r.major}</span>
                <span class="font-display text-xl font-extrabold text-violet">${r.percent}%</span>
            </div>
            <div class="mt-2 h-2 rounded-full bg-paper"><div class="h-2 rounded-full bg-violet" style="width:${r.percent}%"></div></div>
        </button>`).join("");

    renderMajor(top3[0].major);
    renderPrintProfile();
    renderCompare();
    setTimeout(renderTraits, 300); // setelah layar tampil, kalau tidak ukuran kanvas 0
    // pindahkan fokus ke judul hasil supaya pembaca layar tahu kuis selesai
    setTimeout(() => $("major-result").focus({ preventScroll: true }), 200);
}

$("top-matches").addEventListener("click", (e) => {
    const btn = e.target.closest(".match-btn");
    if (btn) renderMajor(btn.dataset.major);
});

function renderMajor(major) {
    const details = majorData[major];
    const info = ranking.find(r => r.major === major);

    // tandai chip yang aktif
    document.querySelectorAll(".match-btn").forEach(b => {
        const active = b.dataset.major === major;
        b.classList.toggle("bg-sun", active);
        b.classList.toggle("bg-white", !active);
        b.classList.toggle("shadow-[4px_4px_0_#1B1340]", active);
        b.setAttribute("aria-pressed", active);
    });

    $("major-result").innerText = major;
    $("major-percent").innerText = info.percent + "% cocok dengan kebiasaanmu";
    $("major-description").innerText = details.description;
    $("video-link").href = details.videoLink ||
        "https://www.youtube.com/results?search_query=" + encodeURIComponent("kuliah jurusan " + major);

    // Jalur masuk (info umum dari questions.js) + cari kampus di Google (tanpa data kampus)
    $("major-jalur").innerText = jalurInfo;
    $("major-campus").href = "https://www.google.com/search?q=" + encodeURIComponent("kampus yang memiliki jurusan " + major);
    $("major-campus").setAttribute("aria-label", "Cari kampus dengan jurusan " + major + " di Google");

    // Catatan bila jalur yang dipilih belum cocok dengan kebutuhan jurusan
    const mismatch = details.butuhIpa && (jalur === "IPS" || jalur === "Bahasa");
    const note = $("jalur-note");
    note.classList.toggle("hidden", !mismatch);
    note.innerText = mismatch
        ? `Catatan: ${major} umumnya lebih pas diambil dari jalur IPA/Saintek. Bukan larangan — cek syarat tiap kampus.`
        : "";

    // Kenapa cocok: kartu yang kamu sukai dan berkaitan dengan jurusan ini
    const reasons = liked.filter(c => c.points[major])
        .sort((a, b) => b.points[major] - a.points[major]).slice(0, 4);
    $("major-reasons").innerHTML = reasons.length
        ? reasons.map(c => `<li class="flex gap-3"><span class="text-2xl leading-none">${c.emoji}</span><span>${c.text}</span></li>`).join("")
        : `<li class="text-ink/75">Jurusan ini muncul dari kebiasaan lain yang kamu pilih.</li>`;

    // Survival kit: tips (agak) nyata untuk jurusan ini
    $("major-tips").innerHTML = (survivalTips[major] || []).map(t =>
        `<li class="flex gap-3"><span class="text-xl leading-none" aria-hidden="true">💡</span><span>${t}</span></li>`).join("");

    $("major-roadmap").innerHTML = details.roadmap.map(step => `
        <li class="relative pl-6 pb-6 last:pb-0">
            <span class="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-ink bg-sun"></span>
            <h4 class="font-display text-lg font-bold">${step.year}</h4>
            <p class="mt-1 text-sm leading-relaxed text-ink/80">${step.detail}</p>
        </li>`).join("");
}

// ================== LEMBAR CETAK (GURU BK) ==================
function renderPrintProfile() {
    const now = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
    const nama = ($("nama").value || "").trim();
    $("print-meta").innerText = (nama ? "Nama: " + nama + " · " : "") + "Dibuat " + now + (jalur ? " · Jalur: " + jalur : "");

    $("print-majors").innerHTML = ranking.filter(r => r.raw > 0).slice(0, 3).map(r => {
        const ipa = majorData[r.major].butuhIpa && (jalur === "IPS" || jalur === "Bahasa");
        return `<li><b>${r.major}</b> — ${r.percent}%${ipa ? " (umumnya butuh jalur IPA/Saintek)" : ""}</li>`;
    }).join("");

    const habits = liked.slice().sort((a, b) => sumPts(b) - sumPts(a)).slice(0, 8);
    $("print-habits").innerHTML = habits.map(c => `<li>${c.text}</li>`).join("") ||
        "<li>Belum ada kebiasaan yang dipilih.</li>";
}

// ================== BANDINGKAN DENGAN TEMAN (tanpa backend) ==================
// Hasil disimpan sebagai bitmask id kartu di #hasil=... (base64url), dihitung ulang saat dibuka teman.
function encodeLiked() {
    const bytes = new Uint8Array(Math.ceil(cards.length / 8));
    liked.forEach(c => { bytes[c.id >> 3] |= 1 << (c.id & 7); });
    let s = "";
    bytes.forEach(x => s += String.fromCharCode(x));
    return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function decodeLiked(code) {
    try {
        const s = atob(code.replace(/-/g, "+").replace(/_/g, "/"));
        const ids = [];
        for (let i = 0; i < s.length; i++)
            for (let b = 0; b < 8; b++)
                if (s.charCodeAt(i) & (1 << b)) ids.push(i * 8 + b);
        return ids.filter(id => id < cards.length);
    } catch (e) { return null; }
}

function parseShareHash() {
    const m = (location.hash || "").match(/hasil=([A-Za-z0-9_-]+)/);
    if (!m) return;
    const ids = decodeLiked(m[1]);
    if (ids && ids.length) { friendLiked = ids; $("friend-note").classList.remove("hidden"); }
}

function scoresFromLiked(ids) {
    const s = {};
    for (const m in majorData) s[m] = 0;
    ids.forEach(id => { const c = cards[id]; if (c) for (const m in c.points) if (m in s) s[m] += c.points[m]; });
    return s;
}

function cosine(a, b) {
    let dot = 0, na = 0, nb = 0;
    for (const m in a) { dot += a[m] * b[m]; na += a[m] * a[m]; nb += b[m] * b[m]; }
    return (na && nb) ? dot / Math.sqrt(na * nb) : 0;
}

function renderCompare() {
    const panel = $("compare-panel");
    if (!friendLiked) { panel.classList.add("hidden"); return; }
    const theirs = scoresFromLiked(friendLiked);
    const most = s => Object.keys(s).filter(m => s[m] > 0).sort((a, b) => s[b] - s[a]).slice(0, 5);
    const mine = most(scores), friend = most(theirs);
    const shared = mine.filter(m => friend.includes(m));
    $("compare-score").innerText = Math.round(cosine(scores, theirs) * 100) + "% mirip dengan temanmu";
    $("compare-detail").innerText = shared.length
        ? "Kalian sama-sama tertarik pada: " + shared.join(", ") + "."
        : "Kebiasaan kalian lumayan berbeda — justru bagus untuk saling cerita.";
    panel.classList.remove("hidden");
}

// ================== RADAR PROFIL MINAT (Chart.js) ==================
let traitChart = null;
function renderTraits() {
    const canvas = $("trait-chart");
    if (!canvas || typeof Chart !== "function") return; // CDN gagal dimuat -> lewati
    const vals = TRAIT_LABELS.map(t => traitScores[t] || 0);
    const max = Math.max(...vals, 1);
    const data = vals.map(v => Math.round(v / max * 100)); // dimensi terkuat = 100
    if (traitChart) traitChart.destroy();
    traitChart = new Chart(canvas, {
        type: "radar",
        data: {
            labels: TRAIT_LABELS,
            datasets: [{
                data,
                borderColor: "#5B3DF5", backgroundColor: "rgba(91,61,245,.22)",
                borderWidth: 3, pointBackgroundColor: "#1B1340", pointRadius: 4
            }]
        },
        options: {
            plugins: { legend: { display: false } },
            scales: {
                r: {
                    min: 0, max: 100, ticks: { display: false },
                    grid: { color: "#D9D1FF" }, angleLines: { color: "#D9D1FF" },
                    pointLabels: { color: "#1B1340",
                        font: { family: "'Plus Jakarta Sans', system-ui, sans-serif", size: 14, weight: "600" } }
                }
            }
        }
    });
}

// ================== BAGIKAN HASIL (kartu PNG + tautan + QR) ==================
function shareUrl() { return location.href.split("#")[0] + "#hasil=" + encodeLiked(); }

function openShare() {
    const modal = $("share-modal");
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    $("share-link").value = shareUrl();
    renderQR($("share-link").value);
    drawShareCard();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(drawShareCard); // font web telat -> gambar ulang
}

function closeShare() {
    const modal = $("share-modal");
    modal.classList.add("hidden");
    modal.classList.remove("flex");
}

function copyShareLink() {
    const input = $("share-link");
    const fallback = () => { input.select(); document.execCommand("copy"); };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(input.value).catch(fallback);
    else fallback();
}

function downloadCard() {
    $("share-canvas").toBlob(blob => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "swype-story.png";
        a.click();
        URL.revokeObjectURL(a.href);
    }, "image/png");
}

function renderQR(url) {
    const box = $("share-qr");
    box.innerHTML = "";
    if (typeof qrcode !== "function") return; // pustaka QR gagal dimuat -> sisa kartu tetap jalan
    try {
        const qr = qrcode(0, "M");
        qr.addData(url);
        qr.make();
        box.innerHTML = qr.createSvgTag({ cellSize: 6, margin: 2, scalable: true });
    } catch (e) { box.innerHTML = ""; }
}

// roundRect baru ada di browser modern; tanpa ini kartu PNG tampil kosong di Safari lama
if (!CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
        r = Math.min(r, w / 2, h / 2);
        this.moveTo(x + r, y);
        this.arcTo(x + w, y, x + w, y + h, r);
        this.arcTo(x + w, y + h, x, y + h, r);
        this.arcTo(x, y + h, x, y, r);
        this.arcTo(x, y, x + w, y, r);
        this.closePath();
        return this;
    };
}

function wrapText(ctx, text, maxWidth) {
    const words = text.split(" "), lines = [];
    let line = "";
    for (const w of words) {
        const t = line ? line + " " + w : w;
        if (ctx.measureText(t).width > maxWidth && line) { lines.push(line); line = w; }
        else line = t;
    }
    if (line) lines.push(line);
    return lines;
}

function drawShareCard() {
    const W = 1080, H = 1920, PAD = 90;
    const x = $("share-canvas").getContext("2d");
    x.clearRect(0, 0, W, H);
    x.fillStyle = "#F3F0FF"; x.fillRect(0, 0, W, H);
    x.fillStyle = "#D9D1FF";
    for (let py = 60; py < H; py += 64)
        for (let px = 60; px < W; px += 64) { x.beginPath(); x.arc(px, py, 5, 0, Math.PI * 2); x.fill(); }

    const card = (cx, cy, cw, ch, fill, r) => {
        r = r || 44;
        x.fillStyle = "#1B1340"; x.beginPath(); x.roundRect(cx + 14, cy + 14, cw, ch, r); x.fill();
        x.fillStyle = fill; x.beginPath(); x.roundRect(cx, cy, cw, ch, r); x.fill();
        x.lineWidth = 8; x.strokeStyle = "#1B1340"; x.beginPath(); x.roundRect(cx, cy, cw, ch, r); x.stroke();
    };

    x.textAlign = "center"; x.fillStyle = "#5B3DF5";
    x.font = "800 104px 'Bricolage Grotesque', system-ui, sans-serif";
    x.fillText("Swype", W / 2, 300);
    x.fillStyle = "#1B1340";
    x.font = "600 34px 'Plus Jakarta Sans', system-ui, sans-serif";
    x.fillText("3 jurusan terdekat dengan kebiasaanku", W / 2, 372);

    const top = ranking.filter(r => r.raw > 0).slice(0, 3);
    const heroY = 440, heroH = 560;
    card(PAD, heroY, W - PAD * 2, heroH, "#FFFFFF");
    x.textAlign = "left"; x.fillStyle = "#1B1340";
    x.font = "600 32px 'Plus Jakarta Sans', system-ui, sans-serif";
    x.fillText("PALING DEKAT", PAD + 56, heroY + 96);
    x.fillStyle = "#5B3DF5";
    x.font = "800 88px 'Bricolage Grotesque', system-ui, sans-serif";
    let y = heroY + 220;
    wrapText(x, top[0].major, W - PAD * 2 - 112).forEach(line => { x.fillText(line, PAD + 56, y); y += 100; });
    x.fillStyle = "#1B1340";
    x.font = "800 68px 'Bricolage Grotesque', system-ui, sans-serif";
    x.fillText(top[0].percent + "% cocok", PAD + 56, heroY + heroH - 70);

    const chipW = (W - PAD * 2 - 40) / 3, chipY = heroY + heroH + 60;
    top.forEach((r, i) => {
        const cx = PAD + i * (chipW + 20);
        card(cx, chipY, chipW, 260, i === 0 ? "#FFE8A3" : "#FFFFFF", 32);
        x.textAlign = "center"; x.fillStyle = "#1B1340";
        x.font = "800 60px 'Bricolage Grotesque', system-ui, sans-serif";
        x.fillText(r.percent + "%", cx + chipW / 2, chipY + 112);
        x.font = "600 30px 'Plus Jakarta Sans', system-ui, sans-serif";
        let cy = chipY + 164;
        wrapText(x, r.major, chipW - 40).slice(0, 2).forEach(line => { x.fillText(line, cx + chipW / 2, cy); cy += 38; });
    });

    const nama = ($("nama").value || "").trim();
    x.textAlign = "center"; x.fillStyle = "#1B1340";
    if (nama) { x.font = "700 40px 'Bricolage Grotesque', system-ui, sans-serif"; x.fillText("Untuk " + nama, W / 2, H - 240); }
    x.font = "600 36px 'Plus Jakarta Sans', system-ui, sans-serif";
    x.fillText("Temukan jurusan dari kebiasaanmu", W / 2, H - 170);
    x.fillStyle = "#5B3DF5";
    x.font = "700 34px 'Plus Jakarta Sans', system-ui, sans-serif";
    x.fillText(location.host || "Swype", W / 2, H - 110);
}

// ================== MULAI ==================
parseShareHash();
initGame();