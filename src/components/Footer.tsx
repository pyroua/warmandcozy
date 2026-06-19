'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Phone, Mail } from 'lucide-react';


const WHATSAPP_URL = 'https://api.whatsapp.com/send?phone=31617615757';
const INSTAGRAM_URL = 'https://www.instagram.com/schoonmaak_warm.cozy/';
const FACEBOOK_URL  = '#'; // будет добавлена позже

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const year = new Date().getFullYear();

  const navItems = [
    { label: 'Diensten',   href: '#diensten' },
    { label: 'Resultaten', href: '#resultaten' },
    { label: 'Regio',      href: '#regio' },
    { label: 'Contact',    href: '#contact' },
  ];

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      className="pt-16 pb-8"
      style={{ background: 'linear-gradient(180deg, #1F5A52, #122E29)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top row */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12 flex-shrink-0 bg-white rounded-full overflow-hidden">
                <Image src="/images/logo.png" alt="Logo" fill className="object-contain p-1" />
              </div>
              <div>
                <div className="font-800 text-white">Schoonmaak</div>
                <div className="text-sm font-600" style={{ color: 'var(--color-gold-light)' }}>
                  Warm and Cozy
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.65)' }}>
              {t('tagline')}
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: 'rgba(255,255,255,0.12)' }}
                aria-label="Instagram"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a
                href={FACEBOOK_URL}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: 'rgba(255,255,255,0.12)' }}
                aria-label="Facebook"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </div>
          </div>

          {/* Nav */}
          <div>
            <div
              className="text-xs font-800 uppercase tracking-wider mb-4"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              Menu
            </div>
            <ul className="space-y-2.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => scrollTo(item.href)}
                    className="text-sm font-500 transition-colors hover:text-white cursor-pointer"
                    style={{ color: 'rgba(255,255,255,0.65)' }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div
              className="text-xs font-800 uppercase tracking-wider mb-4"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              Contact
            </div>
            <ul className="space-y-3">
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-500 transition-colors hover:text-white"
                  style={{ color: 'rgba(255,255,255,0.65)' }}
                >
                  <Phone size={13} />
                  +31 61 761-57-57
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@warmandcozy.club"
                  className="flex items-center gap-2 text-sm font-500 transition-colors hover:text-white"
                  style={{ color: 'rgba(255,255,255,0.65)' }}
                >
                  <Mail size={13} />
                  info@warmandcozy.club
                </a>
              </li>
              <li className="text-sm font-500" style={{ color: 'rgba(255,255,255,0.5)' }}>
                De Omgang 17<br />
                5463KZ Veghel, NL
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t mb-6" style={{ borderColor: 'rgba(255,255,255,0.12)' }} />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
          <span>© {year} Schoonmaak Warm and Cozy. {t('rights')}.</span>
          <div className="flex items-center gap-4">
            <span>KVK: 97095737</span>
            <span>BTW: NL005248356B86</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
