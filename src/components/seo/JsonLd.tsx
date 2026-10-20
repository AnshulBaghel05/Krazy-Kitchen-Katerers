import React from 'react';
import { siteConfig } from '../../config/site';
import { CMSData } from '../../config/seedData';

interface JsonLdProps {
  cms: CMSData;
  page?: 'home' | 'menu' | 'about' | 'catering' | 'contact';
}

export const JsonLd: React.FC<JsonLdProps> = ({ cms, page = 'home' }) => {
  // Map CMS hours to schema.org openingHoursSpecification
  const openingHoursSpec = cms.hours
    .filter((h) => h.isOpen && h.openTime && h.closeTime)
    .map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${h.day}`,
      opens: h.openTime,
      closes: h.closeTime,
    }));

  const restaurantSchema = {
    '@context': 'https://schema.org',
    '@type': ['Restaurant', 'FoodEstablishment'],
    name: siteConfig.businessName,
    description: siteConfig.tagline,
    url: `https://${siteConfig.domain}`,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    servesCuisine: siteConfig.cuisine,
    priceRange: siteConfig.priceRange,
    acceptsReservations: siteConfig.reservationsEnabled,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '412 Kingston Boulevard, Suite 100',
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.state,
      postalCode: siteConfig.postalCode,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.6698,
      longitude: -73.9442,
    },
    openingHoursSpecification: openingHoursSpec,
    sameAs: [
      siteConfig.socials.instagram,
      siteConfig.socials.facebook,
      siteConfig.socials.tiktok,
    ],
    hasMenu: {
      '@type': 'Menu',
      name: `${siteConfig.businessName} Culinary Menu`,
      hasMenuSection: cms.categories.map((cat) => ({
        '@type': 'MenuSection',
        name: cat.name,
        hasMenuItem: cms.menuItems
          .filter((item) => item.categoryId === cat.id && item.available)
          .map((item) => ({
            '@type': 'MenuItem',
            name: item.name,
            description: item.description,
            offers: {
              '@type': 'Offer',
              price: item.price,
              priceCurrency: 'USD',
            },
          })),
      })),
    },
  };

  const cateringSchema = {
    '@context': 'https://schema.org',
    '@type': 'CateringService',
    name: `${siteConfig.businessName} Premier Catering`,
    provider: {
      '@type': 'Restaurant',
      name: siteConfig.businessName,
    },
    areaServed: ['Brooklyn', 'Manhattan', 'Queens', 'Staten Island', 'Bronx'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Catering Packages',
      itemListElement: cms.cateringPackages.map((pkg, idx) => ({
        '@type': 'Offer',
        position: idx + 1,
        name: pkg.title,
        description: pkg.description,
        price: pkg.pricePerPerson,
        priceCurrency: 'USD',
      })),
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `https://${siteConfig.domain}`,
      },
      ...(page !== 'home'
        ? [
            {
              '@type': 'ListItem',
              position: 2,
              name: page.charAt(0).toUpperCase() + page.slice(1),
              item: `https://${siteConfig.domain}/${page}`,
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {page === 'catering' && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(cateringSchema) }}
        />
      )}
    </>
  );
};
