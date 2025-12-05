import type { ReactNode } from 'react';

export type Language = 'ro' | 'en' | 'it' | 'fr' | 'es' | 'zh' | 'ru';

export interface LegalSection {
  title: string;
  paragraphs: string[];
  list?: string[];
  footerNote?: string;
}

export interface TermsAndPrivacy {
  title: string;
  sections: LegalSection[];
  lastUpdated: string;
}

export interface LanguageOption {
  code: Language;
  label: string;
  flag: string;
  name: string;
}

export interface SiteDictionary {
  languageName: string;
  languageNativeName: string;
  navbar: {
    tagline: string;
    menu: {
      products: string;
      orders: string;
      careers: string;
      contact: string;
    };
    mobileMenu: {
      products: string;
      orders: string;
      careers: string;
      contact: string;
      call: string;
      whatsapp: string;
      locations: string;
      orderNow: string;
    };
    phoneCta: string;
    whatsappLabel: string;
    orderButton: string;
    christmasToggle: {
      enable: string;
      disable: string;
    };
  };
  hero: {
    badge: string;
    heading: string;
    subheading: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  infoSection: {
    heading: string;
    description: string;
    cards: {
      schedule: {
        title: string;
        description: string;
        weekdaysLabel: string;
        weekdaysValue: string;
        sundayLabel: string;
        sundayValue: string;
      };
      quality: {
        title: string;
        description: string;
        bullets: string[];
      };
      passion: {
        title: string;
        description: string;
        motto: string;
      };
    };
  };
  productGallery: {
    eyebrow: string;
    title: string;
    description: string;
    products: Array<{
      name: string;
      description: string;
      tag?: string;
    }>;
  };
  customOrders: {
    eyebrow: string;
    title: string;
    description: string;
    features: string[];
    phoneCta: string;
    emailCta: string;
    phoneNumber: string;
    emailAddress: string;
    viewImage: string;
  };
  jobs: {
    eyebrow: string;
    title: string;
    description: string;
    filters: {
      all: string;
      dragasani: string;
      babeni: string;
    };
    loading: string;
    none: string;
    noneFiltered: string;
    successTitle: string;
    successMessage: string;
    applyButton: string;
    modalTitle: string;
    rateLimit: string;
    phoneInvalid: string;
    phoneFake: string;
    submitError: string;
    lockedLocationNote: string;
    locationPrefix: string;
    form: {
      name: { label: string; placeholder: string };
      phone: { label: string; placeholder: string; helper: string };
      location: { label: string; lockedSuffix: string; options: { dragasani: string; babeni: string; either: string } };
      email: { label: string; placeholder: string };
      message: { label: string; placeholder: string };
      cv: { label: string; placeholder: string };
      submit: { idle: string; loading: string };
    };
  };
  mapSection: {
    title: string;
    description: string;
    dragasaniButton: string;
    babeniButton: string;
    intro: string;
    addressLabel: string;
    phoneLabel: string;
    emailLabel: string;
    callCta: string;
    facebookCta: string;
    mapOverlay: string;
  };
  footer: {
    tagline: string;
    categories: string;
    termsLink: string;
    privacyLink: string;
    anpcLink: string;
    anpcDescription: string;
    schedule: string;
    sundayClosed: string;
    locationsNote: string;
    adminLink: string;
  };
  legal: {
    terms: TermsAndPrivacy;
    privacy: TermsAndPrivacy;
  };
  login: {
    title: string;
    userLabel: string;
    passLabel: string;
    submit: string;
    back: string;
    error: string;
  };
  music: {
    promptTitle: string;
    promptDescription: string;
    accept: string;
    decline: string;
    never: string;
    helper: string;
    toastTitle: string;
    toastAction: string;
    toastClose: string;
  };
  orderModal: {
    steps: {
      products: string;
      details: string;
      review: string;
      success: string;
    };
    buttons: {
      next: string;
      back: string;
      submit: string;
      close: string;
      cancel: string;
      confirmClose: string;
      confirmUnpriced: string;
      pickup: string;
      delivery: string;
    };
    labels: {
      name: string;
      phone: string;
      date: string;
      address: string;
      deliveryMethod: string;
      optional: string;
    };
    summary: {
      title: string;
      emptyCart: string;
      standardProducts: string;
      specialProducts: string;
      subtotal: string;
      shippingFee: string;
      packagingFee: string;
      total: string;
      estimatedTotal: string;
    };
    messages: {
      successTitle: string;
      successMessage: string;
      orderId: string;
      copied: string;
      unpricedWarning: string;
      closeWarning: string;
      callForPrice: string;
    };
  };
}

export const languageOptions: LanguageOption[] = [
  { code: 'ro', label: 'RO', flag: '🇷🇴', name: 'Română' },
  { code: 'en', label: 'EN', flag: '', name: 'English' },
  { code: 'it', label: 'IT', flag: '🇮🇹', name: 'Italiano' },
  { code: 'fr', label: 'FR', flag: '🇫🇷', name: 'Français' },
  { code: 'es', label: 'ES', flag: '🇪🇸', name: 'Español' },
  { code: 'zh', label: '中文', flag: '🇨🇳', name: '中文' },
  { code: 'ru', label: 'RU', flag: '🇷🇺', name: 'Русский' },
];

export const translations: Record<Language, SiteDictionary> = {
  ro: {
    languageName: 'Romanian',
    languageNativeName: 'Română',
    navbar: {
      tagline: 'Patiserie Artizanală',
      menu: {
        products: 'Produse',
        orders: 'Comenzi',
        careers: 'Cariere',
        contact: 'Contact',
      },
      mobileMenu: {
        products: 'Produsele Noastre',
        orders: 'Comenzi Personalizate',
        careers: 'Cariere',
        contact: 'Locație & Program',
        call: 'Sună Acum',
        whatsapp: 'WhatsApp',
        locations: 'Vezi Locațiile',
        orderNow: 'Comandă Acum',
      },
      phoneCta: '0754 554 194',
      whatsappLabel: 'WhatsApp',
      orderButton: 'Comandă',
      christmasToggle: {
        enable: 'Activează modul Crăciun',
        disable: 'Dezactivează modul Crăciun',
      },
    },
    hero: {
      badge: 'Drăgășani • Băbeni',
      heading: 'Officina del Gusto',
      subheading: 'Magia gustului autentic',
      description:
        'Te trezești cu mirosul covrigilor calzi? Noi suntem deja aici de la ora 6:00, pregătind cele mai bune merdenele, pizza și plăcinte pentru tine.',
      primaryCta: 'Vezi Bunătățile',
      secondaryCta: 'Locațiile Noastre',
    },
    infoSection: {
      heading: 'Tradiție și Pasiune',
      description:
        'La Officina del Gusto credem că ziua bună se cunoaște de dimineață, mai exact de la prima oră când scoatem covrigii calzi din cuptor.',
      cards: {
        schedule: {
          title: 'Program Extins',
          description: 'Suntem aici pentru micul tău dejun, prânz sau gustare de seară.',
          weekdaysLabel: 'Luni - Sâmbătă',
          weekdaysValue: '06:00 - 20:00',
          sundayLabel: 'Duminică',
          sundayValue: 'Închis',
        },
        quality: {
          title: 'Ingrediente Alese',
          description:
            'Nu facem compromisuri la calitate. Făina, brânza și ingredientele pentru pizza sunt atent selecționate pentru a oferi gustul autentic de casă.',
          bullets: ['Aluat frământat zilnic', 'Produse mereu proaspete', 'Rețete tradiționale'],
        },
        passion: {
          title: 'Din Dragoste',
          description:
            'Suntem o afacere de familie cu locații în Drăgășani și Băbeni. Ne place să vedem zâmbetele clienților noștri când gustă din produsele noastre.',
          motto: 'Gustul care te aduce înapoi',
        },
      },
    },
    productGallery: {
      eyebrow: 'Delicii Zilnice',
      title: 'Produsele Noastre',
      description: 'Fiecare produs este preparat manual în laboratorul nostru, folosind doar ingrediente naturale.',
      products: [
        {
          name: 'Covrigi Calzi',
          description: 'Simbolul dimineților perfecte. Covrigi rumeniți cu susan, mac sau sare, proaspăt scoși din cuptor.',
          tag: 'Best Seller',
        },
        {
          name: 'Merdenele',
          description: 'Foietaj fin și crocant, umplut generos cu brânză sărată. Gustul clasic românesc.',
        },
        {
          name: 'Pizza de Casă',
          description: 'Pizza de casă cu blat pufos, sos bogat de roșii și ingrediente din belșug. O masă completă.',
          tag: 'Rețetă Proprie',
        },
        {
          name: 'Plăcintă cu Mere',
          description: 'Dulcele preferat al tuturor. Plăcintă aromată cu mere și scorțișoară, pudrată cu zahăr.',
        },
        {
          name: 'Covrig tip Hot Dog',
          description: 'O gustare sățioasă: crenvurșt de calitate învelit în aluat pufos de covrig.',
          tag: 'Gustare Rapidă',
        },
        {
          name: 'Ștrudele',
          description: 'Ștrudele aurii cu diverse umpluturi dulci sau sărate.',
        },
        {
          name: 'Pateuri',
          description: 'Mini-delicii din foietaj cu brânză, ciuperci sau carne. Perfecte pentru orice moment al zilei.',
        },
        {
          name: 'Specialități de Sezon',
          description: 'Întreabă în magazin de noutățile noastre! Mereu pregătim ceva special.',
        },
      ],
    },
    customOrders: {
      eyebrow: 'Comenzi Speciale',
      title: 'Onorăm Comenzi pentru Orice Ocazie',
      description: 'Evenimente, sărbători, petreceri sau orice alt tip de comandă care implică produse de patiserie — suntem pregătiți să te ajutăm!',
      features: [
        'Nunți și botezuri',
        'Petreceri și aniversări',
        'Evenimente corporate',
        'Sărbători și ocazii speciale',
      ],
      phoneCta: 'Sună-ne',
      emailCta: 'Trimite email',
      phoneNumber: '0754 554 194',
      emailAddress: 'odgdragasani@gmail.com',
      viewImage: 'Vezi',
    },
    jobs: {
      eyebrow: 'Alătură-te echipei',
      title: 'Cariere la Officina',
      description:
        'Căutăm oameni pasionați, harnici și cu zâmbetul pe buze. Dacă vrei să lucrezi într-un mediu cald (la propriu și la figurat), te așteptăm!',
      filters: {
        all: 'Toate',
        dragasani: 'Drăgășani',
        babeni: 'Băbeni',
      },
      loading: 'Se încarcă lista...',
      none: 'Nu sunt joburi active momentan.',
      noneFiltered: 'Nu sunt joburi active momentan în locația selectată.',
      successTitle: 'Mulțumim!',
      successMessage: 'Am primit aplicația ta. Te vom contacta în curând dacă profilul tău se potrivește.',
      applyButton: 'Aplică Acum',
      modalTitle: 'Aplică pentru postul:',
      rateLimit: 'Ai trimis recent o aplicație. Te rugăm să aștepți 1 minut înainte de a trimite alta.',
      phoneInvalid: 'Te rugăm să introduci un număr de telefon valid (ex: 0712 345 678 sau +39 123 456 789).',
      phoneFake: 'Acest număr de telefon nu pare valid. Te rugăm să introduci un număr real.',
      submitError: 'A apărut o eroare la trimitere. Te rugăm să încerci din nou.',
      lockedLocationNote: '(Stabilită de job)',
      locationPrefix: 'Locație Dorită',
      form: {
        name: { label: 'Nume și Prenume *', placeholder: 'Ex: Popescu Maria' },
        phone: {
          label: 'Număr de Telefon *',
          placeholder: 'Ex: 0712 345 678 sau +39 123 456 789',
          helper: 'Acceptăm numere românești sau internaționale',
        },
        location: {
          label: 'Locație Dorită *',
          lockedSuffix: '(Stabilită de job)',
          options: {
            dragasani: 'Drăgășani',
            babeni: 'Băbeni',
            either: 'Oricare',
          },
        },
        email: { label: 'Email (Opțional)', placeholder: 'Ex: maria@email.com' },
        message: { label: 'Mesaj (Opțional)', placeholder: 'Spune-ne câteva cuvinte despre tine...' },
        cv: { label: 'Încarcă CV (Opțional)', placeholder: 'Apasă pentru a încărca (PDF, Imagine)' },
        submit: { idle: 'Trimite Aplicația', loading: 'Se trimite...' },
      },
    },
    mapSection: {
      title: 'Te așteptăm pe la noi!',
      description: 'Fie că ești în drum spre serviciu sau vrei să iei ceva bun pentru acasă, oprește-te la noi.',
      dragasaniButton: 'Drăgășani',
      babeniButton: 'Băbeni',
      intro:
        'Fie că ești în drum spre serviciu sau vrei să iei ceva bun pentru acasă, oprește-te la noi în locațiile noastre. Mirosul de patiserie caldă te va ghida.',
      addressLabel: 'Adresa',
      phoneLabel: 'Comenzi Telefonice',
      emailLabel: 'Email',
      callCta: 'Navighează',
      facebookCta: 'Facebook',
      mapOverlay: 'Click pentru a interacționa',
    },
    footer: {
      tagline: 'Patiserie • Pizza • Tradiție',
      categories: 'Patiserie • Pizza • Tradiție',
      termsLink: 'Termeni și Condiții',
      privacyLink: 'Politica de Confidențialitate',
      anpcLink: 'ANPC',
      anpcDescription: 'Soluționarea alternativă a litigiilor / Soluționarea online a litigiilor',
      schedule: 'Luni - Sâmbătă: 06:00 - 20:00',
      sundayClosed: 'Duminică: Închis',
      locationsNote: 'Magazine în Drăgășani și Băbeni.',
      adminLink: 'Admin Login',
    },
    legal: {
      terms: {
        title: 'Termeni și Condiții',
        lastUpdated: 'Ultima actualizare',
        sections: [
          {
            title: '1. Informații Generale',
            paragraphs: [
              'Acest website este operat de Officina del Gusto, cu sediul în Drăgășani, județul Vâlcea, România.',
              'Contact: Telefon: 0754 554 194 • Email: odgdragasani@gmail.com',
            ],
          },
          {
            title: '2. Obiectul Activității',
            paragraphs: [
              'Officina del Gusto este o patiserie artizanală care oferă produse de panificație, patiserie și pizza în locațiile din Drăgășani și Băbeni. Produsele sunt disponibile exclusiv pentru ridicare din locațiile noastre fizice.',
            ],
          },
          {
            title: '3. Utilizarea Website-ului',
            paragraphs: [
              'Acest website are scop informativ și prezintă produsele și serviciile noastre. De asemenea, oferim posibilitatea de a aplica pentru pozițiile disponibile în echipa noastră.',
            ],
          },
          {
            title: '4. Proprietate Intelectuală',
            paragraphs: [
              'Toate materialele prezente pe acest website (texte, imagini, logo-uri, design) sunt proprietatea Officina del Gusto și sunt protejate de legile privind drepturile de autor.',
            ],
          },
          {
            title: '5. Limitarea Răspunderii',
            paragraphs: [
              'Ne rezervăm dreptul de a modifica disponibilitatea produselor și programul de funcționare fără notificare prealabilă. Informațiile de pe website sunt orientative.',
            ],
          },
          {
            title: '6. Soluționarea Litigiilor',
            paragraphs: [
              'În cazul unor eventuale litigii, consumatorii pot apela la ANPC - Soluționarea Alternativă a Litigiilor (SAL) sau la Platforma Europeană ODR pentru Soluționarea Online a Litigiilor.',
            ],
          },
          {
            title: '7. Legea Aplicabilă',
            paragraphs: ['Acești termeni și condiții sunt guvernați de legislația din România.'],
          },
        ],
      },
      privacy: {
        title: 'Politica de Confidențialitate',
        lastUpdated: 'Ultima actualizare',
        sections: [
          {
            title: '1. Introducere',
            paragraphs: [
              'Officina del Gusto respectă confidențialitatea vizitatorilor website-ului nostru și se angajează să protejeze datele personale în conformitate cu Regulamentul GDPR.',
            ],
          },
          {
            title: '2. Date Colectate',
            paragraphs: ['Colectăm următoarele categorii de date personale:'],
            list: [
              'Date de contact: nume, telefon, email (pentru aplicații)',
              'CV-uri și mesaje transmise prin formular',
              'Date tehnice anonime pentru îmbunătățirea website-ului',
            ],
          },
          {
            title: '3. Scopul Prelucrării',
            paragraphs: ['Datele sunt folosite pentru procesarea aplicațiilor, contactarea candidaților și îmbunătățirea serviciilor.'],
          },
          {
            title: '4. Stocarea Datelor',
            paragraphs: [
              'Datele personale sunt stocate în siguranță și sunt păstrate doar pe perioada necesară îndeplinirii scopurilor pentru care au fost colectate. CV-urile sunt păstrate maximum 6 luni după finalizarea recrutării.',
            ],
          },
          {
            title: '5. Drepturile Dumneavoastră',
            paragraphs: ['Conform GDPR aveți dreptul de acces, rectificare, ștergere, restricționare, portabilitate și opoziție.'],
          },
          {
            title: '6. Contact DPO',
            paragraphs: ['Pentru solicitări legate de date personale: odgdragasani@gmail.com / 0754 554 194.'],
          },
          {
            title: '7. Plângeri',
            paragraphs: ['Puteți depune o plângere la ANSPDCP - www.dataprotection.ro.'],
          },
        ],
      },
    },
    login: {
      title: 'Acces Administrare',
      userLabel: 'Utilizator',
      passLabel: 'Parolă',
      submit: 'Autentificare',
      back: 'Înapoi la site',
      error: 'User sau parolă incorecte!',
    },
    music: {
      promptTitle: 'Pornește muzica de Crăciun?',
      promptDescription: 'Avem un fundal discret cu colinde la ~20% volum. Vrei să îl auzi?',
      accept: 'Da, pornește muzica',
      decline: 'Nu acum',
      never: 'Nu mă mai întreba niciodată',
      helper: 'Poți controla oricând muzica din header-ul paginii.',
      toastTitle: 'Muzică de Crăciun disponibilă!',
      toastAction: 'Pornește muzica',
      toastClose: 'Închide',
    },
    orderModal: {
      steps: {
        products: 'Alege Produsele',
        details: 'Detalii Livrare',
        review: 'Revizuire Comandă',
        success: 'Comandă Trimisă!',
      },
      buttons: {
        next: 'Continuă',
        back: 'Înapoi',
        submit: 'Confirmă și Trimite Comanda',
        close: 'Închide',
        cancel: 'Anulează',
        confirmClose: 'Da, închide',
        confirmUnpriced: 'Am înțeles, Trimite',
        pickup: 'Ridicare',
        delivery: 'Livrare',
      },
      labels: {
        name: 'Numele Tău',
        phone: 'Număr de Telefon',
        date: 'Data Dorită',
        address: 'Adresa de Livrare',
        deliveryMethod: 'Metoda de Livrare',
        optional: '(Opțional)',
      },
      summary: {
        title: 'Sumar Comandă',
        emptyCart: 'Coșul este gol.',
        standardProducts: 'PRODUSE STANDARD',
        specialProducts: 'COMENZI SPECIALE',
        subtotal: 'Subtotal Produse',
        shippingFee: 'Taxă Livrare',
        packagingFee: 'Taxă Ambalaj',
        total: 'Total General',
        estimatedTotal: 'Total Estimativ',
      },
      messages: {
        successTitle: 'Comandă Trimisă!',
        successMessage: 'Mulțumim pentru comandă! Te vom contacta în curând pentru confirmare.',
        orderId: 'ID COMANDĂ',
        copied: 'Copiat!',
        unpricedWarning: 'Unele produse din coș nu au un preț setat. Te rugăm să contactezi magazinul pentru o ofertă finală după trimiterea comenzii.',
        closeWarning: 'Toate produsele din coș și datele introduse se vor pierde. Ești sigur?',
        callForPrice: 'Suna pt. pret',
      },
    },
  },
  en: {
    languageName: 'English',
    languageNativeName: 'English',
    navbar: {
      tagline: 'Artisanal Bakery',
      menu: {
        products: 'Products',
        orders: 'Orders',
        careers: 'Careers',
        contact: 'Contact',
      },
      mobileMenu: {
        products: 'Our Products',
        orders: 'Custom Orders',
        careers: 'Careers',
        contact: 'Location & Hours',
        call: 'Call Now',
        whatsapp: 'WhatsApp',
        locations: 'See Locations',
        orderNow: 'Order Now',
      },
      phoneCta: '0754 554 194',
      whatsappLabel: 'WhatsApp',
      orderButton: 'Order',
      christmasToggle: {
        enable: 'Enable Christmas mode',
        disable: 'Disable Christmas mode',
      },
    },
    hero: {
      badge: 'Drăgășani • Băbeni',
      heading: 'Officina del Gusto',
      subheading: 'The magic of authentic taste',
      description:
        'Up before dawn, we bake warm pretzels, savory pies, and hearty pizzas so your day can start with the smell of something delicious.',
      primaryCta: 'See the goodies',
      secondaryCta: 'Our locations',
    },
    infoSection: {
      heading: 'Tradition & Passion',
      description:
        'At Officina del Gusto we believe good days start early—right when the first tray of freshly baked pretzels comes out of the oven.',
      cards: {
        schedule: {
          title: 'Extended Hours',
          description: 'Breakfast, lunch, or an evening treat—we are here all day.',
          weekdaysLabel: 'Monday - Saturday',
          weekdaysValue: '06:00 - 20:00',
          sundayLabel: 'Sunday',
          sundayValue: 'Closed',
        },
        quality: {
          title: 'Selected Ingredients',
          description:
            'Premium flour, fresh cheese, and generous toppings. We bake everything daily and stay true to family recipes.',
          bullets: ['Dough kneaded every morning', 'Always-fresh batches', 'Honest traditional recipes'],
        },
        passion: {
          title: 'Made with Love',
          description:
            'We are a family business in Drăgășani and Băbeni. Seeing customers smile after the first bite is our favorite feedback.',
          motto: 'The taste that brings you back',
        },
      },
    },
    productGallery: {
      eyebrow: 'Daily treats',
      title: 'Our products',
      description: 'Handmade in our workshop every day, using natural ingredients only.',
      products: [
        {
          name: 'Warm Pretzels',
          description: 'Golden pretzels topped with sesame, poppy seeds, or salt—fresh from the oven.',
          tag: 'Best Seller',
        },
        {
          name: 'Cheese Pastries',
          description: 'Flaky pastries generously filled with salty cheese—the Romanian merdenea classic.',
        },
        {
          name: 'Bakery-Style Pizza',
          description: 'Fluffy crust, rich tomato sauce, and generous toppings. Comfort-food pizza.',
          tag: 'House Recipe',
        },
        {
          name: 'Apple Pie',
          description: 'Aromatic apple filling with cinnamon and a light dusting of sugar.',
        },
        {
          name: 'Pretzel Hot Dog',
          description: 'A hearty snack: quality sausage wrapped in our soft pretzel dough.',
          tag: 'Grab & Go',
        },
        {
          name: 'Strudels',
          description: 'Golden strudels with sweet or savory fillings.',
        },
        {
          name: 'Puff Pastry Bites',
          description: 'Mini pastries filled with cheese, mushrooms, or meat—perfect anytime.',
        },
        {
          name: 'Seasonal Specials',
          description: 'Ask in store for the latest limited creations.',
        },
      ],
    },
    customOrders: {
      eyebrow: 'Custom Orders',
      title: 'We Honor Orders for Any Occasion',
      description: 'Events, celebrations, holidays, or any type of order involving pastry products — we are ready to help!',
      features: [
        'Weddings & christenings',
        'Parties & birthdays',
        'Corporate events',
        'Holidays & special occasions',
      ],
      phoneCta: 'Call us',
      emailCta: 'Send email',
      phoneNumber: '0754 554 194',
      emailAddress: 'odgdragasani@gmail.com',
      viewImage: 'View',
    },
    jobs: {
      eyebrow: 'Join the team',
      title: 'Careers at Officina',
      description:
        'We are looking for cheerful, hardworking people who enjoy warm ovens and friendly customers. If that is you, hop in!',
      filters: {
        all: 'All',
        dragasani: 'Drăgășani',
        babeni: 'Băbeni',
      },
      loading: 'Loading jobs...',
      none: 'No active openings right now.',
      noneFiltered: 'No roles available in this location yet.',
      successTitle: 'Thank you!',
      successMessage: 'We received your application and will get in touch if there is a match.',
      applyButton: 'Apply now',
      modalTitle: 'Apply for:',
      rateLimit: 'You recently applied. Please wait one minute before sending another application.',
      phoneInvalid: 'Please enter a valid phone number (e.g. 0712 345 678 or +39 123 456 789).',
      phoneFake: 'The phone number looks invalid. Please double-check it.',
      submitError: 'Something went wrong. Please try again.',
      lockedLocationNote: '(Locked by role)',
      locationPrefix: 'Preferred location',
      form: {
        name: { label: 'Full name *', placeholder: 'Example: Maria Popescu' },
        phone: {
          label: 'Phone number *',
          placeholder: 'Example: 0712 345 678 or +39 123 456 789',
          helper: 'Romanian or international numbers are accepted',
        },
        location: {
          label: 'Preferred location *',
          lockedSuffix: '(Locked by role)',
          options: { dragasani: 'Drăgășani', babeni: 'Băbeni', either: 'Either' },
        },
        email: { label: 'Email (optional)', placeholder: 'example@email.com' },
        message: { label: 'Message (optional)', placeholder: 'Tell us a little about yourself...' },
        cv: { label: 'Upload CV (optional)', placeholder: 'Click to upload (PDF or image)' },
        submit: { idle: 'Send application', loading: 'Sending...' },
      },
    },
    mapSection: {
      title: 'Come visit us!',
      description: 'Whether you need breakfast on the go or a warm treat for home, stop by one of our shops.',
      dragasaniButton: 'Drăgășani',
      babeniButton: 'Băbeni',
      intro:
        'Drop in whenever you are nearby—fresh pastry aroma will guide you. Both Drăgășani and Băbeni shops are ready for you.',
      addressLabel: 'Address',
      phoneLabel: 'Phone orders',
      emailLabel: 'Email',
      callCta: 'Navigate',
      facebookCta: 'Facebook',
      mapOverlay: 'Click to interact',
    },
    footer: {
      tagline: 'Bakery • Pizza • Tradition',
      categories: 'Bakery • Pizza • Tradition',
      termsLink: 'Terms & Conditions',
      privacyLink: 'Privacy Policy',
      anpcLink: 'ANPC',
      anpcDescription: 'Alternative dispute resolution / Online dispute resolution',
      schedule: 'Mon - Sat: 06:00 - 20:00',
      sundayClosed: 'Sunday: Closed',
      locationsNote: 'Locations in Drăgășani and Băbeni.',
      adminLink: 'Admin Login',
    },
    legal: {
      terms: {
        title: 'Terms & Conditions',
        lastUpdated: 'Last updated',
        sections: [
          {
            title: '1. General Information',
            paragraphs: [
              'This website is operated by Officina del Gusto, based in Drăgășani, Vâlcea, Romania.',
              'Contact: Phone +40 754 554 194 • Email odgdragasani@gmail.com',
            ],
          },
          {
            title: '2. Scope of Activity',
            paragraphs: [
              'Officina del Gusto is an artisan bakery offering baked goods, pastries, and pizza in the Drăgășani and Băbeni locations. Products are available for pick-up only.',
            ],
          },
          {
            title: '3. Website Use',
            paragraphs: [
              'The website showcases our menu and allows candidates to apply for open positions. It is purely informative.',
            ],
          },
          {
            title: '4. Intellectual Property',
            paragraphs: [
              'Texts, images, logos, and layouts belong to Officina del Gusto and are protected by copyright law.',
            ],
          },
          {
            title: '5. Liability',
            paragraphs: [
              'Product availability and opening hours may change without notice. Website information is indicative.',
            ],
          },
          {
            title: '6. Dispute Resolution',
            paragraphs: [
              'Consumers may contact ANPC (Romanian ADR authority) or the EU ODR Platform for disputes.',
            ],
          },
          {
            title: '7. Governing Law',
            paragraphs: ['These terms are governed by Romanian law.'],
          },
        ],
      },
      privacy: {
        title: 'Privacy Policy',
        lastUpdated: 'Last updated',
        sections: [
          {
            title: '1. Introduction',
            paragraphs: ['We comply with GDPR and protect personal data shared with us.'],
          },
          {
            title: '2. Data Collected',
            paragraphs: ['We collect:'],
            list: [
              'Contact data (name, phone, email) for job applications',
              'CVs and attached messages',
              'Anonymous technical data to improve the site',
            ],
          },
          {
            title: '3. Purpose',
            paragraphs: ['Applications are processed to evaluate candidates and contact them if needed.'],
          },
          {
            title: '4. Storage',
            paragraphs: ['Data is stored securely and CVs are deleted within 6 months after recruitment.'],
          },
          {
            title: '5. Rights',
            paragraphs: ['You may request access, correction, deletion, restriction, portability, or object to processing.'],
          },
          {
            title: '6. Contact',
            paragraphs: ['Email odgdragasani@gmail.com or call +40 754 554 194 for GDPR requests.'],
          },
          {
            title: '7. Complaints',
            paragraphs: ['Complaints can be filed with the Romanian DPA (ANSPDCP).'],
          },
        ],
      },
    },
    login: {
      title: 'Admin Access',
      userLabel: 'Username',
      passLabel: 'Password',
      submit: 'Sign in',
      back: 'Back to site',
      error: 'Wrong username or password!',
    },
    music: {
      promptTitle: 'Turn on Christmas music?',
      promptDescription: 'We have a soft carol playlist at ~20% volume. Want to hear it?',
      accept: 'Yes, play the music',
      decline: 'Not now',
      never: 'Never ask again',
      helper: 'You can control the player from the header at any time.',
      toastTitle: 'Christmas music available!',
      toastAction: 'Play music',
      toastClose: 'Close',
    },
    orderModal: {
      steps: {
        products: 'Choose Products',
        details: 'Delivery Details',
        review: 'Review Order',
        success: 'Order Sent!',
      },
      buttons: {
        next: 'Continue',
        back: 'Back',
        submit: 'Confirm and Send Order',
        close: 'Close',
        cancel: 'Cancel',
        confirmClose: 'Yes, close',
        confirmUnpriced: 'I understand, Send',
        pickup: 'Pickup',
        delivery: 'Delivery',
      },
      labels: {
        name: 'Your Name',
        phone: 'Phone Number',
        date: 'Preferred Date',
        address: 'Delivery Address',
        deliveryMethod: 'Delivery Method',
        optional: '(Optional)',
      },
      summary: {
        title: 'Order Summary',
        emptyCart: 'Your cart is empty.',
        standardProducts: 'STANDARD PRODUCTS',
        specialProducts: 'SPECIAL ORDERS',
        subtotal: 'Subtotal',
        shippingFee: 'Delivery Fee',
        packagingFee: 'Packaging Fee',
        total: 'Grand Total',
        estimatedTotal: 'Estimated Total',
      },
      messages: {
        successTitle: 'Order Sent!',
        successMessage: 'Thank you for your order! We will contact you shortly for confirmation.',
        orderId: 'ORDER ID',
        copied: 'Copied!',
        unpricedWarning: 'Some items in your cart do not have a set price. Please contact the store for a final offer after submitting the order.',
        closeWarning: 'All items in the cart and entered data will be lost. Are you sure?',
        callForPrice: 'Call for price',
      },
    },
  },
  it: {
    languageName: 'Italian',
    languageNativeName: 'Italiano',
    navbar: {
      tagline: 'Pasticceria Artigianale',
      menu: {
        products: 'Prodotti',
        orders: 'Ordini',
        careers: 'Carriere',
        contact: 'Contatti',
      },
      mobileMenu: {
        products: 'I nostri prodotti',
        orders: 'Ordini Personalizzati',
        careers: 'Lavora con noi',
        contact: 'Sedi e orari',
        call: 'Chiama ora',
        whatsapp: 'WhatsApp',
        locations: 'Vedi sedi',
        orderNow: 'Ordina Ora',
      },
      phoneCta: '0754 554 194',
      whatsappLabel: 'WhatsApp',
      orderButton: 'Ordina',
      christmasToggle: {
        enable: 'Attiva modalità Natale',
        disable: 'Disattiva modalità Natale',
      },
    },
    hero: {
      badge: 'Drăgășani • Băbeni',
      heading: 'Officina del Gusto',
      subheading: 'La magia del sapore autentico',
      description:
        'Siamo in laboratorio all alba per sfornare covrigi caldi, merdenele salate e pizze soffici per tutta la giornata.',
      primaryCta: 'Guarda le bontà',
      secondaryCta: 'Le nostre sedi',
    },
    infoSection: {
      heading: 'Tradizione e Passione',
      description:
        'Per noi una buona giornata inizia prestissimo, quando il primo vassoio di covrigi esce dal forno.',
      cards: {
        schedule: {
          title: 'Orario esteso',
          description: 'Colazione, pranzo o merenda serale: siamo sempre qui.',
          weekdaysLabel: 'Lunedì - Sabato',
          weekdaysValue: '06:00 - 20:00',
          sundayLabel: 'Domenica',
          sundayValue: 'Chiuso',
        },
        quality: {
          title: 'Ingredienti scelti',
          description:
            'Farine selezionate, formaggi freschi e ricette di famiglia per mantenere un gusto casalingo.',
          bullets: ['Impasto fresco ogni giorno', 'Prodotti sempre appena sfornati', 'Ricette tradizionali'],
        },
        passion: {
          title: 'Fatti con amore',
          description:
            'Siamo un azienda familiare con negozi a Drăgășani e Băbeni. Il nostro obiettivo è vederti sorridere al primo morso.',
          motto: 'Il gusto che ti riporta qui',
        },
      },
    },
    productGallery: {
      eyebrow: 'Delizie quotidiane',
      title: 'I nostri prodotti',
      description: 'Prepariamo tutto a mano con ingredienti naturali.',
      products: [
        { name: 'Covrigi caldi', description: 'Anelli dorati con sesamo, papavero o sale, appena sfornati.', tag: 'Best Seller' },
        { name: 'Merdenele', description: 'Sfoglia croccante ripiena di formaggio salato.' },
        { name: 'Pizza casalinga', description: 'Impasto soffice, salsa di pomodoro ricca e condimenti generosi.', tag: 'Ricetta di casa' },
        { name: 'Torta di mele', description: 'Ripieno profumato di mele e cannella con zucchero a velo.' },
        { name: 'Hot dog al covrig', description: 'Wurstel di qualità avvolto nel nostro impasto morbido.', tag: 'Snack veloce' },
        { name: 'Strudel', description: 'Strudel dorati con ripieni dolci o salati.' },
        { name: 'Bocconcini di sfoglia', description: 'Morsi fragranti con formaggio, funghi o carne.' },
        { name: 'Specialità di stagione', description: 'Chiedi in negozio le novità del momento.' },
      ],
    },
    customOrders: {
      eyebrow: 'Ordini Speciali',
      title: 'Ordini per Ogni Occasione',
      description: 'Eventi, celebrazioni, festività o qualsiasi tipo di ordine legato alla pasticceria — siamo pronti ad aiutarti!',
      features: [
        'Matrimoni e battesimi',
        'Feste e compleanni',
        'Eventi aziendali',
        'Festività e occasioni speciali',
      ],
      phoneCta: 'Chiamaci',
      emailCta: 'Invia email',
      phoneNumber: '0754 554 194',
      emailAddress: 'odgdragasani@gmail.com',
      viewImage: 'Vedi',
    },
    jobs: {
      eyebrow: 'Entra nel team',
      title: 'Carriere in Officina',
      description: 'Cerchiamo persone sorridenti e laboriose. Se ami lavorare in un ambiente caldo, ti aspettiamo!',
      filters: { all: 'Tutte', dragasani: 'Drăgășani', babeni: 'Băbeni' },
      loading: 'Caricamento offerte...',
      none: 'Nessuna posizione aperta al momento.',
      noneFiltered: 'Nessuna posizione disponibile in questa sede.',
      successTitle: 'Grazie!',
      successMessage: 'Abbiamo ricevuto la tua candidatura. Ti contatteremo appena possibile.',
      applyButton: 'Candidati ora',
      modalTitle: 'Candidatura per:',
      rateLimit: 'Hai inviato di recente una candidatura. Attendi un minuto prima di riprovare.',
      phoneInvalid: 'Inserisci un numero valido (es. 0712 345 678 o +39 123 456 789).',
      phoneFake: 'Il numero non sembra corretto. Controllalo per favore.',
      submitError: 'Si è verificato un errore. Riprova.',
      lockedLocationNote: '(Stabilito dal ruolo)',
      locationPrefix: 'Sede preferita',
      form: {
        name: { label: 'Nome e cognome *', placeholder: 'Es: Maria Popescu' },
        phone: { label: 'Telefono *', placeholder: 'Es: 0712 345 678 o +39 123 456 789', helper: 'Accettiamo numeri rumeni o internazionali' },
        location: { label: 'Sede preferita *', lockedSuffix: '(Stabilito dal ruolo)', options: { dragasani: 'Drăgășani', babeni: 'Băbeni', either: 'Qualsiasi' } },
        email: { label: 'Email (opzionale)', placeholder: 'esempio@email.com' },
        message: { label: 'Messaggio (opzionale)', placeholder: 'Raccontaci qualcosa di te...' },
        cv: { label: 'Carica CV (opzionale)', placeholder: 'Clicca per caricare (PDF o immagine)' },
        submit: { idle: 'Invia candidatura', loading: 'Invio in corso...' },
      },
    },
    mapSection: {
      title: 'Ti aspettiamo!',
      description: 'Passa da noi per una colazione veloce o una pausa gustosa da portare a casa.',
      dragasaniButton: 'Drăgășani',
      babeniButton: 'Băbeni',
      intro: 'Entrambe le sedi sono pronte ad accoglierti con profumo di forno appena acceso.',
      addressLabel: 'Indirizzo',
      phoneLabel: 'Telefono ordini',
      emailLabel: 'Email',
      callCta: 'Naviga',
      facebookCta: 'Facebook',
      mapOverlay: 'Clicca per interagire',
    },
    footer: {
      tagline: 'Pasticceria • Pizza • Tradizione',
      categories: 'Pasticceria • Pizza • Tradizione',
      termsLink: 'Termini e condizioni',
      privacyLink: 'Privacy',
      anpcLink: 'ANPC',
      anpcDescription: 'Risoluzione alternativa / Risoluzione online delle controversie',
      schedule: 'Lun - Sab: 06:00 - 20:00',
      sundayClosed: 'Domenica: Chiuso',
      locationsNote: 'Negozi a Drăgășani e Băbeni.',
      adminLink: 'Area Admin',
    },
    legal: {
      terms: {
        title: 'Termini e condizioni',
        lastUpdated: 'Ultimo aggiornamento',
        sections: [
          {
            title: '1. Informazioni generali',
            paragraphs: ['Sito gestito da Officina del Gusto, Drăgășani, Romania.', 'Contatto: +40 754 554 194 • odgdragasani@gmail.com'],
          },
          {
            title: '2. Attività',
            paragraphs: ['Produciamo prodotti da forno artigianali disponibili per il ritiro in negozio.'],
          },
          {
            title: '3. Uso del sito',
            paragraphs: ['Le informazioni hanno scopo illustrativo e consentono di inviare candidature lavorative.'],
          },
          {
            title: '4. Proprietà intellettuale',
            paragraphs: ['Testi e immagini sono di proprietà di Officina del Gusto.'],
          },
          {
            title: '5. Responsabilità',
            paragraphs: ['Orari e prodotti possono cambiare senza preavviso.'],
          },
          {
            title: '6. Controversie',
            paragraphs: ['Per controversie rivolgersi ad ANPC o alla piattaforma europea ODR.'],
          },
          { title: '7. Legge applicabile', paragraphs: ['Legislazione rumena.'] },
        ],
      },
      privacy: {
        title: 'Informativa privacy',
        lastUpdated: 'Ultimo aggiornamento',
        sections: [
          { title: '1. Introduzione', paragraphs: ['Rispettiamo il GDPR e proteggiamo i dati personali.'] },
          { title: '2. Dati raccolti', paragraphs: ['Raccogliamo dati di contatto, CV allegati e dati tecnici anonimi.'] },
          { title: '3. Finalità', paragraphs: ['Valutare i candidati e migliorare i servizi.'] },
          { title: '4. Conservazione', paragraphs: ['I dati sono conservati in sicurezza e i CV cancellati entro 6 mesi.'] },
          { title: '5. Diritti', paragraphs: ['Accesso, rettifica, cancellazione, limitazione, portabilità e opposizione.'] },
          { title: '6. Contatto', paragraphs: ['Scrivi a odgdragasani@gmail.com o chiama +40 754 554 194.'] },
          { title: '7. Reclami', paragraphs: ['Ricorso possibile presso l autorità rumena ANSPDCP.'] },
        ],
      },
    },
    login: {
      title: 'Accesso amministratore',
      userLabel: 'Utente',
      passLabel: 'Password',
      submit: 'Entra',
      back: 'Torna al sito',
      error: 'Credenziali errate!',
    },
    music: {
      promptTitle: 'Avvia la musica di Natale?',
      promptDescription: 'Una playlist soffusa al 20% di volume. Vuoi ascoltarla?',
      accept: 'Sì, avvia la musica',
      decline: 'Non ora',
      never: 'Non chiedermelo più',
      helper: 'Puoi usare i controlli nel menu in qualsiasi momento.',
      toastTitle: 'Musica di Natale disponibile!',
      toastAction: 'Avvia musica',
      toastClose: 'Chiudi',
    },
    orderModal: {
      steps: {
        products: 'Choose Products',
        details: 'Delivery Details',
        review: 'Review Order',
        success: 'Order Sent!',
      },
      buttons: {
        next: 'Continue',
        back: 'Back',
        submit: 'Confirm and Send Order',
        close: 'Close',
        cancel: 'Cancel',
        confirmClose: 'Yes, close',
        confirmUnpriced: 'I understand, Send',
        pickup: 'Pickup',
        delivery: 'Delivery',
      },
      labels: {
        name: 'Your Name',
        phone: 'Phone Number',
        date: 'Preferred Date',
        address: 'Delivery Address',
        deliveryMethod: 'Delivery Method',
        optional: '(Optional)',
      },
      summary: {
        title: 'Order Summary',
        emptyCart: 'Your cart is empty.',
        standardProducts: 'STANDARD PRODUCTS',
        specialProducts: 'SPECIAL ORDERS',
        subtotal: 'Subtotal',
        shippingFee: 'Delivery Fee',
        packagingFee: 'Packaging Fee',
        total: 'Grand Total',
        estimatedTotal: 'Estimated Total',
      },
      messages: {
        successTitle: 'Order Sent!',
        successMessage: 'Thank you for your order! We will contact you shortly for confirmation.',
        orderId: 'ORDER ID',
        copied: 'Copied!',
        unpricedWarning: 'Some items in your cart do not have a set price. Please contact the store for a final offer after submitting the order.',
        closeWarning: 'All items in the cart and entered data will be lost. Are you sure?',
        callForPrice: 'Call for price',
      },
    },
  },
  fr: {
    languageName: 'French',
    languageNativeName: 'Français',
    navbar: {
      tagline: 'Boulangerie Artisanale',
      menu: {
        products: 'Produits',
        orders: 'Commandes',
        careers: 'Carrières',
        contact: 'Contact',
      },
      mobileMenu: {
        products: 'Nos Produits',
        orders: 'Commandes Spéciales',
        careers: 'Carrières',
        contact: 'Lieux & Horaires',
        call: 'Appeler',
        whatsapp: 'WhatsApp',
        locations: 'Voir Lieux',
        orderNow: 'Commander',
      },
      phoneCta: '0754 554 194',
      whatsappLabel: 'WhatsApp',
      orderButton: 'Commander',
      christmasToggle: {
        enable: 'Activer mode Noël',
        disable: 'Désactiver mode Noël',
      },
    },
    hero: {
      badge: 'Drăgășani • Băbeni',
      heading: 'Officina del Gusto',
      subheading: 'La magie du goût authentique',
      description:
        'Debout avant l\'aube, nous préparons des bretzels chauds, des tartes salées et des pizzas copieuses pour que votre journée commence avec une délicieuse odeur.',
      primaryCta: 'Voir les délices',
      secondaryCta: 'Nos lieux',
    },
    infoSection: {
      heading: 'Tradition & Passion',
      description:
        'Chez Officina del Gusto, nous croyons que les bonnes journées commencent tôt—dès que le premier plateau de bretzels sort du four.',
      cards: {
        schedule: {
          title: 'Horaires Étendus',
          description: 'Petit-déjeuner, déjeuner ou collation du soir—nous sommes là toute la journée.',
          weekdaysLabel: 'Lundi - Samedi',
          weekdaysValue: '06:00 - 20:00',
          sundayLabel: 'Dimanche',
          sundayValue: 'Fermé',
        },
        quality: {
          title: 'Ingrédients Sélectionnés',
          description:
            'Farine premium, fromage frais et garnitures généreuses. Nous cuisinons tout quotidiennement et restons fidèles aux recettes familiales.',
          bullets: ['Pâte pétrie chaque matin', 'Fournées toujours fraîches', 'Recettes traditionnelles honnêtes'],
        },
        passion: {
          title: 'Fait avec Amour',
          description:
            'Nous sommes une entreprise familiale à Drăgășani et Băbeni. Voir nos clients sourire après la première bouchée est notre meilleure récompense.',
          motto: 'Le goût qui vous fait revenir',
        },
      },
    },
    productGallery: {
      eyebrow: 'Délices quotidiens',
      title: 'Nos produits',
      description: 'Fait main dans notre atelier chaque jour, avec des ingrédients naturels uniquement.',
      products: [
        {
          name: 'Bretzels Chauds',
          description: 'Bretzels dorés garnis de sésame, pavot ou sel—tout juste sortis du four.',
          tag: 'Best Seller',
        },
        {
          name: 'Pâtisseries au Fromage',
          description: 'Pâtisseries feuilletées généreusement garnies de fromage salé—le classique merdenea roumain.',
        },
        {
          name: 'Pizza Boulangère',
          description: 'Pâte moelleuse, sauce tomate riche et garnitures généreuses. La pizza réconfortante.',
          tag: 'Recette Maison',
        },
        {
          name: 'Tarte aux Pommes',
          description: 'Garniture aromatique aux pommes avec cannelle et un léger saupoudrage de sucre.',
        },
        {
          name: 'Hot Dog Bretzel',
          description: 'Un en-cas copieux : saucisse de qualité enveloppée dans notre pâte à bretzel moelleuse.',
          tag: 'À Emporter',
        },
        {
          name: 'Strudels',
          description: 'Strudels dorés avec garnitures sucrées ou salées.',
        },
        {
          name: 'Bouchées Feuilletées',
          description: 'Mini pâtisseries garnies de fromage, champignons ou viande—parfait à tout moment.',
        },
        {
          name: 'Spécialités de Saison',
          description: 'Demandez en magasin les dernières créations limitées.',
        },
      ],
    },
    customOrders: {
      eyebrow: 'Commandes Spéciales',
      title: 'Nous Honorons les Commandes pour Toute Occasion',
      description: 'Événements, célébrations, fêtes ou tout type de commande impliquant des produits de pâtisserie — nous sommes prêts à aider !',
      features: [
        'Mariages & baptêmes',
        'Fêtes & anniversaires',
        'Événements d\'entreprise',
        'Fêtes & occasions spéciales',
      ],
      phoneCta: 'Appelez-nous',
      emailCta: 'Envoyer un email',
      phoneNumber: '0754 554 194',
      emailAddress: 'odgdragasani@gmail.com',
      viewImage: 'Voir',
    },
    jobs: {
      eyebrow: 'Rejoignez l\'équipe',
      title: 'Carrières chez Officina',
      description:
        'Nous recherchons des personnes joyeuses et travailleuses qui aiment les fours chauds et les clients sympathiques. Si c\'est vous, rejoignez-nous !',
      filters: {
        all: 'Tous',
        dragasani: 'Drăgășani',
        babeni: 'Băbeni',
      },
      loading: 'Chargement des offres...',
      none: 'Aucune offre active pour le moment.',
      noneFiltered: 'Aucun rôle disponible à cet endroit pour l\'instant.',
      successTitle: 'Merci !',
      successMessage: 'Nous avons reçu votre candidature et vous contacterons si cela correspond.',
      applyButton: 'Postuler',
      modalTitle: 'Postuler pour :',
      rateLimit: 'Vous avez postulé récemment. Veuillez attendre une minute avant d\'envoyer une autre candidature.',
      phoneInvalid: 'Veuillez entrer un numéro de téléphone valide (ex. 0712 345 678 ou +33 1 23 45 67 89).',
      phoneFake: 'Le numéro de téléphone semble invalide. Veuillez le vérifier.',
      submitError: 'Une erreur est survenue. Veuillez réessayer.',
      lockedLocationNote: '(Verrouillé par le rôle)',
      locationPrefix: 'Lieu préféré',
      form: {
        name: { label: 'Nom complet *', placeholder: 'Exemple : Maria Popescu' },
        phone: {
          label: 'Numéro de téléphone *',
          placeholder: 'Exemple : 0712 345 678 ou +33 1 23 45 67 89',
          helper: 'Les numéros roumains ou internationaux sont acceptés',
        },
        location: {
          label: 'Lieu préféré *',
          lockedSuffix: '(Verrouillé par le rôle)',
          options: { dragasani: 'Drăgășani', babeni: 'Băbeni', either: 'L\'un ou l\'autre' },
        },
        email: { label: 'Email (optionnel)', placeholder: 'exemple@email.com' },
        message: { label: 'Message (optionnel)', placeholder: 'Parlez-nous un peu de vous...' },
        cv: { label: 'Télécharger CV (optionnel)', placeholder: 'Cliquez pour télécharger (PDF ou image)' },
        submit: { idle: 'Envoyer candidature', loading: 'Envoi...' },
      },
    },
    mapSection: {
      title: 'Venez nous rendre visite !',
      description: 'Que vous ayez besoin d\'un petit-déjeuner sur le pouce ou d\'une douceur pour la maison, passez dans l\'un de nos magasins.',
      dragasaniButton: 'Drăgășani',
      babeniButton: 'Băbeni',
      intro:
        'Passez quand vous êtes dans le coin—l\'arôme de pâtisserie fraîche vous guidera. Les magasins de Drăgășani et Băbeni sont prêts pour vous.',
      addressLabel: 'Adresse',
      phoneLabel: 'Commandes par téléphone',
      emailLabel: 'Email',
      callCta: 'Naviguer',
      facebookCta: 'Facebook',
      mapOverlay: 'Cliquez pour interagir',
    },
    footer: {
      tagline: 'Boulangerie • Pizza • Tradition',
      categories: 'Boulangerie • Pizza • Tradition',
      termsLink: 'Termes & Conditions',
      privacyLink: 'Politique de Confidentialité',
      anpcLink: 'ANPC',
      anpcDescription: 'Résolution alternative des litiges / Résolution des litiges en ligne',
      schedule: 'Lun - Sam : 06:00 - 20:00',
      sundayClosed: 'Dimanche : Fermé',
      locationsNote: 'Lieux à Drăgășani et Băbeni.',
      adminLink: 'Connexion Admin',
    },
    legal: {
      terms: {
        title: 'Termes & Conditions',
        lastUpdated: 'Dernière mise à jour',
        sections: [
          {
            title: '1. Informations Générales',
            paragraphs: [
              'Ce site web est exploité par Officina del Gusto, basé à Drăgășani, Vâlcea, Roumanie.',
              'Contact : Téléphone +40 754 554 194 • Email odgdragasani@gmail.com',
            ],
          },
          {
            title: '2. Domaine d\'Activité',
            paragraphs: [
              'Officina del Gusto est une boulangerie artisanale proposant des produits de boulangerie, pâtisseries et pizzas dans les lieux de Drăgășani et Băbeni. Les produits sont disponibles uniquement en retrait.',
            ],
          },
          {
            title: '3. Utilisation du Site',
            paragraphs: [
              'Le site web présente notre menu et permet aux candidats de postuler aux postes ouverts. Il est purement informatif.',
            ],
          },
          {
            title: '4. Propriété Intellectuelle',
            paragraphs: [
              'Les textes, images, logos et mises en page appartiennent à Officina del Gusto et sont protégés par le droit d\'auteur.',
            ],
          },
          {
            title: '5. Responsabilité',
            paragraphs: [
              'La disponibilité des produits et les heures d\'ouverture peuvent changer sans préavis. Les informations du site sont indicatives.',
            ],
          },
          {
            title: '6. Résolution des Litiges',
            paragraphs: [
              'Les consommateurs peuvent contacter l\'ANPC (autorité roumaine de RAL) ou la plateforme RLL de l\'UE pour les litiges.',
            ],
          },
          {
            title: '7. Loi Applicable',
            paragraphs: ['Ces termes sont régis par la loi roumaine.'],
          },
        ],
      },
      privacy: {
        title: 'Politique de Confidentialité',
        lastUpdated: 'Dernière mise à jour',
        sections: [
          {
            title: '1. Introduction',
            paragraphs: ['Nous respectons le RGPD et protégeons les données personnelles partagées avec nous.'],
          },
          {
            title: '2. Données Collectées',
            paragraphs: ['Nous collectons :'],
            list: [
              'Données de contact (nom, téléphone, email) pour les candidatures',
              'CV et messages joints',
              'Données techniques anonymes pour améliorer le site',
            ],
          },
          {
            title: '3. But',
            paragraphs: ['Les candidatures sont traitées pour évaluer les candidats et les contacter si nécessaire.'],
          },
          {
            title: '4. Stockage',
            paragraphs: ['Les données sont stockées en toute sécurité et les CV sont supprimés dans les 6 mois après le recrutement.'],
          },
          {
            title: '5. Droits',
            paragraphs: ['Vous pouvez demander l\'accès, la correction, la suppression, la restriction, la portabilité ou vous opposer au traitement.'],
          },
          {
            title: '6. Contact',
            paragraphs: ['Email odgdragasani@gmail.com ou appelez +40 754 554 194 pour les demandes RGPD.'],
          },
          {
            title: '7. Plaintes',
            paragraphs: ['Les plaintes peuvent être déposées auprès de l\'APD roumaine (ANSPDCP).'],
          },
        ],
      },
    },
    login: {
      title: 'Accès Admin',
      userLabel: 'Nom d\'utilisateur',
      passLabel: 'Mot de passe',
      submit: 'Se connecter',
      back: 'Retour au site',
      error: 'Nom d\'utilisateur ou mot de passe incorrect !',
    },
    music: {
      promptTitle: 'Activer la musique de Noël ?',
      promptDescription: 'Nous avons une playlist douce de chants de Noël à ~20% de volume. Voulez-vous l\'écouter ?',
      accept: 'Oui, jouer la musique',
      decline: 'Pas maintenant',
      never: 'Ne plus demander',
      helper: 'Vous pouvez contrôler le lecteur depuis l\'en-tête à tout moment.',
      toastTitle: 'Musique de Noël disponible !',
      toastAction: 'Jouer musique',
      toastClose: 'Fermer',
    },
    orderModal: {
      steps: {
        products: 'Choisir Produits',
        details: 'Détails Livraison',
        review: 'Revoir Commande',
        success: 'Commande Envoyée !',
      },
      buttons: {
        next: 'Continuer',
        back: 'Retour',
        submit: 'Confirmer et Envoyer',
        close: 'Fermer',
        cancel: 'Annuler',
        confirmClose: 'Oui, fermer',
        confirmUnpriced: 'Je comprends, Envoyer',
        pickup: 'Retrait',
        delivery: 'Livraison',
      },
      labels: {
        name: 'Votre Nom',
        phone: 'Numéro de Téléphone',
        date: 'Date Préférée',
        address: 'Adresse de Livraison',
        deliveryMethod: 'Méthode de Livraison',
        optional: '(Optionnel)',
      },
      summary: {
        title: 'Résumé Commande',
        emptyCart: 'Votre panier est vide.',
        standardProducts: 'PRODUITS STANDARDS',
        specialProducts: 'COMMANDES SPÉCIALES',
        subtotal: 'Sous-total',
        shippingFee: 'Frais de Livraison',
        packagingFee: 'Frais d\'Emballage',
        total: 'Total Général',
        estimatedTotal: 'Total Estimé',
      },
      messages: {
        successTitle: 'Commande Envoyée !',
        successMessage: 'Merci pour votre commande ! Nous vous contacterons sous peu pour confirmation.',
        orderId: 'ID COMMANDE',
        copied: 'Copié !',
        unpricedWarning: 'Certains articles de votre panier n\'ont pas de prix défini. Veuillez contacter le magasin pour une offre finale après avoir soumis la commande.',
        closeWarning: 'Tous les articles du panier et les données saisies seront perdus. Êtes-vous sûr ?',
        callForPrice: 'Appeler pour prix',
      },
    },
  },
  es: {
    languageName: 'Spanish',
    languageNativeName: 'Español',
    navbar: {
      tagline: 'Panadería Artesanal',
      menu: {
        products: 'Productos',
        orders: 'Pedidos',
        careers: 'Carreras',
        contact: 'Contacto',
      },
      mobileMenu: {
        products: 'Nuestros Productos',
        orders: 'Pedidos Especiales',
        careers: 'Carreras',
        contact: 'Ubicación y Horarios',
        call: 'Llamar',
        whatsapp: 'WhatsApp',
        locations: 'Ver Ubicaciones',
        orderNow: 'Pedir Ahora',
      },
      phoneCta: '0754 554 194',
      whatsappLabel: 'WhatsApp',
      orderButton: 'Pedir',
      christmasToggle: {
        enable: 'Activar modo Navidad',
        disable: 'Desactivar modo Navidad',
      },
    },
    hero: {
      badge: 'Drăgășani • Băbeni',
      heading: 'Officina del Gusto',
      subheading: 'La magia del sabor auténtico',
      description:
        'Despiertos antes del amanecer, horneamos pretzels calientes, pasteles salados y pizzas abundantes para que tu día comience con el olor de algo delicioso.',
      primaryCta: 'Ver las delicias',
      secondaryCta: 'Nuestras ubicaciones',
    },
    infoSection: {
      heading: 'Tradición y Pasión',
      description:
        'En Officina del Gusto creemos que los buenos días comienzan temprano, justo cuando sale del horno la primera bandeja de pretzels recién horneados.',
      cards: {
        schedule: {
          title: 'Horario Extendido',
          description: 'Desayuno, almuerzo o merienda: estamos aquí todo el día.',
          weekdaysLabel: 'Lunes - Sábado',
          weekdaysValue: '06:00 - 20:00',
          sundayLabel: 'Domingo',
          sundayValue: 'Cerrado',
        },
        quality: {
          title: 'Ingredientes Seleccionados',
          description:
            'Harina premium, queso fresco y coberturas generosas. Horneamos todo a diario y nos mantenemos fieles a las recetas familiares.',
          bullets: ['Masa amasada cada mañana', 'Lotes siempre frescos', 'Recetas tradicionales honestas'],
        },
        passion: {
          title: 'Hecho con Amor',
          description:
            'Somos una empresa familiar en Drăgășani y Băbeni. Ver a los clientes sonreír después del primer bocado es nuestro comentario favorito.',
          motto: 'El sabor que te hace volver',
        },
      },
    },
    productGallery: {
      eyebrow: 'Delicias diarias',
      title: 'Nuestros productos',
      description: 'Hecho a mano en nuestro taller todos los días, utilizando solo ingredientes naturales.',
      products: [
        {
          name: 'Pretzels Calientes',
          description: 'Pretzels dorados cubiertos con sésamo, semillas de amapola o sal, recién salidos del horno.',
          tag: 'Más Vendido',
        },
        {
          name: 'Pasteles de Queso',
          description: 'Pasteles hojaldrados generosamente rellenos de queso salado: el clásico merdenea rumano.',
        },
        {
          name: 'Pizza de Panadería',
          description: 'Masa esponjosa, rica salsa de tomate y coberturas generosas. Pizza reconfortante.',
          tag: 'Receta de la Casa',
        },
        {
          name: 'Pastel de Manzana',
          description: 'Relleno aromático de manzana con canela y una ligera capa de azúcar.',
        },
        {
          name: 'Hot Dog Pretzel',
          description: 'Un bocadillo abundante: salchicha de calidad envuelta en nuestra suave masa de pretzel.',
          tag: 'Para Llevar',
        },
        {
          name: 'Strudels',
          description: 'Strudels dorados con rellenos dulces o salados.',
        },
        {
          name: 'Bocados de Hojaldre',
          description: 'Mini pasteles rellenos de queso, champiñones o carne, perfectos en cualquier momento.',
        },
        {
          name: 'Especiales de Temporada',
          description: 'Pregunta en la tienda por las últimas creaciones limitadas.',
        },
      ],
    },
    customOrders: {
      eyebrow: 'Pedidos Especiales',
      title: 'Atendemos Pedidos para Cualquier Ocasión',
      description: 'Eventos, celebraciones, fiestas o cualquier tipo de pedido que involucre productos de pastelería: ¡estamos listos para ayudar!',
      features: [
        'Bodas y bautizos',
        'Fiestas y cumpleaños',
        'Eventos corporativos',
        'Fiestas y ocasiones especiales',
      ],
      phoneCta: 'Llámanos',
      emailCta: 'Enviar correo',
      phoneNumber: '0754 554 194',
      emailAddress: 'odgdragasani@gmail.com',
      viewImage: 'Ver',
    },
    jobs: {
      eyebrow: 'Únete al equipo',
      title: 'Carreras en Officina',
      description:
        'Buscamos personas alegres y trabajadoras que disfruten de los hornos calientes y los clientes amigables. Si eres tú, ¡únete!',
      filters: {
        all: 'Todos',
        dragasani: 'Drăgășani',
        babeni: 'Băbeni',
      },
      loading: 'Cargando trabajos...',
      none: 'No hay vacantes activas en este momento.',
      noneFiltered: 'No hay roles disponibles en esta ubicación todavía.',
      successTitle: '¡Gracias!',
      successMessage: 'Recibimos tu solicitud y nos pondremos en contacto si hay una coincidencia.',
      applyButton: 'Aplicar ahora',
      modalTitle: 'Aplicar para:',
      rateLimit: 'Has aplicado recientemente. Por favor espera un minuto antes de enviar otra solicitud.',
      phoneInvalid: 'Por favor ingresa un número de teléfono válido (ej. 0712 345 678 o +34 123 456 789).',
      phoneFake: 'El número de teléfono parece inválido. Por favor verifícalo.',
      submitError: 'Algo salió mal. Por favor intenta de nuevo.',
      lockedLocationNote: '(Bloqueado por rol)',
      locationPrefix: 'Ubicación preferida',
      form: {
        name: { label: 'Nombre completo *', placeholder: 'Ejemplo: Maria Popescu' },
        phone: {
          label: 'Número de teléfono *',
          placeholder: 'Ejemplo: 0712 345 678 o +34 123 456 789',
          helper: 'Se aceptan números rumanos o internacionales',
        },
        location: {
          label: 'Ubicación preferida *',
          lockedSuffix: '(Bloqueado por rol)',
          options: { dragasani: 'Drăgășani', babeni: 'Băbeni', either: 'Cualquiera' },
        },
        email: { label: 'Correo (opcional)', placeholder: 'ejemplo@email.com' },
        message: { label: 'Mensaje (opcional)', placeholder: 'Cuéntanos un poco sobre ti...' },
        cv: { label: 'Subir CV (opcional)', placeholder: 'Haz clic para subir (PDF o imagen)' },
        submit: { idle: 'Enviar solicitud', loading: 'Enviando...' },
      },
    },
    mapSection: {
      title: '¡Ven a visitarnos!',
      description: 'Ya sea que necesites un desayuno rápido o un bocadillo caliente para casa, pasa por una de nuestras tiendas.',
      dragasaniButton: 'Drăgășani',
      babeniButton: 'Băbeni',
      intro:
        'Pasa cuando estés cerca: el aroma a pastelería fresca te guiará. Ambas tiendas en Drăgășani y Băbeni están listas para ti.',
      addressLabel: 'Dirección',
      phoneLabel: 'Pedidos por teléfono',
      emailLabel: 'Correo',
      callCta: 'Navegar',
      facebookCta: 'Facebook',
      mapOverlay: 'Haz clic para interactuar',
    },
    footer: {
      tagline: 'Panadería • Pizza • Tradición',
      categories: 'Panadería • Pizza • Tradición',
      termsLink: 'Términos y Condiciones',
      privacyLink: 'Política de Privacidad',
      anpcLink: 'ANPC',
      anpcDescription: 'Resolución alternativa de disputas / Resolución de disputas en línea',
      schedule: 'Lun - Sáb: 06:00 - 20:00',
      sundayClosed: 'Domingo: Cerrado',
      locationsNote: 'Ubicaciones en Drăgășani y Băbeni.',
      adminLink: 'Acceso Admin',
    },
    legal: {
      terms: {
        title: 'Términos y Condiciones',
        lastUpdated: 'Última actualización',
        sections: [
          {
            title: '1. Información General',
            paragraphs: [
              'Este sitio web es operado por Officina del Gusto, con sede en Drăgășani, Vâlcea, Rumania.',
              'Contacto: Teléfono +40 754 554 194 • Correo odgdragasani@gmail.com',
            ],
          },
          {
            title: '2. Ámbito de Actividad',
            paragraphs: [
              'Officina del Gusto es una panadería artesanal que ofrece productos horneados, pasteles y pizza en las ubicaciones de Drăgășani y Băbeni. Los productos están disponibles solo para recoger.',
            ],
          },
          {
            title: '3. Uso del Sitio Web',
            paragraphs: [
              'El sitio web muestra nuestro menú y permite a los candidatos postularse para puestos vacantes. Es puramente informativo.',
            ],
          },
          {
            title: '4. Propiedad Intelectual',
            paragraphs: [
              'Textos, imágenes, logotipos y diseños pertenecen a Officina del Gusto y están protegidos por la ley de derechos de autor.',
            ],
          },
          {
            title: '5. Responsabilidad',
            paragraphs: [
              'La disponibilidad del producto y los horarios de apertura pueden cambiar sin previo aviso. La información del sitio web es indicativa.',
            ],
          },
          {
            title: '6. Resolución de Disputas',
            paragraphs: [
              'Los consumidores pueden contactar a ANPC (autoridad rumana de ADR) o la Plataforma ODR de la UE para disputas.',
            ],
          },
          {
            title: '7. Ley Aplicable',
            paragraphs: ['Estos términos se rigen por la ley rumana.'],
          },
        ],
      },
      privacy: {
        title: 'Política de Privacidad',
        lastUpdated: 'Última actualización',
        sections: [
          {
            title: '1. Introducción',
            paragraphs: ['Cumplimos con el RGPD y protegemos los datos personales compartidos con nosotros.'],
          },
          {
            title: '2. Datos Recopilados',
            paragraphs: ['Recopilamos:'],
            list: [
              'Datos de contacto (nombre, teléfono, correo) para solicitudes de empleo',
              'CV y mensajes adjuntos',
              'Datos técnicos anónimos para mejorar el sitio',
            ],
          },
          {
            title: '3. Propósito',
            paragraphs: ['Las solicitudes se procesan para evaluar a los candidatos y contactarlos si es necesario.'],
          },
          {
            title: '4. Almacenamiento',
            paragraphs: ['Los datos se almacenan de forma segura y los CV se eliminan dentro de los 6 meses posteriores a la contratación.'],
          },
          {
            title: '5. Derechos',
            paragraphs: ['Puede solicitar acceso, corrección, eliminación, restricción, portabilidad u oponerse al procesamiento.'],
          },
          {
            title: '6. Contacto',
            paragraphs: ['Envíe un correo a odgdragasani@gmail.com o llame al +40 754 554 194 para solicitudes de RGPD.'],
          },
          {
            title: '7. Quejas',
            paragraphs: ['Las quejas se pueden presentar ante la DPA rumana (ANSPDCP).'],
          },
        ],
      },
    },
    login: {
      title: 'Acceso Admin',
      userLabel: 'Usuario',
      passLabel: 'Contraseña',
      submit: 'Iniciar sesión',
      back: 'Volver al sitio',
      error: '¡Usuario o contraseña incorrectos!',
    },
    music: {
      promptTitle: '¿Activar música de Navidad?',
      promptDescription: 'Tenemos una lista de reproducción suave de villancicos al ~20% de volumen. ¿Quieres escucharla?',
      accept: 'Sí, reproducir música',
      decline: 'Ahora no',
      never: 'No volver a preguntar',
      helper: 'Puedes controlar el reproductor desde el encabezado en cualquier momento.',
      toastTitle: '¡Música de Navidad disponible!',
      toastAction: 'Reproducir música',
      toastClose: 'Cerrar',
    },
    orderModal: {
      steps: {
        products: 'Elegir Productos',
        details: 'Detalles de Entrega',
        review: 'Revisar Pedido',
        success: '¡Pedido Enviado!',
      },
      buttons: {
        next: 'Continuar',
        back: 'Atrás',
        submit: 'Confirmar y Enviar',
        close: 'Cerrar',
        cancel: 'Cancelar',
        confirmClose: 'Sí, cerrar',
        confirmUnpriced: 'Entiendo, Enviar',
        pickup: 'Recoger',
        delivery: 'Entrega',
      },
      labels: {
        name: 'Tu Nombre',
        phone: 'Número de Teléfono',
        date: 'Fecha Preferida',
        address: 'Dirección de Entrega',
        deliveryMethod: 'Método de Entrega',
        optional: '(Opcional)',
      },
      summary: {
        title: 'Resumen del Pedido',
        emptyCart: 'Tu carrito está vacío.',
        standardProducts: 'PRODUCTOS ESTÁNDAR',
        specialProducts: 'PEDIDOS ESPECIALES',
        subtotal: 'Subtotal',
        shippingFee: 'Tarifa de Entrega',
        packagingFee: 'Tarifa de Empaque',
        total: 'Gran Total',
        estimatedTotal: 'Total Estimado',
      },
      messages: {
        successTitle: '¡Pedido Enviado!',
        successMessage: '¡Gracias por tu pedido! Nos pondremos en contacto contigo en breve para confirmar.',
        orderId: 'ID PEDIDO',
        copied: '¡Copiado!',
        unpricedWarning: 'Algunos artículos en tu carrito no tienen un precio establecido. Por favor contacta a la tienda para una oferta final después de enviar el pedido.',
        closeWarning: 'Todos los artículos en el carrito y los datos ingresados se perderán. ¿Estás seguro?',
        callForPrice: 'Llamar por precio',
      },
    },
  },
  zh: {
    languageName: 'Chinese',
    languageNativeName: '中文',
    navbar: {
      tagline: '手工面包房',
      menu: {
        products: '产品',
        orders: '订单',
        careers: '招聘',
        contact: '联系我们',
      },
      mobileMenu: {
        products: '我们的产品',
        orders: '定制订单',
        careers: '招聘',
        contact: '地点与时间',
        call: '立即拨打',
        whatsapp: 'WhatsApp',
        locations: '查看地点',
        orderNow: '立即订购',
      },
      phoneCta: '0754 554 194',
      whatsappLabel: 'WhatsApp',
      orderButton: '订购',
      christmasToggle: {
        enable: '开启圣诞模式',
        disable: '关闭圣诞模式',
      },
    },
    hero: {
      badge: 'Drăgășani • Băbeni',
      heading: 'Officina del Gusto',
      subheading: '正宗美味的魔力',
      description:
        '黎明前起床，我们烘烤热腾腾的椒盐卷饼、美味的馅饼和丰盛的披萨，让您的一天从美味的香气开始。',
      primaryCta: '查看美食',
      secondaryCta: '我们的地点',
    },
    infoSection: {
      heading: '传统与激情',
      description:
        '在 Officina del Gusto，我们相信美好的一天从早开始——就在第一盘新鲜出炉的椒盐卷饼出炉时。',
      cards: {
        schedule: {
          title: '延长营业时间',
          description: '早餐、午餐或晚餐——我们全天候为您服务。',
          weekdaysLabel: '周一 - 周六',
          weekdaysValue: '06:00 - 20:00',
          sundayLabel: '周日',
          sundayValue: '休息',
        },
        quality: {
          title: '精选食材',
          description:
            '优质面粉、新鲜奶酪和丰富的配料。我们每天烘焙，坚持家庭食谱。',
          bullets: ['每天早上揉面', '总是新鲜出炉', '诚实的传统食谱'],
        },
        passion: {
          title: '用心制作',
          description:
            '我们是 Drăgășani 和 Băbeni 的家族企业。看到顾客咬下第一口后的笑容是我们最喜欢的反馈。',
          motto: '让您回味无穷的味道',
        },
      },
    },
    productGallery: {
      eyebrow: '每日美食',
      title: '我们的产品',
      description: '每天在我们的车间手工制作，仅使用天然食材。',
      products: [
        {
          name: '热椒盐卷饼',
          description: '金黄色的椒盐卷饼，撒上芝麻、罂粟籽或盐——新鲜出炉。',
          tag: '热销',
        },
        {
          name: '奶酪酥皮点心',
          description: '酥脆的酥皮，慷慨地填满咸奶酪——经典的罗马尼亚 merdenea。',
        },
        {
          name: '面包房风味披萨',
          description: '松软的饼底，浓郁的番茄酱和丰富的配料。治愈系披萨。',
          tag: '独家食谱',
        },
        {
          name: '苹果派',
          description: '芳香的苹果馅，配上肉桂和淡淡的糖粉。',
        },
        {
          name: '椒盐卷饼热狗',
          description: '丰盛的小吃：优质香肠包裹在我们柔软的椒盐卷饼面团中。',
          tag: '即拿即走',
        },
        {
          name: '果仁卷',
          description: '金黄色的果仁卷，配有甜味或咸味馅料。',
        },
        {
          name: '酥皮一口酥',
          description: '迷你酥皮点心，填满奶酪、蘑菇或肉——随时享用。',
        },
        {
          name: '季节特供',
          description: '请在店内咨询最新的限量创作。',
        },
      ],
    },
    customOrders: {
      eyebrow: '定制订单',
      title: '我们承接任何场合的订单',
      description: '活动、庆典、节日或任何涉及糕点产品的订单——我们随时准备提供帮助！',
      features: [
        '婚礼与洗礼',
        '派对与生日',
        '企业活动',
        '节日与特殊场合',
      ],
      phoneCta: '致电我们',
      emailCta: '发送邮件',
      phoneNumber: '0754 554 194',
      emailAddress: 'odgdragasani@gmail.com',
      viewImage: '查看',
    },
    jobs: {
      eyebrow: '加入团队',
      title: 'Officina 职业生涯',
      description:
        '我们正在寻找开朗、勤奋、喜欢温暖烤箱和友好顾客的人。如果是你，快来加入吧！',
      filters: {
        all: '全部',
        dragasani: 'Drăgășani',
        babeni: 'Băbeni',
      },
      loading: '正在加载职位...',
      none: '目前没有空缺职位。',
      noneFiltered: '该地点暂无可用职位。',
      successTitle: '谢谢！',
      successMessage: '我们已收到您的申请，如果有匹配的职位，我们会与您联系。',
      applyButton: '立即申请',
      modalTitle: '申请职位：',
      rateLimit: '您最近已申请。请等待一分钟后再发送另一个申请。',
      phoneInvalid: '请输入有效的电话号码（例如 0712 345 678 或 +86 123 4567 8901）。',
      phoneFake: '电话号码看起来无效。请仔细检查。',
      submitError: '出错了。请重试。',
      lockedLocationNote: '（由职位锁定）',
      locationPrefix: '首选地点',
      form: {
        name: { label: '全名 *', placeholder: '例如：Maria Popescu' },
        phone: {
          label: '电话号码 *',
          placeholder: '例如：0712 345 678 或 +86 123 4567 8901',
          helper: '接受罗马尼亚或国际号码',
        },
        location: {
          label: '首选地点 *',
          lockedSuffix: '（由职位锁定）',
          options: { dragasani: 'Drăgășani', babeni: 'Băbeni', either: '都可以' },
        },
        email: { label: '电子邮件（可选）', placeholder: 'example@email.com' },
        message: { label: '留言（可选）', placeholder: '向我们介绍一下你自己...' },
        cv: { label: '上传简历（可选）', placeholder: '点击上传（PDF 或图片）' },
        submit: { idle: '发送申请', loading: '发送中...' },
      },
    },
    mapSection: {
      title: '欢迎光临！',
      description: '无论您是需要匆忙的早餐还是回家的温暖款待，请光临我们的店铺。',
      dragasaniButton: 'Drăgășani',
      babeniButton: 'Băbeni',
      intro:
        '只要您在附近，随时光临——新鲜糕点的香气会指引您。Drăgășani 和 Băbeni 店铺都为您准备好了。',
      addressLabel: '地址',
      phoneLabel: '电话订购',
      emailLabel: '电子邮件',
      callCta: '导航',
      facebookCta: 'Facebook',
      mapOverlay: '点击互动',
    },
    footer: {
      tagline: '面包房 • 披萨 • 传统',
      categories: '面包房 • 披萨 • 传统',
      termsLink: '条款和条件',
      privacyLink: '隐私政策',
      anpcLink: 'ANPC',
      anpcDescription: '替代性争议解决 / 在线争议解决',
      schedule: '周一 - 周六：06:00 - 20:00',
      sundayClosed: '周日：休息',
      locationsNote: '位于 Drăgășani 和 Băbeni。',
      adminLink: '管理员登录',
    },
    legal: {
      terms: {
        title: '条款和条件',
        lastUpdated: '最后更新',
        sections: [
          {
            title: '1. 一般信息',
            paragraphs: [
              '本网站由 Officina del Gusto 运营，总部位于罗马尼亚 Vâlcea 的 Drăgășani。',
              '联系方式：电话 +40 754 554 194 • 电子邮件 odgdragasani@gmail.com',
            ],
          },
          {
            title: '2. 活动范围',
            paragraphs: [
              'Officina del Gusto 是一家手工面包房，在 Drăgășani 和 Băbeni 提供烘焙食品、糕点和披萨。产品仅供自提。',
            ],
          },
          {
            title: '3. 网站使用',
            paragraphs: [
              '网站展示我们的菜单，并允许候选人申请空缺职位。仅供参考。',
            ],
          },
          {
            title: '4. 知识产权',
            paragraphs: [
              '文本、图像、徽标和布局属于 Officina del Gusto，受版权法保护。',
            ],
          },
          {
            title: '5. 责任',
            paragraphs: [
              '产品供应情况和营业时间如有更改，恕不另行通知。网站信息仅供参考。',
            ],
          },
          {
            title: '6. 争议解决',
            paragraphs: [
              '消费者可以联系 ANPC（罗马尼亚 ADR 机构）或欧盟 ODR 平台解决争议。',
            ],
          },
          {
            title: '7. 适用法律',
            paragraphs: ['这些条款受罗马尼亚法律管辖。'],
          },
        ],
      },
      privacy: {
        title: '隐私政策',
        lastUpdated: '最后更新',
        sections: [
          {
            title: '1. 简介',
            paragraphs: ['我们遵守 GDPR 并保护与我们共享的个人数据。'],
          },
          {
            title: '2. 收集的数据',
            paragraphs: ['我们收集：'],
            list: [
              '用于求职申请的联系数据（姓名、电话、电子邮件）',
              '简历和附加信息',
              '用于改进网站的匿名技术数据',
            ],
          },
          {
            title: '3. 目的',
            paragraphs: ['处理申请以评估候选人并在需要时联系他们。'],
          },
          {
            title: '4. 存储',
            paragraphs: ['数据安全存储，简历在招聘后 6 个月内删除。'],
          },
          {
            title: '5. 权利',
            paragraphs: ['您可以请求访问、更正、删除、限制、携带或反对处理。'],
          },
          {
            title: '6. 联系方式',
            paragraphs: ['发送电子邮件至 odgdragasani@gmail.com 或致电 +40 754 554 194 提出 GDPR 请求。'],
          },
          {
            title: '7. 投诉',
            paragraphs: ['可以向罗马尼亚 DPA (ANSPDCP) 提出投诉。'],
          },
        ],
      },
    },
    login: {
      title: '管理员访问',
      userLabel: '用户名',
      passLabel: '密码',
      submit: '登录',
      back: '返回网站',
      error: '用户名或密码错误！',
    },
    music: {
      promptTitle: '开启圣诞音乐？',
      promptDescription: '我们有一个柔和的圣诞颂歌播放列表，音量约为 20%。想听吗？',
      accept: '是的，播放音乐',
      decline: '暂不',
      never: '不再询问',
      helper: '您可以随时从标题控制播放器。',
      toastTitle: '圣诞音乐可用！',
      toastAction: '播放音乐',
      toastClose: '关闭',
    },
    orderModal: {
      steps: {
        products: '选择产品',
        details: '配送详情',
        review: '审查订单',
        success: '订单已发送！',
      },
      buttons: {
        next: '继续',
        back: '返回',
        submit: '确认并发送订单',
        close: '关闭',
        cancel: '取消',
        confirmClose: '是的，关闭',
        confirmUnpriced: '我明白，发送',
        pickup: '自提',
        delivery: '配送',
      },
      labels: {
        name: '您的姓名',
        phone: '电话号码',
        date: '首选日期',
        address: '配送地址',
        deliveryMethod: '配送方式',
        optional: '（可选）',
      },
      summary: {
        title: '订单摘要',
        emptyCart: '您的购物车是空的。',
        standardProducts: '标准产品',
        specialProducts: '特别订单',
        subtotal: '小计',
        shippingFee: '配送费',
        packagingFee: '包装费',
        total: '总计',
        estimatedTotal: '预计总计',
      },
      messages: {
        successTitle: '订单已发送！',
        successMessage: '感谢您的订购！我们将尽快与您联系确认。',
        orderId: '订单 ID',
        copied: '已复制！',
        unpricedWarning: '购物车中的某些商品未设置价格。请在提交订单后联系商店获取最终报价。',
        closeWarning: '购物车中的所有商品和输入的数据都将丢失。您确定吗？',
        callForPrice: '致电询价',
      },
    },
  },
  ru: {
    languageName: 'Russian',
    languageNativeName: 'Русский',
    navbar: {
      tagline: 'Ремесленная Пекарня',
      menu: {
        products: 'Продукты',
        orders: 'Заказы',
        careers: 'Карьера',
        contact: 'Контакты',
      },
      mobileMenu: {
        products: 'Наши Продукты',
        orders: 'Индивидуальные Заказы',
        careers: 'Карьера',
        contact: 'Адреса и Часы',
        call: 'Позвонить',
        whatsapp: 'WhatsApp',
        locations: 'Посмотреть Адреса',
        orderNow: 'Заказать Сейчас',
      },
      phoneCta: '0754 554 194',
      whatsappLabel: 'WhatsApp',
      orderButton: 'Заказать',
      christmasToggle: {
        enable: 'Включить режим Рождества',
        disable: 'Выключить режим Рождества',
      },
    },
    hero: {
      badge: 'Drăgășani • Băbeni',
      heading: 'Officina del Gusto',
      subheading: 'Магия подлинного вкуса',
      description:
        'Вставая до рассвета, мы печем теплые крендели, пикантные пироги и сытную пиццу, чтобы ваш день начался с аромата чего-то вкусного.',
      primaryCta: 'Посмотреть вкусности',
      secondaryCta: 'Наши адреса',
    },
    infoSection: {
      heading: 'Традиции и Страсть',
      description:
        'В Officina del Gusto мы верим, что хорошие дни начинаются рано — как только первый поднос со свежеиспеченными кренделями выходит из печи.',
      cards: {
        schedule: {
          title: 'Продленные Часы',
          description: 'Завтрак, обед или вечернее угощение — мы здесь весь день.',
          weekdaysLabel: 'Понедельник - Суббота',
          weekdaysValue: '06:00 - 20:00',
          sundayLabel: 'Воскресенье',
          sundayValue: 'Закрыто',
        },
        quality: {
          title: 'Отборные Ингредиенты',
          description:
            'Мука высшего сорта, свежий сыр и щедрые начинки. Мы печем все ежедневно и остаемся верны семейным рецептам.',
          bullets: ['Тесто замешивается каждое утро', 'Всегда свежие партии', 'Честные традиционные рецепты'],
        },
        passion: {
          title: 'Сделано с Любовью',
          description:
            'Мы — семейный бизнес в Drăgășani и Băbeni. Видеть улыбки клиентов после первого кусочка — наш любимый отзыв.',
          motto: 'Вкус, который возвращает вас',
        },
      },
    },
    productGallery: {
      eyebrow: 'Ежедневные угощения',
      title: 'Наши продукты',
      description: 'Сделано вручную в нашей мастерской каждый день, используя только натуральные ингредиенты.',
      products: [
        {
          name: 'Теплые Крендели',
          description: 'Золотистые крендели с кунжутом, маком или солью — прямо из печи.',
          tag: 'Хит Продаж',
        },
        {
          name: 'Сырная Выпечка',
          description: 'Слоеные пирожки, щедро наполненные соленым сыром — классическая румынская мерденя.',
        },
        {
          name: 'Пицца как в Пекарне',
          description: 'Пышное тесто, насыщенный томатный соус и щедрые начинки. Уютная пицца.',
          tag: 'Рецепт Дома',
        },
        {
          name: 'Яблочный Пирог',
          description: 'Ароматная яблочная начинка с корицей и легкой посыпкой сахара.',
        },
        {
          name: 'Крендель Хот-Дог',
          description: 'Сытный перекус: качественная сосиска, завернутая в наше мягкое тесто для кренделей.',
          tag: 'С Собой',
        },
        {
          name: 'Штрудели',
          description: 'Золотистые штрудели со сладкими или солеными начинками.',
        },
        {
          name: 'Слоеные Закуски',
          description: 'Мини-пирожки с сыром, грибами или мясом — идеально в любое время.',
        },
        {
          name: 'Сезонные Специальные',
          description: 'Спрашивайте в магазине о последних лимитированных новинках.',
        },
      ],
    },
    customOrders: {
      eyebrow: 'Специальные Заказы',
      title: 'Мы Принимаем Заказы на Любой Случай',
      description: 'Мероприятия, праздники, торжества или любой тип заказа, включающий выпечку — мы готовы помочь!',
      features: [
        'Свадьбы и крестины',
        'Вечеринки и дни рождения',
        'Корпоративные мероприятия',
        'Праздники и особые случаи',
      ],
      phoneCta: 'Позвоните нам',
      emailCta: 'Отправить email',
      phoneNumber: '0754 554 194',
      emailAddress: 'odgdragasani@gmail.com',
      viewImage: 'Посмотреть',
    },
    jobs: {
      eyebrow: 'Присоединяйтесь к команде',
      title: 'Карьера в Officina',
      description:
        'Мы ищем жизнерадостных, трудолюбивых людей, которые любят теплые печи и дружелюбных клиентов. Если это вы, присоединяйтесь!',
      filters: {
        all: 'Все',
        dragasani: 'Drăgășani',
        babeni: 'Băbeni',
      },
      loading: 'Загрузка вакансий...',
      none: 'Сейчас нет активных вакансий.',
      noneFiltered: 'В этом месте пока нет доступных вакансий.',
      successTitle: 'Спасибо!',
      successMessage: 'Мы получили вашу заявку и свяжемся с вами, если будет совпадение.',
      applyButton: 'Подать заявку',
      modalTitle: 'Подать заявку на:',
      rateLimit: 'Вы недавно подавали заявку. Пожалуйста, подождите минуту перед отправкой другой заявки.',
      phoneInvalid: 'Пожалуйста, введите действительный номер телефона (например, 0712 345 678 или +7 123 456 78 90).',
      phoneFake: 'Номер телефона выглядит недействительным. Пожалуйста, проверьте его.',
      submitError: 'Что-то пошло не так. Пожалуйста, попробуйте снова.',
      lockedLocationNote: '(Заблокировано ролью)',
      locationPrefix: 'Предпочтительное место',
      form: {
        name: { label: 'Полное имя *', placeholder: 'Пример: Мария Попеску' },
        phone: {
          label: 'Номер телефона *',
          placeholder: 'Пример: 0712 345 678 или +7 123 456 78 90',
          helper: 'Принимаются румынские или международные номера',
        },
        location: {
          label: 'Предпочтительное место *',
          lockedSuffix: '(Заблокировано ролью)',
          options: { dragasani: 'Drăgășani', babeni: 'Băbeni', either: 'Любое' },
        },
        email: { label: 'Email (необязательно)', placeholder: 'example@email.com' },
        message: { label: 'Сообщение (необязательно)', placeholder: 'Расскажите нам немного о себе...' },
        cv: { label: 'Загрузить резюме (необязательно)', placeholder: 'Нажмите, чтобы загрузить (PDF или изображение)' },
        submit: { idle: 'Отправить заявку', loading: 'Отправка...' },
      },
    },
    mapSection: {
      title: 'Приходите к нам!',
      description: 'Нужен ли вам завтрак на ходу или теплое угощение для дома, заходите в один из наших магазинов.',
      dragasaniButton: 'Drăgășani',
      babeniButton: 'Băbeni',
      intro:
        'Заходите, когда будете рядом — аромат свежей выпечки направит вас. Магазины в Drăgășani и Băbeni готовы к встрече с вами.',
      addressLabel: 'Адрес',
      phoneLabel: 'Заказы по телефону',
      emailLabel: 'Email',
      callCta: 'Навигация',
      facebookCta: 'Facebook',
      mapOverlay: 'Нажмите для взаимодействия',
    },
    footer: {
      tagline: 'Пекарня • Пицца • Традиции',
      categories: 'Пекарня • Пицца • Традиции',
      termsLink: 'Условия и Положения',
      privacyLink: 'Политика Конфиденциальности',
      anpcLink: 'ANPC',
      anpcDescription: 'Альтернативное разрешение споров / Онлайн разрешение споров',
      schedule: 'Пн - Сб: 06:00 - 20:00',
      sundayClosed: 'Воскресенье: Закрыто',
      locationsNote: 'Адреса в Drăgășani и Băbeni.',
      adminLink: 'Вход для администратора',
    },
    legal: {
      terms: {
        title: 'Условия и Положения',
        lastUpdated: 'Последнее обновление',
        sections: [
          {
            title: '1. Общая Информация',
            paragraphs: [
              'Этот веб-сайт управляется Officina del Gusto, базирующейся в Drăgășani, Vâlcea, Румыния.',
              'Контакт: Телефон +40 754 554 194 • Email odgdragasani@gmail.com',
            ],
          },
          {
            title: '2. Сфера Деятельности',
            paragraphs: [
              'Officina del Gusto — это ремесленная пекарня, предлагающая выпечку, пирожные и пиццу в Drăgășani и Băbeni. Продукты доступны только для самовывоза.',
            ],
          },
          {
            title: '3. Использование Сайта',
            paragraphs: [
              'Веб-сайт демонстрирует наше меню и позволяет кандидатам подавать заявки на открытые вакансии. Он носит чисто информационный характер.',
            ],
          },
          {
            title: '4. Интеллектуальная Собственность',
            paragraphs: [
              'Тексты, изображения, логотипы и макеты принадлежат Officina del Gusto и защищены законом об авторском праве.',
            ],
          },
          {
            title: '5. Ответственность',
            paragraphs: [
              'Наличие продуктов и часы работы могут быть изменены без предварительного уведомления. Информация на сайте является ориентировочной.',
            ],
          },
          {
            title: '6. Разрешение Споров',
            paragraphs: [
              'Потребители могут обратиться в ANPC (румынский орган ADR) или на платформу ODR ЕС для разрешения споров.',
            ],
          },
          {
            title: '7. Применимое Право',
            paragraphs: ['Эти условия регулируются румынским законодательством.'],
          },
        ],
      },
      privacy: {
        title: 'Политика Конфиденциальности',
        lastUpdated: 'Последнее обновление',
        sections: [
          {
            title: '1. Введение',
            paragraphs: ['Мы соблюдаем GDPR и защищаем персональные данные, переданные нам.'],
          },
          {
            title: '2. Сбор Данных',
            paragraphs: ['Мы собираем:'],
            list: [
              'Контактные данные (имя, телефон, email) для заявок на работу',
              'Резюме и прикрепленные сообщения',
              'Анонимные технические данные для улучшения сайта',
            ],
          },
          {
            title: '3. Цель',
            paragraphs: ['Заявки обрабатываются для оценки кандидатов и связи с ними при необходимости.'],
          },
          {
            title: '4. Хранение',
            paragraphs: ['Данные хранятся надежно, а резюме удаляются в течение 6 месяцев после найма.'],
          },
          {
            title: '5. Права',
            paragraphs: ['Вы можете запросить доступ, исправление, удаление, ограничение, переносимость или возразить против обработки.'],
          },
          {
            title: '6. Контакт',
            paragraphs: ['Напишите на odgdragasani@gmail.com или позвоните по номеру +40 754 554 194 для запросов GDPR.'],
          },
          {
            title: '7. Жалобы',
            paragraphs: ['Жалобы можно подать в румынский DPA (ANSPDCP).'],
          },
        ],
      },
    },
    login: {
      title: 'Вход для администратора',
      userLabel: 'Имя пользователя',
      passLabel: 'Пароль',
      submit: 'Войти',
      back: 'Вернуться на сайт',
      error: 'Неверное имя пользователя или пароль!',
    },
    music: {
      promptTitle: 'Включить рождественскую музыку?',
      promptDescription: 'У нас есть плейлист с мягкими рождественскими песнями на громкости ~20%. Хотите послушать?',
      accept: 'Да, включить музыку',
      decline: 'Не сейчас',
      never: 'Больше не спрашивать',
      helper: 'Вы можете управлять плеером из шапки в любое время.',
      toastTitle: 'Рождественская музыка доступна!',
      toastAction: 'Включить музыку',
      toastClose: 'Закрыть',
    },
    orderModal: {
      steps: {
        products: 'Выбрать Продукты',
        details: 'Детали Доставки',
        review: 'Проверить Заказ',
        success: 'Заказ Отправлен!',
      },
      buttons: {
        next: 'Продолжить',
        back: 'Назад',
        submit: 'Подтвердить и Отправить',
        close: 'Закрыть',
        cancel: 'Отмена',
        confirmClose: 'Да, закрыть',
        confirmUnpriced: 'Я понимаю, Отправить',
        pickup: 'Самовывоз',
        delivery: 'Доставка',
      },
      labels: {
        name: 'Ваше Имя',
        phone: 'Номер Телефона',
        date: 'Предпочтительная Дата',
        address: 'Адрес Доставки',
        deliveryMethod: 'Способ Доставки',
        optional: '(Необязательно)',
      },
      summary: {
        title: 'Сводка Заказа',
        emptyCart: 'Ваша корзина пуста.',
        standardProducts: 'СТАНДАРТНЫЕ ПРОДУКТЫ',
        specialProducts: 'СПЕЦИАЛЬНЫЕ ЗАКАЗЫ',
        subtotal: 'Подытог',
        shippingFee: 'Стоимость Доставки',
        packagingFee: 'Стоимость Упаковки',
        total: 'Итого',
        estimatedTotal: 'Ориентировочная Сумма',
      },
      messages: {
        successTitle: 'Заказ Отправлен!',
        successMessage: 'Спасибо за ваш заказ! Мы свяжемся с вами в ближайшее время для подтверждения.',
        orderId: 'ID ЗАКАЗА',
        copied: 'Скопировано!',
        unpricedWarning: 'У некоторых товаров в вашей корзине не установлена цена. Пожалуйста, свяжитесь с магазином для получения окончательного предложения после отправки заказа.',
        closeWarning: 'Все товары в корзине и введенные данные будут потеряны. Вы уверены?',
        callForPrice: 'Позвонить для цены',
      },
    },
  },
};

export type SiteDictionaryKey = keyof SiteDictionary;
export type Dictionary = typeof translations['ro'];
