/**
 * Production-ready optimized local images for Krazy Kitchen Katerers.
 * Serves optimized WebP assets with local JPG fallbacks from /public/images/.
 * Ready for high-speed CDN caching on Vercel deployment.
 */

export interface ImageAsset {
  src: string;
  webp: string;
  fallback: string;
  alt: string;
  width?: number;
  height?: number;
}

export const siteImages = {
  // Key Atmosphere & Hero Slots
  heroDish: '/images/home_hero_dish.webp',
  diningRoom: '/images/dining_room_welcome.webp',
  cateringSpread: '/images/catering_event_spread.webp',
  chefPlating: '/images/chef_plating_kitchen.webp',
  overheadFeast: '/images/overhead_feast_join_us.webp',

  // Dishes - Every dish has its own unique, authentic food photograph
  jerkChicken: '/images/home_hero_dish.webp',
  oxtailStew: '/images/oxtail_stew.webp',
  snapperEscovitch: '/images/snapper_escovitch.webp',
  curriedGoatRoti: '/images/curried_goat_roti.webp',
  garlicButterPrawns: '/images/garlic_butter_prawns.webp',
  saltfishFritters: '/images/saltfish_fritters.webp',
  callalooSoup: '/images/callaloo_soup.webp',
  plantainBruschetta: '/images/plantain_bruschetta.webp',
  riceAndPeas: '/images/rice_and_peas.webp',
  friedPlantainsMaduros: '/images/fried_plantains_maduros.webp',
  macaroniPie: '/images/macaroni_pie.webp',
  rumBreadPudding: '/images/rum_bread_pudding.webp',
  coconutTart: '/images/coconut_tart.webp',
  sorrelGingerDrink: '/images/sorrel_ginger_drink.webp',
  passionSpritzer: '/images/passion_spritzer.webp',
};

// Detailed image dictionary with WebP and JPG fallbacks
export const imageAssets: Record<string, ImageAsset> = {
  heroDish: {
    src: '/images/home_hero_dish.webp',
    webp: '/images/home_hero_dish.webp',
    fallback: '/images/home_hero_dish.jpg',
    alt: 'Artisanal grilled jerk chicken supreme platter with plantains and coconut rice',
  },
  diningRoom: {
    src: '/images/dining_room_welcome.webp',
    webp: '/images/dining_room_welcome.webp',
    fallback: '/images/dining_room_welcome.jpg',
    alt: 'Warm family-style Caribbean and Creole dining room at Krazy Kitchen Katerers',
  },
  cateringSpread: {
    src: '/images/catering_event_spread.webp',
    webp: '/images/catering_event_spread.webp',
    fallback: '/images/catering_event_spread.jpg',
    alt: 'Lush Caribbean Creole celebratory banquet buffet feast',
  },
  chefPlating: {
    src: '/images/chef_plating_kitchen.webp',
    webp: '/images/chef_plating_kitchen.webp',
    fallback: '/images/chef_plating_kitchen.jpg',
    alt: 'Executive chef plating signature seafood at the kitchen pass',
  },
  overheadFeast: {
    src: '/images/overhead_feast_join_us.webp',
    webp: '/images/overhead_feast_join_us.webp',
    fallback: '/images/overhead_feast_join_us.jpg',
    alt: 'Overhead spread of fresh Caribbean curries, plantains, and flatbreads',
  },
  jerkChicken: {
    src: '/images/home_hero_dish.webp',
    webp: '/images/home_hero_dish.webp',
    fallback: '/images/home_hero_dish.jpg',
    alt: 'Pimento wood-grilled jerk chicken supreme with scotch bonnet glaze',
  },
  oxtailStew: {
    src: '/images/oxtail_stew.webp',
    webp: '/images/oxtail_stew.webp',
    fallback: '/images/oxtail_stew.jpg',
    alt: 'Nine-hour slow-braised brown stew oxtails with tender butter beans',
  },
  snapperEscovitch: {
    src: '/images/snapper_escovitch.webp',
    webp: '/images/snapper_escovitch.webp',
    fallback: '/images/snapper_escovitch.jpg',
    alt: 'Crispy whole red snapper escovitch with pickled peppers and pimento',
  },
  curriedGoatRoti: {
    src: '/images/curried_goat_roti.webp',
    webp: '/images/curried_goat_roti.webp',
    fallback: '/images/curried_goat_roti.jpg',
    alt: 'Trinidadian curried goat with fragrant gravy and torn paratha roti',
  },
  garlicButterPrawns: {
    src: '/images/garlic_butter_prawns.webp',
    webp: '/images/garlic_butter_prawns.webp',
    fallback: '/images/garlic_butter_prawns.jpg',
    alt: 'Pan-roasted Creole garlic butter king prawns with cassava crostini',
  },
  saltfishFritters: {
    src: '/images/saltfish_fritters.webp',
    webp: '/images/saltfish_fritters.webp',
    fallback: '/images/saltfish_fritters.jpg',
    alt: 'Golden crispy Caribbean saltfish fritters stamp and go with mango sauce',
  },
  callalooSoup: {
    src: '/images/callaloo_soup.webp',
    webp: '/images/callaloo_soup.webp',
    fallback: '/images/callaloo_soup.jpg',
    alt: 'Velvety organic coconut callaloo soup with crunchy taro chips',
  },
  plantainBruschetta: {
    src: '/images/plantain_bruschetta.webp',
    webp: '/images/plantain_bruschetta.webp',
    fallback: '/images/plantain_bruschetta.jpg',
    alt: 'Caramelized sweet plantains on grilled sourdough with whipped ricotta',
  },
  riceAndPeas: {
    src: '/images/rice_and_peas.webp',
    webp: '/images/rice_and_peas.webp',
    fallback: '/images/rice_and_peas.jpg',
    alt: 'Fluffy coconut rice and red kidney peas simmered with fresh thyme',
  },
  friedPlantainsMaduros: {
    src: '/images/fried_plantains_maduros.webp',
    webp: '/images/fried_plantains_maduros.webp',
    fallback: '/images/fried_plantains_maduros.jpg',
    alt: 'Caramelized sweet fried plantains maduros with flake sea salt',
  },
  macaroniPie: {
    src: '/images/macaroni_pie.webp',
    webp: '/images/macaroni_pie.webp',
    fallback: '/images/macaroni_pie.jpg',
    alt: 'Baked Trinidad five-cheese macaroni pie with golden cheddar crust',
  },
  rumBreadPudding: {
    src: '/images/rum_bread_pudding.webp',
    webp: '/images/rum_bread_pudding.webp',
    fallback: '/images/rum_bread_pudding.jpg',
    alt: 'Warm Jamaican rum-soaked brioche bread pudding with spiced caramel',
  },
  coconutTart: {
    src: '/images/coconut_tart.webp',
    webp: '/images/coconut_tart.webp',
    fallback: '/images/coconut_tart.jpg',
    alt: 'Spiced shortcrust coconut tart filled with passionfruit coulis',
  },
  sorrelGingerDrink: {
    src: '/images/sorrel_ginger_drink.webp',
    webp: '/images/sorrel_ginger_drink.webp',
    fallback: '/images/sorrel_ginger_drink.jpg',
    alt: 'Chilled cold-pressed Caribbean sorrel hibiscus brew with crushed ginger',
  },
  passionSpritzer: {
    src: '/images/passion_spritzer.webp',
    webp: '/images/passion_spritzer.webp',
    fallback: '/images/passion_spritzer.jpg',
    alt: 'Sparkling Jamaican grapefruit and passion fruit spritzer with fresh mint',
  },
};
