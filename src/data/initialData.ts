import { Product, Category, SiteSettings } from "@/types";

export const initialCategories: Category[] = [
  {
    id: "basbousa",
    name: "بسبوسيات",
    slug: "basbousa",
    description: "تشكيلة البسبوسة الملكية بالسمن البلدي والقشطة الطازجة",
    image: "/images/basbousa.jpg",
  },
  {
    id: "kunafa",
    name: "كنافيات",
    slug: "kunafa",
    description: "كنافة مبرومة ومحشية مقرمشة بمذاق شرقي ساحر",
    image: "/images/kunafa.jpg",
  },
  {
    id: "oriental",
    name: "حلويات شرقية",
    slug: "oriental",
    description: "رموش الست، بسيمة، فولية، وجوزية بأعلى معايير الإتقان",
    image: "/images/rosh-el-sett.jpg",
  },
  {
    id: "pastry-rolls",
    name: "أصابع وجلاش",
    slug: "pastry-rolls",
    description: "صباعات ذهبية وتستيف مربعات بطبقات مقرمشة وهشة",
    image: "/images/sabaat.jpg",
  },
  {
    id: "assortments",
    name: "تشكيلات ونواشف",
    slug: "assortments",
    description: "أشكال النجوم والتشكيلات الفاخرة لضيافة استثنائية",
    image: "/images/items/nojoom.png",
  },
  {
    id: "other-sweets",
    name: "أصناف أخرى",
    slug: "other-sweets",
    description: "تشكيلة البسكويت، الكعك، والبتفور الفاخر المجهز بعناية",
    image: "/images/items/petits_fours.png",
  },
];

