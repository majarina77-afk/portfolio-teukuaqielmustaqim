import { ArticleWork, ComparisonShowcaseItem, ServiceItem, WorkCategory } from '../types';

export const AUTHOR_EMAIL = 'halo@teukuaqiel.id';

export const WORK_CATEGORIES: WorkCategory[] = [
  'Semua',
  'Artikel & Esai',
  'Fiksi & Naskah',
  'Penyuntingan',
];

export const PORTFOLIO_WORKS: ArticleWork[] = [
  {
    id: 'arsip-kopi-dan-ingatan-banda-aceh',
    title: 'Di Meja Kedai Kopi: Bagaimana Ruang Bincang Merawat Ingatan Kota',
    subtitle:
      'Menelusuri kembali tradisi kedai kopi di pesisir utara Sumatra sebagai ruang publik informal tempat sejarah lisan, sastra, dan percakapan sehari-hari berjumpa.',
    category: 'Artikel & Esai',
    formatLabel: 'Esai Budaya',
    publication: 'Jurnal Pesisir & Kota',
    year: '2026',
    readTime: '6 menit baca',
    role: 'Penulis Utama',
    excerpt:
      'Sebelum ruang kerja bersama dan aplikasi pesan instan menggantikan jeda percakapan, meja-meja marmer di kedai kopi lama telah lebih dulu menjadi ruang redaksi paling jujur bagi warga kota.',
    featuredQuote:
      'Kota tidak semata-mata diingat lewat monumen betonnya, melainkan lewat percakapan pelan yang bertahan di antara dua cangkir kopi saring.',
    tags: ['Esai Budaya', 'Ruang Publik', 'Sejarah Lisan'],
    sections: [
      {
        paragraphs: [
          'Pukul tujuh pagi di sebuah sudut Peunayong, uap air mendidih naik dari ceret tembaga sebelum jalanan benar-benar ramai oleh kendaraan. Di meja paling dekat jendela, tiga lelaki paruh baya membuka surat kabar cetak dengan ritme yang nyaris seragam: melipat halaman tengah, menyeruput kopi saring, lalu saling melempar komentar pendek tentang harga rempah dan cuaca di selat.',
          'Pemandangan semacam ini kerap dianggap sekadar rutinitas pagi yang nostalgik. Padahal, bila diamati lebih dekat, kedai kopi tradisional bekerja layaknya arsip hidup. Di sanalah kabar kota diuji kebenarannya, silsilah keluarga diceritakan ulang, dan istilah-istilah lama dalam bahasa daerah tetap menemukan penuturnya.',
        ],
      },
      {
        heading: 'Meja Marmer sebagai Ruang Redaksi Warga',
        paragraphs: [
          'Berbeda dengan ruang seminar yang berjarak atau linimasa digital yang menuntut reaksi serba cepat, percakapan di kedai kopi mengizinkan jeda. Seseorang dapat menyampaikan pendapat, diam beberapa menit sambil mengaduk gula, lalu meralat kalimatnya sendiri tanpa merasa kalah debat.',
          'Dalam sejarah pers dan sastra Indonesia, ruang-ruang singgah seperti ini sering kali melahirkan gagasan penting. Banyak penulis esai dan wartawan daerah menguji kerangka tulisannya pertama kali bukan di depan rapat redaksi, melainkan di hadapan kawan duduk yang sudi menyimak dengan sabar.',
        ],
        quote: {
          text: 'Sebuah tulisan yang matang hampir selalu lahir dari kebiasaan mendengar—dan kedai kopi adalah sekolah mendengar yang paling murah hati.',
          attribution: 'Catatan Lapangan, Banda Aceh, 2026',
        },
      },
      {
        heading: 'Menjaga Ritme di Tengah Arus Serba Cepat',
        paragraphs: [
          'Hari ini, generasi baru datang ke kedai kopi membawa laptop dan penyuara telinga. Kehadiran mereka tidak serta-merta menghapus tradisi lama; keduanya justru berdampingan dalam satu atap yang sama. Di satu sisi ruangan, naskah-naskah digital disunting dalam sunyi; di sisi lain, percakapan lintas usia tetap mengalir tanpa agenda resmi.',
          'Barangkali di situlah pelajaran terbesar bagi seorang penulis konten modern: teknologi boleh mempercepat distribusi kata, tetapi kedalaman cerita tetap membutuhkan ruang untuk berhenti sejenak, mengamati gerak tangan penyeduh kopi, dan membiarkan makna mengendap seperti ampas di dasar gelas.',
        ],
      },
    ],
    closingNote:
      'Esai ini pertama kali diterbitkan dalam edisi cetak Jurnal Pesisir & Kota Nomor 14 dan telah melalui penyuntingan ulang untuk arsip portofolio.',
  },
  {
    id: 'senja-di-pelabuhan-kecil',
    title: 'Pelabuhan Sebelum Hujan: Naskah Film Pendek & Studi Adegan',
    subtitle:
      'Cuplikan skenario drama berdurasi 18 menit tentang seorang juru arsip dermaga yang menemukan surat tak terkirim dari tahun 1998 di dalam laci loket lama.',
    category: 'Fiksi & Naskah',
    formatLabel: 'Naskah Film Pendek',
    publication: 'Kolektif Sinema Laut',
    year: '2025',
    readTime: '5 menit baca',
    role: 'Penulis Skenario',
    excerpt:
      'Ketika gedung loket pelabuhan hendak dibongkar menjadi terminal modern, Darma memilih menunda hari terakhir kerjanya demi mengantarkan sepucuk amplop berstempel pudar.',
    featuredQuote:
      'Dialog terbaik dalam film sering kali bukan apa yang diucapkan tokoh, melainkan benda kecil yang ragu mereka letakkan di atas meja.',
    tags: ['Skenario Film', 'Drama', 'Fiksi Naratif'],
    sections: [
      {
        paragraphs: [
          'Naskah "Pelabuhan Sebelum Hujan" ditulis dengan pendekatan minimalis: sedikit dialog eksposisi, mengandalkan lanskap suara pelabuhan, derit engsel besi, dan jeda tatapan antar tokoh. Struktur cerita dibagi ke dalam tiga babak pendek yang seluruhnya berlangsung dalam rentang satu sore sebelum feri terakhir bertolak.',
          'Berikut adalah cuplikan pembuka dari Adegan 4, ketika Darma (54) dan keponakannya, Naira (23), membereskan laci kayu di ruang arsip tiket lama.',
        ],
        scriptExcerpt: {
          title: 'ADEGAN 4 — RUANG ARSIP DERMAGA',
          lines: [
            { type: 'scene', text: 'INT. RUANG LOKET LAMA PELABUHAN — SORE' },
            {
              type: 'action',
              text: 'Hujan tipis mulai mengetuk kaca nako yang berdebu. Lampu neon di langit-langit berkedip sekali sebelum menyala redup. DARMA (54), berkemeja flanel pudar, mengeluarkan tumpukan buku manifest dari laci besi. Di sudut meja, NAIRA (23) menempelkan label kardus dengan lakban cokelat.',
            },
            {
              type: 'action',
              text: 'Sebuah amplop biru muda jatuh dari celah belakang laci. Darma memungutnya, meniup debu di sudut prangko.',
            },
            { type: 'character', text: 'NAIRA' },
            { type: 'dialogue', text: 'Masih ada surat masuk di gedung ini, Pakde? Bukannya loket ini sudah tutup sejak dua tahun lalu?' },
            { type: 'character', text: 'DARMA' },
            { type: 'parenthetical', text: '(membalik amplop pelan, menatap tanggal cap pos)' },
            { type: 'dialogue', text: 'Ini bukan surat masuk. Ini surat yang tidak pernah sempat naik kapal.' },
            {
              type: 'action',
              text: 'Naira berhenti menggunting lakban. Ia mendekat, melirik alamat tujuan yang ditulis dengan tinta biru yang mulai memudar.',
            },
            { type: 'character', text: 'NAIRA' },
            { type: 'dialogue', text: 'Kalau dibiarkan di kotak arsip, besok pagi semua kardus ini dibawa truk gudang.' },
            { type: 'character', text: 'DARMA' },
            { type: 'parenthetical', text: '(memasukkan amplop ke saku kemejanya)' },
            { type: 'dialogue', text: 'Kalau begitu kita jangan tunggu besok. Feri ke seberang baru angkat jangkar setengah enam.' },
          ],
        },
      },
      {
        heading: 'Catatan Dramaturgi & Ritme Dialog',
        paragraphs: [
          'Dalam penulisan naskah layar, kecenderungan terbesar penulis pemula adalah menjelaskan emosi tokoh melalui kalimat panjang. Pada naskah ini, ketegangan emosional dialihkan ke tindakan fisik yang terukur: tangan Darma yang meniup debu, lakban yang terhenti, dan keputusan sederhana memasukkan amplop ke saku dada.',
          'Naskah lengkap proyek ini terpilih dalam kurasi pengembangan cerita pendek layar independen Sumatra 2025 dan memasuki tahap pra-produksi pada awal 2026.',
        ],
      },
    ],
    closingNote:
      'Cuplikan skenario ditampilkan seizin Kolektif Sinema Laut. Naskah lengkap dan treatment tersedia untuk peninjauan profesional atas permintaan.',
  },
  {
    id: 'menyunting-naskah-nonfiksi-sejarah-maritim',
    title: 'Menjaga Suara Penulis: Studi Penyuntingan Buku "Angin Barat di Selat Malaka"',
    subtitle:
      'Bagaimana penyuntingan substantif dan penyelarasan bahasa mengubah draf riset akademik 340 halaman menjadi buku nonfiksi populer yang mengalir dan presisi.',
    category: 'Penyuntingan',
    formatLabel: 'Penyuntingan Buku',
    publication: 'Penerbit Lentera Aksara',
    year: '2026',
    readTime: '5 menit baca',
    role: 'Penyunting Substantif & Bahasa',
    excerpt:
      'Tugas penyunting bukanlah mengganti gaya penulis dengan suaranya sendiri, melainkan menyingkirkan kerumitan kalimat agar gagasan utama bersinar jernih.',
    featuredQuote:
      'Penyuntingan yang berhasil nyaris tak terlihat jejaknya; pembaca hanya merasakan sebuah buku yang entah mengapa begitu nyaman dibaca dari bab pertama hingga penutup.',
    tags: ['Penyuntingan Substantif', 'EYD V', 'Buku Nonfiksi'],
    sections: [
      {
        paragraphs: [
          'Ketika naskah mentah "Angin Barat di Selat Malaka" tiba di meja redaksi, kekayaan risetnya tak diragukan lagi. Penulisnya menghimpun ratusan catatan pelayaran abad ke-19 dan wawancara keturunan nakhoda tradisional. Namun, struktur kalimat yang terlalu panjang dan sarat istilah birokratis membuat pembaca umum cepat kelelahan.',
          'Proses penyuntingan berlangsung selama delapan pekan dalam tiga tahap: penataan alur bab (structural editing), perampingan paragraf tanpa memangkas akurasi data (line editing), serta pembacaan aksara akhir sesuai pedoman EYD Edisi V.',
        ],
      },
      {
        heading: 'Uji Sunting: Memangkas Birokrasi Kalimat',
        paragraphs: [
          'Salah satu tantangan paling umum dalam naskah nonfiksi berbasis riset adalah kalimat pasif bertingkat dan pengulangan frasa keterangan. Berikut adalah salah satu contoh penyelarasan pada Bab 3 mengenai jalur perdagangan rempah.',
        ],
        editorialDiff: {
          label: 'Bab 3 · Jalur Dagang Pesisir (Hal. 84)',
          before: [
            { text: 'Pada dasarnya, ', type: 'removed' },
            { text: 'jalur pelayaran yang digunakan oleh para pedagang tradisional di kawasan Selat Malaka ', type: 'normal' },
            { text: 'merupakan sebuah lintasan yang sangat bergantung terhadap ', type: 'removed' },
            { text: 'perubahan arah angin muson ', type: 'normal' },
            { text: 'yang mana hal tersebut mengakibatkan waktu tempuh perjalanan menjadi tidak selalu dapat dipastikan secara tetap.', type: 'removed' },
          ],
          after: [
            { text: 'Jalur pelayaran pedagang tradisional di Selat Malaka ', type: 'normal' },
            { text: 'sangat bergantung pada ', type: 'added' },
            { text: 'perubahan arah angin muson', type: 'normal' },
            { text: ', sehingga waktu tempuh pelayaran tidak pernah bisa dipastikan secara mutlak.', type: 'added' },
          ],
          editorNote:
            'Menghapus frasa pengisi ("Pada dasarnya", "merupakan sebuah... yang mana"), memperbaiki preposisi baku ("bergantung pada"), serta memadatkan 35 kata menjadi 23 kata tanpa mengurangi bobot informasi.',
        },
      },
      {
        heading: 'Hasil Akhir & Penerimaan Pembaca',
        paragraphs: [
          'Setelah melalui dua putaran diskusi bersama penulis, naskah terbit dengan ketebalan 288 halaman yang jauh lebih ringkas dan bertenaga. Selain mempertahankan ketelitian catatan kaki, setiap pembuka bab kini memiliki jangkar naratif yang langsung membawa pembaca ke dek perahu kayu dan hiruk-pikuk pelabuhan lama.',
          'Cetakan pertama sebanyak 3.000 eksemplar habis terserap dalam empat bulan dan masuk daftar rekomendasi bacaan sejarah populer di beberapa toko buku independen.',
        ],
      },
    ],
    closingNote:
      'Contoh perbandingan kalimat di atas merupakan adaptasi representatif dari lembar kerja penyuntingan dengan persetujuan pihak penerbit.',
  },
  {
    id: 'anatomi-kalimat-jernih-di-era-bising',
    title: 'Anatomi Kalimat Jernih di Tengah Kebisingan Informasi Digital',
    subtitle:
      'Mengapa ekonomi perhatian modern justru menuntut penulis konten untuk kembali pada disiplin dasar: ketepatan diksi, keutuhan argumen, dan kejujuran nada.',
    category: 'Artikel & Esai',
    formatLabel: 'Artikel Editorial',
    publication: 'Majalah Daring Nalar',
    year: '2025',
    readTime: '4 menit baca',
    role: 'Penulis Kolom',
    excerpt:
      'Di tengah banjir artikel seragam yang dikejar tenggat algoritma, tulisan yang bertahan di ingatan pembaca selalu memiliki satu ciri: kalimatnya tidak tergesa-gesa.',
    featuredQuote:
      'Pembaca mungkin mengklik judul karena penasaran, tetapi mereka bertahan sampai paragraf terakhir karena percaya pada ketenangan suara penulisnya.',
    tags: ['Penulisan Konten', 'Strategi Editorial', 'Bahasa'],
    sections: [
      {
        paragraphs: [
          'Setiap hari, jutaan kata diproduksi untuk mengisi ruang layar ponsel kita. Sebagian besar dirancang untuk memancing klik dalam tiga detik pertama: penuh tanda seru, janji instan, dan klaim yang dibesar-besarkan. Ironisnya, semakin keras sebuah teks berteriak, semakin cepat pula pembaca menggulirnya lewat.',
          'Fenomena kelelahan informasi ini membuka kembali peluang besar bagi jurnalisme lambat dan penulisan merek yang bernapas panjang. Pembaca masa kini jauh lebih peka; mereka dapat langsung membedakan mana tulisan yang lahir dari pemahaman mendalam dan mana yang sekadar merangkai kata kunci.',
        ],
      },
      {
        heading: 'Tiga Pilar Kejernihan Editorial',
        paragraphs: [
          'Pertama, kesetiaan pada satu gagasan pokok di tiap paragraf. Ketika satu paragraf mencoba menampung tiga argumen sekaligus, pembaca kehilangan pegangan. Kedua, keberanian memilih kata kerja yang hidup alih-alih menumpuk kata sifat yang kabur.',
          'Ketiga, menghormati kecerdasan pembaca. Penulis tidak perlu menyuapi setiap kesimpulan secara gamblang; memberi ruang bagi pembaca untuk menyambungkan sendiri implikasi dari sebuah fakta justru menciptakan keterlibatan intelektual yang jauh lebih tahan lama.',
        ],
        quote: {
          text: 'Kejernihan bahasa bukanlah penyederhanaan gagasan, melainkan penghormatan tertinggi kepada waktu yang dipinjamkan pembaca kepada kita.',
          attribution: 'Teuku Aqiel — Kolom Redaksi Nalar',
        },
      },
      {
        heading: 'Merawat Kepercayaan Jangka Panjang',
        paragraphs: [
          'Bagi media, penerbit, maupun jenama yang membangun otoritas lewat konten, investasi pada penulisan yang rapi bukan lagi kemewahan estetika. Ia adalah fondasi kepercayaan. Kalimat yang ditulis dengan cermat akan tetap relevan dibaca dua tahun kemudian, jauh setelah tren sesaat berlalu.',
        ],
      },
    ],
    closingNote:
      'Artikel ini menjadi rujukan internal dalam lokakarya penulisan konten editorial bagi tim komunikasi di Jakarta pada akhir 2025.',
  },
  {
    id: 'surat-untuk-penjaga-mercusuar',
    title: 'Catatan Kecil bagi Penjaga Mercusuar Pulau Weh',
    subtitle:
      'Sebuah cerpen tentang surat-menyurat antara seorang penata huruf percetakan tua di kota dan sahabat masa kecilnya yang memilih tinggal menjaga lampu suar di ujung pulau.',
    category: 'Fiksi & Naskah',
    formatLabel: 'Cerita Pendek',
    publication: 'Antologi Sastra Utara',
    year: '2025',
    readTime: '7 menit baca',
    role: 'Pengarang',
    excerpt:
      'Di lantai paling atas menara putih itu, lampu berputar setiap dua belas detik sekali—cukup lama untuk menyusun satu kalimat utuh sebelum gelap kembali menutup laut.',
    featuredQuote:
      'Kita berdua bekerja menjaga tanda baca di tempat berbeda: kau memastikan kapal tidak menabrak karang, aku memastikan kalimat tidak kehilangan jedanya.',
    tags: ['Cerpen', 'Sastra Indonesia', 'Fiksi Sastra'],
    sections: [
      {
        paragraphs: [
          'Sahabatku Karim, bila paket kertas ini tiba bersama perahu perbekalan hari Kamis, jangan dulu kau buka ikatan talinya di dermaga. Angin barat bulan ini terlalu lancang untuk kertas tipis; bawalah naik ke ruang jaga tempat lampu minyakmu dulu sering mati ditiup kabut.',
          'Di kota, percetakan tempatku bekerja akhirnya menjual mesin cetak huruf timah yang terakhir. Orang-orang bilang zaman sudah meminta segala sesuatu tampil lebih cepat dan tanpa noda tinta di ujung jari. Aku tidak membantah. Hanya saja, sore tadi saat lemari aksara itu diangkat keluar, aku menemukan dua huruf "k" yang terjatuh di bawah papan lantai—kecil, berat, dan masih menyimpan bau minyak pelumas tahun sembilan puluhan.',
        ],
      },
      {
        heading: 'Tentang Cahaya yang Tidak Terburu-buru',
        paragraphs: [
          'Aku sering membayangkan bagaimana kau menghabiskan malam ketika musim penghujan turun tiga hari berturut-turut. Dalam suratmu bulan lalu, kau menulis bahwa kesunyian di menara tidak pernah benar-benar sunyi; ada suara ombak yang memukul dinding karang seperti ketukan pintu, dan ada dengung lembut dinamo suar yang menandakan semua masih bekerja sebagaimana mestinya.',
          'Di sini, kebisingan justru sering terasa hampa. Orang berbicara nyaring di setiap sudut jalan, tetapi jarang ada yang benar-benar menunggu jawaban. Barangkali karena itu aku masih terus menulis surat panjang di atas kertas folio bergaris: agar aku ingat bahwa beberapa hal memang layak menunggu perahu hari Kamis.',
        ],
        quote: {
          text: 'Jarak bukan musuh percakapan; ketergesaanlah yang sering membuatnya dangkal.',
          attribution: 'Kutipan Cerpen "Catatan Kecil bagi Penjaga Mercusuar"',
        },
      },
      {
        paragraphs: [
          'Bulan depan, bila cuti tahunanku disetujui, aku berencana menyeberang tanpa membawa kabar apa pun selain sekantong kopi sangrai dan buku catatan kosong. Kita tidak perlu bicara tentang masa lalu yang panjang. Cukup duduk di beranda menara sambil menghitung putaran cahaya yang jatuh di permukaan laut.',
        ],
      },
    ],
    closingNote:
      'Dimuat dalam Antologi Sastra Utara (2025), diterbitkan bersama komunitas pembaca independen Banda Aceh.',
  },
  {
    id: 'penyelarasan-laporan-tahunan-lembaga-budaya',
    title: 'Penyelarasan Bahasa & Uji Aksara: Laporan Tahunan Yayasan Pustaka Nusantara',
    subtitle:
      'Audit kebahasaan menyeluruh atas laporan program tahunan setebal 120 halaman, menyatukan gaya bahasa tujuh kontributor menjadi satu suara kelembagaan yang berwibawa.',
    category: 'Penyuntingan',
    formatLabel: 'Proofreading & Copyediting',
    publication: 'Yayasan Pustaka Nusantara',
    year: '2025',
    readTime: '4 menit baca',
    role: 'Penyunting Bahasa & Pembaca Aksara',
    excerpt:
      'Ketika tujuh divisi menulis bagiannya masing-masing, dokumen lembaga sering terdengar terpecah. Penyelarasan bahasa menyatukan nada tanpa menghapus karakter tiap program.',
    featuredQuote:
      'Konsistensi istilah dan tanda baca adalah wajah paling sunyi dari kredibilitas sebuah institusi.',
    tags: ['Copyediting', 'Proofreading', 'Pedoman Gaya'],
    sections: [
      {
        paragraphs: [
          'Laporan tahunan organisasi kebudayaan memiliki dua pembaca utama yang sama pentingnya: pemangku kepentingan yang mencari ketepatan data, serta publik luas yang ingin merasakan dampak manusiawi dari program literasi di lapangan.',
          'Selain melakukan pembacaan aksara akhir (proofreading) sebelum naik cetak, saya menyusun lembar panduan gaya selingkung (house style guide) ringkas mencakup penulisan angka, singkatan lembaga, cetak miring istilah asing, hingga konsistensi keterangan foto.',
        ],
      },
      {
        heading: 'Contoh Penyelarasan Nada Kelembagaan',
        paragraphs: [
          'Pada draf awal laporan program perpustakaan keliling, narasi cenderung kaku dan terasa seperti berita acara rapat. Penyelarasan dilakukan untuk menghadirkan kalimat aktif yang hangat sekaligus tetap formal.',
        ],
        editorialDiff: {
          label: 'Bagian Program Literasi Daerah (Hal. 42)',
          before: [
            { text: 'Dalam rangka untuk meningkatkan ', type: 'removed' },
            { text: 'minat baca anak-anak di wilayah kepulauan, ', type: 'normal' },
            { text: 'pihak yayasan telah melakukan pendistribusian terhadap ', type: 'removed' },
            { text: 'sebanyak 4.200 buku cerita ', type: 'normal' },
            { text: 'dimana buku-buku tersebut disalurkan ke 18 taman bacaan masyarakat.', type: 'removed' },
          ],
          after: [
            { text: 'Untuk menumbuhkan ', type: 'added' },
            { text: 'minat baca anak-anak di wilayah kepulauan, ', type: 'normal' },
            { text: 'Yayasan menyalurkan ', type: 'added' },
            { text: '4.200 buku cerita ', type: 'normal' },
            { text: 'ke 18 taman bacaan masyarakat sepanjang tahun 2025.', type: 'added' },
          ],
          editorNote:
            'Menghilangkan pleonasme ("dalam rangka untuk"), mengganti konstruksi "dimana" yang tidak baku sebagai kata hubung, serta mengubah frasa nominal panjang ("melakukan pendistribusian terhadap") menjadi kata kerja aktif yang tegas ("menyalurkan").',
        },
      },
      {
        heading: 'Cakupan Pemeriksaan Akhir',
        paragraphs: [
          'Seluruh 120 halaman tata letak cetak diperiksa ulang dalam format bukti cetak digital (galley proof) untuk memastikan tidak ada pemenggalan kata yang keliru, ketidaksesuaian nomor tabel, maupun inkonsistensi ejaan sebelum masuk tahap cetak offset.',
        ],
      },
    ],
    closingNote:
      'Proyek diselesaikan tepat waktu dalam durasi 12 hari kerja termasuk penyusunan panduan gaya selingkung untuk tim komunikasi internal.',
  },
];

