// ── Shared project data ─────────────────────────────────────────────────────
// Single source of truth for every project shown across the site. Content
// that reads the same regardless of language (ids, images, location names,
// client names) lives at the top level; everything language-dependent
// (description, brief, approach, quote, scope, materials, role, status)
// lives under `content.en` / `content.id`. Call `localize(project, lang)` to
// get a flat object with both merged — every page does this once and then
// reads the result exactly like a plain Project.
//
// All copy is grounded in Fannisa's real portfolio PDF (locations, clients,
// materials, project descriptions). Where the PDF didn't state a fact (exact
// area, exact date), the field is "—" rather than invented.

import type { Lang } from "../i18n";

export type Category = "Residential" | "Commercial" | "Retail";

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface LocalizedFields {
  description: string;
  brief: [string, string];
  approach: [string, string];
  quote: string;
  scope: string;
  scopeDetail: string;
  material: string;
  role: string;
  status: string;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  category: Category;
  year: string;
  location: string;
  area: string;
  client: string;
  visualization: string;
  quoteAuthor: string;
  heroImage: string;
  cardImage: string;
  gallery: GalleryImage[];
  content: { en: LocalizedFields; id: LocalizedFields };
}

/** Flattens a project's language-neutral fields + one language's copy into a
 *  single object every page can consume like a plain Project. */
export type LocalizedProject = Omit<Project, "content"> & LocalizedFields;

export function localize(project: Project, lang: Lang): LocalizedProject {
  const { content, ...base } = project;
  return { ...base, ...content[lang] };
}

const STUDIO_QUOTE_AUTHOR = "Fannisa Azzuri Rienhardt, Deui.space";
const VIS_CREDIT = "Fannisa Azzuri Rienhardt — SketchUp, V-Ray, Enscape";

