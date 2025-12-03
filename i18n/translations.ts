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
    };
    phoneCta: string;
    whatsappLabel: string;
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
    customOrder: string;
    successTitle: string;
    successMessage: string;
    errorMessage: string;
    close: string;
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
      },
      phoneCta: '0754 554 194',
      whatsappLabel: 'WhatsApp',
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
              'Officina del Gusto este o patiserie artizanală care oferă produse de panificație, patiserie și pizza în locațiile din Drăgășani și Băbeni. Produsele sunt disponibile pentru ridicare din locațiile noastre fizice sau livrare la domiciliu.',
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
              'În cazul unor eventuale litigii, consumatorii pot apela la ANPC - Soluționarea Alternativă a Litigiilor (SAL) (https://reclamatiisal.anpc.ro/) sau la Platforma Europeană ODR pentru Soluționarea Online a Litigiilor.',
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
      customOrder: 'Comandă Personalizată',
      successTitle: 'Comandă Trimisă cu Succes!',
      successMessage: 'Vă vom contacta în scurt timp pentru confirmare.',
      errorMessage: 'Eroare la trimiterea comenzii. Vă rugăm încercați din nou.',
      close: 'Închide',
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
      },
      phoneCta: '0754 554 194',
      whatsappLabel: 'WhatsApp',
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
              'Officina del Gusto is an artisan bakery offering baked goods, pastries, and pizza in the Drăgășani and Băbeni locations. Products are available for pick-up or home delivery.',
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
      customOrder: 'Custom Order',
      successTitle: 'Order Sent Successfully!',
      successMessage: 'We will contact you shortly for confirmation.',
      errorMessage: 'Error sending order. Please try again.',
      close: 'Close',
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
      },
      phoneCta: '0754 554 194',
      whatsappLabel: 'WhatsApp',
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
            paragraphs: ['Produciamo prodotti da forno artigianali disponibili per il ritiro in negozio o consegna a domicilio.'],
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
      customOrder: 'Ordine Personalizzato',
      successTitle: 'Ordine Inviato con Successo!',
      successMessage: 'Ti contatteremo a breve per la conferma.',
      errorMessage: 'Errore nell invio dell ordine. Riprova.',
      close: 'Chiudi',
    },
  },
  fr: {
    languageName: 'French',
    languageNativeName: 'Français',
    navbar: {
      tagline: 'Pâtisserie artisanale',
      menu: { products: 'Produits', orders: 'Commandes', careers: 'Carrières', contact: 'Contact' },
      mobileMenu: {
        products: 'Nos produits',
        orders: 'Commandes personnalisées',
        careers: 'Recrutement',
        contact: 'Adresses & horaires',
        call: 'Appeler',
        whatsapp: 'WhatsApp',
        locations: 'Voir les adresses',
      },
      phoneCta: '0754 554 194',
      whatsappLabel: 'WhatsApp',
      christmasToggle: { enable: 'Activer le mode Noël', disable: 'Désactiver le mode Noël' },
    },
    hero: {
      badge: 'Drăgășani • Băbeni',
      heading: 'Officina del Gusto',
      subheading: 'La magie du goût authentique',
      description: 'Dès l aube nous préparons des covrigi chauds, des tartes salées et des pizzas généreuses pour toute la journée.',
      primaryCta: 'Découvrir nos produits',
      secondaryCta: 'Nos adresses',
    },
    infoSection: {
      heading: 'Tradition et passion',
      description: 'Une bonne journée commence quand la première fournée sort du four.',
      cards: {
        schedule: {
          title: 'Horaires étendus',
          description: 'Petit-déjeuner, déjeuner ou collation du soir : nous sommes ouverts.',
          weekdaysLabel: 'Lundi - Samedi',
          weekdaysValue: '06h00 - 20h00',
          sundayLabel: 'Dimanche',
          sundayValue: 'Fermé',
        },
        quality: {
          title: 'Ingrédients choisis',
          description: 'Farines de qualité, fromages frais et recettes familiales.',
          bullets: ['Pâte pétrie chaque jour', 'Produits toujours frais', 'Recettes traditionnelles'],
        },
        passion: {
          title: 'Fait avec amour',
          description: 'Entreprise familiale implantée à Drăgășani et Băbeni. Vos sourires nous guident.',
          motto: 'Le goût qui fait revenir',
        },
      },
    },
    productGallery: {
      eyebrow: 'Gourmandises du jour',
      title: 'Nos produits',
      description: 'Tous nos produits sont faits main avec des ingrédients naturels.',
      products: [
        { name: 'Covrigi chauds', description: 'Bretzels dorés au sésame, pavot ou sel.', tag: 'Best seller' },
        { name: 'Feuilletés au fromage', description: 'Pâte feuilletée croustillante garnie de fromage salé.' },
        { name: 'Pizza de boulangerie', description: 'Pâte moelleuse, sauce riche et généreux toppings.', tag: 'Recette maison' },
        { name: 'Tarte aux pommes', description: 'Pommes parfumées à la cannelle et sucre glace.' },
        { name: 'Hot-dog façon covrig', description: 'Saucisse de qualité enveloppée dans notre pâte.', tag: 'Snack rapide' },
        { name: 'Strudels', description: 'Strudels dorés sucrés ou salés.' },
        { name: 'Bouchées feuilletées', description: 'Petits feuilletés au fromage, champignons ou viande.' },
        { name: 'Spécialités saisonnières', description: 'Demandez les nouveautés en boutique.' },
      ],
    },
    customOrders: {
      eyebrow: 'Commandes Spéciales',
      title: 'Nous Honorons les Commandes pour Toute Occasion',
      description: 'Événements, célébrations, fêtes ou tout type de commande de pâtisserie — nous sommes prêts à vous aider !',
      features: [
        'Mariages et baptêmes',
        'Fêtes et anniversaires',
        'Événements d\'entreprise',
        'Fêtes et occasions spéciales',
      ],
      phoneCta: 'Appelez-nous',
      emailCta: 'Envoyer un email',
      phoneNumber: '0754 554 194',
      emailAddress: 'odgdragasani@gmail.com',
      viewImage: 'Voir',
    },
    jobs: {
      eyebrow: 'Rejoignez l équipe',
      title: 'Carrières chez Officina',
      description: 'Nous cherchons des personnes souriantes et motivées. Ambiance chaleureuse garantie.',
      filters: { all: 'Toutes', dragasani: 'Drăgășani', babeni: 'Băbeni' },
      loading: 'Chargement des postes...',
      none: 'Aucune offre pour le moment.',
      noneFiltered: 'Aucun poste dans ce point de vente actuellement.',
      successTitle: 'Merci !',
      successMessage: 'Nous avons bien reçu votre candidature.',
      applyButton: 'Postuler',
      modalTitle: 'Postuler pour :',
      rateLimit: 'Merci d attendre une minute avant une nouvelle candidature.',
      phoneInvalid: 'Veuillez saisir un numéro valide (ex. +33 ...).',
      phoneFake: 'Le numéro semble incorrect.',
      submitError: 'Une erreur est survenue. Réessayez.',
      lockedLocationNote: '(Défini par le poste)',
      locationPrefix: 'Site souhaité',
      form: {
        name: { label: 'Nom complet *', placeholder: 'Ex : Marie Popescu' },
        phone: { label: 'Téléphone *', placeholder: 'Ex : 0712 345 678 ou +33 ...', helper: 'Numéros roumains ou internationaux' },
        location: { label: 'Site souhaité *', lockedSuffix: '(Défini par le poste)', options: { dragasani: 'Drăgășani', babeni: 'Băbeni', either: 'Indifférent' } },
        email: { label: 'Email (optionnel)', placeholder: 'exemple@email.com' },
        message: { label: 'Message (optionnel)', placeholder: 'Parlez-nous de vous...' },
        cv: { label: 'Télécharger CV (optionnel)', placeholder: 'Cliquer pour importer (PDF ou image)' },
        submit: { idle: 'Envoyer la candidature', loading: 'Envoi...' },
      },
    },
    mapSection: {
      title: 'Venez nous voir !',
      description: 'Petit-déjeuner à emporter ou douceur pour la maison ? Passez nous voir.',
      dragasaniButton: 'Drăgășani',
      babeniButton: 'Băbeni',
      intro: 'L odeur de pâtisserie chaude vous guidera vers nos deux adresses.',
      addressLabel: 'Adresse',
      phoneLabel: 'Téléphone',
      emailLabel: 'Email',
      callCta: 'Itinéraire',
      facebookCta: 'Facebook',
      mapOverlay: 'Cliquez pour interagir',
    },
    footer: {
      tagline: 'Pâtisserie • Pizza • Tradition',
      categories: 'Pâtisserie • Pizza • Tradition',
      termsLink: 'Conditions générales',
      privacyLink: 'Politique de confidentialité',
      anpcLink: 'ANPC',
      anpcDescription: 'Règlement alternatif / Règlement en ligne des litiges',
      schedule: 'Lun - Sam : 06h00 - 20h00',
      sundayClosed: 'Dim : Fermé',
      locationsNote: 'Magasins à Drăgășani et Băbeni.',
      adminLink: 'Espace admin',
    },
    legal: {
      terms: {
        title: 'Conditions générales',
        lastUpdated: 'Dernière mise à jour',
        sections: [
          { title: '1. Informations', paragraphs: ['Site exploité par Officina del Gusto (Drăgășani, Roumanie).', 'Contact : +40 754 554 194 • odgdragasani@gmail.com'] },
          { title: '2. Activité', paragraphs: ['Produits artisanaux disponibles en retrait boutique ou livraison à domicile.'] },
          { title: '3. Usage', paragraphs: ['Site informatif permettant l envoi de candidatures.'] },
          { title: '4. Propriété intellectuelle', paragraphs: ['Textes et visuels appartiennent à Officina del Gusto.'] },
          { title: '5. Responsabilité', paragraphs: ['Offres et horaires susceptibles de changer.'] },
          { title: '6. Litiges', paragraphs: ['ADR via l ANPC ou plate-forme européenne ODR.'] },
          { title: '7. Loi applicable', paragraphs: ['Droit roumain.'] },
        ],
      },
      privacy: {
        title: 'Politique de confidentialité',
        lastUpdated: 'Dernière mise à jour',
        sections: [
          { title: '1. Introduction', paragraphs: ['Nous respectons le RGPD et protégeons vos données.'] },
          { title: '2. Données collectées', paragraphs: ['Coordonnées, CV transmis et données techniques anonymes.'] },
          { title: '3. Finalité', paragraphs: ['Gérer les candidatures et améliorer le site.'] },
          { title: '4. Conservation', paragraphs: ['Stockage sécurisé, suppression des CV sous 6 mois.'] },
          { title: '5. Droits', paragraphs: ['Accès, rectification, effacement, limitation, portabilité, opposition.'] },
          { title: '6. Contact', paragraphs: ['odgdragasani@gmail.com / +40 754 554 194'] },
          { title: '7. Réclamations', paragraphs: ['Autorité roumaine ANSPDCP.'] },
        ],
      },
    },
    login: {
      title: 'Accès administrateur',
      userLabel: 'Utilisateur',
      passLabel: 'Mot de passe',
      submit: 'Se connecter',
      back: 'Retour au site',
      error: 'Identifiants incorrects',
    },
    music: {
      promptTitle: 'Lancer la musique de Noël ?',
      promptDescription: 'Playlist de chants de Noël à faible volume. On lance ?',
      accept: 'Oui, lancer la musique',
      decline: 'Pas maintenant',
      never: 'Ne plus demander',
      helper: 'Contrôlez la musique depuis le menu principal.',
      toastTitle: 'Musique de Noël disponible !',
      toastAction: 'Lire la musique',
      toastClose: 'Fermer',
    },
    orderModal: {
      customOrder: 'Commande Personnalisée',
      successTitle: 'Commande Envoyée avec Succès !',
      successMessage: 'Nous vous contacterons bientôt pour confirmation.',
      errorMessage: 'Erreur lors de l envoi. Veuillez réessayer.',
      close: 'Fermer',
    },
  },
  es: {
    languageName: 'Spanish',
    languageNativeName: 'Español',
    navbar: {
      tagline: 'Pastelería artesanal',
      menu: { products: 'Productos', orders: 'Pedidos', careers: 'Empleo', contact: 'Contacto' },
      mobileMenu: {
        products: 'Nuestros productos',
        orders: 'Pedidos Personalizados',
        careers: 'Únete al equipo',
        contact: 'Ubicación y horario',
        call: 'Llámanos',
        whatsapp: 'WhatsApp',
        locations: 'Ver locales',
      },
      phoneCta: '0754 554 194',
      whatsappLabel: 'WhatsApp',
      christmasToggle: { enable: 'Activar modo Navidad', disable: 'Desactivar modo Navidad' },
    },
    hero: {
      badge: 'Drăgășani • Băbeni',
      heading: 'Officina del Gusto',
      subheading: 'La magia del sabor auténtico',
      description: 'Desde el amanecer horneamos pretzels calientes, empanadas y pizza casera para alegrar tu día.',
      primaryCta: 'Ver delicias',
      secondaryCta: 'Nuestras ubicaciones',
    },
    infoSection: {
      heading: 'Tradición y pasión',
      description: 'Un buen día empieza cuando abrimos el horno por primera vez.',
      cards: {
        schedule: {
          title: 'Horario amplio',
          description: 'Desayuno, comida o cena ligera: siempre estamos aquí.',
          weekdaysLabel: 'Lunes - Sábado',
          weekdaysValue: '06:00 - 20:00',
          sundayLabel: 'Domingo',
          sundayValue: 'Cerrado',
        },
        quality: {
          title: 'Ingredientes selectos',
          description: 'Harinas de calidad, queso fresco y recetas familiares.',
          bullets: ['Masa amasada cada día', 'Productos siempre frescos', 'Recetas tradicionales'],
        },
        passion: {
          title: 'Hecho con amor',
          description: 'Negocio familiar en Drăgășani y Băbeni. Las sonrisas de nuestros clientes nos inspiran.',
          motto: 'El sabor que te hace volver',
        },
      },
    },
    productGallery: {
      eyebrow: 'Dulces diarios',
      title: 'Nuestros productos',
      description: 'Todo se prepara a mano con ingredientes naturales.',
      products: [
        { name: 'Pretzels calientes', description: 'Dorados, con sésamo, amapola o sal.', tag: 'Más vendido' },
        { name: 'Merdenele', description: 'Hojaldre crujiente relleno de queso salado.' },
        { name: 'Pizza casera', description: 'Masa esponjosa y cubierta abundante.', tag: 'Receta propia' },
        { name: 'Tarta de manzana', description: 'Manzanas con canela y azúcar glas.' },
        { name: 'Hot dog de pretzel', description: 'Salchicha calidad envuelta en masa suave.', tag: 'Snack rápido' },
        { name: 'Strudel', description: 'Strudels dorados dulces o salados.' },
        { name: 'Pastelitos', description: 'Bocados de hojaldre con queso o carne.' },
        { name: 'Especiales de temporada', description: 'Pregunta por las novedades en tienda.' },
      ],
    },
    customOrders: {
      eyebrow: 'Pedidos Especiales',
      title: 'Aceptamos Pedidos para Cualquier Ocasión',
      description: 'Eventos, celebraciones, fiestas o cualquier tipo de pedido de pastelería — ¡estamos listos para ayudarte!',
      features: [
        'Bodas y bautizos',
        'Fiestas y cumpleaños',
        'Eventos corporativos',
        'Fiestas y ocasiones especiales',
      ],
      phoneCta: 'Llámanos',
      emailCta: 'Enviar email',
      phoneNumber: '0754 554 194',
      emailAddress: 'odgdragasani@gmail.com',
      viewImage: 'Ver',
    },
    jobs: {
      eyebrow: 'Únete al equipo',
      title: 'Trabaja con Officina',
      description: 'Buscamos gente alegre y trabajadora para un ambiente cálido.',
      filters: { all: 'Todos', dragasani: 'Drăgășani', babeni: 'Băbeni' },
      loading: 'Cargando ofertas...',
      none: 'No hay vacantes activas por ahora.',
      noneFiltered: 'No hay vacantes en esta ubicación aún.',
      successTitle: '¡Gracias!',
      successMessage: 'Hemos recibido tu solicitud.',
      applyButton: 'Postular ahora',
      modalTitle: 'Postulación para:',
      rateLimit: 'Espera un minuto antes de enviar otra solicitud.',
      phoneInvalid: 'Introduce un teléfono válido (ej. 0712 345 678 o +34 ...).',
      phoneFake: 'El teléfono no parece correcto.',
      submitError: 'Algo falló. Inténtalo otra vez.',
      lockedLocationNote: '(Fijado por el puesto)',
      locationPrefix: 'Ubicación deseada',
      form: {
        name: { label: 'Nombre completo *', placeholder: 'Ej: María Popescu' },
        phone: { label: 'Teléfono *', placeholder: 'Ej: 0712 345 678 o +34 ...', helper: 'Aceptamos números rumanos e internacionales' },
        location: { label: 'Ubicación deseada *', lockedSuffix: '(Fijado por el puesto)', options: { dragasani: 'Drăgășani', babeni: 'Băbeni', either: 'Cualquiera' } },
        email: { label: 'Email (opcional)', placeholder: 'correo@ejemplo.com' },
        message: { label: 'Mensaje (opcional)', placeholder: 'Cuéntanos sobre ti...' },
        cv: { label: 'Sube CV (opcional)', placeholder: 'Haz clic para subir (PDF o imagen)' },
        submit: { idle: 'Enviar solicitud', loading: 'Enviando...' },
      },
    },
    mapSection: {
      title: '¡Ven a visitarnos!',
      description: 'Desayuno para llevar o algo dulce para casa: aquí estamos.',
      dragasaniButton: 'Drăgășani',
      babeniButton: 'Băbeni',
      intro: 'El aroma de la pastelería te guiará a cualquiera de nuestras tiendas.',
      addressLabel: 'Dirección',
      phoneLabel: 'Teléfono',
      emailLabel: 'Email',
      callCta: 'Navegar',
      facebookCta: 'Facebook',
      mapOverlay: 'Haz clic para interactuar',
    },
    footer: {
      tagline: 'Pastelería • Pizza • Tradición',
      categories: 'Pastelería • Pizza • Tradición',
      termsLink: 'Términos y condiciones',
      privacyLink: 'Privacidad',
      anpcLink: 'ANPC',
      anpcDescription: 'Resolución alternativa / Resolución online de disputas',
      schedule: 'Lun - Sáb: 06:00 - 20:00',
      sundayClosed: 'Domingo: Cerrado',
      locationsNote: 'Tiendas en Drăgășani y Băbeni.',
      adminLink: 'Admin',
    },
    legal: {
      terms: {
        title: 'Términos y condiciones',
        lastUpdated: 'Última actualización',
        sections: [
          { title: '1. Información', paragraphs: ['Sitio operado por Officina del Gusto (Rumanía).', 'Contacto: +40 754 554 194 • odgdragasani@gmail.com'] },
          { title: '2. Actividad', paragraphs: ['Productos artesanales disponibles para recoger en tienda o entrega a domicilio.'] },
          { title: '3. Uso', paragraphs: ['Contenido informativo y formulario de empleo.'] },
          { title: '4. Propiedad intelectual', paragraphs: ['Textos e imágenes pertenecen a Officina del Gusto.'] },
          { title: '5. Responsabilidad', paragraphs: ['Horarios y productos pueden cambiar sin aviso.'] },
          { title: '6. Disputas', paragraphs: ['Contacta con ANPC o la plataforma ODR.'] },
          { title: '7. Ley aplicable', paragraphs: ['Derecho rumano.'] },
        ],
      },
      privacy: {
        title: 'Política de privacidad',
        lastUpdated: 'Última actualización',
        sections: [
          { title: '1. Introducción', paragraphs: ['Cumplimos con el RGPD y protegemos tus datos.'] },
          { title: '2. Datos recogidos', paragraphs: ['Datos de contacto, CV y datos técnicos anónimos.'] },
          { title: '3. Finalidad', paragraphs: ['Evaluar candidatos y mejorar el servicio.'] },
          { title: '4. Almacenamiento', paragraphs: ['Datos guardados de forma segura, CV eliminados a los 6 meses.'] },
          { title: '5. Derechos', paragraphs: ['Acceso, rectificación, supresión, limitación, portabilidad, oposición.'] },
          { title: '6. Contacto', paragraphs: ['odgdragasani@gmail.com / +40 754 554 194'] },
          { title: '7. Reclamaciones', paragraphs: ['Autoridad rumana ANSPDCP.'] },
        ],
      },
    },
    login: {
      title: 'Acceso administrador',
      userLabel: 'Usuario',
      passLabel: 'Contraseña',
      submit: 'Entrar',
      back: 'Volver al sitio',
      error: 'Usuario o contraseña incorrectos',
    },
    music: {
      promptTitle: '¿Reproducir música navideña?',
      promptDescription: 'Una lista suave al 20% de volumen. ¿La escuchamos?',
      accept: 'Sí, reproducir',
      decline: 'Ahora no',
      never: 'No volver a preguntar',
      helper: 'Puedes controlar la música desde el encabezado.',
      toastTitle: '¡Música navideña disponible!',
      toastAction: 'Reproducir',
      toastClose: 'Cerrar',
    },
    orderModal: {
      customOrder: 'Pedido Personalizado',
      successTitle: '¡Pedido Enviado con Éxito!',
      successMessage: 'Nos pondremos en contacto pronto para confirmar.',
      errorMessage: 'Error al enviar el pedido. Inténtalo de nuevo.',
      close: 'Cerrar',
    },
  },
  zh: {
    languageName: 'Chinese',
    languageNativeName: '中文',
    navbar: {
      tagline: '手工烘焙坊',
      menu: { products: '产品', orders: '订单', careers: '招聘', contact: '联系' },
      mobileMenu: {
        products: '全部产品',
        orders: '定制订单',
        careers: '加入我们',
        contact: '地址与营业时间',
        call: '立即致电',
        whatsapp: 'WhatsApp',
        locations: '查看门店',
      },
      phoneCta: '0754 554 194',
      whatsappLabel: 'WhatsApp',
      christmasToggle: { enable: '开启圣诞模式', disable: '关闭圣诞模式' },
    },
    hero: {
      badge: 'Drăgășani • Băbeni',
      heading: 'Officina del Gusto',
      subheading: '正宗风味的魔力',
      description: '清晨五点已开炉，现烤椒盐卷、馅饼与披萨，为你的一天带来温暖香气。',
      primaryCta: '查看美味',
      secondaryCta: '门店地址',
    },
    infoSection: {
      heading: '传统与热情',
      description: '第一盘出炉的椒盐卷，就是我们美好一天的开始。',
      cards: {
        schedule: {
          title: '营业时间',
          description: '早餐、午餐或夜宵，我们整天恭候。',
          weekdaysLabel: '周一 - 周六',
          weekdaysValue: '06:00 - 20:00',
          sundayLabel: '周日',
          sundayValue: '休息',
        },
        quality: {
          title: '精选食材',
          description: '优质面粉、鲜奶酪与家传配方，保证手作风味。',
          bullets: ['每日现和面团', '产品随烤随售', '传统家常配方'],
        },
        passion: {
          title: '用心烘焙',
          description: '家族经营，两家门店服务本地。看到顾客微笑是最大回馈。',
          motto: '你会一再回味的味道',
        },
      },
    },
    productGallery: {
      eyebrow: '每日新鲜',
      title: '招牌产品',
      description: '全部手工制作，只选天然食材。',
      products: [
        { name: '现烤椒盐卷', description: '出炉即食，可选芝麻、罂粟或海盐。', tag: '热销' },
        { name: '奶酪酥饼', description: '千层酥皮夹足量咸味奶酪。' },
        { name: '面包房披萨', description: '松软饼底搭配丰富酱料与配料。', tag: '招牌配方' },
        { name: '苹果派', description: '肉桂苹果馅，撒上糖粉。' },
        { name: '热狗卷', description: '优质香肠包裹在柔软面团中。', tag: '快捷小吃' },
        { name: '什锦卷', description: '酥皮裹甜馅或咸馅，层次分明。' },
        { name: '迷你酥点', description: '奶酪、蘑菇或肉馅小酥点。' },
        { name: '季节限定', description: '门店不定期推出新品。' },
      ],
    },
    customOrders: {
      eyebrow: '定制订单',
      title: '承接各类场合订单',
      description: '活动、庆典、节日或任何类型的烘焙订单——我们随时为您服务！',
      features: [
        '婚礼与洗礼',
        '派对与生日',
        '企业活动',
        '节日与特殊场合',
      ],
      phoneCta: '电话联系',
      emailCta: '发送邮件',
      phoneNumber: '0754 554 194',
      emailAddress: 'odgdragasani@gmail.com',
      viewImage: '查看',
    },
    jobs: {
      eyebrow: '加入我们的团队',
      title: '招聘岗位',
      description: '寻找热情、勤劳又面带微笑的伙伴，欢迎来到温暖的烘焙坊。',
      filters: { all: '全部', dragasani: 'Drăgășani', babeni: 'Băbeni' },
      loading: '岗位载入中…',
      none: '目前暂无空缺。',
      noneFiltered: '该地区暂未开放岗位。',
      successTitle: '谢谢！',
      successMessage: '我们已收到你的申请，如合适会尽快联系。',
      applyButton: '立即申请',
      modalTitle: '申请职位：',
      rateLimit: '刚提交过申请，请稍等一分钟再试。',
      phoneInvalid: '请输入有效电话（例：0712 345 678 或 +39 123 456 789）。',
      phoneFake: '电话看起来不正确，请再次确认。',
      submitError: '提交出现问题，请重试。',
      lockedLocationNote: '（岗位指定）',
      locationPrefix: '期望地点',
      form: {
        name: { label: '姓名 *', placeholder: '例如：Maria Popescu' },
        phone: { label: '电话 *', placeholder: '例如：0712 345 678 或 +39 123 456 789', helper: '支持罗马尼亚及国际号码' },
        location: { label: '期望地点 *', lockedSuffix: '（岗位指定）', options: { dragasani: 'Drăgășani', babeni: 'Băbeni', either: '皆可' } },
        email: { label: '邮箱（选填）', placeholder: 'your@email.com' },
        message: { label: '留言（选填）', placeholder: '简单介绍一下自己…' },
        cv: { label: '上传简历（选填）', placeholder: '点击上传（PDF/图片）' },
        submit: { idle: '提交申请', loading: '提交中…' },
      },
    },
    mapSection: {
      title: '欢迎来店！',
      description: '无论是上班路上的早餐，还是想带点心回家，我们都在这儿。',
      dragasaniButton: 'Drăgășani',
      babeniButton: 'Băbeni',
      intro: '跟随烘焙香气就能找到我们，两家门店随时恭候。',
      addressLabel: '地址',
      phoneLabel: '电话',
      emailLabel: '邮箱',
      callCta: '导航',
      facebookCta: 'Facebook',
      mapOverlay: '点击即可互动',
    },
    footer: {
      tagline: '烘焙 • 披萨 • 传统',
      categories: '烘焙 • 披萨 • 传统',
      termsLink: '条款与细则',
      privacyLink: '隐私政策',
      anpcLink: 'ANPC',
      anpcDescription: '线下/线上纠纷解决渠道',
      schedule: '周一 - 周六：06:00 - 20:00',
      sundayClosed: '周日：休息',
      locationsNote: '店铺位于 Drăgășani 和 Băbeni。',
      adminLink: '管理员登录',
    },
    legal: {
      terms: {
        title: '条款与细则',
        lastUpdated: '最后更新',
        sections: [
          { title: '1. 基本信息', paragraphs: ['本网站由 Officina del Gusto 运营，位于罗马尼亚 Drăgășani。', '联系方式：+40 754 554 194 / odgdragasani@gmail.com'] },
          { title: '2. 业务范围', paragraphs: ['门店提供手工烘焙与披萨，支持到店自取或送货上门。'] },
          { title: '3. 网站用途', paragraphs: ['展示产品及提供职位申请渠道。'] },
          { title: '4. 知识产权', paragraphs: ['网站文字与图片归 Officina del Gusto 所有。'] },
          { title: '5. 责任限制', paragraphs: ['产品与营业时间可能随时调整。'] },
          { title: '6. 纠纷解决', paragraphs: ['可联系罗马尼亚 ANPC 或欧盟 ODR 平台。'] },
          { title: '7. 适用法律', paragraphs: ['受罗马尼亚法律管辖。'] },
        ],
      },
      privacy: {
        title: '隐私政策',
        lastUpdated: '最后更新',
        sections: [
          { title: '1. 引言', paragraphs: ['我们遵循 GDPR 要求保护您的个人资料。'] },
          { title: '2. 收集数据', paragraphs: ['联系方式、简历与匿名技术数据。'] },
          { title: '3. 使用目的', paragraphs: ['处理求职申请并改进服务。'] },
          { title: '4. 存储', paragraphs: ['数据安全保存，简历在 6 个月内删除。'] },
          { title: '5. 权利', paragraphs: ['可申请查阅、更正、删除、限制、转移或反对处理。'] },
          { title: '6. 联系方式', paragraphs: ['odgdragasani@gmail.com / +40 754 554 194'] },
          { title: '7. 投诉', paragraphs: ['可向罗马尼亚数据保护局 ANSPDCP 投诉。'] },
        ],
      },
    },
    login: {
      title: '管理员入口',
      userLabel: '用户名',
      passLabel: '密码',
      submit: '登录',
      back: '返回网站',
      error: '账号或密码错误',
    },
    music: {
      promptTitle: '播放圣诞音乐？',
      promptDescription: '轻柔颂歌，仅 20% 音量，要不要听？',
      accept: '播放音乐',
      decline: '暂时不要',
      never: '不再提醒',
      helper: '可随时在顶部控制音乐。',
      toastTitle: '圣诞音乐已就绪！',
      toastAction: '立即播放',
      toastClose: '关闭',
    },
    orderModal: {
      customOrder: '定制订单',
      successTitle: '订单发送成功！',
      successMessage: '我们将尽快联系您确认。',
      errorMessage: '发送订单时出错。请重试。',
      close: '关闭',
    },
  },
  ru: {
    languageName: 'Russian',
    languageNativeName: 'Русский',
    navbar: {
      tagline: 'Арт-пекарня',
      menu: { products: 'Продукция', orders: 'Заказы', careers: 'Карьера', contact: 'Контакты' },
      mobileMenu: {
        products: 'Вся продукция',
        orders: 'Индивидуальные заказы',
        careers: 'Работа у нас',
        contact: 'Адрес и график',
        call: 'Позвонить',
        whatsapp: 'WhatsApp',
        locations: 'Смотреть адреса',
      },
      phoneCta: '0754 554 194',
      whatsappLabel: 'WhatsApp',
      christmasToggle: { enable: 'Включить режим Рождества', disable: 'Выключить режим Рождества' },
    },
    hero: {
      badge: 'Drăgășani • Băbeni',
      heading: 'Officina del Gusto',
      subheading: 'Магия подлинного вкуса',
      description: 'С рассвета мы печём горячие ковриг, пироги и пиццу, чтобы ваш день начался с аромата свежей выпечки.',
      primaryCta: 'Посмотреть меню',
      secondaryCta: 'Наши адреса',
    },
    infoSection: {
      heading: 'Традиции и страсть',
      description: 'Хороший день начинается, когда из печи выходит первая партия ковриг.',
      cards: {
        schedule: {
          title: 'Расширенный график',
          description: 'Завтрак, обед или вечерний перекус — мы открыты.',
          weekdaysLabel: 'Пн - Сб',
          weekdaysValue: '06:00 - 20:00',
          sundayLabel: 'Воскресенье',
          sundayValue: 'Выходной',
        },
        quality: {
          title: 'Отборные ингредиенты',
          description: 'Лучшие мука и сыр, фирменные рецепты и свежесть каждый день.',
          bullets: ['Тесто замешивается ежедневно', 'Продукция всегда свежая', 'Домашние традиционные рецепты'],
        },
        passion: {
          title: 'С любовью',
          description: 'Семейный бизнес в Drăgășani и Băbeni. Нам важно видеть улыбки гостей.',
          motto: 'Вкус, к которому хочется вернуться',
        },
      },
    },
    productGallery: {
      eyebrow: 'Свежие угощения',
      title: 'Наша продукция',
      description: 'Всё готовим вручную из натуральных ингредиентов.',
      products: [
        { name: 'Горячие ковриг', description: 'Золотистые ковриг с кунжутом, маком или солью.', tag: 'Хит продаж' },
        { name: 'Мерденеа', description: 'Слоёное тесто с щедрой сырной начинкой.' },
        { name: 'Домашняя пицца', description: 'Пышное тесто, насыщенный соус и много начинки.', tag: 'Фирменный рецепт' },
        { name: 'Яблочный пирог', description: 'Пряная начинка из яблок и корицы с сахарной пудрой.' },
        { name: 'Хот-дог в ковриге', description: 'Качественная сосиска в мягком тесте.', tag: 'Быстрый перекус' },
        { name: 'Штрудели', description: 'Золотистые штрудели с различными начинками.' },
        { name: 'Пирожки из слоёного теста', description: 'Мини-пирожки с сыром, грибами или мясом.' },
        { name: 'Сезонные новинки', description: 'Уточняйте в магазине свежие предложения.' },
      ],
    },
    customOrders: {
      eyebrow: 'Специальные заказы',
      title: 'Принимаем заказы на любой случай',
      description: 'Мероприятия, праздники, торжества или любые другие заказы выпечки — мы готовы помочь!',
      features: [
        'Свадьбы и крестины',
        'Вечеринки и дни рождения',
        'Корпоративные мероприятия',
        'Праздники и особые случаи',
      ],
      phoneCta: 'Позвоните нам',
      emailCta: 'Написать письмо',
      phoneNumber: '0754 554 194',
      emailAddress: 'odgdragasani@gmail.com',
      viewImage: 'Смотреть',
    },
    jobs: {
      eyebrow: 'Присоединяйтесь к команде',
      title: 'Работа в Officina',
      description: 'Ищем улыбчивых и трудолюбивых людей для уютной пекарни.',
      filters: { all: 'Все', dragasani: 'Drăgășani', babeni: 'Băbeni' },
      loading: 'Загрузка вакансий...',
      none: 'Активных вакансий нет.',
      noneFiltered: 'В выбранной локации вакансии отсутствуют.',
      successTitle: 'Спасибо!',
      successMessage: 'Мы получили вашу заявку и свяжемся при необходимости.',
      applyButton: 'Откликнуться',
      modalTitle: 'Вакансия:',
      rateLimit: 'Вы уже отправляли заявку. Подождите минуту перед следующей.',
      phoneInvalid: 'Введите корректный номер телефона (пример: 0712 345 678 или +39 ...).',
      phoneFake: 'Номер выглядит неверным. Проверьте ещё раз.',
      submitError: 'Ошибка отправки. Попробуйте снова.',
      lockedLocationNote: '(Фиксированное местоположение)',
      locationPrefix: 'Предпочтительная локация',
      form: {
        name: { label: 'ФИО *', placeholder: 'Пример: Мария Попеску' },
        phone: { label: 'Телефон *', placeholder: '0712 345 678 или +39 ...', helper: 'Принимаем румынские и международные номера' },
        location: { label: 'Предпочтительная локация *', lockedSuffix: '(Фиксировано)', options: { dragasani: 'Drăgășani', babeni: 'Băbeni', either: 'Любая' } },
        email: { label: 'Email (необязательно)', placeholder: 'example@mail.com' },
        message: { label: 'Сообщение (необязательно)', placeholder: 'Расскажите немного о себе...' },
        cv: { label: 'Загрузить резюме (необязательно)', placeholder: 'Нажмите для загрузки (PDF/изображение)' },
        submit: { idle: 'Отправить заявку', loading: 'Отправка...' },
      },
    },
    mapSection: {
      title: 'Ждём вас в гости!',
      description: 'Забегайте по дороге или возьмите вкусности домой.',
      dragasaniButton: 'Drăgășani',
      babeniButton: 'Băbeni',
      intro: 'Запах свежей выпечки приведёт вас в наши магазины.',
      addressLabel: 'Адрес',
      phoneLabel: 'Телефон',
      emailLabel: 'Email',
      callCta: 'Маршрут',
      facebookCta: 'Facebook',
      mapOverlay: 'Нажмите для взаимодействия',
    },
    footer: {
      tagline: 'Пекарня • Пицца • Традиции',
      categories: 'Пекарня • Пицца • Традиции',
      termsLink: 'Пользовательское соглашение',
      privacyLink: 'Политика конфиденциальности',
      anpcLink: 'ANPC',
      anpcDescription: 'Альтернативное / онлайн-урегулирование споров',
      schedule: 'Пн - Сб: 06:00 - 20:00',
      sundayClosed: 'Вс: выходной',
      locationsNote: 'Магазины в Drăgășani и Băbeni.',
      adminLink: 'Админ вход',
    },
    legal: {
      terms: {
        title: 'Пользовательское соглашение',
        lastUpdated: 'Дата обновления',
        sections: [
          { title: '1. Общие сведения', paragraphs: ['Сайт управляется Officina del Gusto (Drăgășani, Румыния).', 'Контакты: +40 754 554 194 / odgdragasani@gmail.com'] },
          { title: '2. Деятельность', paragraphs: ['Ручная выпечка и пицца, доступные для самовывоза или доставки на дом.'] },
          { title: '3. Использование сайта', paragraphs: ['Информационный ресурс с формой для отклика на вакансии.'] },
          { title: '4. Интеллектуальная собственность', paragraphs: ['Материалы сайта принадлежат Officina del Gusto.'] },
          { title: '5. Ответственность', paragraphs: ['Ассортимент и график могут изменяться без уведомления.'] },
          { title: '6. Разрешение споров', paragraphs: ['Обращайтесь в ANPC или используйте платформу ЕС ODR.'] },
          { title: '7. Применимое право', paragraphs: ['Регулируется законодательством Румынии.'] },
        ],
      },
      privacy: {
        title: 'Политика конфиденциальности',
        lastUpdated: 'Дата обновления',
        sections: [
          { title: '1. Введение', paragraphs: ['Мы соблюдаем GDPR и бережно относимся к персональным данным.'] },
          { title: '2. Какие данные собираем', paragraphs: ['Контакты, резюме и технические обезличенные данные.'] },
          { title: '3. Цели обработки', paragraphs: ['Оценка кандидатов и улучшение сервиса.'] },
          { title: '4. Хранение', paragraphs: ['Данные надёжно хранятся, резюме удаляются в течение 6 месяцев.'] },
          { title: '5. Права', paragraphs: ['Доступ, исправление, удаление, ограничение, переносимость и право возражать.'] },
          { title: '6. Контакт', paragraphs: ['odgdragasani@gmail.com / +40 754 554 194'] },
          { title: '7. Жалобы', paragraphs: ['Жалобы направляются в румынский регулятор ANSPDCP.'] },
        ],
      },
    },
    login: {
      title: 'Вход администратора',
      userLabel: 'Логин',
      passLabel: 'Пароль',
      submit: 'Войти',
      back: 'Назад на сайт',
      error: 'Неверный логин или пароль',
    },
    music: {
      promptTitle: 'Включить рождественскую музыку?',
      promptDescription: 'Тихий плейлист (~20% громкости). Включить?',
      accept: 'Да, включить',
      decline: 'Не сейчас',
      never: 'Больше не спрашивать',
      helper: 'Управляйте музыкой в верхнем меню.',
      toastTitle: 'Рождественская музыка готова!',
      toastAction: 'Воспроизвести',
      toastClose: 'Закрыть',
    },
    orderModal: {
      customOrder: 'Индивидуальный заказ',
      successTitle: 'Заказ успешно отправлен!',
      successMessage: 'Мы свяжемся с вами в ближайшее время для подтверждения.',
      errorMessage: 'Ошибка при отправке заказа. Пожалуйста, попробуйте снова.',
      close: 'Закрыть',
    },
  },
};

export type SiteDictionaryKey = keyof SiteDictionary;
export type Dictionary = typeof translations['ro'];
