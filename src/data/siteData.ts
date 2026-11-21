export type GalleryCategory =
  | 'all'
  | 'living'
  | 'kitchen'
  | 'bedrooms'
  | 'bath'
  | 'details';

export interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  title: string;
  category: Exclude<GalleryCategory, 'all'>;
  featured?: boolean;
}

export interface ServiceItem {
  num: string;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  bottom: string;
  highlighted?: boolean;
}

export interface ProcessStep {
  num: string;
  title: string;
  description: string;
  tag: string;
}

export interface Credential {
  title: string;
  subtitle: string;
  accent: string;
}

export interface BeforeAfterCase {
  id: string;
  title: string;
  subtitle: string;
  beforeSrc: string;
  beforeAlt: string;
  afterSrc: string;
  afterAlt: string;
}

export const NAV_LINKS = [
  { href: '#top', label: 'בית' },
  { href: '#about', label: 'אודות' },
  { href: '#services', label: 'שירותים' },
  { href: '#portfolio', label: 'פרויקטים' },
  { href: '#process', label: 'תהליך העבודה' },
  { href: '#recommendations', label: 'המלצות' },
];

export const VALUE_ITEMS = [
  {
    num: '01',
    title: 'תכנון חכם ומדויק',
    subtitle: 'הבסיס לבית שנכון לכם באמת',
  },
  {
    num: '02',
    title: 'ראייה אדריכלית־הנדסית',
    subtitle: 'חיבור בין תכנון, מערכות ועיצוב',
  },
  {
    num: '03',
    title: 'ליווי אישי',
    subtitle: 'מהרעיון ועד הפרטים הקטנים',
  },
];

export const SERVICES: ServiceItem[] = [
  {
    num: '01',
    title: 'ייעוץ ותכנון ממוקד',
    subtitle: 'דיוק מהיר וחכם לחלל',
    description:
      'מפגש אישי בבית, עם חשיבה יצירתית ומעשית, כדי לדייק חלל אחד או שניים ולצאת עם כיוון ברור שאפשר להתקדם איתו.',
    bullets: [
      'הבנת הצרכים והאתגרים בחלל',
      'העמדת ריהוט, צבעים וחומרים',
      'המלצות לפריטים ורשימת חנויות וספקים רלוונטיים',
    ],
    bottom: 'פתרון ממוקד, אישי ונגיש',
  },
  {
    num: '02',
    title: 'תכנון ועיצוב פנים',
    subtitle: 'סט תכניות מלא לביצוע',
    description:
      'תכנון מקצועי ומפורט לקראת שיפוץ או התאמת הבית, עם סט תכניות מסודר שמאפשר לקבלן לעבוד בצורה ברורה.',
    bullets: [
      'תכנית אדריכלית / העמדת חללים',
      'תכניות הריסה, חשמל ואינסטלציה',
      'תכנית מיזוג אוויר והנמכות תקרה',
      'ללא בחירת חומרים, תכנון נגרות בהתאמה אישית או קיר כוח',
      'ללא ליווי בשטח',
    ],
    bottom: 'תכנון מדויק לביצוע מסודר',
  },
  {
    num: '03',
    title: 'ליווי ועיצוב מלא',
    subtitle: 'המסלול המקיף ביותר',
    description:
      'תהליך מקיף שמלווה אתכם לאורך הדרך – מהתכנון הראשוני ועד בחירת החומרים, הפרטים וההחלטות בשטח.',
    bullets: [
      'תכנון מפורט, עיצוב כולל ופרטי נגרות',
      'פגישות, בחירת חומרים וגמרים',
      'עבודה מול ספקים ובעלי מקצוע',
      'ביקורים וליווי באתר לפי היקף הפרויקט',
    ],
    bottom: 'מעטפת שלמה עד הפרט האחרון',
    highlighted: true,
  },
];

