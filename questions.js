// DATA JURUSAN: deskripsi + roadmap (+ videoLink opsional; kalau kosong, otomatis cari di YouTube)
const majorData = {
    "Teknik Informatika": {
        description: "Jurusan ini cocok buat kamu yang suka problem-solving dengan teknologi. Kamu akan belajar ngoding, logika algoritma, sampai membangun aplikasi masa depan!",
        videoLink: "https://www.youtube.com/results?search_query=kuliah+teknik+informatika",
        roadmap: [
            { year: "Tahun 1", detail: "Fokus pada Algoritma, Dasar Pemrograman (C++/Python), dan Logika Diskrit." },
            { year: "Tahun 2", detail: "Mulai bikin proyek! Belajar Struktur Data, Basis Data (SQL), dan Pemrograman Web." },
            { year: "Tahun 3", detail: "Pilih spesialisasi: AI, Cybersecurity, Jaringan, atau Mobile App Developer." },
            { year: "Tahun 4", detail: "Magang di Startup/Tech Company dan membuat aplikasi untuk Skripsi." }
        ]
    },
    "Hukum": {
        description: "Cocok untuk kamu yang kritis dan peduli pada keadilan. Kamu akan belajar sistem peradilan, hukum perdata/pidana, dan cara menjadi negosiator andal.",
        videoLink: "https://www.youtube.com/results?search_query=kuliah+jurusan+hukum",
        roadmap: [
            { year: "Tahun 1", detail: "Pengantar Ilmu Hukum, Hukum Tata Negara, dan Dasar Hukum Perdata/Pidana." },
            { year: "Tahun 2", detail: "Pendalaman Hukum Bisnis, Hukum Internasional, dan Hukum Adat." },
            { year: "Tahun 3", detail: "Praktek Peradilan Semu (Moot Court) dan negosiasi kontrak hukum." },
            { year: "Tahun 4", detail: "Magang di Firma Hukum, Pengadilan, atau Kejaksaan, lalu Skripsi." }
        ]
    },
    "Psikologi": {
        description: "Ilmu yang mempelajari pikiran dan perilaku manusia. Kamu akan belajar memahami kepribadian, klinis, industri, hingga perkembangan anak.",
        videoLink: "https://www.youtube.com/results?search_query=kuliah+jurusan+psikologi",
        roadmap: [
            { year: "Tahun 1", detail: "Biopsikologi, Filsafat, dan Dasar-dasar Perilaku Manusia." },
            { year: "Tahun 2", detail: "Psikologi Kepribadian, Psikologi Sosial, dan Psikologi Perkembangan." },
            { year: "Tahun 3", detail: "Mulai praktek tes psikologi, observasi, dan wawancara klinis/industri." },
            { year: "Tahun 4", detail: "Magang di HRD Perusahaan atau Rumah Sakit Jiwa, dan Riset Eksperimen." }
        ]
    },
    "Kedokteran": {
        description: "Jurusan mulia dengan komitmen tinggi. Kamu akan belajar seluruh anatomi manusia, diagnosis penyakit, dan cara pengobatan medis.",
        videoLink: "https://www.youtube.com/results?search_query=kuliah+kedokteran",
        roadmap: [
            { year: "Tahun 1-2", detail: "Fase Pre-Klinik: Belajar Anatomi dasar (Cadaver), Fisiologi, dan Biokimia." },
            { year: "Tahun 3-4", detail: "Sistem Organ tubuh, Patologi (penyakit), dan Farmakologi (obat-obatan)." },
            { year: "Tahun 5-6", detail: "Co-ass (Kepaniteraan Klinik) langsung menangani pasien di Rumah Sakit." },
            { year: "Tahun 7", detail: "Ujian Kompetensi (UKMPPD) dan sumpah dokter." }
        ]
    },
    "Ilmu Komunikasi": {
        description: "Bukan sekadar 'belajar ngobrol'. Kamu akan mendalami Public Relations, Jurnalistik, Broadcasting, dan Strategi Komunikasi Digital.",
        videoLink: "https://www.youtube.com/results?search_query=kuliah+ilmu+komunikasi",
        roadmap: [
            { year: "Tahun 1", detail: "Pengantar Komunikasi, Teori Komunikasi Massa, dan Sosiologi." },
            { year: "Tahun 2", detail: "Belajar Public Speaking, Penulisan Berita, dan Komunikasi Visual." },
            { year: "Tahun 3", detail: "Fokus ke Jurnalistik, Public Relations, atau Broadcasting. Bikin TV/Radio kampus." },
            { year: "Tahun 4", detail: "Magang di stasiun TV, media massa, atau PR Agency." }
        ]
    },
    "Desain Komunikasi Visual (DKV)": {
        description: "Tempatnya anak kreatif! Kamu akan diajarkan cara menyampaikan pesan melalui elemen visual, ilustrasi, desain, dan media interaktif.",
        videoLink: "https://www.youtube.com/results?search_query=bedah+jurusan+dkv",
        roadmap: [
            { year: "Tahun 1", detail: "Nirmana (Dasar Desain manual), Tipografi, dan Gambar Bentuk." },
            { year: "Tahun 2", detail: "Mulai digital: Desain Logo (Branding), Fotografi, dan Videografi." },
            { year: "Tahun 3", detail: "Fokus Animasi 3D, UI/UX, atau Periklanan. Ngerjain proyek agency buatan." },
            { year: "Tahun 4", detail: "Menyusun Portofolio profesional, pameran karya besar, dan Tugas Akhir." }
        ]
    },
};
// Fungsi bantu untuk menambah jurusan dengan ringkas
function addMajor(name, description, steps) {
    majorData[name] = {
        description,
        roadmap: steps.map((detail, i) => ({ year: "Tahun " + (i + 1), detail }))
    };
}

