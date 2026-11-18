# Storyblok setup and content model

The site uses Storyblok for both page content and shared site-wide content. The aim is for the business owner to be able to manage the website without editing React or CSS.

## 1. Local environment

Add these values to the local `.env.local` file. Keep the Personal Access Token private and never commit it.

```env
STORYBLOK_MANAGEMENT_TOKEN=your_personal_access_token
STORYBLOK_SPACE_ID=296657281586236
STORYBLOK_PREVIEW_TOKEN=your_preview_delivery_token
STORYBLOK_PUBLIC_TOKEN=your_public_delivery_token
```

- `STORYBLOK_MANAGEMENT_TOKEN` is used only by the setup script to create/update component schemas and migrate starter stories.
- `STORYBLOK_PREVIEW_TOKEN` is used by the local website to read draft content.
- `STORYBLOK_PUBLIC_TOKEN` is used by the deployed website to read published content.

Never use the Management Token as a website delivery token and never prefix tokens with `NEXT_PUBLIC_`.

## 2. Run the setup

From the project root:

```bash
npm run storyblok:setup
```

The setup script creates or updates the component schemas and ensures these page stories exist:

- Home (`home`)
- About (`about`)
- Services (`services`)
- Gallery (`gallery`)
- FAQs (`faqs`)
- Contact (`contact`)
- Privacy Policy (`privacy`)

It also creates a separate **Site Settings** story (`site-settings`). This is not a normal page; the Next.js layout reads it to render the shared header and footer.

The script is safe to rerun for normal editing. It does not replace existing page copy with the starter copy. It does, however, add missing editable fields and perform the one-time structural migrations needed for the current page components (for example, adding the Trust Ribbon, Grooming Picker, About Introduction and Contact Panels blocks). Review the resulting stories before publishing.

New stories are drafts by default. To publish the setup-created or migrated stories, set `STORYBLOK_PUBLISH=true` in `.env.local` and run the setup script again. This also publishes the Site Settings story. Do not set this until the draft content has been reviewed.

## 3. Global Site Settings

Open the **Site Settings** story to manage content shared across every page.

| Field | What it controls |
|---|---|
| Logo / Logo URL | Header and footer logo |
| Logo alt text | Accessible logo description |
| Brand name | Header and footer business name |
| Header call text | Header phone button label |
| Phone display / Phone link | Telephone number shown and its `tel:` destination |
| Navigation | Header desktop and mobile menu labels, destinations and order |
| Footer description | Main footer business description |
| Footer address lines | Address displayed in the footer |
| Footer headings | Footer column headings |
| Facebook / Instagram URLs | Footer social links |
| Footer links | Footer link labels, destinations and order |
| Copyright text | Copyright line; `{year}` is replaced with the current year |
| Footer tagline | Final footer line |

The website retains sensible fallback values until the Site Settings story is published. Upload the logo to the Storyblok asset field or set the Logo URL to an image path such as `/images/2.jpeg`.

## 4. Page builder and reusable blocks

Every page uses the root **Page** component. Its `body` field is a nestable block list, so editors can add, remove and reorder sections. The page also has `seo_title` and `seo_description` fields.

| Component | Purpose / editable content |
|---|---|
| Hero | Eyebrow, heading, highlighted phrase, intro, image, alt text, paint note, CTA labels and destinations, trust labels, layout variant |
| Trust Ribbon | Reorderable trust/location messages and icon choice |
| Text Section | Eyebrow, heading, highlighted phrase, body copy, image, links, location details, map and opening-hours fields |
| About Introduction | The two-column Lily Pads promise and friendly approach section, including feature list |
| Service Grid | Section heading/intro, service cards, optional price note and button |
| Service Item | Service title, description, kicker, icon (selected by service title), enquiry link, footer note and optional price |
| Grooming Picker | Eyebrow, heading, highlighted phrase, intro and selectable options |
| Grooming Picker Option | Option title, short description and selected-result text |
| FAQ List | Intro message, phone CTA and FAQ heading |
| FAQ Item | Individual question and answer |
| Gallery Grid | Gallery heading, images, captions, social text and social destinations |
| Gallery Image | Image asset or URL, alt text and caption |
| Contact Panels | Phone enquiry card, address card, directions link, opening hours and map |
| Callout | The compact contact strip used at the bottom of inner pages |
| Call to Action | The larger homepage final CTA |

The small icons, paint marks, card shapes, spacing, responsive behaviour and interaction mechanics are part of the design system. Editors manage their wording, links, images, options and ordering through Storyblok; they do not need to recreate the visual styling.

## 5. Page section structure

The starter stories follow the existing fallback page designs:

### Home
1. Hero
2. Trust Ribbon
3. Welcome / introduction
4. Service Grid
5. Grooming Picker
6. Care with a personal touch
7. Local location and map
8. Final Call to Action

### About
1. Illustrated Hero
2. About Introduction (promise + friendly approach)
3. Made for wagging tails image/text section
4. Compact Callout

### Services
1. Illustrated Hero
2. Pamper Menu introduction
3. Service Grid with price note
4. Grooming Picker
5. Compact Callout

### Gallery
1. Centered Hero
2. Gallery Grid, including social links
3. Compact Callout

### FAQs
1. Centered Hero
2. FAQ List
3. Compact Callout

### Contact
1. Illustrated Hero
2. Contact Panels (phone, address, opening hours and map)
3. Compact Callout

### Privacy Policy
1. Website information section
2. One editable Text Section for each policy heading and its body copy

## 6. Adding a new page

1. In Storyblok, create a new story using the **Page** content type.
2. Give it a clear name and URL slug (for example, `pricing`).
3. Add and order the required blocks in the `body` field.
4. Add a unique SEO title and description.
5. Save and publish the story.

The Next.js catch-all route renders published Page stories by slug. The sitemap reads published Page stories from Storyblok, so newly published pages are included automatically. Keep slugs lowercase and use hyphens instead of spaces.

## 7. SEO and business details

Each page's SEO title and description are controlled by the Page fields. The site also outputs LocalBusiness structured data and a sitemap. The business address, telephone number, domain and opening hours should only be changed when the business owner confirms the new details.

Current opening hours:
- Monday: Closed
- Tuesday–Friday: 09:00–17:00
- Saturday: 09:00–15:00
- Sunday: Closed

Do not invent qualifications, awards, testimonials, prices or services. Prices remain optional and should only be entered when confirmed by the business owner. Use real grooming photographs only when the owner has permission to publish them.

## 8. Preview and publishing

- Local development uses the Preview token and can show draft content.
- The live site uses the Public token and shows published content.
- Publishing a story in Storyblok updates the live site after the CDN refresh.
- If a page appears unchanged, check that the correct story was published and that the deployed environment has the Public token set as `STORYBLOK_PUBLIC_TOKEN`.

The Management Token is never required by the running website.