export const EDITORIAL_SERVICES: ServiceItem[] = [
  {
    number: '01',
    title: 'Penulisan Artikel & Esai',
    subtitle: 'Editorial, Profil & Konten Panjang',
    description:
      'Penulisan artikel mendalam, esai budaya, laporan fitur, dan konten narasi merek dengan riset yang terverifikasi serta alur bahasa Indonesia yang jernih.',
    deliverables: ['Esai & Kolom Opini', 'Artikel Fitur & Profil', 'Narasi Merek & Jurnal'],
  },
  {
    number: '02',
    title: 'Penulisan Naskah & Fiksi',
    subtitle: 'Skenario, Video Esai & Cerita',
    description:
      'Pengembangan konsep cerita, sinopsis, treatment, hingga skenario utuh untuk film pendek, dokumenter, siniar naratif, dan proyek fiksi sastra.',
    deliverables: ['Skenario Film Pendek', 'Naskah Dokumenter & Siniar', 'Pengembangan Cerita'],
  },
  {
    number: '03',
    title: 'Penyuntingan Substantif & Bahasa',
    subtitle: 'Buku, Jurnal & Laporan Lembaga',
    description:
      'Penataan struktur argumen, perampingan kalimat, dan penyelarasan gaya bahasa tanpa menghilangkan keaslian suara penulis.',
    deliverables: ['Penyuntingan Naskah Buku', 'Penyelarasan Laporan Tahunan', 'Panduan Gaya Selingkung'],
  },
  {
    number: '04',
    title: 'Pembacaan Aksara (Proofreading)',
    subtitle: 'Presisi Akhir Sebelum Terbit',
    description:
      'Pemeriksaan akhir ejaan berdasarkan EYD Edisi V, tanda baca, tipografi, konsistensi istilah, serta uji baca bukti cetak (galley proof).',
    deliverables: ['Uji EYD Edisi V', 'Audit Konsistensi Istilah', 'Pemeriksaan Bukti Cetak'],
  },
];