addMajor("Akuntansi", "Belajar mencatat, menganalisis, dan memeriksa keuangan, dari usaha kecil sampai perusahaan besar. Cocok untuk yang teliti dan nyaman dengan angka.", [
    "Akuntansi Dasar, Ekonomi Mikro/Makro, dan Matematika Bisnis.",
    "Akuntansi Biaya, Perpajakan, dan Sistem Informasi Akuntansi.",
    "Auditing, Akuntansi Keuangan Lanjutan, dan Analisis Laporan Keuangan.",
    "Magang di kantor akuntan atau perusahaan, lalu skripsi."]);
addMajor("Teknik Sipil", "Merancang dan membangun jalan, jembatan, gedung, dan bendungan. Cocok untuk yang suka hitungan dan ingin melihat hasil nyata di lapangan.", [
    "Kalkulus, Fisika, Mekanika Teknik, dan Menggambar Teknik.",
    "Mekanika Tanah, Struktur Beton dan Baja, serta Hidrolika.",
    "Rekayasa Transportasi, Manajemen Konstruksi, dan Analisis Struktur.",
    "Kerja praktik di proyek konstruksi dan tugas akhir perancangan."]);
addMajor("Farmasi", "Mempelajari obat dari bahan, pembuatan, sampai penggunaannya yang aman. Cocok untuk yang teliti dan suka kimia serta biologi.", [
    "Kimia Dasar, Biologi, Anatomi, dan Fisiologi.",
    "Kimia Organik, Farmakologi, dan Farmasetika.",
    "Teknologi Sediaan Obat, Farmasi Klinik, dan Analisis Obat.",
    "Skripsi, lalu program profesi Apoteker dengan praktik di apotek dan rumah sakit."]);
addMajor("Pendidikan Guru", "Belajar merancang pembelajaran, mengelola kelas, dan mendampingi tumbuh kembang siswa. Cocok untuk yang sabar dan senang menjelaskan.", [
    "Pengantar Pendidikan, Psikologi Pendidikan, dan Perkembangan Peserta Didik.",
    "Strategi Pembelajaran, Kurikulum, dan Media Pembelajaran.",
    "Penilaian Pembelajaran, Pendidikan Inklusif, dan Microteaching.",
    "Praktik Mengajar di sekolah (PPL) dan skripsi."]);
addMajor("Hubungan Internasional", "Mempelajari hubungan antarnegara, diplomasi, ekonomi global, dan isu dunia. Cocok untuk yang suka berita dunia, bahasa asing, dan budaya.", [
    "Pengantar Hubungan Internasional, Teori HI, dan Bahasa Asing.",
    "Diplomasi, Hukum Internasional, dan Ekonomi Politik Internasional.",
    "Studi Kawasan, Keamanan Internasional, dan Negosiasi.",
    "Magang di kementerian, organisasi internasional, atau LSM, lalu skripsi."]);
