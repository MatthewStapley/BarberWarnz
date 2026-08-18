// Single source of truth for client-specific content.
// Forking this site for a new client should mean editing this file
// (plus the theme tokens in src/styles/global.css) and swapping images/copy —
// not touching component internals.
//
// Business facts below were verified directly against:
// - Booksy: https://booksy.com/en-gb/133690_barber-warnz_barber_794909_southampton
// - Instagram: https://www.instagram.com/barber_warnz/
// Anything not confirmed on either source is left as an explicit placeholder.

export const siteConfig = {
  business: {
    name: "Barber Warnz",
    shortName: "Warnz",
    tagline: "Barber in Southampton",
    // Neutral/factual — used for <meta description> and social previews.
    description:
      "Personalised fades, cuts and beard trims in a relaxed, one-to-one setting at MEDUSA, Southampton — rated 5.0 from 174 Booksy reviews.",
    // First-person — used for the on-page hero subtext, in Callum's own voice.
    heroSubtext:
      "Proper one-to-one barbering at MEDUSA in Southampton — good cuts, relaxed chat, no rush. 5.0 stars from 174 reviews on Booksy.",
  },

  barber: {
    name: "Callum Warnes",
  },

  booking: {
    url: "https://booksy.com/en-gb/133690_barber-warnz_barber_794909_southampton#ba_s=sr_1",
    label: "Book Now",
  },

  stats: {
    rating: "5.0",
    reviewCount: 174,
  },

  contact: {
    // Not publicly listed on Booksy or Instagram — direct contact only via Booksy/Instagram.
    phone: null as string | null,
    email: null as string | null,
    address: "MEDUSA, 15 Carlton Place, Southampton, SO15 2DY",
    shortLocation: "MEDUSA, Southampton",
    // Google Maps search link built from the verified address above — no API key needed.
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=MEDUSA+15+Carlton+Place+Southampton+SO15+2DY",
  },

  hours: [
    { day: "Monday", time: "09:00 – 18:30" },
    { day: "Tuesday", time: "09:00 – 18:30" },
    { day: "Wednesday", time: "09:00 – 18:30" },
    { day: "Thursday", time: "09:00 – 20:00" },
    { day: "Friday", time: "09:00 – 20:00" },
    { day: "Saturday", time: "08:00 – 15:00" },
    { day: "Sunday", time: "Closed" },
  ],

  social: [{ label: "Instagram", href: "https://www.instagram.com/barber_warnz/" }],

  nav: [
    { label: "Services", href: "#services" },
    { label: "Gallery", href: "#gallery" },
    { label: "Reviews", href: "#reviews" },
    { label: "Location", href: "#location" },
  ],

  // Popular services shown on-site. Full list (14 services incl. student
  // pricing) lives on Booksy — see servicesNote below.
  services: [
    { name: "Skin Fade", duration: "30 min", price: "£28" },
    { name: "Haircut", duration: "25 min", price: "£24" },
    { name: "Skin Fade & Beard", duration: "45 min", price: "£34" },
    { name: "Haircut & Beard", duration: "40 min", price: "£30" },
    { name: "Restyle", duration: "40 min", price: "£30" },
    { name: "Beard Trim", duration: "15 min", price: "£10" },
  ],
  servicesNote: "Student and OAP pricing available — see the full list on Booksy.",

  // A small curated selection of genuine Booksy reviews (verbatim quotes).
  reviews: [
    {
      quote:
        "Top haircut from a top lad. Drink on arrival, great music on and has 10/10 football knowledge. Easy choice.",
      author: "Kerr",
      service: "Haircut",
    },
    {
      quote: "Cut my hair for 3 years never a bad trim, top barber and top lad.",
      author: "Evan",
      service: "Skin fade",
    },
    {
      quote: "Great trim, and Callum is a top fella. Will defo be back.",
      author: "Matthew",
      service: "Skin fade & Beard",
    },
  ],
} as const;
