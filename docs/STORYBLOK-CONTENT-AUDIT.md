# Storyblok content coverage audit

Repository: `steveohozzy/lily-pads-poppy-paws`

This audit records the intended CMS boundary: editors control the site's words, images, links, menus, business contact copy, page order and interactive option content. React components and CSS continue to own the presentation, responsive layout, icon artwork and interaction mechanics so the visual design remains consistent.

## Shared site content

The root **Site Settings** story controls:
- Header logo (Storyblok asset or image URL), logo alt text and brand name
- Desktop and mobile navigation items, labels, destinations and order
- Header call-to-action label and telephone destination
- Footer business description, address, phone number and social URLs
- Footer headings, navigation links, copyright text and tagline

The root layout fetches this story once per render path and passes it to the shared header and footer. Existing fallback values remain available if the settings story has not yet been published.

## Page coverage

| Page | Story slug | Storyblok section sequence |
|---|---|---|
| Home | `home` | Hero → Trust Ribbon → Welcome Text Section → Service Grid → Grooming Picker → Care/Features Text Section → Local Location Text Section → Call to Action |
| About | `about` | Illustrated Hero → About Introduction → Made-for-wagging-tails Text Section → Callout |
| Services | `services` | Illustrated Hero → Pamper Menu Text Section → Service Grid with price note → Grooming Picker → Callout |
| Gallery | `gallery` | Centered Hero → Gallery Grid with social links → Callout |
| FAQs | `faqs` | Centered Hero → FAQ List → Callout |
| Contact | `contact` | Illustrated Hero → Contact Panels → Callout |
| Privacy Policy | `privacy` | Website information Text Section → individual editable policy Text Sections |

Each Page story has editable SEO title and description fields. Published Page stories are discovered by the sitemap, so new Page stories can be added without editing the route list.

## Registered reusable blocks

- `page`
- `hero`
- `trust_ribbon` and nested `trust_ribbon_item`
- `text_section`
- `about_intro`
- `service_grid` and nested `service_item`
- `grooming_picker` and nested `grooming_picker_option`
- `faq_list` and nested `faq_item`
- `gallery_grid` and nested `gallery_image`
- `contact_panels`
- `callout`
- `call_to_action`
- `site_settings` with nested `site_nav_link` and `site_footer_link`

## Migration behaviour

The setup script updates component schemas and safely augments existing stories:
- It fills newly introduced editable fields only when they are empty.
- It adds the missing homepage Trust Ribbon and Grooming Picker.
- It adds the Services Grooming Picker and editable service price note.
- It combines the existing About promise/approach sections into the matching two-column block.
- It combines Contact phone, location and opening-hours sections into Contact Panels.
- It converts the old inner-page large CTA block to the compact Callout used by the fallback pages.
- It removes exact duplicate seeded sections where their content is now included in the parent block.
- It creates Site Settings if it does not already exist.

It does not replace the existing page body with the setup script's starter page copy. Review draft changes before publishing.

## Operational verification still required

After pulling the latest `main` branch:
1. Run `npm run storyblok:setup` locally with the Management Token in `.env.local`.
2. Review the seven page stories and the new Site Settings story in Storyblok.
3. Confirm the Preview and Public delivery tokens are configured in the correct environments.
4. Run `npm run build` locally and review the preview site at desktop and mobile widths.
5. Publish the reviewed stories and check the live site.

A Vercel build attempt during this audit exposed a footer TypeScript issue, which was corrected. A subsequent fresh Vercel build could not be started because the Vercel API returned its daily deployment quota error (HTTP 402), so the latest code has not yet been build-verified.