addMajor("Teknik Mesin", "Merancang, membuat, dan merawat mesin, dari kendaraan sampai pembangkit energi. Cocok untuk yang suka mengutak-atik benda yang bergerak.", [
    "Kalkulus, Fisika, Menggambar Teknik, dan Material Teknik.",
    "Termodinamika, Mekanika Fluida, dan Elemen Mesin.",
    "Proses Manufaktur, Perpindahan Panas, dan Sistem Kontrol.",
    "Kerja praktik di industri dan tugas akhir perancangan mesin."]);
addMajor("Administrasi Bisnis", "Belajar mengelola organisasi dan usaha: pemasaran, SDM, operasional, dan strategi. Cocok untuk yang suka memimpin dan mengatur orang.", [
    "Pengantar Bisnis, Ekonomi, dan Manajemen Dasar.",
    "Pemasaran, Manajemen SDM, dan Perilaku Organisasi.",
    "Manajemen Operasi, Kewirausahaan, dan Bisnis Digital.",
    "Magang di perusahaan atau merintis usaha sendiri, lalu skripsi."]);
addMajor("Biologi", "Mempelajari makhluk hidup dari sel sampai ekosistem. Cocok untuk yang penasaran dengan alam dan suka riset di lab atau lapangan.", [
    "Biologi Sel, Kimia Dasar, dan Keanekaragaman Hayati.",
    "Genetika, Mikrobiologi, dan Fisiologi Makhluk Hidup.",
    "Ekologi, Bioteknologi, dan Metode Penelitian.",
    "Penelitian lab atau lapangan untuk skripsi."]);
addMajor("Teknik Kimia", "Mengubah bahan mentah menjadi produk bernilai, seperti bahan bakar, plastik, dan makanan, dengan proses yang efisien dan aman.", [
    "Kimia Dasar, Kalkulus, dan Neraca Massa dan Energi.",
    "Termodinamika, Mekanika Fluida, dan Perpindahan Panas.",
    "Operasi Teknik Kimia, Reaktor, dan Pengendalian Proses.",
    "Kerja praktik di pabrik dan tugas akhir perancangan pabrik."]);
addMajor("Arsitektur", "Merancang bangunan dan ruang yang indah, fungsional, dan nyaman. Cocok untuk yang suka menggambar sekaligus berpikir teknis.", [
    "Dasar Perancangan, Menggambar Arsitektur, dan Sejarah Arsitektur.",
    "Studio Perancangan, Struktur Bangunan, dan Pemodelan Digital.",
    "Perancangan Kota, Bangunan Berkelanjutan, dan Studio Lanjut.",
    "Magang di biro arsitek dan tugas akhir perancangan."]);
addMajor("Teknik Lingkungan", "Menjaga lingkungan lewat pengolahan air, limbah, dan udara. Cocok untuk yang peduli bumi dan ingin solusi teknis.", [
    "Kimia, Biologi, Fisika Lingkungan, dan Matematika Teknik.",
    "Pengolahan Air Bersih, Limbah Cair, dan Mikrobiologi Lingkungan.",
    "Pengelolaan Sampah, Pencemaran Udara, dan AMDAL.",
    "Kerja praktik di instansi atau industri dan tugas akhir."]);
addMajor("Teknik Elektro", "Mempelajari listrik, elektronika, sensor, dan sistem kendali. Cocok untuk yang penasaran cara kerja alat elektronik dan robot.", [
    "Kalkulus, Fisika, Rangkaian Listrik, dan Pemrograman Dasar.",
    "Elektronika, Sistem Digital, dan Sinyal dan Sistem.",
    "Mikrokontroler, Sistem Kendali, dan Sistem Tenaga Listrik.",
    "Kerja praktik dan proyek akhir, misalnya robot atau perangkat IoT."]);
addMajor("Seni Rupa", "Mengembangkan karya seni, seperti lukis, patung, grafis, dan keramik, dengan gaya pribadi. Cocok untuk yang berani bereksperimen.", [
    "Dasar Seni Rupa, Menggambar, dan Sejarah Seni.",
    "Teknik Lukis, Patung, dan Seni Grafis.",
    "Eksplorasi Media, Kuratorial, dan Pengembangan Gaya Pribadi.",
    "Menyusun portofolio, pameran tugas akhir, dan karya skripsi."]);