export const GALLERY_CATEGORIES: { id: GalleryCategory; label: string }[] = [
  { id: 'all', label: 'כל הפרויקטים' },
  { id: 'living', label: 'סלון ומגורים' },
  { id: 'kitchen', label: 'מטבח' },
  { id: 'bedrooms', label: 'חדרי שינה וילדים' },
  { id: 'bath', label: 'רחצה ונגרות' },
  { id: 'details', label: 'פרטי עיצוב' },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    src: './assets/gallery/01-living-room.webp',
    alt: 'חלל מגורים מעוצב עם ספרייה, פינת ישיבה ושולחן סלון',
    title: 'חלל מגורים וספרייה',
    category: 'living',
    featured: true,
  },
  {
    id: 2,
    src: './assets/gallery/02-display-shelf.webp',
    alt: 'ספריית תצוגה בהתאמה אישית בשילוב עץ, גוונים בהירים ואביזרים',
    title: 'ספריית תצוגה בהתאמה אישית',
    category: 'living',
  },
  {
    id: 3,
    src: './assets/gallery/03-vase-detail.webp',
    alt: 'פרט עיצובי של אגרטל ופרחים על שולחן הסלון',
    title: 'פרט עיצובי בסלון',
    category: 'details',
  },
  {
    id: 4,
    src: './assets/gallery/04-chair-detail-teal.webp',
    alt: 'פרט ריפוד של כורסה עם פס בד בגוון פטרול',
    title: 'ריפוד וטקסטיל בגוון פטרול',
    category: 'details',
  },
  {
    id: 5,
    src: './assets/gallery/05-kitchen.webp',
    alt: 'מטבח בגווני שחור ועץ עם אי וכיסאות בר',
    title: 'מטבח שחור ועץ עם אי',
    category: 'kitchen',
    featured: true,
  },
  {
    id: 6,
    src: './assets/gallery/06-master-bedroom.webp',
    alt: 'חדר שינה בגווני שמנת ופטרול',
    title: 'חדר שינה הורים',
    category: 'bedrooms',
  },
  {
    id: 7,
    src: './assets/gallery/07-wardrobe-niche.webp',
    alt: 'נישת ישיבה ואחסון המשולבת בארון',
    title: 'נישת ישיבה ונגרות בארון',
    category: 'bath',
  },
  {
    id: 8,
    src: './assets/gallery/08-vanity-detail.webp',
    alt: 'פרט של מראה ונגרות באזור ההתארגנות',
    title: 'פרט מראה ונגרות',
    category: 'details',
  },
  {
    id: 9,
    src: './assets/gallery/09-vanity.webp',
    alt: 'אזור התארגנות עם מראה מעוגלת ונגרות עץ',
    title: 'אזור התארגנות ונגרות עץ',
    category: 'bath',
  },
  {
    id: 10,
    src: './assets/gallery/10-bedside.webp',
    alt: 'שידה לצד מיטה בחדר שינה בגווני פטרול ועץ',
    title: 'שידת צד בגווני פטרול ועץ',
    category: 'bedrooms',
  },
  {
    id: 11,
    src: './assets/gallery/11-laundry.webp',
    alt: 'חדר כביסה עם ארונות בגוון כחול ונישת עץ פתוחה',
    title: 'חדר כביסה מתוכנן',
    category: 'bath',
  },
  {
    id: 12,
    src: './assets/gallery/12-girls-room.webp',
    alt: 'חדר בנות בגווני ורוד ושמנת',
    title: 'חדר בנות בגווני ורוד ושמנת',
    category: 'bedrooms',
  },
  {
    id: 13,
    src: './assets/gallery/13-girls-room-detail.webp',
    alt: 'פרטי טקסטיל וכריות בחדר הבנות',
    title: 'טקסטיל וסטיילינג בחדר בנות',
    category: 'details',
  },
  {
    id: 14,
    src: './assets/gallery/14-space-bedroom.webp',
    alt: 'חדר ילדים בנושא חלל עם קיר כחול עמוק',
    title: 'חדר ילדים בנושא חלל',
    category: 'bedrooms',
  },
  {
    id: 15,
    src: './assets/gallery/15-blue-bedroom.webp',
    alt: 'חדר שינה בגווני כחול עם גיטרה תלויה על הקיר',
    title: 'חדר נוער בגווני כחול',
    category: 'bedrooms',
  },
  {
    id: 16,
    src: './assets/gallery/16-chair-detail.webp',
    alt: 'כורסה מרופדת בגוון טבעי עם רגלי עץ',
    title: 'כורסה בגוון טבעי ועץ',
    category: 'details',
  },
  {
    id: 17,
    src: './assets/gallery/17-bathroom-vanity.webp',
    alt: 'חדר רחצה עם ארון כיור שחור, משטח לבן ומראה עגולה',
    title: 'חדר רחצה עם ארון שחור',
    category: 'bath',
  },
  {
    id: 18,
    src: './assets/gallery/18-staircase.webp',
    alt: 'גרם מדרגות עם שלד מתכת שחור ומדרכי עץ',
    title: 'גרם מדרגות מתכת ועץ',
    category: 'living',
  },
  {
    id: 19,
    src: './assets/gallery/19-game-nook.webp',
    alt: 'פינת משחקים עם שולחן כדורגל ומדפי ספרים',
    title: 'פינת משחקים משפחתית',
    category: 'living',
  },
  {
    id: 20,
    src: './assets/gallery/20-shower.webp',
    alt: 'חדר רחצה עם מקלחון זכוכית וחיפוי בגווני אבן ועץ',
    title: 'מקלחון זכוכית בגווני אבן ועץ',
    category: 'bath',
  },
  {
    id: 21,
    src: './assets/gallery/21-family-room-blurred.webp',
    alt: 'פינת קריאה ומשחק משפחתית; תמונות המשפחה ברקע מטושטשות',
    title: 'פינת קריאה ומשחק משפחתית',
    category: 'living',
  },
];

