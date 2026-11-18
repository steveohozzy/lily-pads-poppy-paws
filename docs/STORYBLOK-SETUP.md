# Storyblok setup

Create a new **EU** Storyblok space. Use the exact component technical names below (lowercase snake_case).

## Access tokens

- Put the Storyblok **Preview** token in `STORYBLOK_PREVIEW_TOKEN` in your local `.env.local`. It is used only during local development to read draft stories.
- Do not prefix the token with `NEXT_PUBLIC_`; it must remain server-side.
- A Storyblok **Public** token (`STORYBLOK_PUBLIC_TOKEN`) is needed later for the deployed website to read published stories. The live site deliberately does not use the Preview token, because that could expose unpublished content. Until the Public token is available, the deployed site uses its local fallback content.
- The Storyblok space region is configured as `eu` in the application.



| Field | Type | Notes |
|---|---|---|
| `body` | Blocks | Allow Hero, Text Section, Service Grid, FAQ List, Gallery Grid, Call To Action |
| `seo_title` | Text | Optional page-specific title |
| `seo_description` | Textarea | Optional page-specific description |

Create stories for `home`, `about`, `services`, `gallery`, `faqs`, and `contact` using this content type.

## 2. Nestable component: `hero`

| Field | Type |
|---|---|
| `eyebrow` | Text |
| `heading` | Text |
| `intro` | Textarea |
| `image` | Asset |
| `button_text` | Text |
| `button_link` | Link |

## 3. Nestable component: `text_section`

| Field | Type |
|---|---|
| `eyebrow` | Text |
| `heading` | Text |
| `body` | Textarea or Richtext |

## 4. Nestable component: `service_grid`

| Field | Type | Notes |
|---|---|---|
| `heading` | Text | |
| `intro` | Textarea | |
| `show_prices` | Boolean | Default false |
| `items` | Blocks | Allow `service_item` |

Create nestable component `service_item` and add it to the `items` block field:

| Field | Type | Notes |
|---|---|---|
| `title` | Text | Service name |
| `description` | Textarea | |
| `show_price` | Boolean | Default false |
| `price` | Text | Leave empty until the owner supplies a price |

Prices remain hidden unless both `show_prices` on the grid and `show_price` on the individual service are enabled. This means prices can be added later without changing code.

## 5. Nestable component: `faq_list`

| Field | Type |
|---|---|
| `heading` | Text |
| `items` | Blocks (FAQ item) |

Create nestable component `faq_item` with `question` (Text) and `answer` (Textarea).

## 6. Nestable component: `gallery_grid`

| Field | Type |
|---|---|
| `heading` | Text |
| `images` | Multi-asset | Add the selected gallery photographs here. Add descriptive alt text in each asset description or extend the component schema if per-image alt text is needed.

## 7. Nestable component: `call_to_action`

| Field | Type |
|---|---|
| `heading` | Text |
| `body` | Textarea |
| `button_text` | Text |

## Content guidance

- Keep business name, telephone, address and social links consistent on every page.
- Do not publish opening hours until the owner confirms them.
- Do not invent qualifications, awards, testimonials or services.
- Use real dog photographs with the owner's permission.
- Write descriptive image alt text (describe the dog and photograph, not keyword-stuffing).
- Give each page a unique SEO title and description.
- The homepage should clearly state dog grooming in Hemel Hempstead.