export const initialProducts: Product[] = [
  {
    id: "basbousa",
    name: "بسبوسة كلاسيكية",
    category: "basbousa",
    price: 45,
    pricePerKilo: 45,
    pricePerBox: 80,
    unit: "كغم / صندوق",
    description:
      "بسبوسة ذهبية هشة محضرة على الطريقة التقليدية بأجود أنواع السمن البلدي والشيرة النقية المتوازنة.",
    image: "/images/basbousa.jpg",
    isFeatured: true,
    isAvailable: true,
    tags: ["أكثر طلباً", "تقليدي", "سمن بلدي"],
    options: [
      {
        name: "الحجم / الوزن",
        choices: ["طبق نصف كيلو", "طبق كيلو", "طبق كيلو ونصف"],
      },
    ],
  },
  {
    id: "basbousa-qeshta",
    name: "بسبوسة قشطة",
    category: "basbousa",
    price: 55,
    pricePerKilo: 55,
    pricePerBox: 95,
    unit: "كغم / صندوق",
    description:
      "طبقات من البسبوسة الذهبية تتوسطها قشطة طازجة غنية وناعمة، تمنحك توازناً ممتعاً بين الحلاوة والنعومة.",
    image: "/images/basbousa-qeshta.jpg",
    isFeatured: true,
    isAvailable: true,
    tags: ["مميز", "محشو بالقشطة"],
    options: [
      {
        name: "الحجم / الوزن",
        choices: ["طبق نصف كيلو", "طبق كيلو", "طبق ضيافة عائلي"],
      },
    ],
  },
  {
    id: "kunafa",
    name: "كنافة مبرومة",
    category: "kunafa",
    price: 60,
    pricePerKilo: 60,
    pricePerBox: 110,
    unit: "كغم / صندوق",
    description:
      "كنافة رول مقرمشة ومحمرة بدرجة ذهبية مثالية، متبلة بالسمن الفاخر ومحشية بعناية لمحبي القرمشة الشرقية.",
    image: "/images/kunafa.jpg",
    isFeatured: true,
    isAvailable: true,
    tags: ["مقرمش", "ضيافة فاخرة"],
    options: [
      {
        name: "الحجم / الوزن",
        choices: ["طبق نصف كيلو", "طبق كيلو"],
      },
    ],
  },
  {
    id: "rosh-el-sett",
    name: "رموش الست",
    category: "oriental",
    price: 50,
    pricePerKilo: 50,
    pricePerBox: 90,
    unit: "كغم / صندوق",
    description:
      "حلوى رموش الست الشهية التي تذوب في الفم، مخبوزة حتى اللون الذهبي المتألق ومشبعة بالشيرة الخفيفة.",
    image: "/images/rosh-el-sett.jpg",
    isFeatured: true,
    isAvailable: true,
    tags: ["كلاسيك", "الأكثر مبيعاً"],
    options: [
      {
        name: "الحجم / الوزن",
        choices: ["طبق نصف كيلو", "طبق كيلو"],
      },
    ],
  },
  {
    id: "sabaat",
    name: "صباعات جلاش مقرمشة",
    category: "pastry-rolls",
    price: 50,
    unit: "طبق / كغم",
    description:
      "أصابع حلوى ذهبية رقيقة محشية ومقرمشة، مرصوصة بأناقة وتعتبر الخيار الأمثل لتقديم الضيافة مع القهوة العربية.",
    image: "/images/sabaat.jpg",
    isFeatured: true,
    isAvailable: true,
    tags: ["خفيف", "مع القهوة"],
    options: [
      {
        name: "الحجم / الوزن",
        choices: ["طبق نصف كيلو", "طبق كيلو"],
      },
    ],
  },
  {
    id: "baseema",
    name: "بسيمة جوز الهند",
    category: "oriental",
    price: 48,
    unit: "طبق / كغم",
    description:
      "حلوى البسيمة الشرقية الغنية بجوز الهند المحمص والقطر الزكي، قوام متماسك وطعم لا ينسى.",
    image: "/images/baseema.jpg",
    isFeatured: false,
    isAvailable: true,
    tags: ["جوز هند", "أصيل"],
    options: [
      {
        name: "الحجم / الوزن",
        choices: ["طبق نصف كيلو", "طبق كيلو"],
      },
    ],
  },
  {
    id: "basbousa-biscuit",
    name: "بسبوسة بسكوت",
    category: "basbousa",
    price: 52,
    unit: "طبق / كغم",
    description:
      "ابتكار شهي يمزج بين طراوة البسبوسة الشرقية وقرمشة البسكوت الذهبي المحمص لنكهة فريدة ومميزة.",
    image: "/images/basbousa-biscuit.jpg",
    isFeatured: true,
    isAvailable: true,
    tags: ["ابتكار حبات الشهد", "مقرمش وطري"],
    options: [
      {
        name: "الحجم / الوزن",
        choices: ["طبق نصف كيلو", "طبق كيلو"],
      },
    ],
  },
  {
    id: "konka-basbousa",
    name: "كونكا بسبوسة",
    category: "basbousa",
    price: 50,
    unit: "طبق / كغم",
    description:
      "قطع كونكا البسبوسة الصغيرة المتقنة، بحجم لقمة واحدة مثالية لمناسبات الشاي والقهوة والاحتفالات.",
    image: "/images/items/konka_basbousa.png",
    isFeatured: false,
    isAvailable: true,
    tags: ["ميني بايتس", "مناسبات"],
  },
  {
    id: "nojoom-maqlouba",
    name: "نجوم مقلوبة",
    category: "assortments",
    price: 55,
    unit: "طبق / كغم",
    description:
      "تشكيلة نجوم شرقية مقلوبة بحشوات غنية وتزيين هندسي راقٍ يزين صواني الضيافة الراقية.",
    image: "/images/items/nojoom_maqlouba.png",
    isFeatured: false,
    isAvailable: true,
    tags: ["تشكيلة", "ضيافة"],
  },
  {
    id: "jawzia",
    name: "جوزية فاخرة",
    category: "oriental",
    price: 65,
    unit: "طبق / كغم",
    description:
      "حبات الجوزية الهشة المحشوة بخلطة التوفي الغنية والمكسرات المنتقاة بعناية.",
    image: "/images/items/jawzia.png",
    isFeatured: false,
    isAvailable: true,
    tags: ["توفي", "مكسرات"],
  },
  {
    id: "mahshiya-qeshta",
    name: "محشية قشطة",
    category: "oriental",
    price: 58,
    unit: "طبق / كغم",
    description:
      "حلوى شرقية طازجة محشوة بالقشطة البلدية الفاخرة، تقدم باردة ومزينة بالشيرة.",
    image: "/images/items/mahshiya_qeshta.png",
    isFeatured: false,
    isAvailable: true,
    tags: ["قشطة طازجة", "بارد ولذيذ"],
  },
  {
    id: "folia",
    name: "فولية ذهبية",
    category: "oriental",
    price: 45,
    unit: "طبق / كغم",
    description:
      "حلوى الفولية المقرمشة المصنوعة من الفول السوداني المحمص مع العسل والشيرة الذهبية الخفيفة.",
    image: "/images/items/folia.png",
    isFeatured: false,
    isAvailable: true,
    tags: ["نواشف", "مقرمش"],
  },
  {
    id: "tasteef-morabaat",
    name: "تستيف مربعات",
    category: "pastry-rolls",
    price: 55,
    unit: "طبق / كغم",
    description:
      "مربعات الجلاش والبقلاوة الهشة المرصوصة بنظام فني أنيق وطبقات مقرمشة لا تقاوم.",
    image: "/images/items/tasteef_morabaat.png",
    isFeatured: false,
    isAvailable: true,
    tags: ["جلاش", "طبقات مقرمشة"],
  },
  {
    id: "nojoom",
    name: "نجوم ذهبية",
    category: "assortments",
    price: 50,
    unit: "طبق / كغم",
    description:
      "حلوى شرقية بشكل نجوم ذهبية ناعمة ومقرمشة، مبهجة في التقديم وشهية في التذوق.",
    image: "/images/items/nojoom.png",
    isFeatured: false,
    isAvailable: true,
    tags: ["تشكيلات", "أطفال وعائلات"],
  },
  {
    id: "naem-kaak",
    name: "ناعم (كعك)",
    category: "other-sweets",
    price: 45,
    unit: "طبق / علبة",
    description:
      "كعك ناعم هش مغطى بالسكر البودرة الناعم، يذوب في الفم بنكهة تقليدية أصيلة ومحبوبة في كل الأوقات.",
    image: "/images/items/naem_kaak.png",
    isFeatured: true,
    isAvailable: true,
    tags: ["كعك ناعم", "سكر بودرة", "ضيافة الشاي"],
    options: [
      {
        name: "الحجم / العبوة",
        choices: ["علبة وسط", "علبة كبيرة"],
      },
    ],
  },
  {
    id: "petits-fours",
    name: "بتفور",
    category: "other-sweets",
    price: 50,
    unit: "طبق / علبة",
    description:
      "تشكيلة بتفور مشكل متقن الخبز بقوام هش وخفيف، خيار راقٍ للضيافة مع الشاي والقهوة.",
    image: "/images/items/petits_fours.png",
    isFeatured: true,
    isAvailable: true,
    tags: ["بتفور مشكل", "هش وخفيف", "أكثر طلباً"],
    options: [
      {
        name: "الحجم / العبوة",
        choices: ["علبة وسط", "علبة كبيرة"],
      },
    ],
  },
  {
    id: "tea-biscuit",
    name: "بسكويت شاي",
    category: "other-sweets",
    price: 35,
    unit: "عبوة عائلية",
    description:
      "بسكويت شاي مقرمش ومحمص بدرجة ذهبية متميزة، رفيق الجلسات العائلية وكوب الشاي الصباحي والمسائي.",
    image: "/images/items/tea_biscuit.png",
    isFeatured: false,
    isAvailable: true,
    tags: ["مقرمش", "شاي الصباح", "اقتصادي"],
    options: [
      {
        name: "الحجم / العبوة",
        choices: ["عبوة نصف كيلو", "عبوة كيلو"],
      },
    ],
  },
  {
    id: "yansoon",
    name: "يانسون",
    category: "other-sweets",
    price: 40,
    unit: "طبق / علبة",
    description:
      "شابورة وبسكويت اليانسون الذهبي برائحته العطرية الزكية وقرمشته المحبوبة مع المشروبات الساخنة.",
    image: "/images/items/yansoon.png",
    isFeatured: false,
    isAvailable: true,
    tags: ["يانسون أصيل", "مقرمش وعطري", "مع القهوة والشاي"],
    options: [
      {
        name: "الحجم / العبوة",
        choices: ["علبة وسط", "علبة كبيرة"],
      },
    ],
  },
  {
    id: "ghraiba",
    name: "غريبة",
    category: "other-sweets",
    price: 48,
    unit: "طبق / علبة",
    description:
      "حبات الغريبة البيضاء الناعمة المتقنة والمخبوزة بالسمن الفاخر، قوام يذوب بالفم يضفي لمسة كلاسيكية على ضيافتكم.",
    image: "/images/items/ghraiba.png",
    isFeatured: true,
    isAvailable: true,
    tags: ["غريبة كلاسيك", "تذوب بالفم", "ضيافة فاخرة"],
    options: [
      {
        name: "الحجم / العبوة",
        choices: ["علبة وسط", "علبة كبيرة"],
      },
    ],
  },
];

