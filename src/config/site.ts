export interface SiteConfig {
  businessName: string;
  tagline: string;
  cuisine: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
  email: string;
  openingDate: string;
  ianaTimezone: string;
  domain: string;
  orderUrl: string; // If empty, links to /order-request
  whatsappE164: string;
  placeId: string;
  reservationsEnabled: boolean;
  priceRange: string;
  socials: {
    instagram: string;
    facebook: string;
    tiktok: string;
  };
  valueProps: {
    title: string;
    description: string;
    color: 'yellow' | 'orange' | 'green';
  }[];
}

export const siteConfig: SiteConfig = {
  businessName: "Krazy Kitchen Katerers",
  tagline: "HERITAGE CARIBBEAN ROOTS, MODERN CREOLE CRAFT",
  cuisine: "Modern Caribbean Fusion & Creole Soul",
  address: "412 Kingston Boulevard, Suite 100, Brooklyn, NY 11213",
  city: "Brooklyn",
  state: "NY",
  postalCode: "11213",
  phone: "(718) 555-0248",
  email: "enquiries@krazykitchenkaterers.com",
  openingDate: "November 14, 2026",
  ianaTimezone: "America/New_York",
  domain: "krazykitchenkaterers.com",
  orderUrl: "", // Defaults to /order-request
  whatsappE164: "+17185550248",
  placeId: "ChIJ3Z2wO_FZwokR_krazykitchen",
  reservationsEnabled: true,
  priceRange: "$$",
  socials: {
    instagram: "https://instagram.com/krazykitchenkaterers",
    facebook: "https://facebook.com/krazykitchenkaterers",
    tiktok: "https://tiktok.com/@krazykitchenkaterers",
  },
  valueProps: [
    {
      title: "Wood-Fired Spices & Scratch Rubs",
      description: "Pimento wood-smoked cuts, 48-hour marinades, and hand-ground Caribbean seasoning ground daily in-house.",
      color: "orange",
    },
    {
      title: "Bespoke Celebrations & Event Banquets",
      description: "From soulful intimate gathering buffets to 500-guest luxury wedding catering with attentive on-site service.",
      color: "yellow",
    },
    {
      title: "Fresh Farm Ingredients & Coastal Catches",
      description: "Locally sourced produce harmonized with authentic imports: scotch bonnets, ripe plantains, and wild Gulf catches.",
      color: "green",
    },
  ],
};
