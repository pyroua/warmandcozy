import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  output: 'export',       // Статический экспорт для Cloudflare Pages
  trailingSlash: true,    // /nl/ вместо /nl — лучше для CDN
  images: {
    unoptimized: true,    // Обязательно для static export (нет Next.js Image сервера)
  },
};

export default withNextIntl(nextConfig);
