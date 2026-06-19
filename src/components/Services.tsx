'use client';

import { useTranslations } from 'next-intl';
import { Home, Building2, Check, Clock, Award, Package, ChevronRight } from 'lucide-react';
import { useEffect, useRef } from 'react';

const WHATSAPP_URL = 'https://api.whatsapp.com/send?phone=31617615757';

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add('visible'); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return ref;
}

const featureIcons = [Clock, Award, Building2, Package];

export default function Services() {
  const t = useTranslations('services');
  const residentialRef = useReveal();
  const commercialRef = useReveal();
  const titleRef = useReveal();

  const residentialItems = t.raw('residential.items') as string[];
  const commercialFeatures = t.raw('commercial.features') as Array<{ title: string; desc: string }>;

  return (
    <section id="diensten" className="py-20 lg:py-28" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <div ref={titleRef} className="reveal text-center mb-16">
          <h2
            className="section-title text-3xl sm:text-4xl font-900 mb-3"
            style={{ color: 'var(--color-text)' }}
          >
            {t('title')}
          </h2>
          <p className="text-base sm:text-lg max-w-xl mx-auto" style={{ color: 'var(--color-text-muted)' }}>
            {t('subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-start">
          {/* Card 1 — Residential */}
          <div
            ref={residentialRef}
            className="reveal glass-card rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            {/* Card header */}
            <div
              className="px-8 pt-8 pb-6 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #1F5A52, #2D7A6F)' }}
            >
              <div
                className="absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-20"
                style={{ background: 'rgba(255,255,255,0.3)' }}
              />
              <div
                className="absolute -right-2 -bottom-6 w-20 h-20 rounded-full opacity-15"
                style={{ background: 'rgba(244,208,63,0.5)' }}
              />
              <div
                className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full text-xs font-700"
                style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)' }}
              >
                <Home size={12} />
                {t('residential.tag')}
              </div>
              <h3 className="text-2xl font-900 text-white mb-2">{t('residential.title')}</h3>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>
                {t('residential.description')}
              </p>
            </div>

            {/* Card body */}
            <div className="px-8 py-6">
              <ul className="space-y-4 mb-8">
                {residentialItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: 'rgba(45,122,111,0.12)' }}
                    >
                      <Check size={11} style={{ color: 'var(--color-teal)' }} strokeWidth={3} />
                    </div>
                    <span className="text-sm leading-relaxed" style={{ color: 'var(--color-text)' }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-btn flex items-center justify-center gap-3 text-white font-700 px-6 py-3.5 rounded-xl text-sm w-full"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {t('residential.cta')}
              </a>
            </div>
          </div>

          {/* Card 2 — Commercial */}
          <div
            ref={commercialRef}
            className="reveal glass-card rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            {/* Card header */}
            <div
              className="px-8 pt-8 pb-6 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #7A5C1E, #C8892A)' }}
            >
              <div
                className="absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-20"
                style={{ background: 'rgba(255,255,255,0.3)' }}
              />
              <div
                className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full text-xs font-700"
                style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)' }}
              >
                <Building2 size={12} />
                {t('commercial.tag')}
              </div>
              <h3 className="text-2xl font-900 text-white mb-2">{t('commercial.title')}</h3>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>
                {t('commercial.description')}
              </p>
            </div>

            {/* Card body */}
            <div className="px-8 py-6">
              <div className="space-y-5 mb-6">
                {commercialFeatures.map((feat, i) => {
                  const Icon = featureIcons[i] || ChevronRight;
                  return (
                    <div key={i} className="flex items-start gap-4">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(200,137,42,0.12)' }}
                      >
                        <Icon size={16} style={{ color: 'var(--color-gold)' }} />
                      </div>
                      <div>
                        <div className="font-700 text-sm mb-0.5" style={{ color: 'var(--color-text)' }}>
                          {feat.title}
                        </div>
                        <div className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                          {feat.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* No call-out badge */}
              <div
                className="flex items-center gap-2 mb-6 px-4 py-2.5 rounded-xl text-sm font-700"
                style={{
                  background: 'linear-gradient(135deg, rgba(200,137,42,0.1), rgba(229,169,62,0.08))',
                  border: '1px solid rgba(200,137,42,0.25)',
                  color: 'var(--color-gold)',
                }}
              >
                <span>✓</span>
                {t('commercial.noCallout')}
              </div>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="teal-btn flex items-center justify-center gap-2 text-white font-700 px-6 py-3.5 rounded-xl text-sm w-full"
              >
                {t('commercial.cta')}
                <ChevronRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
