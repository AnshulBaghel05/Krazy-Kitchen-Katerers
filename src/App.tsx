import React, { useState, useEffect } from 'react';
import { useCMS } from './lib/cmsStore';
import { siteConfig } from './config/site';
import { Header } from './components/ui/Header';
import { Footer } from './components/ui/Footer';
import { AnnouncementBar } from './components/ui/AnnouncementBar';
import { WhatsAppButton } from './components/ui/WhatsAppButton';
import { JsonLd } from './components/seo/JsonLd';

import { HomePage } from './components/pages/HomePage';
import { MenuPage } from './components/pages/MenuPage';
import { AboutPage } from './components/pages/AboutPage';
import { CateringPage } from './components/pages/CateringPage';
import { ContactPage } from './components/pages/ContactPage';
import { PrivacyPage } from './components/pages/PrivacyPage';
import { NotFoundPage } from './components/pages/NotFoundPage';
import { OrderRequestForm } from './components/forms/OrderRequestForm';
import { CMSStudio } from './components/studio/CMSStudio';

export default function App() {
  const cms = useCMS();
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  const [routeParam, setRouteParam] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      return url.searchParams.get('cat') || window.location.hash.replace('#', '') || '';
    }
    return '';
  });

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname || '/';
      const url = new URL(window.location.href);
      const cat = url.searchParams.get('cat') || window.location.hash.replace('#', '') || '';
      setCurrentPath(path);
      setRouteParam(cat);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string, param?: string) => {
    let fullUrl = path;
    if (param) {
      if (path === '/menu') {
        fullUrl = `/menu?cat=${param}`;
      } else if (path === '/catering') {
        fullUrl = `/catering#${param}`;
      }
    }

    try {
      window.history.pushState({}, '', fullUrl);
    } catch {
      // In sandboxed iframe environments where pushState might throw
    }

    setCurrentPath(path);
    setRouteParam(param || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Determine current page type for JSON-LD and Document Title
  const getPageType = () => {
    if (currentPath === '/') return 'home';
    if (currentPath === '/menu') return 'menu';
    if (currentPath === '/about') return 'about';
    if (currentPath === '/catering') return 'catering';
    if (currentPath === '/contact') return 'contact';
    return undefined;
  };

  useEffect(() => {
    const titles: Record<string, string> = {
      '/': `${siteConfig.businessName} — Modern Caribbean Fusion & Catering`,
      '/menu': `Our Menu — ${siteConfig.businessName}`,
      '/about': `Our Story & Heritage — ${siteConfig.businessName}`,
      '/catering': `Catering & Event Banquets — ${siteConfig.businessName}`,
      '/contact': `Contact & Directions — ${siteConfig.businessName}`,
      '/order-request': `Order Online — ${siteConfig.businessName}`,
      '/privacy': `Privacy Policy — ${siteConfig.businessName}`,
      '/studio': `Owner CMS Studio — ${siteConfig.businessName}`,
    };
    document.title = titles[currentPath] || `Page Not Found — ${siteConfig.businessName}`;
  }, [currentPath]);

  const renderContent = () => {
    switch (currentPath) {
      case '/':
        return <HomePage onNavigate={navigate} />;
      case '/menu':
        return <MenuPage initialCategory={routeParam || 'all'} onNavigate={navigate} />;
      case '/about':
        return <AboutPage />;
      case '/catering':
        return <CateringPage initialType={routeParam} />;
      case '/contact':
        return <ContactPage />;
      case '/order-request':
        return <OrderRequestForm />;
      case '/privacy':
        return <PrivacyPage />;
      case '/studio':
        return <CMSStudio />;
      default:
        return <NotFoundPage onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#111111]">
      {/* JSON-LD Structured Data */}
      <JsonLd cms={cms} page={getPageType()} />

      {/* Accessible skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#111111] focus:text-white focus:rounded-full focus:font-bold"
      >
        Skip to main content
      </a>

      {/* Announcement Bar (CMS toggle) */}
      <AnnouncementBar onNavigate={navigate} />

      {/* Sticky White Header 72px */}
      <Header currentPath={currentPath} onNavigate={navigate} />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1">
        {renderContent()}
      </main>

      {/* Black Footer */}
      <Footer onNavigate={navigate} />

      {/* WhatsApp Floating Mobile Button */}
      <WhatsAppButton />
    </div>
  );
}