// INFO JALUR MASUK (berlaku umum — cek selalu sumber resmi kampus tujuan)
// shortcut: teks generik satu untuk semua prodi; upgrade kalau mau info per-prodi (syarat nilai / passing grade).
const jalurInfo = "Tiga pintu masuk: SNBP (dari nilai rapor), SNBT/UTBK (dari tes tulis), dan jalur mandiri kampus. Tiap prodi punya syarat beda, jadi pantau laman pendaftaran kampus tujuanmu.";

// Jurusan yang umumnya lebih pas diambil dari jalur IPA/Saintek (bukan larangan, hanya catatan).
["Teknik Informatika", "Kedokteran", "Farmasi", "Biologi", "Teknik Kimia",
    "Teknik Sipil", "Teknik Mesin", "Arsitektur", "Teknik Lingkungan", "Teknik Elektro"]
    .forEach(m => { if (majorData[m]) majorData[m].butuhIpa = true; });

// Kode singkat jurusan, dipakai di kartu supaya tidak mengetik nama panjang
const K = {
    TI: "Teknik Informatika", HK: "Hukum", PS: "Psikologi", KD: "Kedokteran",
    KM: "Ilmu Komunikasi", DKV: "Desain Komunikasi Visual (DKV)", AK: "Akuntansi",
    SP: "Teknik Sipil", FR: "Farmasi", PG: "Pendidikan Guru", HI: "Hubungan Internasional",
    ME: "Teknik Mesin", AB: "Administrasi Bisnis", BI: "Biologi", KI: "Teknik Kimia",
    AR: "Arsitektur", LI: "Teknik Lingkungan", EL: "Teknik Elektro", SR: "Seni Rupa"
};

// TRAIT: 5 dimensi minat untuk radar chart. Kode singkat biar kartu tetap ringkas.
const TR = { L: "Logika", K: "Kreativitas", S: "Sosial", A: "Alam", B: "Bisnis" };

// SURVIVAL KIT: 3 tips (agak) nyata per jurusan, tampil di halaman hasil.
const survivalTips = {
    "Teknik Informatika": ["Biasakan ngopi, atau minimal tahu cara bikin indomie.", "StackOverflow dan dokumentasi itu teman, bukan contekan.", "Baca pesan error sampai habis, jangan langsung rerun."],
    "Hukum": ["Hafal pasal penting, tapi tidur cukup lebih penting.", "Latihan ngomong di depan cermin sebelum moot court.", "Belajar baca cepat: bacaanmu setebal bantal."],
    "Psikologi": ["Jangan mendiagnosis temanmu sendiri. Serius.", "Belajar mendengar tanpa buru-buru menasihati.", "Kalau masuk untuk 'menyembuhkan diri', terapi beneran tetap perlu."],
    "Kedokteran": ["Jaga makan dan tidur, bukan cuma jaga IPK.", "Kuliah 7 tahun itu maraton, bukan sprint.", "Hafal anatomi lebih cepat pakai gambar dan warna."],
    "Ilmu Komunikasi": ["Latihan ngomong depan kamera, bukan cuma depan chat.", "Baca berita, bukan cuma caption.", "Jaringan penting, tapi tidur juga."],
    "Desain Komunikasi Visual (DKV)": ["Kritik itu santapan, bukan serangan pribadi.", "Simpan file dengan nama yang jelas. Kamu akan menyesal kalau tidak.", "Portofolio lebih berbicara daripada nilai."],
    "Akuntansi": ["Teliti itu bisa dilatih, bukan bakat.", "Excel lebih berguna dari yang kamu duga.", "Debit kiri, kredit kanan, lalu semuanya masuk akal."],
    "Teknik Sipil": ["Siap kotor dan ke lapangan, bukan cuma menggambar di laptop.", "Fisika dan kalkulus jangan dimusuhi.", "Keselamatan nomor satu, bahkan di tugas kuliah."],
    "Farmasi": ["Kimia organik akan menguji kesabaranmu. Bernapaslah.", "Teliti soal dosis, santai soal teman.", "Belajar nama obat generik, bukan cuma merek."],
    "Pendidikan Guru": ["Kelas selalu lebih hidup dari modul; siapkan energi cadangan.", "Sabar itu bagian dari kurikulum.", "Suara lantang dan telinga yang mendengar sama pentingnya."],
    "Hubungan Internasional": ["Bahasa asing itu pintu, bukan sekadar nilai ujian.", "Ikuti berita dunia walau sedang malas.", "Lapang dada pada perbedaan adalah skill utama."],
    "Teknik Mesin": ["Kotor dan berminyak itu tanda kamu benar-benar praktik.", "Jangan takut bongkar pasang.", "Gambar teknik harus rapi: garisnya, bukan cuma niatnya."],
    "Administrasi Bisnis": ["Kerja tim wajib; belajar bagi tugas dari sekarang.", "Presentasi lebih meyakinkan kalau pakai data, bukan tebakan.", "Mimpi bisnis boleh besar, modal awal boleh kecil."],
    "Biologi": ["Cuci tangan sebelum ke lab itu pasangan sempurna.", "Catat pengamatan langsung, jangan andalkan ingatan.", "Kesabaran menunggu kultur juga bagian belajar."],
    "Teknik Kimia": ["Gunakan pelindung mata. Aman dan tetap keren.", "Pahami alur neraca massa, jangan hafal angkanya.", "Keselamatan, kesabaran, ketelitian: urutannya penting."],
    "Arsitektur": ["Begadang itu ritme studio. Siapkan pakaian bersih.", "Desain bagus butuh alasan, bukan cuma estetika.", "Simpan file sebelum membangun apa pun."],
    "Teknik Lingkungan": ["Percaya data pengukuran, walau sering bikin kesal.", "Peduli sampah sejak kuliah, bukan cuma di slogan.", "Lapangan kadang lebih berdebu dari ruang kelas."],
    "Teknik Elektro": ["Hati-hati listrik sungguhan, bukan cuma simulasi.", "Solder itu teman; rapikan jalurnya.", "Salah rangkaian itu biasa, baca ulang skematiknya."],
    "Seni Rupa": ["Karya tidak harus sempurna untuk berharga.", "Simpan sketsa jelek: itu bukti kamu berkembang.", "Kritik bikin tumbuh; jangan berlebihan pada diri sendiri."]
};