export const initialSiteSettings: SiteSettings = {
  siteName: "حلويات حبات الشهد",
  slogan: "حلاوة التفاصيل... في كل حبة",
  description:
    "من الكنافة والبسبوسة إلى أصنافنا الشرقية المحبوبة، اكتشفوا الحلاوة التي تجمعنا في حلويات حبات الشهد.",
  primaryPhone: "0559978075",
  secondaryPhone: "0545166206",
  primaryWhatsapp: "966559978075",
  secondaryWhatsapp: "966545166206",
  address: "المملكة العربية السعودية",
  mapUrl: "https://maps.google.com/?q=21.4858,39.1925",
  workingHours: "يومياً من 9:00 صباحاً حتى 11:30 مساءً",
  announcement: {
    enabled: true,
    text: "✨ نرحب بكم في حلويات حبات الشهد | مستعدون لتلبية جميع طلبات المناسبات والضيافة الفاخرة | للطلب المباشر تواصلوا معنا عبر واتساب",
    link: "/contact",
  },
  heroEyebrow: "مذاق شرقي يملأ اللحظة حلاوة",
  heroTitle: "أهلاً بكم في حلويات حبات الشهد",
  heroSubtitle: "حلاوة التفاصيل... في كل حبة",
  heroDescription:
    "من الكنافة والبسبوسة إلى أرقى أصنافنا الشرقية المحبوبة، نقدم لكم تشكيلة حبات الشهد المصنوعة بشغف لتضيف لمسة من السعادة إلى ضيافتكم ومناسباتكم.",
  storyTitle: "حكاية حبات الشهد",
  storyContent:
    "تأسست علامة «حلويات حبات الشهد» برؤية واضحة: إحياء أصالة المذاق الشرقي وتقديمه بأسلوب راقٍ يليق بأهل الكرم والضيافة. نؤمن بأن سر التميز يكمن في التفاصيل الصغيرة؛ لذا ننتقي أجود المكونات الطبيعية، ونلتزم بالسمن البلدي الصافي والنكهات المتوارثة، لتقديم حلويات طازجة ومقرمشة تأسر الحواس في كل مناسبة واحتفال.",
};