export const PROJECTS: Project[] = [
  {
    id: "1",
    slug: "bedroom",
    name: "Bedroom",
    category: "Residential",
    year: "2024",
    location: "Yogyakarta, Indonesia",
    area: "20 m² (4 × 5 m)",
    client: "Mr. L House",
    visualization: VIS_CREDIT,
    quoteAuthor: STUDIO_QUOTE_AUTHOR,
    heroImage: "/images/bedroom-01-hero.png",
    cardImage: "/images/bedroom-01-hero.png",
    gallery: [
      { src: "/images/bedroom-01-hero.png", alt: "Bedroom — full view, Mr. L House" },
      { src: "/images/bedroom-02.png", alt: "Bedroom — evening light" },
      { src: "/images/bedroom-03.png", alt: "Bedroom — TV wall and natural light" },
      { src: "/images/bedroom-04.png", alt: "Bedroom — LED ambient lighting detail" },
      { src: "/images/bedroom-05.png", alt: "Bedroom — floated oak TV console" },
      { src: "/images/bedroom-06.png", alt: "Bedroom — exposed concrete and parquet floor" },
    ],
    content: {
      en: {
        description: "A modern-industrial bedroom balancing exposed concrete with warm timber tones.",
        brief: [
          "Mr. L House needed a bedroom that read as modern without losing warmth — a room to slow down in, not just sleep in.",
          "At 4 × 5 m, the plan was compact enough that every material choice had to work twice as hard: structural texture and everyday comfort.",
        ],
        approach: [
          "The design pairs exposed concrete walls and a textured wood ceiling with a dark wood parquet floor, giving the room an industrial backbone softened by natural grain.",
          "Layered lighting — warm LED strip ambient light, rattan pendant task lighting, and a floated oak-toned TV console — keeps the mood warm against the raw concrete, while a large window lets natural daylight do most of the work.",
        ],
        quote: "Exposed concrete and warm timber, balanced until a bold room still feels calm.",
        scope: "Interior Design + Material Selection",
        scopeDetail: "Interior design, material selection, lighting layout",
        material: "Exposed concrete, textured wood ceiling, dark wood parquet floor",
        role: "Freelance — Deui.space",
        status: "Completed",
      },
      id: {
        description: "Kamar tidur modern-industrial yang memadukan beton ekspos dengan kehangatan kayu.",
        brief: [
          "Mr. L House ingin kamar tidur yang terasa modern tanpa kehilangan kehangatan — ruang untuk melepas penat, bukan sekadar tidur.",
          "Dengan luas 4 × 5 m, setiap pilihan material harus bekerja maksimal: memberi karakter struktural sekaligus kenyamanan sehari-hari.",
        ],
        approach: [
          "Desain memadukan dinding beton ekspos dan plafon kayu bertekstur dengan lantai parket kayu gelap, menghasilkan karakter industrial yang dilunakkan oleh serat kayu alami.",
          "Pencahayaan berlapis — LED strip ambient yang hangat, lampu gantung rotan sebagai task lighting, dan rak TV floated beraksen oak — menjaga suasana tetap hangat meski berhadapan dengan beton mentah, sementara jendela besar memaksimalkan cahaya alami.",
        ],
        quote: "Beton ekspos dan kayu hangat, diseimbangkan hingga ruangan yang tegas tetap terasa tenang.",
        scope: "Desain Interior + Pemilihan Material",
        scopeDetail: "Desain interior, pemilihan material, tata pencahayaan",
        material: "Beton ekspos, plafon kayu bertekstur, lantai parket kayu gelap",
        role: "Freelance — Deui.space",
        status: "Selesai",
      },
    },
  },
  {
    id: "2",
    slug: "living-kitchen",
    name: "Living & Kitchen",
    category: "Residential",
    year: "2024",
    location: "Solo, Indonesia",
    area: "—",
    client: "Ibu Julia (Mrs. J)",
    visualization: VIS_CREDIT,
    quoteAuthor: STUDIO_QUOTE_AUTHOR,
    heroImage: "/images/livingkitchen-01-hero.png",
    cardImage: "/images/livingkitchen-01-hero.png",
    gallery: [
      { src: "/images/livingkitchen-01-hero.png", alt: "Living & Kitchen — full view, Ibu Julia residence" },
      { src: "/images/livingkitchen-02.png", alt: "Moodboard concept" },
      { src: "/images/livingkitchen-03.png", alt: "Dining area with marble-top table" },
      { src: "/images/livingkitchen-04.png", alt: "Living and dining, garden view" },
      { src: "/images/livingkitchen-05.png", alt: "Dining area, staircase view" },
      { src: "/images/livingkitchen-06.png", alt: "Living room and kitchen island" },
      { src: "/images/livingkitchen-07.png", alt: "Kitchen counter detail" },
      { src: "/images/livingkitchen-08.png", alt: "Double-height living room" },
      { src: "/images/livingkitchen-09.png", alt: "Kitchen island, marble countertop" },
      { src: "/images/livingkitchen-10.png", alt: "Kitchen wall, wood cabinetry" },
      { src: "/images/livingkitchen-11.png", alt: "Additional view 1" },
      { src: "/images/livingkitchen-12.png", alt: "Additional view 2" },
      { src: "/images/livingkitchen-13.png", alt: "Additional view 3" },
      { src: "/images/livingkitchen-14.png", alt: "Additional view 4" },
      { src: "/images/livingkitchen-15.png", alt: "Additional view 5" },
    ],
    content: {
      en: {
        description: "An open-plan living, dining, and kitchen space built around a modern-tropical, Bali-inspired concept.",
        brief: [
          "Mrs. J wanted her living, dining, and kitchen areas to work as one open, uninterrupted space — designed around modern contemporary living with a tropical, Bali-inspired calm.",
          "The brief called for a family home that still felt elegant enough for guests, with a strong visual connection to its garden.",
        ],
        approach: [
          "Neutral tones and natural materials tie the open living–dining–pantry sequence together, with accents of wood, marble, and rattan adding warmth and texture throughout — summed up in the project's own concept line: \"a seamless blend of modern living and tropical calmness.\"",
          "A narrow garden void along the corridor brings light and greenery into the plan — bright and energetic by day, and warmed by chandeliers, downlights, and rattan pendant lamps for a calmer, more intimate mood at night.",
        ],
        quote: "A seamless blend of modern living and tropical calmness.",
        scope: "Interior Design + Space Planning",
        scopeDetail: "Interior design, space planning, kitchen layout, material selection",
        material: "Marble-look & ceramic tile, wood wall panel, PVC flooring, rattan accents",
        role: "Freelance — Deui.space",
        status: "Completed",
      },
      id: {
        description: "Ruang living, dining, dan kitchen yang menyatu dengan konsep modern kontemporer bernuansa tropis Bali.",
        brief: [
          "Mrs. J menginginkan area living, dining, dan kitchen yang menyatu sebagai satu ruang terbuka tanpa sekat — mengusung gaya modern contemporary dengan ketenangan tropis ala Bali.",
          "Kebutuhannya adalah rumah yang nyaman untuk keluarga namun tetap elegan untuk menerima tamu, dengan koneksi kuat ke taman.",
        ],
        approach: [
          "Warna-warna netral dan material alami menyatukan alur living–dining–pantry, dengan sentuhan kayu, marmer, dan rotan yang menambah kehangatan dan tekstur — sesuai konsep proyek ini sendiri: \"a seamless blend of modern living and tropical calmness.\"",
          "Void taman sempit di sepanjang lorong menghadirkan cahaya dan hijau ke dalam denah — terbuka dan energik di siang hari, lalu dihangatkan oleh chandelier, downlight, dan lampu gantung rotan untuk suasana yang lebih intim di malam hari.",
        ],
        quote: "Perpaduan mulus antara hunian modern dan ketenangan tropis.",
        scope: "Desain Interior + Perencanaan Ruang",
        scopeDetail: "Desain interior, perencanaan ruang, tata letak dapur, pemilihan material",
        material: "Keramik motif marmer, panel dinding kayu, lantai PVC, aksen rotan",
        role: "Freelance — Deui.space",
        status: "Selesai",
      },
    },
  },
  {
    id: "3",
    slug: "pavilliun",
    name: "Pavilliun",
    category: "Residential",
    year: "2024",
    location: "Banguntapan, Bantul, Yogyakarta",
    area: "—",
    client: "Mr. H",
    visualization: VIS_CREDIT,
    quoteAuthor: STUDIO_QUOTE_AUTHOR,
    heroImage: "/images/pavilliun-01-hero.png",
    cardImage: "/images/pavilliun-01-hero.png",
    gallery: [
      { src: "/images/pavilliun-01-hero.png", alt: "Pavilliun — pool and unit exterior" },
      { src: "/images/pavilliun-02.png", alt: "Bedroom 1" },
      { src: "/images/pavilliun-03.png", alt: "Bedroom 2" },
      { src: "/images/pavilliun-04.png", alt: "Bedroom, patterned rug detail" },
      { src: "/images/pavilliun-05.png", alt: "Bedroom, sliding glass door to pool" },
      { src: "/images/pavilliun-06.png", alt: "Bathroom, vessel sink and mirror" },
      { src: "/images/pavilliun-07.png", alt: "Bathroom, backlit mirror detail" },
      { src: "/images/pavilliun-08.png", alt: "Bathroom, dark stone vanity" },
      { src: "/images/pavilliun-09.png", alt: "Kitchen, compact galley layout" },
      { src: "/images/pavilliun-10.png", alt: "Living room, poolside view" },
      { src: "/images/pavilliun-11.png", alt: "Kitchen, wood cabinetry detail" },
      { src: "/images/pavilliun-12.png", alt: "Living room, TV wall" },
      { src: "/images/pavilliun-13.png", alt: "Additional view" },
    ],
    content: {
      en: {
        description: "A five-unit rental pavilion, each with two bedrooms, a shared lounge, and a private pool.",
        brief: [
          "Mr. H needed five rental pavilion units in Banguntapan, Bantul — each with two bedrooms, a kitchen, a shared gathering space, and access to a pool — built to a single repeatable layout.",
          "The challenge was giving a modest, replicable unit plan a sense of calm and warmth, rather than feeling like a generic rental block.",
        ],
        approach: [
          "Every unit follows the same efficient plan, but details — mirrored cabinetry, warm-toned vanity counters, and layered accent lighting — keep each room feeling considered rather than repetitive.",
          "The pool and its poolside walkway sit at the heart of the unit, with glass sliding doors dissolving the line between the bedroom and the water outside.",
        ],
        quote: "One typical unit, repeated five times, without losing its warmth.",
        scope: "Interior Design + Space Planning",
        scopeDetail: "Interior design, space planning, typical-unit detailing (5 units)",
        material: "Mirror, dark laminate cabinetry, wood-toned countertops, glass sliding doors",
        role: "Internship — Griya Prima Andalan",
        status: "Completed",
      },
      id: {
        description: "Pavilliun sewa 5 unit, masing-masing dengan dua kamar tidur, ruang berkumpul bersama, dan kolam renang pribadi.",
        brief: [
          "Mr. H membutuhkan 5 unit pavilliun sewa di Banguntapan, Bantul — masing-masing dengan dua kamar tidur, dapur, ruang berkumpul, dan akses ke kolam renang — dengan satu tipe denah yang bisa diulang.",
          "Tantangannya adalah membuat denah unit yang sederhana dan bisa direplikasi tetap terasa hangat, bukan seperti blok sewaan pada umumnya.",
        ],
        approach: [
          "Setiap unit mengikuti denah yang sama, namun detail — kabinet bercermin, meja vanity bernuansa hangat, dan pencahayaan aksen berlapis — membuat tiap ruang tetap terasa dipikirkan matang, bukan sekadar diulang.",
          "Kolam renang dan selasarnya menjadi pusat unit, dengan pintu geser kaca yang melebur batas antara kamar tidur dan air di luar.",
        ],
        quote: "Satu tipe unit, diulang lima kali, tanpa kehilangan kehangatannya.",
        scope: "Desain Interior + Perencanaan Ruang",
        scopeDetail: "Desain interior, perencanaan ruang, detailing unit tipikal (5 unit)",
        material: "Cermin, kabinet laminate gelap, countertop bernuansa kayu, pintu geser kaca",
        role: "Magang — Griya Prima Andalan",
        status: "Selesai",
      },
    },
  },
  {
    id: "4",
    slug: "working-room",
    name: "Working Room",
    category: "Residential",
    year: "2024",
    location: "Yogyakarta, Indonesia",
    area: "—",
    client: "Private residential client",
    visualization: VIS_CREDIT,
    quoteAuthor: STUDIO_QUOTE_AUTHOR,
    heroImage: "/images/workingroom-01-hero.jpg",
    cardImage: "/images/workingroom-01-hero.jpg",
    gallery: [
      { src: "/images/workingroom-01-hero.jpg", alt: "Working Room — workstation zone" },
      { src: "/images/workingroom-02.jpg", alt: "Workstation, bookshelf detail" },
      { src: "/images/workingroom-03.jpg", alt: "Family lounge zone" },
      { src: "/images/workingroom-04.jpg", alt: "Family zone, sliding door view" },
      { src: "/images/workingroom-05.jpg", alt: "Workstation, wood paneling detail" },
    ],
    content: {
      en: {
        description: "A home office split into a focused workstation zone and a relaxed family zone.",
        brief: [
          "The brief was a private workspace that stayed genuinely productive without cutting its owner off from the rest of the household.",
          "That meant designing for two different moods in one room: focused solo work, and easy, relaxed time with family.",
        ],
        approach: [
          "The room is split into two zones — a formal, tidy workstation built around a floating wood desk, and a softer family lounge zone for shared downtime.",
          "A round window and warm wood paneling carry through both zones, so the split in function never reads as a split in design.",
        ],
        quote: "A private desk that still stays open to family life.",
        scope: "Interior Design",
        scopeDetail: "Interior design, zoning, custom joinery",
        material: "Wood slat paneling, marble-look flooring",
        role: "Deui.space",
        status: "Completed",
      },
      id: {
        description: "Ruang kerja rumahan yang terbagi menjadi zona kerja fokus dan zona keluarga yang santai.",
        brief: [
          "Kebutuhannya adalah ruang kerja pribadi yang tetap produktif tanpa memutus pemiliknya dari kehidupan rumah tangga.",
          "Artinya, satu ruang harus mengakomodasi dua suasana berbeda: kerja fokus sendirian, dan waktu santai bersama keluarga.",
        ],
        approach: [
          "Ruang dibagi menjadi dua zona — zona kerja (workstation) yang formal dan rapi dengan meja kayu floating, serta zona santai keluarga (family space) yang lebih lembut untuk berkumpul.",
          "Jendela bundar dan panel kayu hangat hadir di kedua zona, sehingga perbedaan fungsi tidak terasa sebagai perbedaan desain.",
        ],
        quote: "Meja kerja pribadi yang tetap terbuka untuk kehidupan keluarga.",
        scope: "Desain Interior",
        scopeDetail: "Desain interior, zonasi, custom joinery",
        material: "Panel kayu berbilah, lantai motif marmer",
        role: "Deui.space",
        status: "Selesai",
      },
    },
  },
  {
    id: "5",
    slug: "service-room",
    name: "Service Room",
    category: "Residential",
    year: "2024",
    location: "Yogyakarta, Indonesia",
    area: "—",
    client: "Private residential client",
    visualization: VIS_CREDIT,
    quoteAuthor: STUDIO_QUOTE_AUTHOR,
    heroImage: "/images/serviceroom-01-hero.jpg",
    cardImage: "/images/serviceroom-01-hero.jpg",
    gallery: [
      { src: "/images/serviceroom-01-hero.jpg", alt: "Service Room — washing and storage area" },
      { src: "/images/serviceroom-02.jpg", alt: "Service Room — seating nook and planter" },
    ],
    content: {
      en: {
        description: "A compact, efficient laundry and utility space for an urban home.",
        brief: [
          "A small utility space still had to carry its weight — handling washing, drying, and a bit of downtime — for an urban home with limited room to spare.",
          "The only real requirement was that it work hard, reliably, without needing the same design attention twice.",
        ],
        approach: [
          "An efficient, no-fuss layout combines a washing machine, drying racks, and a small seating nook under a translucent roof, so the space stays usable in any weather.",
          "Simple materials and compact built-in storage keep the room easy to maintain, while a narrow planter strip keeps it from feeling purely utilitarian.",
        ],
        quote: "Even the room no one shows off deserves a real layout.",
        scope: "Interior Design + Fit-out",
        scopeDetail: "Interior design, material specification",
        material: "Ceramic tile, wood shelving, corrugated roofing",
        role: "Deui.space",
        status: "Completed",
      },
      id: {
        description: "Ruang cuci dan servis yang ringkas dan efisien untuk hunian urban.",
        brief: [
          "Ruang servis yang kecil ini tetap harus bekerja optimal — mencuci, menjemur, dan sedikit bersantai — untuk hunian urban dengan keterbatasan ruang.",
          "Satu-satunya syarat: ruang ini harus bekerja keras dan diandalkan, tanpa perlu perhatian desain berlebih.",
        ],
        approach: [
          "Layout yang efisien dan tanpa basa-basi menggabungkan mesin cuci, rak jemur, dan sudut duduk kecil di bawah atap transparan, sehingga ruang tetap berfungsi dalam cuaca apa pun.",
          "Material sederhana dan storage built-in yang ringkas membuat ruang ini mudah dirawat, sementara jalur tanaman sempit mencegahnya terasa terlalu utilitarian.",
        ],
        quote: "Ruang yang jarang dipamerkan pun tetap pantas mendapat layout yang matang.",
        scope: "Desain Interior + Fit-out",
        scopeDetail: "Desain interior, spesifikasi material",
        material: "Keramik, rak kayu, atap seng gelombang",
        role: "Deui.space",
        status: "Selesai",
      },
    },
  },
  {
    id: "6",
    slug: "lab-house",
    name: "Lab House",
    category: "Commercial",
    year: "2025",
    location: "Seturan & Jalan Kaliurang, Yogyakarta",
    area: "—",
    client: "Lab House (commercial perfume lab & retail)",
    visualization: VIS_CREDIT,
    quoteAuthor: STUDIO_QUOTE_AUTHOR,
    heroImage: "/images/labhouse-01-hero.png",
    cardImage: "/images/labhouse-01-hero.png",
    gallery: [
      { src: "/images/labhouse-01-hero.png", alt: "Lab House — storefront, wide view" },
      { src: "/images/labhouse-02.png", alt: "Fragrance display counter" },
      { src: "/images/labhouse-03.png", alt: "Testing bar, bottle display" },
      { src: "/images/labhouse-04.png", alt: "Display counter, overview" },
      { src: "/images/labhouse-05.png", alt: "Checkout counter detail" },
      { src: "/images/labhouse-06.png", alt: "Fragrance shelving, wide view" },
      { src: "/images/labhouse-07.png", alt: "Testing station, close-up" },
      { src: "/images/labhouse-08.png", alt: "Additional view 1" },
      { src: "/images/labhouse-09.png", alt: "Additional view 2" },
      { src: "/images/labhouse-10.png", alt: "Additional view 3" },
      { src: "/images/labhouse-11.png", alt: "Additional view 4" },
      { src: "/images/labhouse-12.png", alt: "Additional view 5" },
      { src: "/images/labhouse-13.png", alt: "Additional view 6" },
      { src: "/images/labhouse-14.png", alt: "Additional view 7" },
    ],
    content: {
      en: {
        description: "A commercial perfume lab and retail concept across two Yogyakarta branches, blending industrial minimalism with an exclusive product display.",
        brief: [
          "This commercial perfume lab needed a retail interior that felt as exclusive as the fragrances it sells, across two branches in Yogyakarta — Seturan and Jalan Kaliurang.",
          "The brief blended two identities in one space: the precision of a laboratory and the polish of a premium retail counter.",
        ],
        approach: [
          "An industrial-minimalist material palette — steel, stone-look surfaces, and warm walnut cabinetry — is offset by LED strip lighting that puts the fragrance bottles on display like specimens.",
          "Custom counters and cabinetry were detailed down to the centimetre, so every bottle and testing station has its own place in the layout.",
        ],
        quote: "Industrial minimalism, tuned to showcase the ritual of scent.",
        scope: "Interior Design + Visual Merchandising",
        scopeDetail: "Interior design, custom cabinetry detailing, product display design",
        material: "Granite-look stone, walnut HPL, glass, steel framing, LED strip lighting",
        role: "Freelance — Deui.space",
        status: "Completed",
      },
      id: {
        description: "Konsep lab parfum komersil dan retail di dua cabang Yogyakarta, memadukan minimalis industrial dengan tampilan produk yang eksklusif.",
        brief: [
          "Lab parfum komersil ini butuh interior retail yang terasa se-eksklusif parfum yang dijualnya, di dua cabang Yogyakarta — Seturan dan Jalan Kaliurang.",
          "Brief-nya memadukan dua identitas sekaligus: presisi sebuah laboratorium dan kemewahan sebuah counter retail premium.",
        ],
        approach: [
          "Palet material minimalis industrial — besi, permukaan bertekstur batu, dan kabinet walnut hangat — diimbangi lampu LED strip yang menonjolkan botol parfum layaknya spesimen laboratorium.",
          "Counter dan kabinet custom didetail hingga ke sentimeter, sehingga setiap botol dan meja uji punya tempatnya sendiri dalam layout.",
        ],
        quote: "Minimalis industrial, disetel untuk menonjolkan ritual mencium parfum.",
        scope: "Desain Interior + Visual Merchandising",
        scopeDetail: "Desain interior, detailing kabinet custom, desain display produk",
        material: "Batu motif granit, HPL walnut, kaca, rangka besi, lampu LED strip",
        role: "Freelance — Deui.space",
        status: "Selesai",
      },
    },
  },
  {
    id: "7",
    slug: "urban-parfume",
    name: "Urban Parfume",
    category: "Retail",
    year: "2025",
    location: "Selokan Mataram, Yogyakarta",
    area: "—",
    client: "Urban Parfume",
    visualization: VIS_CREDIT,
    quoteAuthor: STUDIO_QUOTE_AUTHOR,
    heroImage: "/images/urbanparfume-01-hero.png",
    cardImage: "/images/urbanparfume-01-hero.png",
    gallery: [
      { src: "/images/urbanparfume-01-hero.png", alt: "Urban Parfume — storefront at dusk" },
      { src: "/images/urbanparfume-02.png", alt: "Display shelving, wide view" },
      { src: "/images/urbanparfume-03.png", alt: "Counter and shelving detail" },
      { src: "/images/urbanparfume-04.png", alt: "Fragrance display wall" },
      { src: "/images/urbanparfume-05.png", alt: "Store interior, entrance view" },
      { src: "/images/urbanparfume-06.png", alt: "Additional view 1" },
      { src: "/images/urbanparfume-07.png", alt: "Additional view 2" },
      { src: "/images/urbanparfume-08.png", alt: "Additional view 3" },
      { src: "/images/urbanparfume-09.png", alt: "Additional view 4" },
      { src: "/images/urbanparfume-10.png", alt: "Additional view 5" },
      { src: "/images/urbanparfume-11.png", alt: "Additional view 6" },
    ],
    content: {
      en: {
        description: "A full industrial-style renovation of an existing perfume store, keeping its urban character.",
        brief: [
          "An existing perfume store on Selokan Mataram, Yogyakarta, needed a full interior renovation without losing the identity its regular customers already knew.",
          "The brief called for an industrial refresh that still read as distinctly \"Urban\" — the store's own name and character.",
        ],
        approach: [
          "A mesh ceiling grid, black steel framing, and warm wood shelving replace the old fit-out with a more industrial, gallery-like display wall for the fragrance bottles.",
          "Integrated LED lighting along the shelving keeps the products the visual focus, while planting along the ceiling softens the otherwise raw material palette.",
        ],
        quote: "A full renovation that went industrial without losing its street-level character.",
        scope: "Interior Renovation + Visual Merchandising",
        scopeDetail: "Interior renovation, display design, lighting design",
        material: "Black steel mesh, wood shelving, LED lighting",
        role: "Freelance — Deui.space",
        status: "Completed",
      },
      id: {
        description: "Renovasi total bergaya industrial untuk toko parfum yang sudah ada, tanpa menghilangkan karakter urban-nya.",
        brief: [
          "Toko parfum yang sudah berjalan di Selokan Mataram, Yogyakarta, membutuhkan renovasi interior total tanpa kehilangan identitas yang sudah dikenal pelanggan tetapnya.",
          "Brief-nya adalah penyegaran bergaya industrial yang tetap terasa \"Urban\" — sesuai nama dan karakter toko itu sendiri.",
        ],
        approach: [
          "Grid plafon mesh, rangka besi hitam, dan rak kayu hangat menggantikan tampilan lama dengan dinding pajang bergaya galeri yang lebih industrial untuk botol-botol parfum.",
          "Lampu LED terintegrasi di sepanjang rak menjaga produk tetap jadi fokus visual, sementara tanaman di plafon melunakkan palet material yang mentah.",
        ],
        quote: "Renovasi total yang beralih industrial tanpa kehilangan karakter jalanannya.",
        scope: "Renovasi Interior + Visual Merchandising",
        scopeDetail: "Renovasi interior, desain display, desain pencahayaan",
        material: "Mesh besi hitam, rak kayu, pencahayaan LED",
        role: "Freelance — Deui.space",
        status: "Selesai",
      },
    },
  },
  {
    id: "8",
    slug: "playworks-pakuwon-mall",
    name: "PlayWorks Pakuwon Mall",
    category: "Retail",
    year: "2025",
    location: "Pakuwon Mall, Surabaya",
    area: "—",
    client: "PlayWorks",
    visualization: VIS_CREDIT,
    quoteAuthor: STUDIO_QUOTE_AUTHOR,
    heroImage: "/images/pakuwon-01-hero.png",
    cardImage: "/images/pakuwon-01-hero.png",
    gallery: [
      { src: "/images/pakuwon-01-hero.png", alt: "PlayWorks Pakuwon Mall — storefront" },
      { src: "/images/pakuwon-02.png", alt: "Brand display wall, wide view" },
      { src: "/images/pakuwon-03.png", alt: "Central island display" },
      { src: "/images/pakuwon-04.png", alt: "Accessory wall, close-up" },
      { src: "/images/pakuwon-05.png", alt: "Store interior, overview" },
      { src: "/images/pakuwon-06.png", alt: "Checkout counter detail" },
      { src: "/images/pakuwon-07.png", alt: "Additional view 1" },
      { src: "/images/pakuwon-08.png", alt: "Additional view 2" },
      { src: "/images/pakuwon-09.png", alt: "Additional view 3" },
      { src: "/images/pakuwon-10.png", alt: "Additional view 4" },
    ],
    content: {
      en: {
        description: "A retail renovation for PlayWorks, an official Indonesian distributor of premium gadget accessories.",
        brief: [
          "PlayWorks — an official Indonesian retailer and distributor of premium gadget accessories and lifestyle products — needed its Pakuwon Mall Surabaya store renovated, covering both standard unit and pop-up island formats.",
          "The store carries certified cases, screen protectors, power banks, chargers, speakers, and earphones from global brands, so the fit-out had to organise everything clearly by brand.",
        ],
        approach: [
          "White display cabinetry and warm wood accents keep the space feeling premium, with dedicated wall bays for partner brands including DKNY, TUMI, GUESS, Karl Lagerfeld, and Skinarma.",
          "A central island and modular counters let the layout flex between everyday retail operation and pop-up POSM activations.",
        ],
        quote: "Everyday gadget accessories, displayed with the polish of a flagship boutique.",
        scope: "Interior Design + Visual Merchandising",
        scopeDetail: "Interior design, visual merchandising, fixture layout",
        material: "White display cabinetry, oak-toned wood accents",
        role: "Freelance — Deui.space",
        status: "Completed",
      },
      id: {
        description: "Renovasi retail untuk PlayWorks, distributor resmi aksesori gadget premium di Indonesia.",
        brief: [
          "PlayWorks — retail dan distributor resmi aksesori gadget dan gaya hidup premium di Indonesia — membutuhkan renovasi store di Pakuwon Mall Surabaya, mencakup format unit standar maupun island pop-up.",
          "Toko ini menjual casing, pelindung layar, powerbank, charger, speaker, dan earphone bersertifikat resmi dari merek global, sehingga fit-out harus mengelompokkan semuanya dengan jelas per brand.",
        ],
        approach: [
          "Kabinet display putih dan aksen kayu hangat menjaga kesan premium, dengan area dinding khusus untuk tiap brand mitra seperti DKNY, TUMI, GUESS, Karl Lagerfeld, dan Skinarma.",
          "Island tengah dan counter modular membuat layout fleksibel antara operasional retail sehari-hari dan aktivasi POSM pop-up.",
        ],
        quote: "Aksesori gadget sehari-hari, ditampilkan seistimewa butik flagship.",
        scope: "Desain Interior + Visual Merchandising",
        scopeDetail: "Desain interior, visual merchandising, tata letak fixture",
        material: "Kabinet display putih, aksen kayu oak",
        role: "Freelance — Deui.space",
        status: "Selesai",
      },
    },
  },
  {
    id: "9",
    slug: "playworks-galaxy-mall",
    name: "PlayWorks Galaxy Mall",
    category: "Retail",
    year: "2025",
    location: "Galaxy Mall, Surabaya",
    area: "—",
    client: "PlayWorks",
    visualization: VIS_CREDIT,
    quoteAuthor: STUDIO_QUOTE_AUTHOR,
    heroImage: "/images/galaxy-01-hero.jpg",
    cardImage: "/images/galaxy-01-hero.jpg",
    gallery: [
      { src: "/images/galaxy-01-hero.jpg", alt: "PlayWorks Galaxy Mall — open display, wide view" },
      { src: "/images/galaxy-02.jpg", alt: "Modular fixtures, overview" },
      { src: "/images/galaxy-03.jpg", alt: "Brand signage detail" },
      { src: "/images/galaxy-04.jpg", alt: "Accessory display, close-up" },
      { src: "/images/galaxy-05.jpg", alt: "Store interior, entrance view" },
    ],
    content: {
      en: {
        description: "A modern minimalist retail fit-out with a fully open, modular display system.",
        brief: [
          "For the Galaxy Mall Surabaya location, PlayWorks wanted a modern minimalist retail design built around a fully open display system.",
          "Every product category — smartwatches, headphones, power banks, phone cases, chargers, and other accessories — needed to be visible and easy to browse from the moment a customer walked in.",
        ],
        approach: [
          "Modular fixtures organise each product category clearly, while brand signage sits at strategic points to reinforce identity without cluttering the space.",
          "A dark timber-slat ceiling and warm lighting give the open floor plan a more boutique, less big-box feel.",
        ],
        quote: "An open layout where every product category stays legible at a glance.",
        scope: "Interior Design + Visual Merchandising",
        scopeDetail: "Interior design, visual merchandising, modular fixture design",
        material: "Dark timber slat ceiling, modular display fixtures",
        role: "Freelance — Deui.space",
        status: "Completed",
      },
      id: {
        description: "Desain retail modern minimalis dengan sistem display terbuka yang sepenuhnya modular.",
        brief: [
          "Untuk lokasi Galaxy Mall Surabaya, PlayWorks menginginkan desain retail modern minimalis dengan sistem display yang sepenuhnya terbuka.",
          "Setiap kategori produk — smartwatch, headphone, powerbank, phone case, charger, dan aksesori lain — harus terlihat jelas dan mudah dijelajahi begitu pelanggan masuk.",
        ],
        approach: [
          "Fixture modular mengelompokkan tiap kategori produk secara jelas, sementara branding ditempatkan di titik-titik strategis untuk memperkuat identitas tanpa membuat ruang terasa penuh.",
          "Plafon kayu gelap berbilah dan pencahayaan hangat memberi kesan lebih butik pada denah terbuka ini, tidak seperti toko besar pada umumnya.",
        ],
        quote: "Layout terbuka di mana setiap kategori produk tetap mudah terbaca sekilas pandang.",
        scope: "Desain Interior + Visual Merchandising",
        scopeDetail: "Desain interior, visual merchandising, desain fixture modular",
        material: "Plafon kayu berbilah gelap, fixture display modular",
        role: "Freelance — Deui.space",
        status: "Selesai",
      },
    },
  },
  {
    id: "10",
    slug: "posm-playworks",
    name: "POSM PlayWorks",
    category: "Retail",
    year: "2025",
    location: "Surabaya, Indonesia",
    area: "Varies",
    client: "PlayWorks",
    visualization: VIS_CREDIT,
    quoteAuthor: STUDIO_QUOTE_AUTHOR,
    heroImage: "/images/posm-01-hero.png",
    cardImage: "/images/posm-01-hero.png",
    gallery: [
      { src: "/images/posm-01-hero.png", alt: "POSM PlayWorks — headphone and power bank display" },
      { src: "/images/posm-02.png", alt: "POSM unit, accessory display" },
      { src: "/images/posm-03.png", alt: "POSM unit, GUESS collaboration display" },
      { src: "/images/posm-04.png", alt: "POSM unit, product line-up" },
      { src: "/images/posm-05.png", alt: "Additional view 1" },
      { src: "/images/posm-06.png", alt: "Additional view 2" },
      { src: "/images/posm-07.png", alt: "Additional view 3" },
    ],
    content: {
      en: {
        description: "Modular point-of-sale display fixtures designed for PlayWorks' Surabaya stores.",
        brief: [
          "Alongside the store renovations, PlayWorks needed point-of-sale display material (POSM) — modular fixtures for showcasing specific products and promotions inside its stores.",
          "Each unit needed to present a small group of related products clearly, without extra hardware or a permanent install.",
        ],
        approach: [
          "Compact tiered stands and headphone / power bank display units were designed to drop into existing store layouts for a specific product push or promotion.",
          "Consistent materials and typography tie the POSM units back to the same visual language as the full PlayWorks store fit-outs.",
        ],
        quote: "Point-of-sale displays designed to sell the product, not distract from it.",
        scope: "Visual Merchandising + POSM Design",
        scopeDetail: "POSM design, fixture layout for retail rollout",
        material: "Wood and acrylic display fixtures",
        role: "Freelance — Deui.space",
        status: "Completed",
      },
      id: {
        description: "Fixture display point-of-sale modular yang dirancang untuk toko-toko PlayWorks di Surabaya.",
        brief: [
          "Selain renovasi toko, PlayWorks membutuhkan point-of-sale display material (POSM) — fixture modular untuk menampilkan produk atau promosi tertentu di dalam tokonya.",
          "Setiap unit harus menampilkan sekelompok kecil produk terkait secara jelas, tanpa perangkat tambahan atau instalasi permanen.",
        ],
        approach: [
          "Stand bertingkat yang ringkas serta unit display headphone/powerbank dirancang agar bisa dipasang langsung ke layout toko yang sudah ada demi mendukung promosi atau produk tertentu.",
          "Material dan tipografi yang konsisten menyatukan unit POSM ini dengan bahasa visual yang sama seperti keseluruhan fit-out toko PlayWorks.",
        ],
        quote: "Display point-of-sale yang dirancang untuk menjual produk, bukan mengalihkan perhatian darinya.",
        scope: "Visual Merchandising + Desain POSM",
        scopeDetail: "Desain POSM, tata letak fixture untuk rollout retail",
        material: "Fixture display kayu dan akrilik",
        role: "Freelance — Deui.space",
        status: "Selesai",
      },
    },
  },
  {
    id: "11",
    slug: "apartemen",
    name: "Apartemen",
    category: "Residential",
    year: "2026",
    location: "Indonesia",
    area: "—",
    client: "Private Client",
    visualization: VIS_CREDIT,
    quoteAuthor: STUDIO_QUOTE_AUTHOR,
    heroImage: "/images/apartemen/Enscape_2026-02-08-19-14-54_1.png",
    cardImage: "/images/apartemen/Enscape_2026-02-08-19-14-54_1.png",
    gallery: [
      { src: "/images/apartemen/Enscape_2026-02-08-19-14-54_1.png", alt: "Apartemen — view 1" },
      { src: "/images/apartemen/Enscape_2026-02-08-19-14-54_2.png", alt: "Apartemen — view 2" },
      { src: "/images/apartemen/Enscape_2026-02-08-19-14-54_3.png", alt: "Apartemen — view 3" },
      { src: "/images/apartemen/Enscape_2026-02-08-19-14-54_4.png", alt: "Apartemen — view 4" },
      { src: "/images/apartemen/Enscape_2026-02-08-19-14-54_5.png", alt: "Apartemen — view 5" },
      { src: "/images/apartemen/Enscape_2026-02-08-19-14-54_6.png", alt: "Apartemen — view 6" },
      { src: "/images/apartemen/Enscape_2026-02-08-19-14-54_7.png", alt: "Apartemen — view 7" },
      { src: "/images/apartemen/Enscape_2026-02-08-19-14-54_8.png", alt: "Apartemen — view 8" },
      { src: "/images/apartemen/Enscape_2026-02-08-19-14-54_9.png", alt: "Apartemen — view 9" },
      { src: "/images/apartemen/Enscape_2026-02-08-19-14-54_10.png", alt: "Apartemen — view 10" },
      { src: "/images/apartemen/Enscape_2026-02-08-19-14-54_11.png", alt: "Apartemen — view 11" },
      { src: "/images/apartemen/Enscape_2026-02-08-19-14-54_12.png", alt: "Apartemen — view 12" },
      { src: "/images/apartemen/br 1 rev.png", alt: "Apartemen — bedroom 1" },
      { src: "/images/apartemen/br 2.png", alt: "Apartemen — bedroom 2" },
      { src: "/images/apartemen/22.png", alt: "Apartemen — extra view 1" },
      { src: "/images/apartemen/33.png", alt: "Apartemen — extra view 2" },
    ],
    content: {
      en: {
        description: "A modern apartment interior design.",
        brief: [
          "The client wanted a comfortable and modern apartment space.",
          "The challenge was to maximize the use of available space while keeping an elegant look.",
        ],
        approach: [
          "Used neutral colors with warm lighting to create a cozy atmosphere.",
          "Integrated space-saving furniture and clean lines for a modern feel.",
        ],
        quote: "A perfect blend of comfort and modern aesthetics.",
        scope: "Interior Design",
        scopeDetail: "Interior design, space planning, 3D visualization",
        material: "Wood, fabric, ambient lighting",
        role: "Deui.space",
        status: "Completed",
      },
      id: {
        description: "Desain interior apartemen bergaya modern.",
        brief: [
          "Klien menginginkan ruang apartemen yang nyaman dan modern.",
          "Tantangannya adalah memaksimalkan penggunaan ruang yang ada namun tetap terlihat elegan.",
        ],
        approach: [
          "Menggunakan warna-warna netral dengan pencahayaan hangat untuk menciptakan suasana yang nyaman.",
          "Mengintegrasikan furnitur hemat ruang dan garis-garis bersih untuk nuansa modern.",
        ],
        quote: "Perpaduan sempurna antara kenyamanan dan estetika modern.",
        scope: "Desain Interior",
        scopeDetail: "Desain interior, perencanaan ruang, visualisasi 3D",
        material: "Kayu, kain, pencahayaan ambient",
        role: "Deui.space",
        status: "Selesai",
      },
    },
  },
];

export const getProjectById = (id: string): Project | undefined =>
  PROJECTS.find((p) => p.id === id);

export const getProjectBySlug = (slug: string): Project | undefined =>
  PROJECTS.find((p) => p.slug === slug);

export const getNextProject = (currentId: string): Project => {
  const idx = PROJECTS.findIndex((p) => p.id === currentId);
  return PROJECTS[(idx + 1) % PROJECTS.length];
};

export const CATEGORIES: ("All" | Category)[] = ["All", "Residential", "Commercial", "Retail"];
export const YEARS: string[] = ["All", "2024", "2025", "2026"];
