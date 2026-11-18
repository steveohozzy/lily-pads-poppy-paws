# Lily Pads & Poppy Paws

A Next.js + TypeScript + Tailwind CSS + Storyblok website for Lily Pads & Poppy Paws dog grooming in Hemel Hempstead.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- Storyblok React SDK v7 (RSC)
- Vercel deployment

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

The site includes working starter pages and local content without requiring a Storyblok token. Add your Storyblok Preview token to `.env.local` for local development and draft content. The Preview token stays server-side and is never exposed through a `NEXT_PUBLIC_` variable.

## Business details to verify before launch

The starter uses the details currently supplied for the business:

- Lily Pads & Poppy Paws
- 42 Lomond Road, Hemel Hempstead, HP2 6PA
- 07752 027606
- Instagram: https://www.instagram.com/lilypadspoppypaws/
- Facebook: https://www.facebook.com/lilypadspoppypaws/

Confirm the address, telephone number, exact services and opening hours with the owner before launch. No opening hours or prices are currently published in the starter.

## Storyblok setup

Create a new Storyblok space in the EU region. Copy the **Preview** access token into `STORYBLOK_PREVIEW_TOKEN` for local development. This lets the local site read draft stories. A separate **Public** access token is required later if the deployed live website is to read published Storyblok content. Do not put the Preview token in a `NEXT_PUBLIC_` variable.

Register the component schemas described in `docs/STORYBLOK-SETUP.md`. The frontend registers these Storyblok component names:

- `page`
- `hero`
- `text_section`
- `service_grid`
- `faq_list`
- `gallery_grid`
- `call_to_action`

The website's initial routes are implemented locally so the project can be previewed before the CMS space is configured. The Storyblok component renderer is ready for content-driven pages once the space and stories have been created.

## Environment variables

| Variable | Purpose |
|---|---|
| `STORYBLOK_PREVIEW_TOKEN` | Storyblok Preview token; local development and draft stories only |
| `STORYBLOK_PUBLIC_TOKEN` | Storyblok Public token; required by the deployed site for published stories |
| `NEXT_PUBLIC_SITE_URL` | Canonical public website URL: `https://lilypadspoppypaws.co.uk` |

## Deploy to Vercel

1. Push this repository to GitHub.
2. Import `lily-pads-poppy-paws` into Vercel (hosting platform only).
3. Add `STORYBLOK_PUBLIC_TOKEN` when the Storyblok Public token is available.
4. Set `NEXT_PUBLIC_SITE_URL` to `https://lilypadspoppypaws.co.uk`.
5. Deploy, then connect `lilypadspoppypaws.co.uk` as the custom domain in Vercel.
6. Apply the DNS records shown by Vercel at the domain registrar.
7. Verify the custom domain and HTTPS, then submit `/sitemap.xml` in Google Search Console.

The temporary `*.vercel.app` deployment address is for testing only. It is not the canonical website URL and must not be used in SEO metadata or structured data.

## SEO notes

The starter includes page-specific metadata, canonical URLs, Open Graph metadata, `robots.txt`, `sitemap.xml`, and `PetGroomer` JSON-LD.

The JSON-LD should be checked against the final verified business details before launch. Do not add unverified reviews, aggregate ratings, opening hours, prices or services.