// KARTU: tiap aktivitas memberi poin ke 1-3 jurusan (angka = bobot, 1 atau 2).
// Aturan: tiap jurusan sebaiknya muncul di minimal 3 kartu.
const cards = [
    { e: "🔧", t: "Membongkar gadget atau barang elektronik rusak", p: { TI: 1, EL: 2, ME: 1 }, tr: { L: 2, K: 1 } },
    { e: "💻", t: "Ngulik bikin web, game, atau aplikasi sederhana", p: { TI: 2 }, tr: { L: 2, K: 1 } },
    { e: "🧩", t: "Suka teka-teki logika dan hitung-hitungan", p: { TI: 1, AK: 1, EL: 1, SP: 1 }, tr: { L: 2, B: 1 } },
    { e: "🗣️", t: "Berdebat dengan argumen yang logis", p: { HK: 2, HI: 1, KM: 1 }, tr: { S: 2, L: 1 } },
    { e: "⚖️", t: "Geram lihat ketidakadilan di berita dan ingin ikut membela", p: { HK: 2, HI: 1 }, tr: { S: 2, L: 1 } },
    { e: "📜", t: "Membaca aturan, pasal, atau perjanjian sampai detail", p: { HK: 2, AK: 1 }, tr: { L: 2, B: 1 } },
    { e: "👂", t: "Sering jadi tempat curhat teman-teman", p: { PS: 2, PG: 1 }, tr: { S: 2 } },
    { e: "🧠", t: "Penasaran kenapa orang bisa punya fobia atau trauma", p: { PS: 2, KD: 1 }, tr: { L: 1, S: 1, A: 1 } },
    { e: "🩺", t: "Tertarik cara kerja tubuh manusia dan penyakit", p: { KD: 2, FR: 1, BI: 1 }, tr: { A: 2, L: 1, S: 1 } },
    { e: "🏥", t: "Rela belajar bertahun-tahun supaya bisa menolong orang sakit", p: { KD: 2, FR: 1 }, tr: { S: 2, A: 1, L: 1 } },
    { e: "🎬", t: "Bikin konten video atau jadi MC dan moderator acara", p: { KM: 2, DKV: 1 }, tr: { K: 2, S: 1, B: 1 } },
    { e: "✍️", t: "Merangkai kata, nulis caption atau artikel", p: { KM: 2, HI: 1 }, tr: { K: 2, S: 1 } },
    { e: "✏️", t: "Menggambar, doodle, atau bikin animasi pendek", p: { DKV: 1, SR: 2 }, tr: { K: 2 } },
    { e: "📱", t: "Menata feed Instagram dan mendesain poster", p: { DKV: 2, SR: 1 }, tr: { K: 2, S: 1, B: 1 } },
    { e: "🖌️", t: "Melukis, memahat, atau bikin karya seni dengan tangan", p: { SR: 2, AR: 1 }, tr: { K: 2 } },
    { e: "🧾", t: "Mencatat uang jajan dan mengecek ke mana larinya", p: { AK: 2, AB: 1 }, tr: { B: 2, L: 1 } },
    { e: "🛍️", t: "Jualan online dan menghitung untung ruginya", p: { AB: 2, AK: 1 }, tr: { B: 2, L: 1, K: 1 } },
    { e: "📣", t: "Jadi ketua panitia: mengatur tim dan anggaran", p: { AB: 2, HI: 1, PG: 1 }, tr: { S: 2, B: 2 } },
    { e: "🧑‍🏫", t: "Menjelaskan pelajaran ke teman sampai mereka paham", p: { PG: 2, PS: 1 }, tr: { S: 2, L: 1 } },
    { e: "🧒", t: "Senang mengajari atau mendampingi adik-adik", p: { PG: 2, PS: 1 }, tr: { S: 2 } },
    { e: "🌍", t: "Mengikuti berita negara lain, budaya, dan bahasa asing", p: { HI: 2, KM: 1 }, tr: { S: 2 } },
    { e: "🌿", t: "Mengamati tumbuhan, hewan, atau serangga", p: { BI: 2, LI: 1 }, tr: { A: 2, L: 1 } },
    { e: "🔬", t: "Eksperimen di lab: mencampur, mengukur, mencatat hasil", p: { KI: 2, FR: 1, BI: 1 }, tr: { A: 2, L: 2 } },
    { e: "🧪", t: "Penasaran bagaimana bahan jadi plastik, sabun, atau bahan bakar", p: { KI: 2, FR: 1 }, tr: { A: 1, L: 2, B: 1 } },
    { e: "💊", t: "Tertarik mengenal obat dan cara kerjanya", p: { FR: 2, KD: 1, KI: 1 }, tr: { A: 1, L: 1, S: 1 } },
    { e: "🌉", t: "Memperhatikan bangunan, jembatan, dan jalan", p: { SP: 2, AR: 1 }, tr: { L: 2, K: 1 } },
    { e: "🏠", t: "Menggambar denah rumah impian", p: { AR: 2, SP: 1, SR: 1 }, tr: { K: 2, L: 1 } },
    { e: "🌊", t: "Ingin tahu cara membangun yang tahan gempa dan banjir", p: { SP: 2, LI: 1 }, tr: { L: 2, K: 1, A: 1 } },
    { e: "♻️", t: "Peduli sampah, polusi, dan kualitas air", p: { LI: 2, BI: 1, KI: 1 }, tr: { A: 2, S: 1, L: 1 } },
    { e: "⚡", t: "Penasaran cara kerja listrik, robot, dan sensor", p: { EL: 2, TI: 1, ME: 1 }, tr: { L: 2, K: 1 } },
    { e: "🏍️", t: "Mengutak-atik mesin motor atau sepeda", p: { ME: 2, EL: 1 }, tr: { L: 2, K: 1 } }
];

// Ubah kode singkat (TI, HK, ...) menjadi nama jurusan lengkap
cards.forEach((c, i) => {
    c.id = i; c.text = c.t; c.emoji = c.e; c.points = {}; c.traits = {};
    for (const k in c.p) {
        if (!K[k]) console.warn("Kode jurusan salah:", k);
        else c.points[K[k]] = c.p[k];
    }
    for (const t in c.tr) {
        if (!TR[t]) console.warn("Kode trait salah:", t);
        else c.traits[TR[t]] = c.tr[t];
    }
});