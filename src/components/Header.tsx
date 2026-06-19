'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Phone } from 'lucide-react';

const WHATSAPP_URL = 'https://api.whatsapp.com/send?phone=31617615757';

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navItems = [
    { key: 'services', href: '#diensten' },
    { key: 'results',  href: '#resultaten' },
    { key: 'region',   href: '#regio' },
    { key: 'contact',  href: '#contact' },
  ];

  const locales = [
    { code: 'nl', label: 'NL' },
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' },
  ];

  const handleLocaleChange = (newLocale: string) => {
    // Static export: all locales use /locale/ prefix (e.g. /nl/, /en/, /fr/)
    const currentPath = pathname.replace(/^\/(nl|en|fr)/, '') || '/';
    router.push(`/${newLocale}${currentPath}`);
    setIsOpen(false);
  };

  const scrollTo = (href: string) => {
    setIsOpen(false);
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-[#D4E8E5]/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href={`/${locale === 'nl' ? '' : locale}`} className="flex items-center gap-3">
            <div className="relative w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="Warm and Cozy Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-800 leading-tight" style={{ color: 'var(--color-teal-dark)' }}>
                Schoonmaak
              </div>
              <div className="text-xs font-600 leading-tight" style={{ color: 'var(--color-gold)' }}>
                Warm and Cozy
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollTo(item.href)}
                className="nav-link text-sm font-600 cursor-pointer"
                style={{ color: scrolled ? 'var(--color-text)' : 'var(--color-text)' }}
              >
                {t(item.key as 'services' | 'results' | 'region' | 'contact')}
              </button>
            ))}
          </nav>

          {/* Right side: lang + phone + burger */}
          <div className="flex items-center gap-3">
            {/* Language switcher */}
            <div className="hidden md:flex items-center gap-1 bg-[#F0F8F6] rounded-full px-2 py-1">
              {locales.map((loc) => (
                <button
                  key={loc.code}
                  onClick={() => handleLocaleChange(loc.code)}
                  className={`px-2.5 py-1 rounded-full text-xs font-700 transition-all duration-200 ${
                    locale === loc.code
                      ? 'text-white shadow-sm'
                      : 'text-[#5A7872] hover:text-[#2D7A6F]'
                  }`}
                  style={{
                    background: locale === loc.code ? 'var(--color-teal)' : 'transparent',
                  }}
                >
                  {loc.label}
                </button>
              ))}
            </div>

            {/* WhatsApp CTA (desktop) */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-2 whatsapp-btn text-white text-sm font-700 px-4 py-2 rounded-full"
            >
              <Phone size={14} />
              <span>WhatsApp</span>
            </a>

            {/* Mobile burger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{ color: 'var(--color-teal)' }}
              aria-label="Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } bg-white/98 backdrop-blur-md border-b border-[#D4E8E5]`}
      >
        <div className="px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => scrollTo(item.href)}
              className="block w-full text-left px-4 py-3 rounded-xl font-600 transition-colors hover:bg-[#F0F8F6]"
              style={{ color: 'var(--color-text)' }}
            >
              {t(item.key as 'services' | 'results' | 'region' | 'contact')}
            </button>
          ))}

          {/* Language switcher mobile */}
          <div className="flex items-center gap-2 px-4 py-2 mt-2">
            {locales.map((loc) => (
              <button
                key={loc.code}
                onClick={() => handleLocaleChange(loc.code)}
                className={`px-3 py-1.5 rounded-full text-xs font-700 transition-all ${
                  locale === loc.code ? 'text-white' : 'text-[#5A7872]'
                }`}
                style={{
                  background: locale === loc.code ? 'var(--color-teal)' : '#F0F8F6',
                }}
              >
                {loc.label}
              </button>
            ))}
          </div>

          {/* Mobile WhatsApp */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 whatsapp-btn text-white font-700 px-4 py-3 rounded-xl mx-2 mt-2"
          >
            <Phone size={16} />
            <span>WhatsApp: 06 17 615 757</span>
          </a>
        </div>
      </div>
    </header>
  );
}
