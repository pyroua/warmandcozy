import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import BeforeAfter from '@/components/BeforeAfter';
import Region from '@/components/Region';
import Footer from '@/components/Footer';

export function generateStaticParams() {
  return [{ locale: 'nl' }, { locale: 'en' }, { locale: 'fr' }];
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