export const BEFORE_AFTER_CASES: BeforeAfterCase[] = [
  {
    id: 'living',
    title: 'חלל המגורים',
    subtitle: 'מאותה נקודת מבט – מהמצב הקיים לחלל מואר, חם ומתוכנן בקפידה',
    beforeSrc: './assets/site/before-living.webp',
    beforeAlt: 'חלל המגורים לפני השיפוץ',
    afterSrc: './assets/site/living-after-same-angle.webp',
    afterAlt: 'חלל המגורים לאחר השיפוץ, מאותה נקודת מבט',
  },
  {
    id: 'kitchen',
    title: 'המטבח',
    subtitle: 'תכנון מחודש שמשלב פונקציונליות, אחסון חכם ושפה עיצובית על־זמנית',
    beforeSrc: './assets/site/before-kitchen.webp',
    beforeAlt: 'המטבח לפני השיפוץ',
    afterSrc: './assets/site/kitchen-wide.webp',
    afterAlt: 'המטבח לאחר השיפוץ והתכנון',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    num: '01',
    title: 'היכרות והקשבה',
    description: 'מגדירים צרכים, סגנון חיים, סדרי עדיפויות ותקציב.',
    tag: 'שלב א׳ · אפיון',
  },
  {
    num: '02',
    title: 'חשיבה ותכנון',
    description: 'בוחנים חלופות, מפתחים פתרון תכנוני ומגבשים שפה עיצובית.',
    tag: 'שלב ב׳ · קונספט',
  },
  {
    num: '03',
    title: 'תכניות ופרטים',
    description: 'מתרגמים את התכנון לתכניות עבודה ולהחלטות ברורות.',
    tag: 'שלב ג׳ · שרטוטים',
  },
  {
    num: '04',
    title: 'ביצוע והשלמה',
    description: 'במסלול הליווי המלא מתקדמים יחד גם בבחירות ובתיאום בשטח.',
    tag: 'שלב ד׳ · הגשמה',
  },
];

export const CREDENTIALS: Credential[] = [
  {
    title: 'תואר ראשון',
    subtitle: 'אדריכלות ובינוי ערים',
    accent: 'B.Arch',
  },
  {
    title: 'תואר שני',
    subtitle: 'הנדסה אזרחית · ניהול פרויקטים',
    accent: 'M.Sc',
  },
  {
    title: '12 שנות הוראה',
    subtitle: 'הרצאה והנחיה בתכנון אדריכלי',
    accent: '12+',
  },
  {
    title: 'למידה מתמשכת',
    subtitle: 'הום סטיילינג, תאורה, חומרים וטכנולוגיות',
    accent: 'Pro',
  },
];

export const CONTACT_INFO = {
  email: 'studio@oritgoldstein.co.il',
  phoneDisplay: '054-918-2661',
  phoneHref: 'tel:+972549182661',
  whatsappHref: 'https://wa.me/972549182661',
  formAction: 'https://formsubmit.co/studio@oritgoldstein.co.il',
};
