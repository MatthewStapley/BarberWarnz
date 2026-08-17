// Single source of truth for client-specific content.
// Forking this site for a new client should mean editing this file
// (plus the theme tokens in src/styles/global.css) and swapping images/copy —
// not touching component internals.

export const siteConfig = {
  business: {
    name: "Barber Warnz",
    shortName: "Warnz",
    tagline: "PLACEHOLDER — Premium grooming, [City]",
    description:
      "PLACEHOLDER description — modern barbering with old-school craft. Replace with final client copy.",
  },

  booking: {
    // Replace with the real Booksy business URL.
    url: "https://booksy.com/en-us/PLACEHOLDER",
    label: "Book Now",
  },

  contact: {
    phone: "PLACEHOLDER — 00000 000000",
    email: "PLACEHOLDER@example.com",
    address: "PLACEHOLDER — 1 Example Street, City, Postcode",
  },

  hours: [
    { day: "Mon – Fri", time: "09:00 – 19:00 (placeholder)" },
    { day: "Saturday", time: "09:00 – 17:00 (placeholder)" },
    { day: "Sunday", time: "Closed (placeholder)" },
  ],

  social: [
    { label: "Instagram", href: "#" },
    { label: "TikTok", href: "#" },
    { label: "Facebook", href: "#" },
  ],

  nav: [
    { label: "Services", href: "#services" },
    { label: "Gallery", href: "#gallery" },
    { label: "Reviews", href: "#reviews" },
    { label: "Location", href: "#location" },
  ],

  services: [
    { name: "Signature Haircut", duration: "45 min", price: "£XX" },
    { name: "Skin Fade", duration: "45 min", price: "£XX" },
    { name: "Beard Sculpt", duration: "30 min", price: "£XX" },
    { name: "Hot Towel Shave", duration: "30 min", price: "£XX" },
    { name: "Cut & Beard Combo", duration: "70 min", price: "£XX" },
    { name: "Junior Cut", duration: "30 min", price: "£XX" },
  ],

  reviews: [
    {
      quote: "PLACEHOLDER review — replace with real client testimonial.",
      author: "Placeholder Name",
    },
    {
      quote: "PLACEHOLDER review — replace with real client testimonial.",
      author: "Placeholder Name",
    },
    {
      quote: "PLACEHOLDER review — replace with real client testimonial.",
      author: "Placeholder Name",
    },
  ],
} as const;
