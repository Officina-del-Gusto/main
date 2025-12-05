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
  es: {
    languageName: 'Spanish',
    languageNativeName: 'Español',
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
  zh: {
    languageName: 'Chinese',
    languageNativeName: '中文',
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
  ru: {
    languageName: 'Russian',
    languageNativeName: 'Русский',
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
};

export type SiteDictionaryKey = keyof SiteDictionary;
export type Dictionary = typeof translations['ro'];
