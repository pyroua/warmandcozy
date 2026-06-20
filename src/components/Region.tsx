'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, FileText, Hash } from 'lucide-react';

const WHATSAPP_URL = 'https://api.whatsapp.com/send?phone=31617615757';

function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setTimeout(() => entry.target.classList.add('visible'), delay);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);
  return ref;
}

export default function Region() {
  const t = useTranslations('region');
  const leftRef  = useReveal(0);
  const rightRef = useReveal(150);
  const titleRef = useReveal(0);

  return (
    <section
      id="regio"
      className="py-20 lg:py-28"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
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

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left — Map */}
          <div ref={leftRef} className="reveal">
            {/* Map embed */}
            <div className="rounded-3xl overflow-hidden shadow-lg mb-6" style={{ height: '360px' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19850.4!2d5.5462!3d51.6124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c6e5b1a2345678%3A0x1234567890abcdef!2sVeghel%2C+Netherlands!5e0!3m2!1sen!2snl!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Werkgebied Warm and Cozy"
              />
            </div>

            {/* Service area cities */}
            <div
              className="glass-card rounded-2xl px-6 py-4 flex items-center gap-3"
            >
              <MapPin size={18} style={{ color: 'var(--color-teal)', flexShrink: 0 }} />
              <div>
                <div className="text-xs font-700 uppercase tracking-wider mb-0.5" style={{ color: 'var(--color-text-muted)' }}>
                  Werkgebied
                </div>
                <div className="text-sm font-600" style={{ color: 'var(--color-text)' }}>
                  {t('cities')}
                </div>
              </div>
            </div>
          </div>

          {/* Right — Contact info */}
          <div ref={rightRef} className="reveal" id="contact">
            <div
              className="glass-card rounded-3xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-900 mb-6" style={{ color: 'var(--color-text)' }}>
                {t('contactTitle')}
              </h3>

              <div className="space-y-5 mb-8">
                {/* Phone */}
                <ContactRow
                  icon={Phone}
                  label={t('phone')}
                  value="+31 61 761-57-57"
                  href="tel:+31617615757"
                />
                {/* Email */}
                <ContactRow
                  icon={Mail}
                  label={t('email')}
                  value="info@warmandcozy.club"
                  href="mailto:info@warmandcozy.club"
                />
                {/* Address */}
                <ContactRow
                  icon={MapPin}
                  label={t('address')}
                  value="De Omgang 17, 5463KZ Veghel, Netherlands"
                  href="https://share.google/9H8851OIf54uwcKYv"
                />
                {/* KVK */}
                <ContactRow
                  icon={FileText}
                  label={t('kvk')}
                  value="97095737"
                />
                {/* BTW */}
                <ContactRow
                  icon={Hash}
                  label={t('btw')}
                  value="NL005248356B86"
                />
              </div>

              {/* WhatsApp CTA */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-btn flex items-center justify-center gap-3 text-white font-700 px-6 py-4 rounded-2xl text-base w-full"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {t('whatsappCta')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: 'rgba(45,122,111,0.1)' }}
      >
        <Icon size={16} style={{ color: 'var(--color-teal)' }} />
      </div>
      <div>
        <div className="text-xs font-700 uppercase tracking-wider mb-0.5" style={{ color: 'var(--color-text-muted)' }}>
          {label}
        </div>
        {href ? (
          <a
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="text-sm font-600 hover:underline transition-colors"
            style={{ color: 'var(--color-teal)' }}
          >
            {value}
          </a>
        ) : (
          <div className="text-sm font-600" style={{ color: 'var(--color-text)' }}>
            {value}
          </div>
        )}
      </div>
    </div>
  );
}
