# Storyblok setup

The project uses an EU Storyblok space and the Storyblok Management API to create the CMS structure and starter pages.

## 1. Local environment

Add these values to your local `.env.local` file. Keep the Personal Access Token private and do not commit this file.

```env
STORYBLOK_MANAGEMENT_TOKEN=your_personal_access_token
STORYBLOK_SPACE_ID=296657281586236
```

The Personal Access Token is used only by the one-off setup script. It is not exposed to the browser or used by the Next.js website.

The website itself uses:
- `STORYBLOK_PREVIEW_TOKEN` locally to read draft stories.
- `STORYBLOK_PUBLIC_TOKEN` on the deployed website to read published stories.

Never use the Personal Access Token as either website delivery token. Do not prefix any token with `NEXT_PUBLIC_`.

## 2. Run the setup

From the project root, run:

```bash
npm run storyblok:setup
```

The script creates or updates the component definitions and creates the seven pages:
- Home (`home`)
- About (`about`)
- Services (`services`)
- Gallery (`gallery`)
- FAQs (`faqs`)
- Contact (`contact`)
- Privacy Policy (`privacy`)

New stories are created as drafts by default, so they cannot unexpectedly replace the live fallback pages. Once you have reviewed them in Storyblok, set `STORYBLOK_PUBLISH=true` in `.env.local` and rerun the script to publish the existing draft stories. Their content is left unchanged. Existing published stories are left alone.

The script is safe to rerun: component definitions are updated to match the application, but existing stories are skipped and are never overwritten. If you have already created a story manually, the script leaves it untouched.

## 3. Components

The script creates the following components with the exact technical names used by the application:

| Component | Type | Purpose |
|---|---|---|
| `page` | Root | Page body and SEO fields |
| `hero` | Nestable | Page introduction and H1 |
| `text_section` | Nestable | Headings and supporting copy |
| `service_grid` | Nestable | Service list |
| `service_item` | Nestable | Individual service |
| `faq_list` | Nestable | FAQ group |
| `faq_item` | Nestable | Individual question and answer |
| `gallery_grid` | Nestable | Gallery images |
| `call_to_action` | Nestable | Contact prompt |

The page content type includes:
- `body` — Blocks
- `seo_title` — Text
- `seo_description` — Textarea

## 4. Content and SEO

The initial page stories use the approved fallback copy and the page-specific SEO titles and descriptions from the website. Keep one clear H1 per page, use section headings for supporting content, and retain descriptive image alt text.

Opening hours:
- Monday: Closed
- Tuesday–Friday: 09:00–17:00
- Saturday: 09:00–15:00
- Sunday: Closed

Do not invent qualifications, awards, testimonials, prices or services. Prices remain blank until supplied by the business owner. The gallery currently uses the three existing brand images; replace or supplement these with real grooming photographs only when the owner has permission to use them.

Before publishing a change to the live site, check that the Public Content Delivery API token is set as `STORYBLOK_PUBLIC_TOKEN` in the deployment environment. The Personal Access Token is not a delivery token.
