export type Lang = 'he' | 'en' | 'es';

export interface SiteTranslations {
  metaTitle: string;
  brandSubtitle: string;
  nav: {
    home: string;
    about: string;
    services: string;
    portfolio: string;
    process: string;
    recommendations: string;
    contactCta: string;
    mobileCta: string;
  };
  hero: {
    kicker: string;
    titleLine1: string;
    titleLine2: string;
    lead: string;
    sub: string;
    ctaPrimary: string;
    ctaSecondary: string;
    footnote: string;
    badgeYears: string;
    floatingQuote: string;
    scrollCue: string;
  };
  marquee: string[];
  valueStrip: { num: string; title: string; subtitle: string }[];
  materialBoard: {
    pillars: { id: string; title: string; desc: string }[];
    eyebrow: string;
    headingLine1: string;
    headingLine2: string;
    desc: string;
    swatches: {
      id: string;
      name: string;
      hex: string;
      note: string;
      textureClass: string;
    }[];
  };
  philosophy: {
    eyebrow: string;
    quoteWords: string[];
    accentFromIndex: number;
    metrics: { target: number; suffix: string; label: string }[];
    p1: string;
    p2: string;
    link: string;
  };
  horizontal: {
    eyebrow: string;
    heading1: string;
    heading2: string;
    cta: string;
    cursorLabel: string;
    scrollPrompt: string;
    slides: { num: string; title: string; subtitle: string; src: string }[];
  };
  services: {
    eyebrow: string;
    heading: string;
    desc: string;
    featuredBadge: string;
    items: {
      num: string;
      title: string;
      subtitle: string;
      description: string;
      bullets: string[];
      bottom: string;
      highlighted?: boolean;
    }[];
    prepurchaseTitle: string;
    prepurchaseDesc: string;
    prepurchaseCta: string;
  };
  portfolio: {
    eyebrow: string;
    heading1: string;
    heading2: string;
    desc: string;
    cta: string;
    cursorLabel: string;
    categories: {
      id: 'all' | 'living' | 'kitchen' | 'bedrooms' | 'bath' | 'details';
      label: string;
    }[];
    items: { id: number; title: string; alt: string }[];
    prev: string;
    next: string;
    close: string;
  };
  beforeAfter: {
    eyebrow: string;
    heading: string;
    desc: string;
    sliderMode: string;
    sideMode: string;
    dragHint: string;
    beforeLabel: string;
    afterLabel: string;
    cases: { id: string; title: string; subtitle: string }[];
  };
  process: {
    eyebrow: string;
    heading: string;
    desc: string;
    steps: { num: string; title: string; description: string; tag: string }[];
  };
  about: {
    eyebrow: string;
    name: string;
    badgeTitle: string;
    badgeSub: string;
    p1: string;
    p2: string;
    p3: string;
    credentials: { title: string; subtitle: string; accent: string }[];
  };
  recommendations: {
    eyebrow: string;
    heading: string;
    desc: string;
    zoomBtn: string;
  };
  contact: {
    eyebrow: string;
    heading1: string;
    heading2: string;
    desc: string;
    emailLabel: string;
    phoneLabel: string;
    callWord: string;
    waSub: string;
    waLabel: string;
    formTitle: string;
    formSub: string;
    selectedTrackPrefix: string;
    successMsg: string;
    nameLabel: string;
    namePh: string;
    phoneFieldLabel: string;
    phonePh: string;
    emailFieldLabel: string;
    messageLabel: string;
    messagePh: string;
    prefillTemplate: (service: string) => string;
    privacy: string;
    submit: string;
  };
  footer: {
    a11yStatement: string;
    copyright: string;
  };
  a11y: {
    skipToContent: string;
    menuTitle: string;
    menuSub: string;
    fontSize: string;
    increaseFont: string;
    decreaseFont: string;
    highContrast: string;
    monochrome: string;
    highlightLinks: string;
    readableFont: string;
    stopAnimations: string;
    largeCursor: string;
    fullStatement: string;
    reset: string;
    statementKicker: string;
    statementTitle: string;
    statementIntro: string;
    statementLevelTitle: string;
    statementLevelBody: string;
    statementListTitle: string;
    statementList: string[];
    statementPhysicalTitle: string;
    statementPhysicalBody: string;
    statementCoordTitle: string;
    statementCoordBody: string;
    statementCoordName: string;
    statementUpdated: string;
  };
}

