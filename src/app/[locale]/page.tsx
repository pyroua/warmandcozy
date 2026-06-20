import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import BeforeAfter from '@/components/BeforeAfter';
import Region from '@/components/Region';
import Footer from '@/components/Footer';

// Force static rendering — no dynamic server functions
export const dynamic = 'force-static';

export function generateStaticParams() {
  return [{ locale: 'nl' }, { locale: 'en' }, { locale: 'fr' }, { locale: 'de' }];
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Services />
      <BeforeAfter />
      <Region />
      <Footer />
    </main>
  );
}