export const HOMEPAGE_COMPARISON_SAMPLES: ComparisonShowcaseItem[] = [
  {
    id: 'uji-esai',
    category: 'Esai Budaya',
    projectTitle: 'Merampingkan Kalimat Berbelit',
    client: 'Jurnal Kebudayaan Independen',
    before: [
      { text: 'Hal yang perlu untuk diperhatikan adalah bahwa ', type: 'removed' },
      { text: 'arsitektur rumah panggung tradisional ', type: 'normal' },
      { text: 'bukan cuma sekedar bangunan tempat tinggal, melainkan juga merupakan sebuah ', type: 'removed' },
      { text: 'wujud kearifan masyarakat pesisir ', type: 'normal' },
      { text: 'dalam hal merespon perubahan iklim tropis.', type: 'removed' },
    ],
    after: [
      { text: 'Arsitektur rumah panggung tradisional ', type: 'normal' },
      { text: 'bukan sekadar tempat tinggal, melainkan ', type: 'added' },
      { text: 'wujud kearifan masyarakat pesisir ', type: 'normal' },
      { text: 'dalam merespons iklim tropis.', type: 'added' },
    ],
    editorNote:
      'Memangkas pembuka mubazir, memperbaiki bentuk baku ("sekadar", "merespons"), dan menjaga ritme kalimat agar langsung menyentuh inti gagasan.',
  },
  {
    id: 'uji-korporat',
    category: 'Laporan Lembaga',
    projectTitle: 'Mengubah Kalimat Pasif Menjadi Aktif',
    client: 'Laporan Tahunan Institusi',
    before: [
      { text: 'Pelaksanaan program pelatihan penulisan ', type: 'removed' },
      { text: 'telah diikuti oleh sebanyak 140 peserta ', type: 'removed' },
      { text: 'dari berbagai daerah di Sumatra ', type: 'normal' },
      { text: 'yang mana kegiatan tersebut bertujuan agar supaya ', type: 'removed' },
      { text: 'kapasitas literasi lokal dapat mengalami peningkatan.', type: 'removed' },
    ],
    after: [
      { text: 'Sebanyak 140 peserta ', type: 'added' },
      { text: 'dari berbagai daerah di Sumatra ', type: 'normal' },
      { text: 'mengikuti pelatihan penulisan ini untuk memperkuat kapasitas literasi lokal.', type: 'added' },
    ],
    editorNote:
      'Menghilangkan pleonasme ("agar supaya"), menghindari kata hubung "yang mana", serta memindahkan subjek manusia ke awal kalimat agar narasi lebih bernyawa.',
  },
  {
    id: 'uji-naskah',
    category: 'Naskah Narasi',
    projectTitle: 'Mempertajam Citraan & Diksi',
    client: 'Naskah Dokumenter Pendek',
    before: [
      { text: 'Saat matahari mulai turun di sore hari, suasana di pasar ikan menjadi ', type: 'removed' },
      { text: 'sangat sepi dan tenang sekali, ', type: 'removed' },
      { text: 'hanya terdengar suara ombak yang ', type: 'normal' },
      { text: 'berbunyi pelan menghantam perahu-perahu yang sudah berhenti bekerja.', type: 'removed' },
    ],
    after: [
      { text: 'Menjelang senja, hiruk-pikuk pasar ikan perlahan surut; ', type: 'added' },
      { text: 'hanya terdengar suara ombak ', type: 'normal' },
      { text: 'menepuk lambung perahu yang telah tertambat.', type: 'added' },
    ],
    editorNote:
      'Mengganti keterangan bertumpuk ("sangat... sekali") dengan pilihan kata kerja yang lebih konkret ("surut", "menepuk", "tertambat") untuk narasi sulih suara yang puitis.',
  },
];
