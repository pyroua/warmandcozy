# Schoonmaak Warm and Cozy — warmandcozy.club

Professional cleaning company website for Veghel, Netherlands.

## Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS 4**
- **next-intl** — i18n: NL (default), EN, FR
- **Cloudflare Pages** — hosting

## Local Development

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Production Deploy (Cloudflare Pages)

### Setup (одноразово)

1. Зайти в [Cloudflare Pages Dashboard](https://dash.cloudflare.com/?to=/:account/pages)
2. `Create application` → `Pages` → `Connect to Git`
3. Выбрать репозиторий `pyroua/warmandcozy`
4. Настройки сборки:
   - **Framework preset**: Next.js
   - **Build command**: `npx @cloudflare/next-on-pages`
   - **Output directory**: `.vercel/output/static`
   - **Node version**: 20
5. Сохранить и задеплоить

### Привязка домена

1. После деплоя → `Custom domains` → `Add custom domain`
2. Ввести `warmandcozy.club`
3. DNS обновится автоматически (домен уже в Cloudflare)

### Environment Variables

Не требуются для Phase 1.

## Project Structure

```
src/
├── app/[locale]/         — Locale-based routing (NL/EN/FR)
│   ├── layout.tsx        — Root layout with SEO metadata
│   └── page.tsx          — Main page
├── components/
│   ├── Header.tsx        — Fixed header with nav + lang switcher + WhatsApp
│   ├── Hero.tsx          — Hero section with CTA
│   ├── Services.tsx      — Residential + Commercial services
│   ├── BeforeAfter.tsx   — Photo gallery (voor & na)
│   ├── Region.tsx        — Map + contact info
│   └── Footer.tsx        — Footer with social links
├── i18n/
│   ├── routing.ts        — Locale definitions
│   └── request.ts        — next-intl server config
└── middleware.ts          — Locale redirect middleware

messages/
├── nl.json               — Dutch (primary)
├── en.json               — English
└── fr.json               — French
```

## Content Management (Phase 2)

В будущем: подключение staff-api как headless CMS.
Новый эндпоинт `/api/pages/warmandcozy` возвращает JSON с текстами.
Next.js рендерит через ISR (Incremental Static Regeneration).

## Contact

- 📱 WhatsApp: https://api.whatsapp.com/send?phone=31617615757
- 📧 info@warmandcozy.club
- 📍 De Omgang 17, 5463KZ Veghel, Netherlands
- 🏢 KVK: 97095737 | BTW: NL005248356B86
