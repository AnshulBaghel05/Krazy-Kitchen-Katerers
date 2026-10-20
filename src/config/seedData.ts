import { siteImages } from '../lib/images';

export interface HoursDay {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  isOpen: boolean;
  openTime: string; // "11:30"
  closeTime: string; // "22:00"
  display: string; // "11:30 AM – 10:00 PM" or "Closed"
}

export interface MenuItemData {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  dietaryTags: string[]; // ["GF", "Spicy", "VG", "Halal"]
  available: boolean;
  thumbnail?: string;
  isSignature?: boolean;
}

export interface MenuCategoryData {
  id: string;
  name: string; // "STARTERS", "MAINS", etc.
  slug: string;
  order: number;
}

export interface TestimonialData {
  id: string;
  author: string;
  role: string;
  quote: string;
  stars: number;
  date: string;
}

export interface TeamMemberData {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface CateringPackageData {
  id: string;
  title: string;
  pricePerPerson: number;
  minGuests: number;
  subtitle: string;
  description: string;
  features: string[];
  popularTag?: string;
}

export interface SpecialData {
  title: string;
  time: string;
  price: number;
  items: string[];
  active: boolean;
}

export interface CMSData {
  announcement: {
    enabled: boolean;
    text: string;
    linkText?: string;
    linkUrl?: string;
  };
  storyHeadline: string;
  storyCopy: string[];
  featureHeading: string;
  featureCopy: string;
  menuIntro: string;
  teamHeading: string;
  hours: HoursDay[];
  holidayOverrides: { date: string; note: string; closed: boolean }[];
  categories: MenuCategoryData[];
  menuItems: MenuItemData[];
  testimonials: TestimonialData[];
  team: TeamMemberData[];
  cateringPackages: CateringPackageData[];
  lunchSpecial: SpecialData;
}

export const initialCMSData: CMSData = {
  announcement: {
    enabled: true,
    text: "🎉 Grand Opening Celebration — Accepting Event Bookings & Catering Quotes for 2026!",
    linkText: "Request Catering",
    linkUrl: "/catering",
  },
  storyHeadline: "Rooted in Island Heritage, Reimagined for Brooklyn",
  storyCopy: [
    "Krazy Kitchen Katerers was born out of Sunday family gatherings where whole allspice berries, fiery scotch bonnet peppers, and cast-iron braises filled the home with deep aromas and endless laughter.",
    "Founded by culinary artisans with deep Trinidadian and Jamaican roots, we combine generations of Creole technique with modern seasonal dining. From wood-smoked jerk meats to slow-braised oxtails simmered for nine hours, every plate honors our ancestors while welcoming our Brooklyn community.",
    "Whether you pull up a chair for an unhurried dinner with friends or trust us with your daughter's 200-guest wedding banquet, our commitment is simple: vibrant hospitality, unmistakable soul, and generous flavors."
  ],
  featureHeading: "Slow Fires, Generous Heart & Hand-Crafted Flavor",
  featureCopy: "Every sauce is reduced from scratch, each cut marinated for two days in fresh green seasoning and cane molasses, and all flatbreads baked to order on hot steel planchas.",
  menuIntro: "Explore authentic Caribbean culinary traditions elevated with modern flair. All poultry is halal-certified, seafood responsibly wild-caught, and produce sourced from regional family farms.",
  teamHeading: "The Artisans Behind the Fire",
  hours: [
    { day: 'Monday', isOpen: false, openTime: '', closeTime: '', display: 'Closed' },
    { day: 'Tuesday', isOpen: true, openTime: '12:00', closeTime: '22:00', display: '12:00 PM – 10:00 PM' },
    { day: 'Wednesday', isOpen: true, openTime: '12:00', closeTime: '22:00', display: '12:00 PM – 10:00 PM' },
    { day: 'Thursday', isOpen: true, openTime: '12:00', closeTime: '22:00', display: '12:00 PM – 10:00 PM' },
    { day: 'Friday', isOpen: true, openTime: '12:00', closeTime: '23:00', display: '12:00 PM – 11:00 PM' },
    { day: 'Saturday', isOpen: true, openTime: '11:00', closeTime: '23:00', display: '11:00 AM – 11:00 PM' },
    { day: 'Sunday', isOpen: true, openTime: '11:00', closeTime: '21:00', display: '11:00 AM – 9:00 PM' },
  ],
  holidayOverrides: [
    { date: '2026-11-26', note: 'Thanksgiving Day (Catering Pre-Orders Only)', closed: true },
    { date: '2026-12-25', note: 'Christmas Day (Closed for Staff Family Time)', closed: true },
    { date: '2026-12-31', note: 'New Year’s Eve Grand Gala Dinner', closed: false },
  ],
  categories: [
    { id: 'cat-starters', name: 'STARTERS & SMALL PLATES', slug: 'starters', order: 1 },
    { id: 'cat-mains', name: 'SIGNATURE MAINS & BRAISES', slug: 'mains', order: 2 },
    { id: 'cat-sides', name: 'SOUL SIDES & BAKES', slug: 'sides', order: 3 },
    { id: 'cat-desserts', name: 'SWEET HERITAGE DESSERTS', slug: 'desserts', order: 4 },
    { id: 'cat-drinks', name: 'ISLAND LIBATIONS & BREWS', slug: 'drinks', order: 5 },
  ],
  menuItems: [
    {
      id: 'item-1',
      name: 'Pimento Jerk Chicken Supreme',
      description: 'Free-range half chicken marinated 48 hours in scotch bonnet, pimento berries, and thyme, grilled over hardwood with house jerk glaze.',
      price: 24,
      categoryId: 'cat-mains',
      dietaryTags: ['GF', 'Halal', 'Spicy'],
      available: true,
      isSignature: true,
      thumbnail: siteImages.jerkChicken,
    },
    {
      id: 'item-2',
      name: 'Slow-Braised Brown Stew Oxtail',
      description: 'Nine-hour simmered beef oxtails in savory caramelized allspice gravy with tender butter beans and aromatic scallions.',
      price: 32,
      categoryId: 'cat-mains',
      dietaryTags: ['GF', 'Halal'],
      available: true,
      isSignature: true,
      thumbnail: siteImages.oxtailStew,
    },
    {
      id: 'item-3',
      name: 'Wild Gulf Red Snapper Escovitch',
      description: 'Whole crispy-skinned red snapper topped with fiery pickled scotch bonnet peppers, carrots, pimento, and sweet bell peppers.',
      price: 34,
      categoryId: 'cat-mains',
      dietaryTags: ['GF', 'Spicy'],
      available: true,
      isSignature: true,
      thumbnail: siteImages.snapperEscovitch,
    },
    {
      id: 'item-4',
      name: 'Trinidadian Curried Goat & Buss-Up Shut',
      description: 'Slow-stewed bone-in goat with geera cumin, cilantro green seasoning, roasted pumpkin, and torn flaky paratha roti.',
      price: 28,
      categoryId: 'cat-mains',
      dietaryTags: ['Halal', 'Spicy'],
      available: true,
      isSignature: true,
      thumbnail: siteImages.curriedGoatRoti,
    },
    {
      id: 'item-5',
      name: 'Creole Garlic Butter King Prawns',
      description: 'Jumbo prawns pan-roasted with charred scallions, scotch bonnet compound butter, and toasted cassava crostini.',
      price: 19,
      categoryId: 'cat-starters',
      dietaryTags: ['GF'],
      available: true,
      isSignature: true,
      thumbnail: siteImages.garlicButterPrawns,
    },
    {
      id: 'item-6',
      name: 'Crispy Saltfish Fritters (Stamp & Go)',
      description: 'Golden salted cod fritters with scallion and sweet peppers, served with mango scotch bonnet dipping sauce.',
      price: 15,
      categoryId: 'cat-starters',
      dietaryTags: [],
      available: true,
      thumbnail: siteImages.saltfishFritters,
    },
    {
      id: 'item-7',
      name: 'Coconut Callaloo Soup & Taro Crisp',
      description: 'Silky purée of organic dasheen leaves, coconut cream, okra, garlic, and fresh thyme topped with root chips.',
      price: 14,
      categoryId: 'cat-starters',
      dietaryTags: ['VG', 'GF'],
      available: true,
      thumbnail: siteImages.callalooSoup,
    },
    {
      id: 'item-8',
      name: 'Sweet Plantain & Guava Bruschetta',
      description: 'Caramelized sweet plantains on grilled sourdough with whipped ricotta, guava glaze, and micro mint.',
      price: 13,
      categoryId: 'cat-starters',
      dietaryTags: ['V'],
      available: true,
      thumbnail: siteImages.plantainBruschetta,
    },
    {
      id: 'item-9',
      name: 'Coconut Rice & Red Kidney Peas',
      description: 'Long-grain rice cooked slowly in fresh coconut milk with thyme, scallion, and whole scotch bonnet pepper.',
      price: 8,
      categoryId: 'cat-sides',
      dietaryTags: ['VG', 'GF'],
      available: true,
      thumbnail: siteImages.riceAndPeas,
    },
    {
      id: 'item-10',
      name: 'Caramelized Sweet Fried Plantains (Maduros)',
      description: 'Ripe golden plantains fried to perfection with sea salt flakes and raw cane syrup drizzle.',
      price: 7,
      categoryId: 'cat-sides',
      dietaryTags: ['VG', 'GF'],
      available: true,
      thumbnail: siteImages.friedPlantainsMaduros,
    },
    {
      id: 'item-11',
      name: 'Creamy Five-Cheese Macaroni Pie',
      description: 'Baked Trinidad-style macaroni pie with sharp white cheddar, smoked gouda, evaporated milk, and sweet mustard crust.',
      price: 10,
      categoryId: 'cat-sides',
      dietaryTags: ['V'],
      available: true,
      thumbnail: siteImages.macaroniPie,
    },
    {
      id: 'item-12',
      name: 'Warm Rum-Soaked Brioche Bread Pudding',
      description: 'Custard-soaked brioche with toasted nutmeg, dark Jamaican spiced rum caramel, and homemade vanilla bean ice cream.',
      price: 12,
      categoryId: 'cat-desserts',
      dietaryTags: ['V'],
      available: true,
      isSignature: true,
      thumbnail: siteImages.rumBreadPudding,
    },
    {
      id: 'item-13',
      name: 'Coconut Tart with Passionfruit Coulis',
      description: 'Traditional spiced shortcrust tart filled with sweet grated coconut flakes and tangy passionfruit coulis.',
      price: 11,
      categoryId: 'cat-desserts',
      dietaryTags: ['V'],
      available: true,
      thumbnail: siteImages.coconutTart,
    },
    {
      id: 'item-14',
      name: 'House Sorrel & Ginger Brew (Cold Pressed)',
      description: 'Infused dried hibiscus sabdariffa petals, fresh crushed ginger, cinnamon bark, and fresh lime juice.',
      price: 7,
      categoryId: 'cat-drinks',
      dietaryTags: ['VG', 'GF'],
      available: true,
      isSignature: true,
      thumbnail: siteImages.sorrelGingerDrink,
    },
    {
      id: 'item-15',
      name: 'Fresh Ting & Tropical Passion Spritzer',
      description: 'Sparkling Jamaican grapefruit soda infused with fresh passion fruit purée and mint.',
      price: 6,
      categoryId: 'cat-drinks',
      dietaryTags: ['VG', 'GF'],
      available: true,
      thumbnail: siteImages.passionSpritzer,
    },
  ],
  testimonials: [
    {
      id: 'test-1',
      author: 'Alicia & Marcus Reynolds',
      role: 'Wedding Clients',
      quote: 'Krazy Kitchen Katerers catered our 160-guest wedding in Brooklyn. From the first tasting to the final course, our guests still talk about the oxtail braise and escovitch snapper. Flawless hospitality!',
      stars: 5,
      date: 'September 2026',
    },
    {
      id: 'test-2',
      author: 'David Chen',
      role: 'Director of Operations, Urban Media Lab',
      quote: 'We ordered the Island Executive corporate buffet for 75 people during our quarterly summit. Delivered exactly on time, piping hot, and beautifully presented. Every tray was cleaned out.',
      stars: 5,
      date: 'August 2026',
    },
    {
      id: 'test-3',
      author: 'Kendra Washington',
      role: 'Local Patron & Birthday Host',
      quote: 'The flavors take me right back to Kingston with the refinement of a high-end bistro. The jerk marinade has real depth without just burning your tongue. Truly a gem for the neighborhood.',
      stars: 5,
      date: 'October 2026',
    },
  ],
  team: [
    {
      id: 'team-1',
      name: 'Chef Nicole Baptiste',
      role: 'Co-Founder & Executive Chef',
      bio: 'Trained under master Creole cooks in Port of Spain and seasoned in top New York kitchens, Chef Nicole preserves deep ancestral flavors while plating with contemporary precision.',
      image: siteImages.chefPlating,
    },
    {
      id: 'team-2',
      name: 'Marcus Baptiste',
      role: 'Co-Founder & Director of Hospitality',
      bio: 'Bringing over 15 years in high-volume banquet management, Marcus orchestrates weddings and community events with radiant warmth and meticulous attention to detail.',
      image: siteImages.diningRoom,
    },
    {
      id: 'team-3',
      name: 'Chef Jamal Clarke',
      role: 'Pitmaster & Head of Catering Operations',
      bio: 'Jamal oversees the wood-fired pimento smokers and on-site event kitchens, ensuring every catered gathering delivers the authentic smokehouse experience.',
      image: siteImages.cateringSpread,
    },
  ],
  cateringPackages: [
    {
      id: 'pkg-corporate',
      title: 'The Island Executive Buffet',
      pricePerPerson: 36,
      minGuests: 15,
      subtitle: 'Ideal for office lunches, conferences & client presentations',
      description: 'A balanced, energetic hot buffet featuring jerk chicken, sweet plantains, coconut rice & peas, crisp market slaw, and house sorrel brew.',
      features: [
        'Choice of 2 Signature Mains (Jerk Chicken, Stew Beef, or Vegan Callaloo)',
        'Coconut Rice & Peas and Sweet Plantains included',
        'Tropical Citrus Salad with Mango Dressing',
        'Fresh House Sorrel Drink Dispensers',
        'Eco-friendly compostable tableware & chaffing equipment',
      ],
    },
    {
      id: 'pkg-celebration',
      title: 'The Heritage Creole Banquet',
      pricePerPerson: 58,
      minGuests: 25,
      subtitle: 'Perfect for milestone birthdays, anniversaries & family reunions',
      description: 'Generous multi-course feast featuring braised oxtail, grilled jerk poultry, fried snapper, macaroni pie, and cocktail passed appetizers.',
      features: [
        '2 Passed Cocktail Appetizers (Saltfish Fritters & Plantain Bruschetta)',
        '3 Hearty Entrées including 9-Hour Braised Oxtail',
        'Baked Five-Cheese Macaroni Pie & Calypso Greens',
        'On-site serving staff & full chaffing setup',
        'Warm Rum Brioche Bread Pudding dessert station',
      ],
      popularTag: 'Most Popular',
    },
    {
      id: 'pkg-wedding',
      title: 'The Royal Caribbean Wedding Gala',
      pricePerPerson: 88,
      minGuests: 50,
      subtitle: 'Full-service luxury banquet for weddings & premier galas',
      description: 'Bespoke fine-dining catering with private menu tasting, custom cocktail pairings, uniformed servers, and plated or luxury station service.',
      features: [
        'Private Tasting Session for the Couple + Planner',
        '4 Passed Hors d’oeuvres with tropical cocktail welcome',
        'Plated Escovitch Snapper or Carved Jerk Ribeye carving station',
        'Complete setup, uniformed captain, waitstaff & bar management',
        'Late-night street food station (Buss-Up Shut & Doubles)',
      ],
    },
  ],
  lunchSpecial: {
    title: 'Daily Brooklyn Lunch Special',
    time: 'Tuesday – Friday, 12:00 PM – 3:30 PM',
    price: 18.5,
    items: [
      'Quarter Jerk Chicken or Curry Chickpea Bowl',
      'Coconut Rice & Peas or Seasoned French Fries',
      'Sweet Fried Maduros (Plantains) & Fresh Cabbage Slaw',
      'Complimentary House Sorrel or Ice Tea',
    ],
    active: true,
  },
};
