'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

function useSectionReveal() {
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

export default function BeforeAfter() {
  const t = useTranslations('results');
  const titleRef = useSectionReveal();

  const pairs = [
    { src: '/images/before-after-1.jpg', caption: t('caption1') },
    { src: '/images/before-after-2.jpg', caption: t('caption2') },
    { src: '/images/before-after-3.jpg', caption: t('caption3') },
  ];

  return (
    <section
      id="resultaten"
      className="py-20 lg:py-28"
      style={{ background: 'linear-gradient(180deg, #F7FAFA 0%, #EDF5F3 100%)' }}
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

        {/* Collage grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pairs.map((pair, i) => (
            <CollagCard
              key={i}
              src={pair.src}
              caption={pair.caption}
              beforeLabel={t('before')}
              afterLabel={t('after')}
              delay={i * 150}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CollagCard({
  src,
  caption,
  beforeLabel,
  afterLabel,
  delay,
}: {
  src: string;
  caption: string;
  beforeLabel: string;
  afterLabel: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add('visible'), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className="reveal rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-400 group"
      style={{ background: 'var(--color-surface)' }}
    >
      {/* Collage image with labels */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={src}
          alt={caption}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Before label (left) */}
        <div
          className="ba-label left-3"
          style={{
            background: 'rgba(40,40,40,0.75)',
            color: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(4px)',
          }}
        >
          {beforeLabel}
        </div>
        {/* After label (right) */}
        <div
          className="ba-label right-3"
          style={{
            background: 'rgba(45,122,111,0.88)',
            color: 'white',
            backdropFilter: 'blur(4px)',
          }}
        >
          {afterLabel}
        </div>
        {/* Center divider line */}
        <div
          className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 z-10"
          style={{ background: 'rgba(255,255,255,0.5)' }}
        />
      </div>

      {/* Caption */}
      <div
        className="px-5 py-3 flex items-center gap-2"
        style={{ borderTop: '1px solid var(--color-border)' }}
      >
        <div
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ background: 'var(--color-teal)' }}
        />
        <span className="text-sm font-600" style={{ color: 'var(--color-text)' }}>
          {caption}
        </span>
      </div>
    </div>
  );
}