export const TRANSLATIONS: Record<Lang, SiteTranslations> = {
  he: {
    metaTitle: 'אורית גולדשטיין | אדריכלות ועיצוב פנים',
    brandSubtitle: 'אדריכלות | עיצוב פנים',
    nav: {
      home: 'בית',
      about: 'אודות',
      services: 'שירותים',
      portfolio: 'פרויקטים',
      process: 'תהליך העבודה',
      recommendations: 'המלצות',
      contactCta: 'יצירת קשר',
      mobileCta: 'בואו נדבר על הבית שלכם',
    },
    hero: {
      kicker: 'אדריכלות · עיצוב פנים · תכנון חכם',
      titleLine1: 'בית שמתחיל',
      titleLine2: 'בתכנון נכון.',
      lead: 'מהתכנון ועד הפרט האחרון – בית שמתאים רק לכם.',
      sub: 'תכנון מדויק, חשיבה רחבה ועיצוב אישי שמחבר בין יופי, נוחות וחיי היומיום.',
      ctaPrimary: 'לצפייה בפרויקטים',
      ctaSecondary: 'בואו נדבר על הבית שלכם',
      footnote: 'תכנון אדריכלי ועיצוב פנים מתוך ראייה שלמה',
      badgeYears: '12+ שנות הוראה',
      floatingQuote: 'חללים מדויקים. חומרים טבעיים. חיים שנעים לחיות בהם.',
      scrollCue: 'גלילה ללוח החומרים והפרויקטים',
    },
    marquee: [
      'תכנון אדריכלי',
      'עיצוב פנים',
      'חומרים טבעיים',
      'נגרות בהתאמה אישית',
      'אור ומרחב',
      'ראייה הנדסית',
      'ליווי אישי מלא',
    ],
    valueStrip: [
      { num: '01', title: 'תכנון חכם ומדויק', subtitle: 'הבסיס לבית שנכון לכם באמת' },
      { num: '02', title: 'ראייה אדריכלית־הנדסית', subtitle: 'חיבור בין תכנון, מערכות ועיצוב' },
      { num: '03', title: 'ליווי אישי', subtitle: 'מהרעיון ועד הפרטים הקטנים' },
    ],
    materialBoard: {
      pillars: [
        { id: 'architecture', title: 'תכנון ואדריכלות', desc: 'חלוקת חלל חכמה, זרימה טבעית ומחשבה הנדסית מדויקת.' },
        { id: 'styling', title: 'עיצוב פנים והום סטיילינג', desc: 'יצירת שפה עיצובית הרמונית, חמה ומותאמת לאופי הבית.' },
        { id: 'supervision', title: 'ליווי בביצוע', desc: 'עבודה מסודרת מול קבלנים וספקים עד למסירה מושלמת.' },
        { id: 'materials', title: 'בחירת חומרים וריהוט', desc: 'שילוב מרקמים טבעיים, אבן, עץ, טקסטיל ותאורה מדויקת.' },
      ],
      eyebrow: 'שפת החומר והאור',
      headingLine1: 'חומרים שמרגישים',
      headingLine2: 'במבט ראשון.',
      desc: 'פלטה מאוזנת של אבן בהירה, עץ טבעי, טקסטיל רך ופטרול מעושן יוצרת בתים על־זמניים שמתבגרים ביופי ושומרים על שקט והרמוניה.',
      swatches: [
        { id: 'petrol', name: 'פטרול מעושן', hex: '#396373', note: 'עומק, שקט ואופי אדריכלי על־זמני', textureClass: 'bg-[#396373] text-[#FAF8F4]' },
        { id: 'oak', name: 'אלון טבעי מחורץ', hex: '#C9BBA7', note: 'חמימות אורגנית, קצב ונגרות בהתאמה אישית', textureClass: 'fluted-wood text-[#343735]' },
        { id: 'travertine', name: 'אבן טרוורטין בהירה', hex: '#EAE4DA', note: 'אור רך, אלגנטיות שקטה ותחושת מרחב', textureClass: 'travertine-stone text-[#343735]' },
        { id: 'boucle', name: 'טקסטיל בוקלה ושמנת', hex: '#FAF8F4', note: 'רכות מגע ונוחות יומיומית שמזמינה לחיות בבית', textureClass: 'boucle-fabric text-[#343735]' },
        { id: 'charcoal', name: 'פחם וברזל מושחר', hex: '#343735', note: 'קווים גרפיים מדויקים שממסגרים את החלל', textureClass: 'bg-[#343735] text-[#FAF8F4]' },
      ],
    },
    philosophy: {
      eyebrow: 'הגישה שלי',
      quoteWords: ['עיצוב', 'טוב', 'מתחיל', 'בהקשבה,', 'ומצליח', 'כשהוא', 'עובד', 'נכון', 'גם', 'ביום־יום.'],
      accentFromIndex: 8,
      metrics: [
        { target: 12, suffix: '+', label: 'שנות הוראה באדריכלות' },
        { target: 2, suffix: '', label: 'תארים: אדריכלות והנדסה' },
        { target: 100, suffix: '%', label: 'תכנון אישי ומדויק' },
      ],
      p1: 'כל בית מספר סיפור אחר. לכן התהליך מתחיל בהבנה של האנשים שחיים בו: ההרגלים, הצרכים, החלומות והתקציב. מתוך ההיכרות הזו נבנה תכנון חכם שמנצל נכון את החלל, מחבר בין הפונקציות ויוצר שפה עיצובית שלמה.',
      p2: 'השילוב בין השכלה אדריכלית והנדסית לבין עיצוב פנים והום סטיילינג מאפשר לי לראות את התמונה הרחבה – וגם לדייק בפרטים שמשפיעים על התוצאה.',
      link: 'להכיר אותי ואת הדרך שלי',
    },
    horizontal: {
      eyebrow: 'סיור אדריכלי פנורמי',
      heading1: 'חללים שנעים לחוות',
      heading2: 'מכל זווית.',
      cta: 'לכל 21 התמונות בתיק העבודות',
      cursorLabel: 'לתיק העבודות',
      scrollPrompt: 'המשיכו לגלול לסיור',
      slides: [
        { num: '01', title: 'חלל המגורים', subtitle: 'זרימה פתוחה, אור טבעי ונגרות ספרייה מדויקת', src: './assets/gallery/01-living-room.webp' },
        { num: '02', title: 'המטבח', subtitle: 'ניגודיות אלגנטית של עץ טבעי, שחור מאט ואי מרכזי', src: './assets/gallery/05-kitchen.webp' },
        { num: '03', title: 'סוויטת ההורים', subtitle: 'גווני שמנת ופטרול מעושן לאווירה שקטה ומרגיעה', src: './assets/gallery/06-master-bedroom.webp' },
        { num: '04', title: 'גרם המדרגות', subtitle: 'שלד מתכת שחורה ומדרכי עץ המפסלים את החלל', src: './assets/gallery/18-staircase.webp' },
        { num: '05', title: 'חדר הרחצה', subtitle: 'אבן טבעית, זכוכית נקייה ונגרות בהתאמה אישית', src: './assets/gallery/17-bathroom-vanity.webp' },
      ],
    },
    services: {
      eyebrow: 'שירותים ומסלולי עבודה',
      heading: 'היקף הליווי שמתאים לכם.',
      desc: 'אפשר לבחור בתהליך ממוקד לחלל אחד, בתכנון מקצועי לקראת שיפוץ, או בליווי מלא שמחבר את כל חלקי הבית לתמונה אחת.',
      featuredBadge: 'המסלול המקיף',
      items: [
        {
          num: '01',
          title: 'ייעוץ ותכנון ממוקד',
          subtitle: 'דיוק מהיר וחכם לחלל',
          description: 'מפגש אישי בבית, עם חשיבה יצירתית ומעשית, כדי לדייק חלל אחד או שניים ולצאת עם כיוון ברור שאפשר להתקדם איתו.',
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
          description: 'תכנון מקצועי ומפורט לקראת שיפוץ או התאמת הבית, עם סט תכניות מסודר שמאפשר לקבלן לעבוד בצורה ברורה.',
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
          description: 'תהליך מקיף שמלווה אתכם לאורך הדרך – מהתכנון הראשוני ועד בחירת החומרים, הפרטים וההחלטות בשטח.',
          bullets: [
            'תכנון מפורט, עיצוב כולל ופרטי נגרות',
            'פגישות, בחירת חומרים וגמרים',
            'עבודה מול ספקים ובעלי מקצוע',
            'ביקורים וליווי באתר לפי היקף הפרויקט',
          ],
          bottom: 'מעטפת שלמה עד הפרט האחרון',
          highlighted: true,
        },
      ],
      prepurchaseTitle: 'ייעוץ אדריכלי לפני רכישת דירה',
      prepurchaseDesc: 'מתלבטים לגבי דירה מקבלן או נכס יד שנייה? נבחן יחד את הפוטנציאל, את השינויים שאתם מתכננים ואת ההיתכנות שלהם – כדי לקבל החלטה מושכלת לפני הרכישה.',
      prepurchaseCta: 'לפרטים על הייעוץ',
    },
    portfolio: {
      eyebrow: 'מתוך תיק העבודות',
      heading1: 'בתים עם אופי.',
      heading2: 'תכנון עם מחשבה.',
      desc: 'מבחר חללים ופרטים מתוך פרויקטים שתכננתי ועיצבתי – מהתמונה הרחבה ועד הפרטים הקטנים.',
      cta: 'יש לכם פרויקט בראש?',
      cursorLabel: 'צפייה מלאה',
      categories: [
        { id: 'all', label: 'כל הפרויקטים' },
        { id: 'living', label: 'סלון ומגורים' },
        { id: 'kitchen', label: 'מטבח' },
        { id: 'bedrooms', label: 'חדרי שינה וילדים' },
        { id: 'bath', label: 'רחצה ונגרות' },
        { id: 'details', label: 'פרטי עיצוב' },
      ],
      items: [
        { id: 1, title: 'חלל מגורים וספרייה', alt: 'חלל מגורים מעוצב עם ספרייה, פינת ישיבה ושולחן סלון' },
        { id: 2, title: 'ספריית תצוגה בהתאמה אישית', alt: 'ספריית תצוגה בהתאמה אישית בשילוב עץ, גוונים בהירים ואביזרים' },
        { id: 3, title: 'פרט עיצובי בסלון', alt: 'פרט עיצובי של אגרטל ופרחים על שולחן הסלון' },
        { id: 4, title: 'ריפוד וטקסטיל בגוון פטרול', alt: 'פרט ריפוד של כורסה עם פס בד בגוון פטרול' },
        { id: 5, title: 'מטבח שחור ועץ עם אי', alt: 'מטבח בגווני שחור ועץ עם אי וכיסאות בר' },
        { id: 6, title: 'חדר שינה הורים', alt: 'חדר שינה בגווני שמנת ופטרול' },
        { id: 7, title: 'נישת ישיבה ונגרות בארון', alt: 'נישת ישיבה ואחסון המשולבת בארון' },
        { id: 8, title: 'פרט מראה ונגרות', alt: 'פרט של מראה ונגרות באזור ההתארגנות' },
        { id: 9, title: 'אזור התארגנות ונגרות עץ', alt: 'אזור התארגנות עם מראה מעוגלת ונגרות עץ' },
        { id: 10, title: 'שידת צד בגווני פטרול ועץ', alt: 'שידה לצד מיטה בחדר שינה בגווני פטרול ועץ' },
        { id: 11, title: 'חדר כביסה מתוכנן', alt: 'חדר כביסה עם ארונות בגוון כחול ונישת עץ פתוחה' },
        { id: 12, title: 'חדר בנות בגווני ורוד ושמנת', alt: 'חדר בנות בגווני ורוד ושמנת' },
        { id: 13, title: 'טקסטיל וסטיילינג בחדר בנות', alt: 'פרטי טקסטיל וכריות בחדר הבנות' },
        { id: 14, title: 'חדר ילדים בנושא חלל', alt: 'חדר ילדים בנושא חלל עם קיר כחול עמוק' },
        { id: 15, title: 'חדר נוער בגווני כחול', alt: 'חדר שינה בגווני כחול עם גיטרה תלויה על הקיר' },
        { id: 16, title: 'כורסה בגוון טבעי ועץ', alt: 'כורסה מרופדת בגוון טבעי עם רגלי עץ' },
        { id: 17, title: 'חדר רחצה עם ארון שחור', alt: 'חדר רחצה עם ארון כיור שחור, משטח לבן ומראה עגולה' },
        { id: 18, title: 'גרם מדרגות מתכת ועץ', alt: 'גרם מדרגות עם שלד מתכת שחור ומדרכי עץ' },
        { id: 19, title: 'פינת משחקים משפחתית', alt: 'פינת משחקים עם שולחן כדורגל ומדפי ספרים' },
        { id: 20, title: 'מקלחון זכוכית בגווני אבן ועץ', alt: 'חדר רחצה עם מקלחון זכוכית וחיפוי בגווני אבן ועץ' },
        { id: 21, title: 'פינת קריאה ומשחק משפחתית', alt: 'פינת קריאה ומשחק משפחתית; תמונות המשפחה ברקע מטושטשות' },
      ],
      prev: 'הקודם',
      next: 'הבא',
      close: 'סגירה',
    },
    beforeAfter: {
      eyebrow: 'לפני ואחרי',
      heading: 'אותו בית, שינוי שמרגישים.',
      desc: 'מבט על חלל המגורים ועל המטבח לפני השיפוץ ולאחר התכנון והעיצוב. ניתן להשוות בגרירה אינטראקטיבית או לצפות בתמונות המלאות זו לצד זו, ללא חיתוך.',
      sliderMode: 'סליידר השוואה',
      sideMode: 'תצוגה מלאה ללא חיתוך',
      dragHint: 'גררו את הסמן ימינה ושמאלה להשוואה',
      beforeLabel: 'לפני',
      afterLabel: 'אחרי',
      cases: [
        { id: 'living', title: 'חלל המגורים', subtitle: 'מאותה נקודת מבט – מהמצב הקיים לחלל מואר, חם ומתוכנן בקפידה' },
        { id: 'kitchen', title: 'המטבח', subtitle: 'תכנון מחודש שמשלב פונקציונליות, אחסון חכם ושפה עיצובית על־זמנית' },
      ],
    },
    process: {
      eyebrow: 'איך נעבוד יחד',
      heading: 'תהליך ברור. החלטות מדויקות.',
      desc: 'תכנון נכון מפחית אי־ודאות ומאפשר להתקדם צעד אחר צעד, מתוך הבנה של התמונה המלאה.',
      steps: [
        { num: '01', title: 'היכרות והקשבה', description: 'מגדירים צרכים, סגנון חיים, סדרי עדיפויות ותקציב.', tag: 'שלב א׳ · אפיון' },
        { num: '02', title: 'חשיבה ותכנון', description: 'בוחנים חלופות, מפתחים פתרון תכנוני ומגבשים שפה עיצובית.', tag: 'שלב ב׳ · קונספט' },
        { num: '03', title: 'תכניות ופרטים', description: 'מתרגמים את התכנון לתכניות עבודה ולהחלטות ברורות.', tag: 'שלב ג׳ · שרטוטים' },
        { num: '04', title: 'ביצוע והשלמה', description: 'במסלול הליווי המלא מתקדמים יחד גם בבחירות ובתיאום בשטח.', tag: 'שלב ד׳ · הגשמה' },
      ],
    },
    about: {
      eyebrow: 'נעים להכיר',
      name: 'אורית גולדשטיין',
      badgeTitle: 'אדריכלית ומהנדסת',
      badgeSub: 'B.Arch · M.Sc · מרצה',
      p1: 'אדריכלית ומעצבת פנים, המאמינה שתכנון טוב מתחיל בהבנה עמוקה של האנשים והמרחב. אני משלבת חשיבה אדריכלית, הבנה הנדסית ורגישות עיצובית כדי ליצור בתים מדויקים, נוחים ומלאי אופי.',
      p2: 'אני בעלת תואר ראשון באדריכלות ובינוי ערים ותואר שני בהנדסה אזרחית בהתמחות בניהול פרויקטים. לצד לימודי הום סטיילינג והכשרות בתחומי תאורה, חומרים וטכנולוגיות חדשות, אני מרצה לתכנון אדריכלי כבר 12 שנים ומקפידה להמשיך ללמוד ולהתעדכן.',
      p3: 'החיבור בין העולמות מאפשר לי ללוות את הפרויקט בראייה רחבה – מהתכנון והמערכות ועד לחומר, לאור ולפרט העיצובי האחרון.',
      credentials: [
        { title: 'תואר ראשון', subtitle: 'אדריכלות ובינוי ערים', accent: 'B.Arch' },
        { title: 'תואר שני', subtitle: 'הנדסה אזרחית · ניהול פרויקטים', accent: 'M.Sc' },
        { title: '12 שנות הוראה', subtitle: 'הרצאה והנחיה בתכנון אדריכלי', accent: '12+' },
        { title: 'למידה מתמשכת', subtitle: 'הום סטיילינג, תאורה, חומרים וטכנולוגיות', accent: 'Pro' },
      ],
    },
    recommendations: {
      eyebrow: 'מילים מלקוחות',
      heading: 'החוויה שמאחורי התוצאה.',
      desc: 'מילים מלקוחות שליוויתי לאורך תהליך התכנון והעיצוב, על הדרך המשותפת ועל התוצאה.',
      zoomBtn: 'לחצו להגדלה',
    },
    contact: {
      eyebrow: 'הצעד הראשון לבית שלכם',
      heading1: 'יש לכם חלום לבית?',
      heading2: 'בואו נחשוב עליו יחד.',
      desc: 'בין אם אתם בתחילת הדרך, לפני רכישת דירה או כבר מתכננים שיפוץ – אשמח להכיר, להבין מה אתם צריכים ולבדוק איך נכון להתקדם.',
      emailLabel: 'אימייל',
      phoneLabel: 'טלפון',
      callWord: 'התקשרות',
      waSub: 'זמינה גם בוואטסאפ',
      waLabel: 'שליחת הודעת WhatsApp',
      formTitle: 'ספרו לי קצת על הפרויקט',
      formSub: 'מלאו את הפרטים ואחזור אליכם בהקדם.',
      selectedTrackPrefix: 'מסלול נבחר:',
      successMsg: 'תודה שפניתם! ההודעה נשלחה בהצלחה. אחזור אליכם בהקדם.',
      nameLabel: 'שם מלא',
      namePh: 'איך קוראים לכם?',
      phoneFieldLabel: 'טלפון',
      phonePh: 'מספר טלפון לחזרה',
      emailFieldLabel: 'כתובת מייל',
      messageLabel: 'בכמה מילים על הפרויקט',
      messagePh: 'ספרו לי מה אתם מתכננים...',
      prefillTemplate: (s) => `שלום אורית, אשמח לשמוע פרטים נוספים לגבי "${s}". `,
      privacy: 'הפרטים יועברו באמצעות שירות חיצוני לצורך שליחת הפנייה למייל העסקי, וישמשו לחזרה אליכם בקשר לפנייה בלבד.',
      submit: 'שליחת הפנייה',
    },
    footer: {
      a11yStatement: 'הצהרת נגישות',
      copyright: 'אורית גולדשטיין · כל הזכויות שמורות',
    },
    a11y: {
      skipToContent: 'דלג לתוכן הראשי',
      menuTitle: 'תפריט נגישות',
      menuSub: 'תקן ישראלי 5568 · WCAG 2.0 AA',
      fontSize: 'גודל טקסט',
      increaseFont: 'הגדלת טקסט',
      decreaseFont: 'הקטנת טקסט',
      highContrast: 'ניגודיות גבוהה',
      monochrome: 'גווני אפור',
      highlightLinks: 'הדגשת קישורים',
      readableFont: 'גופן קריא',
      stopAnimations: 'עצירת אנימציות',
      largeCursor: 'סמן עכבר מוגדל',
      fullStatement: 'הצהרת נגישות מלאה',
      reset: 'איפוס הגדרות נגישות',
      statementKicker: 'תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע״ג–2013',
      statementTitle: 'הצהרת נגישות',
      statementIntro: 'סטודיו אורית גולדשטיין – אדריכלות ועיצוב פנים רואה חשיבות רבה במתן שירות שוויוני, מכבד, נגיש ומקצועי לכלל לקוחותיו ולכלל הגולשים באתר, לרבות אנשים עם מוגבלות. בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות, תשנ״ח–1998, ולתקנות שהותקנו מכוחו, הושקעו מאמצים רבים בביצוע התאמות הנגישות הנדרשות באתר.',
      statementLevelTitle: 'רמת הנגישות באתר',
      statementLevelBody: 'אתר זה עומד בדרישות תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע״ג–2013. התאמות הנגישות בוצעו על פי המלצות התקן הישראלי (ת״י 5568) לנגישות תכנים באינטרנט ברמת AA ומסמך WCAG 2.0 הבינלאומי.',
      statementListTitle: 'התאמות הנגישות שבוצעו באתר',
      statementList: [
        'ניווט מקלדת מלא בכל חלקי האתר (Tab, Enter, Esc וחיצים), כולל קישור ״דלג לתוכן הראשי״.',
        'תפריט נגישות אינטראקטיבי (קיצור Alt+A): הגדלה/הקטנת טקסט עד 150%, ניגודיות גבוהה, גווני אפור, הדגשת קישורים, גופן קריא, סמן עכבר מוגדל ועצירת כלל האנימציות.',
        'מבנה סמנטי, כותרות היררכיות, אזורי ARIA Landmarks ותיאורי טקסט חלופי (Alt) לתמונות.',
        'תמיכה מלאה בהעדפת מערכת להפחתת תנועה (prefers-reduced-motion) והגדלת דפדפן עד 200%.',
      ],
      statementPhysicalTitle: 'הסדרי נגישות פיזיים וקבלת קהל',
      statementPhysicalBody: 'הפגישות מתקיימות בתיאום מראש בבית הלקוח, באתר הפרויקט או בפגישה מקוונת מונגשת (Zoom / וידאו), על מנת לאפשר נוחות ונגישות מרבית לכל לקוח.',
      statementCoordTitle: 'פרטי רכזת הנגישות ופנייה בנושא נגישות',
      statementCoordBody: 'אנו ממשיכים לפעול לשיפור מתמיד של נגישות האתר. אם נתקלתם בקושי או בתקלה בנושא נגישות – נשמח שתפנו אלינו ונטפל בפנייה בהקדם האפשרי:',
      statementCoordName: 'רכזת נגישות: אורית גולדשטיין',
      statementUpdated: 'הצהרת הנגישות עודכנה לאחרונה בתאריך: נובמבר 2026.',
    },
  },

  en: {
    metaTitle: 'Orit Goldstein | Architecture & Interior Design',
    brandSubtitle: 'Architecture | Interior Design',
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      portfolio: 'Portfolio',
      process: 'Process',
      recommendations: 'Reviews',
      contactCta: 'Contact',
      mobileCta: "Let's Talk About Your Home",
    },
    hero: {
      kicker: 'Architecture · Interior Design · Smart Planning',
      titleLine1: 'A home begins with',
      titleLine2: 'thoughtful design.',
      lead: 'From blueprint to the final detail — a home tailored exclusively to you.',
      sub: 'Precise architectural planning, engineering insight, and personal interior design that unite beauty, comfort, and everyday living.',
      ctaPrimary: 'View Projects',
      ctaSecondary: "Let's Talk About Your Home",
      footnote: 'Holistic architecture & interior design from vision to execution',
      badgeYears: '12+ Years Teaching',
      floatingQuote: 'Precise spaces. Natural materials. Homes made to truly live in.',
      scrollCue: 'Scroll to explore materials & projects',
    },
    marquee: [
      'Architectural Planning',
      'Interior Design',
      'Natural Materials',
      'Bespoke Carpentry',
      'Light & Space',
      'Engineering Vision',
      'Full Personal Guidance',
    ],
    valueStrip: [
      { num: '01', title: 'Smart, Precise Planning', subtitle: 'The foundation of a home that truly fits you' },
      { num: '02', title: 'Architectural & Engineering Vision', subtitle: 'Seamless integration of layout, systems & design' },
      { num: '03', title: 'Personal Guidance', subtitle: 'From first concept down to the smallest detail' },
    ],
    materialBoard: {
      pillars: [
        { id: 'architecture', title: 'Architecture & Planning', desc: 'Intelligent spatial flow, natural light, and engineering precision.' },
        { id: 'styling', title: 'Interior Design & Styling', desc: 'A warm, harmonious design language tailored to your character.' },
        { id: 'supervision', title: 'Execution Guidance', desc: 'Structured coordination with contractors and suppliers through handover.' },
        { id: 'materials', title: 'Materials & Furniture', desc: 'Curated stone, fluted wood, soft textiles, and architectural lighting.' },
      ],
      eyebrow: 'Language of Material & Light',
      headingLine1: 'Materials you feel',
      headingLine2: 'at first glance.',
      desc: 'A balanced palette of light travertine, natural oak, tactile bouclé, and smoked petrol creates timeless homes that age gracefully in calm harmony.',
      swatches: [
        { id: 'petrol', name: 'Smoked Petrol', hex: '#396373', note: 'Depth, calm, and timeless architectural character', textureClass: 'bg-[#396373] text-[#FAF8F4]' },
        { id: 'oak', name: 'Fluted Natural Oak', hex: '#C9BBA7', note: 'Organic warmth, rhythm, and custom joinery', textureClass: 'fluted-wood text-[#343735]' },
        { id: 'travertine', name: 'Light Travertine', hex: '#EAE4DA', note: 'Soft light, quiet elegance, and a sense of space', textureClass: 'travertine-stone text-[#343735]' },
        { id: 'boucle', name: 'Cream Bouclé', hex: '#FAF8F4', note: 'Tactile softness and everyday comfort that invites living', textureClass: 'boucle-fabric text-[#343735]' },
        { id: 'charcoal', name: 'Charcoal & Steel', hex: '#343735', note: 'Crisp graphic lines that frame the architecture', textureClass: 'bg-[#343735] text-[#FAF8F4]' },
      ],
    },
    philosophy: {
      eyebrow: 'My Approach',
      quoteWords: ['Great', 'design', 'begins', 'with', 'listening,', 'and', 'succeeds', 'when', 'it', 'works', 'effortlessly', 'every', 'day.'],
      accentFromIndex: 10,
      metrics: [
        { target: 12, suffix: '+', label: 'Years Teaching Architecture' },
        { target: 2, suffix: '', label: 'Degrees: Architecture & Eng.' },
        { target: 100, suffix: '%', label: 'Tailored Personal Planning' },
      ],
      p1: 'Every home tells a different story. That is why the process begins by deeply understanding the people who live in it: their habits, needs, dreams, and budget. From there, we craft smart planning that maximizes space, connects functions, and builds a cohesive design language.',
      p2: 'Combining architectural and civil engineering education with interior design and home styling allows me to see the big picture — while perfecting the subtle details that transform the result.',
      link: 'Meet me & my background',
    },
    horizontal: {
      eyebrow: 'Panoramic Architectural Tour',
      heading1: 'Spaces meant to be felt',
      heading2: 'from every angle.',
      cta: 'Explore all 21 portfolio photos',
      cursorLabel: 'View Portfolio',
      scrollPrompt: 'Keep scrolling to tour',
      slides: [
        { num: '01', title: 'The Living Room', subtitle: 'Open flow, natural light, and bespoke library joinery', src: './assets/gallery/01-living-room.webp' },
        { num: '02', title: 'The Kitchen', subtitle: 'Refined contrast of warm oak, matte black, and a central island', src: './assets/gallery/05-kitchen.webp' },
        { num: '03', title: 'Master Suite', subtitle: 'Cream and smoked petrol tones for serene daily retreat', src: './assets/gallery/06-master-bedroom.webp' },
        { num: '04', title: 'The Staircase', subtitle: 'Sculptural blackened steel frame with solid oak treads', src: './assets/gallery/18-staircase.webp' },
        { num: '05', title: 'The Bathroom', subtitle: 'Natural stone, crisp glass, and custom vanity carpentry', src: './assets/gallery/17-bathroom-vanity.webp' },
      ],
    },
    services: {
      eyebrow: 'Services & Packages',
      heading: 'The level of guidance that fits you.',
      desc: 'Choose a focused consultation for a single space, a complete technical renovation blueprint, or full end-to-end design and site accompaniment.',
      featuredBadge: 'Full Experience',
      items: [
        {
          num: '01',
          title: 'Focused Consultation',
          subtitle: 'Fast, actionable clarity',
          description: 'A personal in-home meeting with creative, practical thinking to refine one or two spaces and leave you with a clear direction.',
          bullets: [
            'Understanding spatial needs and challenges',
            'Furniture layout, color palette, and materials',
            'Item recommendations and curated supplier list',
          ],
          bottom: 'Focused, personal & accessible',
        },
        {
          num: '02',
          title: 'Architectural & Interior Plans',
          subtitle: 'Complete contractor blueprint set',
          description: 'Detailed professional planning ahead of renovation, with an organized set of working drawings so your contractor can execute with clarity.',
          bullets: [
            'Architectural layout & space planning',
            'Demolition, electrical & plumbing plans',
            'HVAC & ceiling drop plans',
            'Excludes material selection, custom joinery & feature walls',
            'Without on-site supervision',
          ],
          bottom: 'Precise blueprints for smooth execution',
        },
        {
          num: '03',
          title: 'Full Design & Accompaniment',
          subtitle: 'The complete studio journey',
          description: 'A comprehensive process accompanying you every step of the way — from initial planning through material selection, custom joinery, and site decisions.',
          bullets: [
            'Detailed planning, holistic design & custom carpentry',
            'Dedicated meetings for materials & finishes',
            'Coordination with suppliers & craftsmen',
            'On-site visits tailored to project scope',
          ],
          bottom: 'Complete care down to the last detail',
          highlighted: true,
        },
      ],
      prepurchaseTitle: 'Pre-Purchase Architectural Consultation',
      prepurchaseDesc: 'Considering a new-build apartment or second-hand property? We will evaluate its full potential, layout changes, and feasibility together so you can decide with confidence before buying.',
      prepurchaseCta: 'Consultation Details',
    },
    portfolio: {
      eyebrow: 'Selected Works',
      heading1: 'Homes with character.',
      heading2: 'Design with intention.',
      desc: 'A curated selection of spaces and bespoke details from projects I have planned and designed — from spatial architecture to final styling.',
      cta: 'Have a project in mind?',
      cursorLabel: 'Full View',
      categories: [
        { id: 'all', label: 'All Projects' },
        { id: 'living', label: 'Living & Family' },
        { id: 'kitchen', label: 'Kitchen' },
        { id: 'bedrooms', label: 'Bedrooms & Kids' },
        { id: 'bath', label: 'Bath & Carpentry' },
        { id: 'details', label: 'Design Details' },
      ],
      items: [
        { id: 1, title: 'Living Room & Custom Library', alt: 'Designed living space with bespoke bookcase, seating, and coffee table' },
        { id: 2, title: 'Bespoke Display Shelving', alt: 'Custom wood and light-toned display shelving with curated decor' },
        { id: 3, title: 'Living Room Styling Detail', alt: 'Sculptural vase and florals on living room table' },
        { id: 4, title: 'Smoked Petrol Upholstery', alt: 'Close-up of armchair upholstery with petrol-toned piping' },
        { id: 5, title: 'Matte Black & Oak Kitchen', alt: 'Black and natural wood kitchen with central island and bar stools' },
        { id: 6, title: 'Master Bedroom Suite', alt: 'Master bedroom in cream and smoked petrol tones' },
        { id: 7, title: 'Built-In Wardrobe Seating Niche', alt: 'Cozy seating and storage niche integrated into custom cabinetry' },
        { id: 8, title: 'Mirror & Joinery Detail', alt: 'Close-up of vanity mirror and bespoke wood joinery' },
        { id: 9, title: 'Dressing Area & Wood Joinery', alt: 'Dressing vanity with rounded mirror and warm oak carpentry' },
        { id: 10, title: 'Petrol & Wood Nightstand', alt: 'Bedside table in smoked petrol and natural wood' },
        { id: 11, title: 'Planned Laundry Room', alt: 'Laundry room with slate-blue cabinetry and open oak niche' },
        { id: 12, title: "Girls' Bedroom in Blush & Cream", alt: "Girls' bedroom designed in soft blush and warm cream tones" },
        { id: 13, title: 'Soft Textiles & Styling', alt: "Textile and pillow details in the girls' bedroom" },
        { id: 14, title: 'Space-Themed Kids Room', alt: 'Kids bedroom with deep midnight blue accent wall' },
        { id: 15, title: 'Teen Bedroom in Blue Tones', alt: 'Blue-toned bedroom with guitar displayed on the wall' },
        { id: 16, title: 'Natural Linen & Wood Armchair', alt: 'Upholstered armchair in natural fabric with wooden legs' },
        { id: 17, title: 'Black Vanity Bathroom', alt: 'Bathroom with matte black vanity, white counter, and round mirror' },
        { id: 18, title: 'Steel & Oak Staircase', alt: 'Black metal frame staircase with solid oak treads and golden retriever' },
        { id: 19, title: 'Family Game Nook', alt: 'Family play area with foosball table and bookshelves' },
        { id: 20, title: 'Stone & Wood Glass Shower', alt: 'Bathroom with glass shower enclosure and stone & wood tiling' },
        { id: 21, title: 'Family Reading & Play Corner', alt: 'Warm family reading and play nook' },
      ],
      prev: 'Previous',
      next: 'Next',
      close: 'Close',
    },
    beforeAfter: {
      eyebrow: 'Before & After',
      heading: 'Same home, a transformation you feel.',
      desc: 'A look at the living area and kitchen before renovation and after architectural planning & interior design. Drag interactively or view side-by-side uncut.',
      sliderMode: 'Interactive Slider',
      sideMode: 'Full Uncut Side-by-Side',
      dragHint: 'Drag the handle left or right to compare',
      beforeLabel: 'Before',
      afterLabel: 'After',
      cases: [
        { id: 'living', title: 'Living Space', subtitle: 'Same viewpoint — transformed into a bright, warm, thoughtfully planned space' },
        { id: 'kitchen', title: 'The Kitchen', subtitle: 'Reimagined layout uniting smart storage, flow, and timeless materials' },
      ],
    },
    process: {
      eyebrow: 'How We Work Together',
      heading: 'Clear process. Confident decisions.',
      desc: 'Thoughtful planning removes uncertainty and lets you move forward step by step with complete clarity.',
      steps: [
        { num: '01', title: 'Discovery & Listening', description: 'Defining your needs, lifestyle, priorities, and budget.', tag: 'Phase 01 · Brief' },
        { num: '02', title: 'Concept & Planning', description: 'Exploring layout alternatives, spatial solutions, and design language.', tag: 'Phase 02 · Concept' },
        { num: '03', title: 'Blueprints & Details', description: 'Translating the vision into clear working drawings and specifications.', tag: 'Phase 03 · Plans' },
        { num: '04', title: 'Execution & Completion', description: 'In the full track, we continue together through selections and site coordination.', tag: 'Phase 04 · Realization' },
      ],
    },
    about: {
      eyebrow: 'Nice to Meet You',
      name: 'Orit Goldstein',
      badgeTitle: 'Architect & Engineer',
      badgeSub: 'B.Arch · M.Sc · Lecturer',
      p1: 'An architect and interior designer who believes great planning begins with a deep understanding of people and space. I blend architectural thinking, engineering mastery, and design sensitivity to create precise, comfortable homes full of character.',
      p2: 'I hold a Bachelor’s degree in Architecture & Urban Planning and a Master’s degree in Civil Engineering specializing in Project Management. Alongside home styling and ongoing studies in lighting, materials, and new technologies, I have been lecturing in architectural design for 12 years.',
      p3: 'Bridging these worlds enables me to guide your project with holistic vision — from structure and building systems to light, materiality, and the final decorative detail.',
      credentials: [
        { title: "Bachelor's Degree", subtitle: 'Architecture & Urban Planning', accent: 'B.Arch' },
        { title: "Master's Degree", subtitle: 'Civil Engineering · Project Mgmt', accent: 'M.Sc' },
        { title: '12 Years Teaching', subtitle: 'Lecturer in Architectural Design', accent: '12+' },
        { title: 'Continuous Mastery', subtitle: 'Styling, Lighting, Materials & Tech', accent: 'Pro' },
      ],
    },
    recommendations: {
      eyebrow: 'Client Words',
      heading: 'The experience behind the result.',
      desc: 'Authentic words from clients I accompanied through the design and renovation journey.',
      zoomBtn: 'Click to enlarge',
    },
    contact: {
      eyebrow: 'First Step Toward Your Home',
      heading1: 'Have a vision for your home?',
      heading2: "Let's imagine it together.",
      desc: "Whether you're just starting out, evaluating a property before purchase, or planning a full renovation — I'd love to hear your story and explore the right path forward.",
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      callWord: 'Call',
      waSub: 'Available on WhatsApp',
      waLabel: 'Send a WhatsApp Message',
      formTitle: 'Tell me about your project',
      formSub: 'Leave your details and I will get back to you shortly.',
      selectedTrackPrefix: 'Selected package:',
      successMsg: 'Thank you for reaching out! Your message was sent successfully.',
      nameLabel: 'Full Name',
      namePh: 'What is your name?',
      phoneFieldLabel: 'Phone',
      phonePh: 'Phone number',
      emailFieldLabel: 'Email Address',
      messageLabel: 'A few words about your project',
      messagePh: 'Tell me what you are planning...',
      prefillTemplate: (s) => `Hi Orit, I would love to hear more details about "${s}". `,
      privacy: 'Your details are sent securely to the studio email and will be used solely to respond to your inquiry.',
      submit: 'Send Inquiry',
    },
    footer: {
      a11yStatement: 'Accessibility Statement',
      copyright: 'Orit Goldstein · All Rights Reserved',
    },
    a11y: {
      skipToContent: 'Skip to main content',
      menuTitle: 'Accessibility Menu',
      menuSub: 'Israeli Standard 5568 · WCAG 2.0 AA',
      fontSize: 'Text Size',
      increaseFont: 'Increase Text',
      decreaseFont: 'Decrease Text',
      highContrast: 'High Contrast',
      monochrome: 'Grayscale',
      highlightLinks: 'Highlight Links',
      readableFont: 'Readable Font',
      stopAnimations: 'Stop Animations',
      largeCursor: 'Large Cursor',
      fullStatement: 'Full Accessibility Statement',
      reset: 'Reset Settings',
      statementKicker: 'Equal Rights for Persons with Disabilities Regulations (Service Accessibility), 2013',
      statementTitle: 'Accessibility Statement',
      statementIntro: 'Orit Goldstein – Architecture & Interior Design is committed to providing an equal, respectful, and accessible digital experience for all visitors, including people with disabilities, in accordance with Israel’s Equal Rights for Persons with Disabilities Law (1998).',
      statementLevelTitle: 'Compliance Level',
      statementLevelBody: 'This website conforms to Israeli Standard SI 5568 and international WCAG 2.0 Level AA guidelines.',
      statementListTitle: 'Accessibility Features Implemented',
      statementList: [
        'Full keyboard navigation (Tab, Enter, Esc, and Arrow keys) plus a "Skip to main content" link.',
        'Interactive Accessibility Menu (shortcut Alt+A): font scaling up to 150%, high contrast, grayscale, link highlighting, readable font, large cursor, and stopping all animations.',
        'Semantic HTML headings, ARIA landmarks, form labels, and descriptive alt texts for portfolio imagery.',
        'Full support for OS prefers-reduced-motion and browser zoom up to 200%.',
      ],
      statementPhysicalTitle: 'Meetings & Physical Accessibility',
      statementPhysicalBody: 'Consultations are held by appointment at the client’s home, project site, or via accessible online video meetings (Zoom) for maximum comfort.',
      statementCoordTitle: 'Accessibility Coordinator Contact',
      statementCoordBody: 'We continually work to improve accessibility. If you encounter any barrier or have a suggestion, please contact us:',
      statementCoordName: 'Accessibility Coordinator: Orit Goldstein',
      statementUpdated: 'Last updated: November 2026.',
    },
  },

  es: {
    metaTitle: 'Orit Goldstein | Arquitectura y Diseño de Interiores',
    brandSubtitle: 'Arquitectura | Diseño de Interiores',
    nav: {
      home: 'Inicio',
      about: 'Sobre mí',
      services: 'Servicios',
      portfolio: 'Proyectos',
      process: 'Proceso',
      recommendations: 'Reseñas',
      contactCta: 'Contacto',
      mobileCta: 'Hablemos de tu hogar',
    },
    hero: {
      kicker: 'Arquitectura · Diseño de Interiores · Planificación Inteligente',
      titleLine1: 'Un hogar comienza',
      titleLine2: 'con un gran diseño.',
      lead: 'Desde el plano hasta el último detalle — un hogar hecho a tu medida.',
      sub: 'Planificación arquitectónica precisa, visión de ingeniería y diseño personalizado que unen belleza, confort y vida cotidiana.',
      ctaPrimary: 'Ver Proyectos',
      ctaSecondary: 'Hablemos de tu hogar',
      footnote: 'Arquitectura y diseño de interiores con una visión integral',
      badgeYears: '12+ Años Enseñando',
      floatingQuote: 'Espacios precisos. Materiales naturales. Hogares para disfrutar cada día.',
      scrollCue: 'Desliza para explorar materiales y proyectos',
    },
    marquee: [
      'Planificación Arquitectónica',
      'Diseño de Interiores',
      'Materiales Naturales',
      'Carpintería a Medida',
      'Luz y Espacio',
      'Visión de Ingeniería',
      'Acompañamiento Integral',
    ],
    valueStrip: [
      { num: '01', title: 'Planificación Inteligente', subtitle: 'La base de un hogar realmente pensado para ti' },
      { num: '02', title: 'Visión Arquitectónica e Ingeniería', subtitle: 'Conexión perfecta entre planos, sistemas y estética' },
      { num: '03', title: 'Acompañamiento Personal', subtitle: 'Desde la primera idea hasta el último detalle' },
    ],
    materialBoard: {
      pillars: [
        { id: 'architecture', title: 'Arquitectura y Planificación', desc: 'Distribución inteligente, flujo natural y precisión técnica.' },
        { id: 'styling', title: 'Interiorismo y Estilismo', desc: 'Un lenguaje cálido y armónico adaptado a tu personalidad.' },
        { id: 'supervision', title: 'Seguimiento de Obra', desc: 'Coordinación ordenada con contratistas y proveedores hasta la entrega.' },
        { id: 'materials', title: 'Materiales y Mobiliario', desc: 'Piedra natural, roble acanalado, textiles suaves e iluminación precisa.' },
      ],
      eyebrow: 'Lenguaje de Material y Luz',
      headingLine1: 'Materiales que se sienten',
      headingLine2: 'a primera vista.',
      desc: 'Una paleta equilibrada de piedra travertino, madera natural, bouclé suave y petróleo ahumado crea hogares atemporales llenos de calma y armonía.',
      swatches: [
        { id: 'petrol', name: 'Petróleo Ahumado', hex: '#396373', note: 'Profundidad, calma y carácter arquitectónico atemporal', textureClass: 'bg-[#396373] text-[#FAF8F4]' },
        { id: 'oak', name: 'Roble Natural Acanalado', hex: '#C9BBA7', note: 'Calidez orgánica, ritmo y carpintería a medida', textureClass: 'fluted-wood text-[#343735]' },
        { id: 'travertine', name: 'Travertino Claro', hex: '#EAE4DA', note: 'Luz suave, elegancia serena y amplitud visual', textureClass: 'travertine-stone text-[#343735]' },
        { id: 'boucle', name: 'Textil Bouclé Crema', hex: '#FAF8F4', note: 'Suavidad táctil y comodidad para el día a día', textureClass: 'boucle-fabric text-[#343735]' },
        { id: 'charcoal', name: 'Carbón y Acero', hex: '#343735', note: 'Líneas gráficas precisas que enmarcan el espacio', textureClass: 'bg-[#343735] text-[#FAF8F4]' },
      ],
    },
    philosophy: {
      eyebrow: 'Mi Enfoque',
      quoteWords: ['El', 'buen', 'diseño', 'comienza', 'escuchando,', 'y', 'triunfa', 'cuando', 'funciona', 'en', 'el', 'día', 'a', 'día.'],
      accentFromIndex: 10,
      metrics: [
        { target: 12, suffix: '+', label: 'Años Docencia Arquitectónica' },
        { target: 2, suffix: '', label: 'Títulos: Arquitectura e Ing.' },
        { target: 100, suffix: '%', label: 'Diseño Personalizado' },
      ],
      p1: 'Cada hogar cuenta una historia distinta. Por eso el proceso comienza comprendiendo a quienes lo habitan: sus hábitos, necesidades, sueños y presupuesto. A partir de ahí, creamos una planificación inteligente que aprovecha cada metro y construye un lenguaje visual completo.',
      p2: 'Combinar formación en arquitectura e ingeniería civil con diseño de interiores y estilismo me permite ver el panorama completo y perfeccionar cada detalle que marca la diferencia.',
      link: 'Conoce mi historia y trayectoria',
    },
    horizontal: {
      eyebrow: 'Recorrido Arquitectónico Panorámico',
      heading1: 'Espacios pensados para vivirse',
      heading2: 'desde cada ángulo.',
      cta: 'Ver las 21 fotos del portafolio',
      cursorLabel: 'Ver Portafolio',
      scrollPrompt: 'Sigue bajando para recorrer',
      slides: [
        { num: '01', title: 'El Salón', subtitle: 'Flujo abierto, luz natural y librería a medida', src: './assets/gallery/01-living-room.webp' },
        { num: '02', title: 'La Cocina', subtitle: 'Contraste elegante de roble, negro mate e isla central', src: './assets/gallery/05-kitchen.webp' },
        { num: '03', title: 'Suite Principal', subtitle: 'Tonos crema y petróleo ahumado para un descanso sereno', src: './assets/gallery/06-master-bedroom.webp' },
        { num: '04', title: 'La Escalera', subtitle: 'Estructura metálica negra y peldaños de madera maciza', src: './assets/gallery/18-staircase.webp' },
        { num: '05', title: 'El Baño', subtitle: 'Piedra natural, cristal limpio y carpintería a medida', src: './assets/gallery/17-bathroom-vanity.webp' },
      ],
    },
    services: {
      eyebrow: 'Servicios y Modalidades',
      heading: 'El nivel de acompañamiento ideal para ti.',
      desc: 'Elige una asesoría puntual para un espacio, un juego completo de planos técnicos para reforma o un acompañamiento integral de principio a fin.',
      featuredBadge: 'Experiencia Completa',
      items: [
        {
          num: '01',
          title: 'Asesoría y Diseño Puntual',
          subtitle: 'Claridad rápida y práctica',
          description: 'Una reunión personal en tu hogar con enfoque creativo y práctico para perfeccionar uno o dos espacios y salir con un rumbo claro.',
          bullets: [
            'Análisis de necesidades y desafíos del espacio',
            'Distribución de mobiliario, paleta de colores y materiales',
            'Recomendaciones de piezas y lista curada de proveedores',
          ],
          bottom: 'Solución enfocada, personal y accesible',
        },
        {
          num: '02',
          title: 'Planificación y Planos Técnicos',
          subtitle: 'Juego completo para obra',
          description: 'Planificación profesional y detallada para reforma, con un juego de planos claros que permiten al contratista trabajar con precisión.',
          bullets: [
            'Plano arquitectónico y distribución de espacios',
            'Planos de demolición, electricidad y fontanería',
            'Plano de climatización y falsos techos',
            'Sin selección de materiales, carpintería a medida ni paredes protagonistas',
            'Sin seguimiento en obra',
          ],
          bottom: 'Planos precisos para una ejecución ordenada',
        },
        {
          num: '03',
          title: 'Diseño y Acompañamiento Integral',
          subtitle: 'El recorrido completo del estudio',
          description: 'Un proceso completo que te acompaña en cada etapa — desde el concepto inicial hasta materiales, carpintería y decisiones en obra.',
          bullets: [
            'Planificación detallada, diseño integral y carpintería a medida',
            'Reuniones para selección de materiales y acabados',
            'Coordinación con proveedores y profesionales',
            'Visitas y acompañamiento en obra según el alcance',
          ],
          bottom: 'Cuidado integral hasta el último detalle',
          highlighted: true,
        },
      ],
      prepurchaseTitle: 'Asesoría Arquitectónica Previa a la Compra',
      prepurchaseDesc: '¿Evaluando un apartamento sobre plano o de segunda mano? Analizaremos juntos su potencial, los cambios posibles y su viabilidad para que decidas con total seguridad.',
      prepurchaseCta: 'Detalles de la Asesoría',
    },
    portfolio: {
      eyebrow: 'Obras Seleccionadas',
      heading1: 'Hogares con carácter.',
      heading2: 'Diseño con intención.',
      desc: 'Una selección de espacios y detalles de proyectos que he diseñado — desde la arquitectura espacial hasta el último toque decorativo.',
      cta: '¿Tienes un proyecto en mente?',
      cursorLabel: 'Ver Completo',
      categories: [
        { id: 'all', label: 'Todos los Proyectos' },
        { id: 'living', label: 'Salón y Familia' },
        { id: 'kitchen', label: 'Cocina' },
        { id: 'bedrooms', label: 'Dormitorios' },
        { id: 'bath', label: 'Baños y Carpintería' },
        { id: 'details', label: 'Detalles' },
      ],
      items: [
        { id: 1, title: 'Salón y Librería a Medida', alt: 'Salón diseñado con librería a medida, zona de estar y mesa de centro' },
        { id: 2, title: 'Estantería Expositiva a Medida', alt: 'Estantería de madera y tonos claros con decoración curada' },
        { id: 3, title: 'Detalle Decorativo en Salón', alt: 'Jarrón escultórico y flores sobre mesa de centro' },
        { id: 4, title: 'Tapicería en Petróleo Ahumado', alt: 'Detalle de tapicería de sillón con ribete color petróleo' },
        { id: 5, title: 'Cocina Negro Mate y Roble', alt: 'Cocina en negro y madera natural con isla central y taburetes' },
        { id: 6, title: 'Dormitorio Principal', alt: 'Dormitorio en tonos crema y petróleo ahumado' },
        { id: 7, title: 'Nicho Integrado en Armario', alt: 'Nicho de asiento y almacenaje integrado en carpintería' },
        { id: 8, title: 'Detalle de Espejo y Madera', alt: 'Detalle de espejo y carpintería en zona de tocador' },
        { id: 9, title: 'Zona de Tocador y Roble', alt: 'Tocador con espejo redondeado y carpintería de madera' },
        { id: 10, title: 'Mesita en Petróleo y Madera', alt: 'Mesita de noche en tonos petróleo y roble natural' },
        { id: 11, title: 'Lavadero Planificado', alt: 'Cuarto de lavado con armarios azules y nicho de madera' },
        { id: 12, title: 'Dormitorio Infantil Rosa y Crema', alt: 'Habitación infantil en tonos rosa suave y crema' },
        { id: 13, title: 'Textiles y Estilismo', alt: 'Detalles textiles y cojines en dormitorio infantil' },
        { id: 14, title: 'Dormitorio Temático del Espacio', alt: 'Habitación infantil con pared azul profundo' },
        { id: 15, title: 'Dormitorio Juvenil Azul', alt: 'Dormitorio en tonos azules con guitarra en la pared' },
        { id: 16, title: 'Sillón Lino Natural y Madera', alt: 'Sillón tapizado en tejido natural con patas de madera' },
        { id: 17, title: 'Baño con Mueble Negro', alt: 'Baño con mueble negro mate, encimera blanca y espejo redondo' },
        { id: 18, title: 'Escalera de Acero y Roble', alt: 'Escalera metálica negra con peldaños de roble y golden retriever' },
        { id: 19, title: 'Rincón Familiar de Juegos', alt: 'Zona de juegos con futbolín y estanterías' },
        { id: 20, title: 'Ducha de Cristal, Piedra y Madera', alt: 'Baño con mampara de cristal y revestimientos de piedra y madera' },
        { id: 21, title: 'Rincón de Lectura Familiar', alt: 'Acogedor rincón familiar de lectura y juegos' },
      ],
      prev: 'Anterior',
      next: 'Siguiente',
      close: 'Cerrar',
    },
    beforeAfter: {
      eyebrow: 'Antes y Después',
      heading: 'El mismo hogar, un cambio que se siente.',
      desc: 'Un vistazo al salón y la cocina antes de la reforma y después del diseño. Desliza de forma interactiva o mira las fotos completas lado a lado.',
      sliderMode: 'Deslizador Interactivo',
      sideMode: 'Vista Completa Lado a Lado',
      dragHint: 'Arrastra el control a izquierda o derecha para comparar',
      beforeLabel: 'Antes',
      afterLabel: 'Después',
      cases: [
        { id: 'living', title: 'Espacio de Salón', subtitle: 'Desde el mismo ángulo — transformado en un espacio luminoso, cálido y preciso' },
        { id: 'kitchen', title: 'La Cocina', subtitle: 'Rediseño integral que une almacenaje inteligente, flujo y materiales atemporales' },
      ],
    },
    process: {
      eyebrow: 'Cómo Trabajamos',
      heading: 'Proceso claro. Decisiones seguras.',
      desc: 'Una planificación inteligente elimina la incertidumbre y permite avanzar paso a paso con total claridad.',
      steps: [
        { num: '01', title: 'Encuentro y Escucha', description: 'Definimos necesidades, estilo de vida, prioridades y presupuesto.', tag: 'Fase 01 · Brief' },
        { num: '02', title: 'Concepto y Planificación', description: 'Evaluamos alternativas espaciales y definimos el lenguaje visual.', tag: 'Fase 02 · Concepto' },
        { num: '03', title: 'Planos y Detalles', description: 'Traducimos el diseño en planos técnicos claros y precisos.', tag: 'Fase 03 · Planos' },
        { num: '04', title: 'Ejecución y Entrega', description: 'En la modalidad integral avanzamos juntos en selecciones y obra.', tag: 'Fase 04 · Realización' },
      ],
    },
    about: {
      eyebrow: 'Encantada de Conocerte',
      name: 'Orit Goldstein',
      badgeTitle: 'Arquitecta e Ingeniera',
      badgeSub: 'B.Arch · M.Sc · Docente',
      p1: 'Arquitecta y diseñadora de interiores convencida de que el buen diseño nace de comprender profundamente a las personas y el espacio. Combino visión arquitectónica, ingeniería y sensibilidad estética para crear hogares precisos, cómodos y llenos de carácter.',
      p2: 'Cuento con una licenciatura en Arquitectura y Urbanismo y una maestría en Ingeniería Civil especializada en Gestión de Proyectos. Además de formación en home styling, iluminación y materiales, imparto clases de diseño arquitectónico desde hace 12 años.',
      p3: 'Unir estos mundos me permite acompañar cada proyecto con una mirada integral — desde la estructura y los sistemas hasta la luz, los materiales y el último detalle.',
      credentials: [
        { title: 'Licenciatura', subtitle: 'Arquitectura y Urbanismo', accent: 'B.Arch' },
        { title: 'Maestría', subtitle: 'Ingeniería Civil · Gestión', accent: 'M.Sc' },
        { title: '12 Años de Docencia', subtitle: 'Profesora de Diseño Arquitectónico', accent: '12+' },
        { title: 'Formación Continua', subtitle: 'Styling, Iluminación y Materiales', accent: 'Pro' },
      ],
    },
    recommendations: {
      eyebrow: 'Palabras de Clientes',
      heading: 'La experiencia detrás del resultado.',
      desc: 'Testimonios reales de clientes a los que acompañé durante el proceso de diseño y reforma.',
      zoomBtn: 'Clic para ampliar',
    },
    contact: {
      eyebrow: 'El Primer Paso Hacia Tu Hogar',
      heading1: '¿Tienes un sueño para tu hogar?',
      heading2: 'Imaginémoslo juntos.',
      desc: 'Ya sea que estés empezando, evaluando una propiedad antes de comprar o planeando una reforma — estaré encantada de conocerte y definir el mejor camino.',
      emailLabel: 'Correo',
      phoneLabel: 'Teléfono',
      callWord: 'Llamar',
      waSub: 'Disponible en WhatsApp',
      waLabel: 'Enviar mensaje de WhatsApp',
      formTitle: 'Cuéntame sobre tu proyecto',
      formSub: 'Deja tus datos y me pondré en contacto contigo pronto.',
      selectedTrackPrefix: 'Modalidad elegida:',
      successMsg: '¡Gracias por escribir! Tu mensaje fue enviado con éxito.',
      nameLabel: 'Nombre completo',
      namePh: '¿Cómo te llamas?',
      phoneFieldLabel: 'Teléfono',
      phonePh: 'Número de teléfono',
      emailFieldLabel: 'Correo electrónico',
      messageLabel: 'Cuéntame brevemente sobre tu proyecto',
      messagePh: 'Describe lo que estás planeando...',
      prefillTemplate: (s) => `Hola Orit, me encantaría recibir más información sobre "${s}". `,
      privacy: 'Tus datos se envían de forma segura al correo del estudio y se usarán únicamente para responder a tu consulta.',
      submit: 'Enviar Consulta',
    },
    footer: {
      a11yStatement: 'Declaración de Accesibilidad',
      copyright: 'Orit Goldstein · Todos los derechos reservados',
    },
    a11y: {
      skipToContent: 'Saltar al contenido principal',
      menuTitle: 'Menú de Accesibilidad',
      menuSub: 'Norma Israelí 5568 · WCAG 2.0 AA',
      fontSize: 'Tamaño de Texto',
      increaseFont: 'Aumentar Texto',
      decreaseFont: 'Reducir Texto',
      highContrast: 'Alto Contraste',
      monochrome: 'Escala de Grises',
      highlightLinks: 'Resaltar Enlaces',
      readableFont: 'Fuente Legible',
      stopAnimations: 'Detener Animaciones',
      largeCursor: 'Cursor Grande',
      fullStatement: 'Declaración de Accesibilidad',
      reset: 'Restablecer Ajustes',
      statementKicker: 'Reglamento de Igualdad de Derechos para Personas con Discapacidad (Accesibilidad), 2013',
      statementTitle: 'Declaración de Accesibilidad',
      statementIntro: 'El estudio Orit Goldstein – Arquitectura y Diseño de Interiores está comprometido con ofrecer una experiencia digital igualitaria, respetuosa y accesible para todas las personas, conforme a la Ley de Igualdad de Derechos para Personas con Discapacidad de Israel (1998).',
      statementLevelTitle: 'Nivel de Cumplimiento',
      statementLevelBody: 'Este sitio cumple con la Norma Israelí SI 5568 y las pautas internacionales WCAG 2.0 Nivel AA.',
      statementListTitle: 'Adaptaciones Implementadas',
      statementList: [
        'Navegación completa con teclado (Tab, Enter, Esc y flechas) y enlace "Saltar al contenido principal".',
        'Menú interactivo de accesibilidad (atajo Alt+A): tamaño de fuente hasta 150%, alto contraste, escala de grises, resaltado de enlaces, fuente legible, cursor grande y detención de animaciones.',
        'Estructura semántica HTML, regiones ARIA, etiquetas en formularios y textos alternativos en imágenes.',
        'Soporte completo para prefers-reduced-motion y zoom del navegador hasta 200%.',
      ],
      statementPhysicalTitle: 'Reuniones y Accesibilidad Física',
      statementPhysicalBody: 'Las reuniones se realizan con cita previa en el hogar del cliente, en la obra o mediante videollamada accesible (Zoom) para máxima comodidad.',
      statementCoordTitle: 'Contacto de Coordinación de Accesibilidad',
      statementCoordBody: 'Trabajamos continuamente para mejorar la accesibilidad. Si encuentras alguna barrera o sugerencia, contáctanos:',
      statementCoordName: 'Coordinadora de Accesibilidad: Orit Goldstein',
      statementUpdated: 'Última actualización: noviembre de 2026.',
    },
  },
};
