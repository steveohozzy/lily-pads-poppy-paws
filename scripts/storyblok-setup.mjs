import { randomUUID } from "node:crypto";

const spaceId = process.env.STORYBLOK_SPACE_ID || "296657281586236";
const token = process.env.STORYBLOK_MANAGEMENT_TOKEN;
const baseUrl = "https://mapi.storyblok.com/v1";
const publishStories = process.env.STORYBLOK_PUBLISH === "true";

if (!token) {
  console.error("Missing STORYBLOK_MANAGEMENT_TOKEN. Add your Storyblok Personal Access Token to .env.local.");
  process.exit(1);
}

let lastRequestAt = 0;

const sleep = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

async function request(path, options = {}) {
  let attempt = 0;

  while (attempt < 6) {
    const waitForSpacing = Math.max(0, 250 - (Date.now() - lastRequestAt));
    if (waitForSpacing) await sleep(waitForSpacing);

    lastRequestAt = Date.now();

    const response = await fetch(`${baseUrl}/spaces/${spaceId}/${path}`, {
      ...options,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
        ...(options.headers || {})
      }
    });

    const body = await response.json().catch(() => ({}));

    if (response.ok) return body;

    if (response.status === 429 && attempt < 5) {
      const retryAfter = Number(response.headers.get("retry-after"));
      const backoff = retryAfter > 0 ? retryAfter * 1000 : 1000 * (attempt + 1);
      console.log(`Storyblok rate limit reached. Retrying in ${Math.ceil(backoff / 1000)}s...`);
      await sleep(backoff);
      attempt += 1;
      continue;
    }

    throw new Error(`Storyblok API ${response.status} on ${path}: ${JSON.stringify(body)}`);
  }

  throw new Error(`Storyblok API rate limit persisted on ${path} after 5 retries.`);
}

const field = (type, extra = {}) => ({ type, pos: 0, required: false, ...extra });
const text = () => field("text");
const textarea = () => field("textarea");
const bloks = (components) => field("bloks", {
  restrict_components: true,
  component_whitelist: components
});

const components = [
  {
    name: "page",
    display_name: "Page",
    is_root: true,
    is_nestable: false,
    schema: {
      body: bloks(["hero", "text_section", "service_grid", "grooming_picker", "trust_ribbon", "faq_list", "gallery_grid", "call_to_action", "callout", "about_intro", "contact_panels"]),
      seo_title: text(),
      seo_description: textarea()
    }
  },
  {
    name: "site_settings",
    display_name: "Site Settings",
    is_root: true,
    is_nestable: false,
    schema: {
      logo: field("asset"),
      logo_url: text(),
      logo_alt: text(),
      brand_name: text(),
      header_call_text: text(),
      phone_display: text(),
      phone_link: text(),
      navigation: bloks(["site_nav_link"]),
      footer_description: textarea(),
      footer_find_us_heading: text(),
      address_line_1: text(),
      address_line_2: text(),
      address_line_3: text(),
      footer_social_heading: text(),
      facebook_url: text(),
      instagram_url: text(),
      footer_links: bloks(["site_footer_link"]),
      copyright_text: text(),
      footer_tagline: text()
    }
  },
  {
    name: "site_nav_link",
    display_name: "Navigation link",
    is_root: false,
    is_nestable: true,
    schema: { label: text(), href: text() }
  },
  {
    name: "site_footer_link",
    display_name: "Footer link",
    is_root: false,
    is_nestable: true,
    schema: { label: text(), href: text() }
  },
  {
    name: "hero",
    display_name: "Hero",
    is_root: false,
    is_nestable: true,
    schema: {
      eyebrow: text(),
      heading: text(),
      highlight: text(),
      intro: textarea(),
      image: field("asset"),
      image_url: text(),
      image_alt: text(),
      layout: field("option", { options: [
        { name: "Illustrated", value: "illustrated" },
        { name: "Centered", value: "centered" }
      ] }),
      eyebrow_icon: field("option", { options: [
        { name: "Paw", value: "paw" },
        { name: "Heart", value: "heart" },
        { name: "Sparkles", value: "sparkles" }
      ] }),
      show_secondary_button: field("boolean", { default_value: true }),
      secondary_button_text: text(),
      secondary_button_link: text(),
      trust_badge_one: text(),
      trust_badge_two: text(),
      sticker_top: text(),
      sticker_bottom: text(),
      paint_note: text()
    }
  },
  {
    name: "text_section",
    display_name: "Text section",
    is_root: false,
    is_nestable: true,
    schema: {
      eyebrow: text(),
      heading: text(),
      highlight: text(),
      body: textarea(),
      link_text: text(),
      link_url: text(),
      image: field("asset"),
      image_url: text(),
      image_alt: text(),
      art_caption: text(),
      feature_one: text(),
      feature_two: text(),
      feature_three: text(),
      primary_button_text: text(),
      secondary_button_text: text(),
      directions_url: text(),
      map_embed_url: text(),
      map_title: text(),
      address_line_1: text(),
      address_line_2: text(),
      address_line_3: text(),
      phone_link: text(),
      address_line_4: text(),
      monday_hours: text(),
      tuesday_hours: text(),
      wednesday_hours: text(),
      thursday_hours: text(),
      friday_hours: text(),
      saturday_hours: text(),
      sunday_hours: text()
    }
  },
  {
    name: "service_grid",
    display_name: "Service grid",
    is_root: false,
    is_nestable: true,
    schema: {
      eyebrow: text(),
      heading: text(),
      highlight: text(),
      intro: textarea(),
      button_text: text(),
      button_link: text(),
      price_note: textarea(),
      price_note_heading: text(),
      show_button: field("boolean", { default_value: true }),
      show_heading: field("boolean", { default_value: true }),
      show_prices: field("boolean", { default_value: false }),
      items: bloks(["service_item"])
    }
  },
  {
    name: "trust_ribbon",
    display_name: "Trust ribbon",
    is_root: false,
    is_nestable: true,
    schema: {
      items: bloks(["trust_ribbon_item"])
    }
  },
  {
    name: "trust_ribbon_item",
    display_name: "Trust ribbon item",
    is_root: false,
    is_nestable: true,
    schema: {
      label: text(),
      icon: field("option", { options: [
        { name: "Paw", value: "paw" },
        { name: "Shield", value: "shield" },
        { name: "Location", value: "location" },
        { name: "Heart", value: "heart" }
      ] })
    }
  },
  {
    name: "grooming_picker",
    display_name: "Grooming picker",
    is_root: false,
    is_nestable: true,
    schema: {
      eyebrow: text(),
      heading: text(),
      highlight: text(),
      highlight_after_words: field("number", { min_value: 0 }),
      intro: textarea(),
      button_text: text(),
      phone_link: text(),
      options_aria_label: text(),
      options: bloks(["grooming_picker_option"])
    }
  },
  {
    name: "grooming_picker_option",
    display_name: "Grooming picker option",
    is_root: false,
    is_nestable: true,
    schema: {
      title: text(),
      detail: text(),
      result: textarea()
    }
  },
  {
    name: "service_item",
    display_name: "Service item",
    is_root: false,
    is_nestable: true,
    schema: {
      title: text(),
      description: textarea(),
      kicker: text(),
      link_text: text(),
      link_url: text(),
      footer_note: text(),
      variant: field("option", { options: [
        { name: "Simple", value: "simple" },
        { name: "Illustrated", value: "illustrated" }
      ] }),
      show_price: field("boolean", { default_value: false }),
      price: text()
    }
  },
  {
    name: "faq_list",
    display_name: "FAQ list",
    is_root: false,
    is_nestable: true,
    schema: {
      heading: text(),
      highlight: text(),
      intro: textarea(),
      show_heading: field("boolean", { default_value: false }),
      phone_text: text(),
      phone_display: text(),
      phone_link: text(),
      items: bloks(["faq_item"])
    }
  },
  {
    name: "faq_item",
    display_name: "FAQ item",
    is_root: false,
    is_nestable: true,
    schema: {
      question: text(),
      answer: textarea()
    }
  },
  {
    name: "gallery_grid",
    display_name: "Gallery grid",
    is_root: false,
    is_nestable: true,
    schema: {
      eyebrow: text(),
      heading: text(),
      intro: textarea(),
      gallery_items: bloks(["gallery_image"]),
      social_eyebrow: text(),
      social_heading: text(),
      social_highlight: text(),
      social_intro: textarea(),
      facebook_url: text(),
      instagram_url: text(),
      facebook_text: text(),
      instagram_text: text()
    }
  },
  {
    name: "about_intro",
    display_name: "About introduction",
    is_root: false,
    is_nestable: true,
    schema: {
      promise_eyebrow: text(),
      promise_heading: text(),
      promise_highlight: text(),
      promise_body: textarea(),
      heading: text(),
      highlight: text(),
      body: textarea(),
      feature_one: text(),
      feature_two: text(),
      feature_three: text()
    }
  },
  {
    name: "contact_panels",
    display_name: "Contact panels",
    is_root: false,
    is_nestable: true,
    schema: {
      phone_eyebrow: text(),
      phone_heading: text(),
      phone_body: textarea(),
      phone_display: text(),
      phone_link: text(),
      location_eyebrow: text(),
      location_heading: text(),
      address_line_1: text(),
      address_line_2: text(),
      address_line_3: text(),
      address_line_4: text(),
      directions_text: text(),
      directions_url: text(),
      hours_eyebrow: text(),
      hours_heading: text(),
      monday_hours: text(),
      tuesday_hours: text(),
      wednesday_hours: text(),
      thursday_hours: text(),
      friday_hours: text(),
      saturday_hours: text(),
      sunday_hours: text(),
      map_title: text(),
      map_embed_url: text()
    }
  },
  {
    name: "callout",
    display_name: "Callout",
    is_root: false,
    is_nestable: true,
    schema: {
      heading: text(),
      body: textarea(),
    }
  },
  {
    name: "gallery_image",
    display_name: "Gallery image",
    is_root: false,
    is_nestable: true,
    schema: {
      image: field("asset"),
      image_url: text(),
      alt: text(),
      caption: text()
    }
  },
  {
    name: "call_to_action",
    display_name: "Call to action",
    is_root: false,
    is_nestable: true,
    schema: {
      eyebrow: text(),
      heading: text(),
      highlight: text(),
      body: textarea(),
    }
    }
  }
];

const uid = () => randomUUID().replaceAll("-", "");
const blok = (component, fields = {}) => ({ _uid: uid(), component, ...fields });

const serviceItems = [
  {
    title: "Dog nail clipping",
    description: "A nail trim can help keep your dog's paws comfortable. Get in touch to discuss your dog's needs and ask about a price."
  },
  {
    title: "Full dog grooming",
    description: "Enquire about a full groom tailored to your dog's coat and grooming requirements. All breeds are welcome."
  },
  {
    title: "Grooming advice and enquiries",
    description: "Not sure what your dog needs? Have a chat about their coat, the grooming you have in mind and the options available."
  }
];

const commonCta = (heading = "Ready for a little pampering?") =>
  blok("call_to_action", {
    heading,
    body: "Tell us a little about your dog and the grooming you're looking for. We'd love to hear from you.",
    button_text: "Call 07752 027606"
  });

const commonCallout = (heading = "Let's get those tails wagging!") =>
  blok("callout", {
    heading,
    body: "Call to discuss your dog's grooming needs and ask about prices.",
    button_text: "07752 027606",
    phone_link: "tel:07752027606"
  });

const pages = [
  {
    name: "Home",
    slug: "home",
    seo_title: "Dog Grooming in Hemel Hempstead | Lily Pads & Poppy Paws",
    seo_description: "Looking for a dog groomer in Hemel Hempstead? Lily Pads & Poppy Paws is qualified and insured, offering nail clips to full grooms for all breeds. Call to enquire.",
    body: [
      blok("hero", {
        eyebrow: "A little love for every paw · Hemel Hempstead",
        heading: "Dog grooming in Hemel Hempstead",
        intro: "Happy dogs, lovely fresh coats and a whole lot of fuss. Lily Pads & Poppy Paws is a qualified and insured dog groomer offering everything from nail clips to full grooms for all breeds.",
        image_url: "/images/1.jpg",
        image_alt: "A friendly illustrated dog on a bright aqua background, in the Lily Pads & Poppy Paws brand style",
        secondary_button_text: "Explore our services",
        secondary_button_link: "/services",
        trust_badge_one: "Qualified & insured",
        trust_badge_two: "All breeds welcome",
        sticker_top: "Pawsitively pampered!",
        sticker_bottom: "Every dog is special"
      }),
      blok("trust_ribbon", {
        items: [
          blok("trust_ribbon_item", { label: "A warm welcome for every breed", icon: "paw" }),
          blok("trust_ribbon_item", { label: "Qualified and insured", icon: "shield" }),
          blok("trust_ribbon_item", { label: "Hemel Hempstead, Hertfordshire", icon: "location" })
        ]
      }),
      blok("text_section", {
        eyebrow: "Welcome to our little grooming corner",
        heading: "Good hair days are for every dog.",
        body: "At Lily Pads & Poppy Paws, we believe every dog deserves to feel comfortable, cared for and looking their very best. Based in Hemel Hempstead, we welcome all breeds and offer grooming from a simple nail clip to a full groom.\n\nNot sure what your dog needs? Give us a call. We can chat about the grooming you have in mind and provide a price before you arrange an appointment.\n\nGet to know Lily Pads & Poppy Paws by visiting our About page."
      }),
      blok("service_grid", {
        heading: "A little trim, or the full glow-up?",
        eyebrow: "The good stuff",
        button_text: "See all service information",
        button_link: "/services",
        intro: "Explore our dog grooming services in Hemel Hempstead. Every dog is different, so get in touch to discuss what your four-legged friend needs.",
        items: serviceItems.map((item) => blok("service_item", item))
      }),
      blok("grooming_picker", {
        eyebrow: "A tiny bit of help",
        heading: "What kind of pamper are you thinking?",
        highlight: "pamper",
        button_text: "Let's chat",
        phone_link: "tel:07752027606",
        options_aria_label: "Choose a grooming option",
        intro: "Choose the option that sounds closest. We'll point you in the right direction.",
        options: [
          blok("grooming_picker_option", { title: "Just a little tidy", detail: "A nail clip or small tidy-up", result: "A little maintenance can make a lovely difference. Give us a call to ask about nail clipping." }),
          blok("grooming_picker_option", { title: "The full pamper", detail: "A full groom for a fresh new look", result: "Let's talk about the full groom you're looking for and find out what's right for your dog's coat." }),
          blok("grooming_picker_option", { title: "Something else", detail: "Not quite sure what they need?", result: "No worries at all. Tell us a little about your dog and we'll chat through the options together." })
        ]
      }),
      blok("text_section", {
        eyebrow: "Care with a personal touch",
        heading: "Because they're not just pets. They're family.",
        body: "Choosing a dog groomer is about finding someone you feel happy trusting with a very important member of the family. Lily Pads & Poppy Paws is qualified and insured, and welcomes dogs of all breeds.\n\nGrooming options range from nail clips to full grooms, and the business is conveniently based in Hemel Hempstead. Read our grooming FAQs or get in touch to talk about your dog."
      }),
      blok("text_section", {
        eyebrow: "Your local dog groomer",
        heading: "Find us in Hemel Hempstead.",
        body: "Lily Pads & Poppy Paws is based at 42 Lomond Road, Hemel Hempstead, HP2 6PA. If you're looking for dog grooming in Hemel Hempstead, Hertfordshire, get in touch to ask about services, prices and appointments.\n\nLily Pads & Poppy Paws\n42 Lomond Road\nHemel Hempstead\nHP2 6PA\n\nCall 07752 027606 for enquiries or use the Get Directions link on the Contact page."
      }),
      commonCta("Let's get those tails wagging!")
    ]
  },
  {
    name: "About",
    slug: "about",
    seo_title: "About Lily Pads & Poppy Paws | Dog Groomer Hemel Hempstead",
    seo_description: "Get to know Lily Pads & Poppy Paws, a qualified and insured dog grooming business in Hemel Hempstead. Friendly grooming enquiries for all breeds.",
    body: [
      blok("hero", {
        eyebrow: "A little about us",
        heading: "Dog grooming with care in Hemel Hempstead.",
        intro: "Lily Pads & Poppy Paws is a qualified and insured dog grooming business in Hemel Hempstead, Hertfordshire. All breeds are welcome, with grooming options ranging from nail clipping to full grooms. The aim is simple: to make every dog feel comfortable, cared for and looking their best.",
        image_url: "/images/3.jpg",
        image_alt: "Lily Pads & Poppy Paws dog grooming illustration"
      }),
      blok("about_intro", {
        promise_eyebrow: "The Lily Pads promise",
        promise_heading: "Gentle care. Lovely results.",
        promise_highlight: "Lovely results.",
        promise_body: "Every dog has their own personality, coat and comfort level. We believe grooming should feel like a positive part of their care.",
        heading: "A friendly approach to dog grooming.",
        highlight: "dog grooming.",
        body: "Every dog is different. Their breed, coat, age, personality and individual needs all help shape the kind of grooming that may be right for them. That's why Lily Pads & Poppy Paws encourages owners to get in touch and talk through what they are looking for before arranging an appointment.\n\nWhether you need a nail clip or want to enquire about a full dog groom, you can discuss your dog's needs and ask for a price before booking. The business is based in Hemel Hempstead, Hertfordshire, and welcomes enquiries for dogs of all breeds.\n\nLily Pads & Poppy Paws is qualified and insured, giving local dog owners a clear point of contact for grooming enquiries in Hemel Hempstead.",
        feature_one: "Qualified and insured",
        feature_two: "All breeds welcome",
        feature_three: "Friendly conversations about your dog's grooming needs"
      }),
      blok("text_section", {
        eyebrow: "Made for wagging tails",
        heading: "A local dog groomer for Hemel Hempstead.",
        body: "Based in Hemel Hempstead, Lily Pads & Poppy Paws welcomes enquiries from local dog owners looking for nail clipping or a full dog groom. Get in touch to talk through your dog's coat and grooming needs, ask about prices and discuss an appointment."
      }),
      commonCallout("Let's get those tails wagging!")
    ]
  },
  {
    name: "Services",
    slug: "services",
    seo_title: "Dog Grooming Services in Hemel Hempstead | Lily Pads & Poppy Paws",
    seo_description: "Find out about dog nail clipping and full grooms in Hemel Hempstead. All breeds welcome. Contact Lily Pads & Poppy Paws to discuss your dog's needs and prices.",
    body: [
      blok("hero", {
        eyebrow: "A little something for every dog",
        heading: "Dog grooming services in Hemel Hempstead.",
        intro: "Explore dog grooming options at Lily Pads & Poppy Paws, from nail clipping to full grooms. All breeds are welcome. Get in touch to talk about your dog's needs and ask for a price before arranging an appointment."
      }),
      blok("text_section", {
        eyebrow: "The pamper menu",
        heading: "Little touches, lovely transformations.",
        body: "Looking for dog grooming in Hemel Hempstead? Find out more about nail clipping, full grooms and how to enquire about the right option for your dog."
      }),
      blok("service_grid", {
        heading: "Our dog grooming services",
        eyebrow: "The good stuff",
        price_note: "Prices depend on the grooming required and your dog. Give us a call and we'll happily discuss your needs and provide a price before arranging an appointment.",
        button_text: "See all service information",
        button_link: "/services",
        intro: "All breeds are welcome. Prices depend on the grooming required and your dog. Give us a call and we'll happily discuss your needs and provide a price before arranging an appointment.",
        items: serviceItems.map((item) => blok("service_item", item))
      }),
      blok("grooming_picker", {
        eyebrow: "A tiny bit of help",
        heading: "What kind of pamper are you thinking?",
        highlight: "pamper",
        intro: "Choose the option that sounds closest. We'll point you in the right direction.",
        options: [
          blok("grooming_picker_option", { title: "Just a little tidy", detail: "A nail clip or small tidy-up", result: "A little maintenance can make a lovely difference. Give us a call to ask about nail clipping." }),
          blok("grooming_picker_option", { title: "The full pamper", detail: "A full groom for a fresh new look", result: "Let's talk about the full groom you're looking for and find out what's right for your dog's coat." }),
          blok("grooming_picker_option", { title: "Something else", detail: "Not quite sure what they need?", result: "No worries at all. Tell us a little about your dog and we'll chat through the options together." })
        ]
      }),
      commonCallout("Let's find the right care for your dog")
    ]
  },
  {
    name: "Gallery",
    slug: "gallery",
    seo_title: "Gallery | Lily Pads & Poppy Paws Dog Grooming",
    seo_description: "Explore the Lily Pads & Poppy Paws brand gallery and dog grooming imagery from Hemel Hempstead, Hertfordshire.",
    body: [
      blok("hero", {
        eyebrow: "The lovely faces behind the paws",
        heading: "Lily Pads & Poppy Paws gallery.",
        layout: "centered",
        intro: "Explore the illustrations and brand imagery behind Lily Pads & Poppy Paws, your local dog grooming business in Hemel Hempstead. More grooming photographs can be added here as they become available."
      }),
      blok("gallery_grid", {
        heading: "A little love for every paw",
        gallery_items: [
          blok("gallery_image", { image_url: "/images/1.jpg", alt: "Illustrated dog artwork in the Lily Pads & Poppy Paws aqua and blue brand style", caption: "A little love for every paw" }),
          blok("gallery_image", { image_url: "/images/2.jpeg", alt: "Lily Pads & Poppy Paws business logo", caption: "A friendly welcome" }),
          blok("gallery_image", { image_url: "/images/3.jpg", alt: "Decorative dog grooming brand illustration for Lily Pads & Poppy Paws", caption: "Made for happy tails" })
        ]
      }),
      commonCallout("Want to know more?")
    ]
  },
  {
    name: "FAQs",
    slug: "faqs",
    seo_title: "Dog Grooming FAQs in Hemel Hempstead | Lily Pads & Poppy Paws",
    seo_description: "Answers about dog grooming services, nail clipping, prices and appointments at Lily Pads & Poppy Paws in Hemel Hempstead.",
    body: [
      blok("hero", {
        eyebrow: "Here to help",
        heading: "Dog grooming FAQs for Hemel Hempstead.",
        layout: "centered",
        intro: "Everything you might like to know before booking a grooming appointment with Lily Pads & Poppy Paws."
      }),
      blok("faq_list", {
        heading: "Your dog grooming questions answered",
        items: [
          ["Where is Lily Pads & Poppy Paws based?", "Lily Pads & Poppy Paws is based at 42 Lomond Road, Hemel Hempstead, HP2 6PA, Hertfordshire."],
          ["What dog grooming services are available?", "You can enquire about dog nail clipping and full grooms. If you have something else in mind, call and explain what your dog needs so the options can be discussed."],
          ["Do you offer dog grooming for all breeds?", "Yes, dogs of all breeds are welcome. Get in touch to talk about your dog's individual coat and grooming requirements."],
          ["How much does dog grooming cost?", "Prices depend on the grooming required and your dog. Call 07752 027606 to discuss what you are looking for and ask for a price before arranging an appointment."],
          ["How do I book a dog grooming appointment?", "Call 07752 027606 to enquire. You can explain what your dog needs, discuss the service and ask about arranging an appointment."],
          ["Can I ask for advice before choosing a groom?", "Of course. If you are unsure whether your dog needs a nail clip, a full groom or something else, get in touch and talk through your requirements."],
          ["Is Lily Pads & Poppy Paws a qualified and insured dog groomer?", "Lily Pads & Poppy Paws is a qualified and insured dog grooming business."],
          ["Where can I find a dog groomer in Hemel Hempstead?", "Lily Pads & Poppy Paws is based at 42 Lomond Road, Hemel Hempstead, HP2 6PA. Call 07752 027606 for dog grooming enquiries."]
        ].map(([question, answer]) => blok("faq_item", { question, answer }))
      }),
      commonCallout("Still have a question?")
    ]
  },
  {
    name: "Contact",
    slug: "contact",
    seo_title: "Contact a Dog Groomer in Hemel Hempstead | Lily Pads & Poppy Paws",
    seo_description: "Contact Lily Pads & Poppy Paws about dog grooming, nail clipping, prices and appointments. Find us at 42 Lomond Road, Hemel Hempstead, HP2 6PA.",
    body: [
      blok("hero", {
        eyebrow: "Let's have a chat",
        heading: "Contact your local dog groomer in Hemel Hempstead.",
        layout: "centered",
        intro: "Have a question about dog grooming, nail clipping, prices or appointments? Contact Lily Pads & Poppy Paws and let's talk about what your dog needs."
      }),
      blok("contact_panels", {
        phone_eyebrow: "Give us a call",
        phone_heading: "Let's talk tails.",
        phone_body: "For grooming enquiries, prices and appointments, give us a ring. We can chat about your dog's needs and the best next step.",
        phone_display: "07752 027606",
        phone_link: "tel:07752027606",
        location_eyebrow: "Find our little corner",
        location_heading: "Hemel Hempstead.",
        address_line_1: "42 Lomond Road",
        address_line_2: "Hemel Hempstead",
        address_line_3: "HP2 6PA",
        address_line_4: "Hertfordshire",
        directions_text: "Get directions",
        directions_url: "https://www.google.com/maps/search/?api=1&query=42+Lomond+Road+Hemel+Hempstead+HP2+6PA",
        hours_eyebrow: "When we're open",
        hours_heading: "Opening hours.",
        monday_hours: "Closed",
        tuesday_hours: "09:00 – 17:00",
        wednesday_hours: "09:00 – 17:00",
        thursday_hours: "09:00 – 17:00",
        friday_hours: "09:00 – 17:00",
        saturday_hours: "09:00 – 15:00",
        sunday_hours: "Closed",
        map_title: "Map showing Lily Pads & Poppy Paws at 42 Lomond Road, Hemel Hempstead HP2 6PA",
        map_embed_url: "https://www.google.com/maps?q=42%20Lomond%20Road%2C%20Hemel%20Hempstead%2C%20HP2%206PA&output=embed"
      }),
      commonCallout("We'd love to hear from you")
    ]
  },
  {
    name: "Privacy Policy",
    slug: "privacy",
    seo_title: "Privacy Policy | Lily Pads & Poppy Paws",
    seo_description: "Read the privacy information for the Lily Pads & Poppy Paws website.",
    body: [
      blok("text_section", {
        eyebrow: "Website information",
        heading: "Privacy policy",
        body: "Last updated: 18 November 2026"
      }),
      ...[
        ["1. Who we are", "Lily Pads & Poppy Paws is a dog grooming business based at 42 Lomond Road, Hemel Hempstead, HP2 6PA, Hertfordshire.\n\nIf you have a question about this policy or how information is handled, you can contact us by telephone on 07752 027606."],
        ["2. Information we collect", "This website is provided for information purposes only. It does not offer visitor accounts, online booking forms, contact forms, newsletter subscriptions or online payments. We do not deliberately collect personal information through website forms or ask visitors to create an account.\n\nIf you choose to contact us by telephone or through our social media pages, we will use the information you choose to provide to respond to your enquiry and, where relevant, discuss our services. Social media platforms handle information in accordance with their own privacy policies."],
        ["3. Website hosting and technical information", "Our website is hosted by Vercel. Like most hosting providers, Vercel may automatically process limited technical information when someone visits the website. This may include IP addresses, browser and device information, pages requested, dates and times of requests, and technical or security log information.\n\nThis information may be processed to deliver the website, maintain its security and investigate technical problems. We do not use hosting logs to identify individual visitors or for direct marketing. Vercel's own privacy information explains how it handles data as a service provider."],
        ["4. Cookies, maps and tracking", "We do not currently use website analytics or advertising pixels, and we do not deliberately use this website to track visitors for advertising or marketing purposes.\n\nSome pages include an embedded Google Map to help visitors find our location. When the map loads, Google may receive technical information about your visit and may use cookies or similar technologies in accordance with Google's own privacy terms and settings. Links to external services, including Facebook and Instagram, may also take you to platforms that use their own cookies and tracking technologies.\n\nWe will update this policy if we add analytics, advertising technology, online forms or other features that change how personal information or cookies are used."],
        ["5. Third-party websites and services", "Our website contains links to external websites and social media services, including Facebook, Instagram and Google Maps. When you follow a link or use an embedded third-party service, that provider may process information about you under its own privacy policy. We do not control those services or their privacy practices."],
        ["6. How long information is kept", "We do not maintain a website visitor database or collect information through website forms. Technical information held by our hosting provider is subject to that provider's own retention and security practices.\n\nAny information you choose to provide when contacting us directly will only be kept for as long as reasonably necessary to deal with your enquiry or meet applicable legal obligations."],
        ["7. Your privacy rights", "Under UK data protection law, you may have rights in relation to personal information, including the right to request access to information held about you, ask for inaccurate information to be corrected, request its deletion where applicable, or object to or restrict certain processing.\n\nIf you have a question or want to make a privacy request, please contact us on 07752 027606.\n\nYou can also find out more or raise a concern with the Information Commissioner's Office at https://ico.org.uk/make-a-complaint/."],
        ["8. Changes to this policy", "We may update this Privacy Policy if the website or the way we handle information changes. The latest version will be published on this page."]
      ].map(([heading, body]) => blok("text_section", { heading, body }))
    ]
  }
];


function applyEditableDefaults(pageSlug, body) {
  let changed = false;
  const fill = (blok, values) => {
    for (const [key, value] of Object.entries(values)) {
      if ((blok[key] === undefined || blok[key] === null || blok[key] === "") && value !== undefined) {
        blok[key] = value;
        changed = true;
      }
    }
  };

  for (const blokItem of body) {
    if (blokItem.component === "hero") {
      const isHome = pageSlug === "home";
      fill(blokItem, {
        image_url: isHome || pageSlug === "services" ? "/images/1.jpg" : "/images/3.jpg",
        image_alt: isHome ? "A friendly illustrated dog on a bright aqua background, in the Lily Pads & Poppy Paws brand style" : "Lily Pads & Poppy Paws dog grooming illustration",
        layout: pageSlug === "gallery" || pageSlug === "faqs" ? "centered" : "illustrated",
        eyebrow_icon: pageSlug === "home" || pageSlug === "gallery" ? "paw" : pageSlug === "services" ? "sparkles" : "heart",
        paint_note: pageSlug === "services" ? "Freshen up\nyour fluff!" : pageSlug === "contact" ? "Come say\nhello!" : "A little kindness\ngoes a long way",
        phone_link: "tel:07752027606",
        phone_text: isHome ? "Call 07752 027606" : pageSlug === "about" ? "Have a chat" : pageSlug === "services" ? "Call for a quote" : "Call 07752 027606",
        button_text: isHome ? "Call 07752 027606" : pageSlug === "about" ? "Have a chat" : pageSlug === "services" ? "Call for a quote" : "Call 07752 027606",
        show_secondary_button: isHome || pageSlug === "about",
        secondary_button_text: isHome ? "Explore our services" : "Explore grooming",
        secondary_button_link: "/services",
        ...(isHome ? {
          trust_badge_one: "Qualified & insured",
          trust_badge_two: "All breeds welcome",
          sticker_top: "Pawsitively pampered!",
          sticker_bottom: "Every dog is special"
        } : {})
      });
    }

    if (blokItem.component === "service_grid") {
      fill(blokItem, {
        eyebrow: pageSlug === "services" ? "The pamper menu" : "The good stuff",
        button_text: "See all service information",
        button_link: "/services",
        show_button: pageSlug !== "services",
        show_heading: pageSlug !== "services"
      });
      if (pageSlug === "services") fill(blokItem, { price_note: "Prices depend on the grooming required and your dog. Give us a call and we'll happily discuss your needs and provide a price before arranging an appointment.", price_note_heading: "Every pup is unique." });
      for (const [index, item] of (blokItem.items || []).entries()) {
        if (item.component === "service_item") fill(item, {
          kicker: pageSlug === "home" ? "" : `A little love · 0${index + 1}`,
          link_text: pageSlug === "home" ? "Ask us about this" : "Enquire",
          link_url: "/contact",
          footer_note: pageSlug === "home" ? "" : "All breeds welcome",
          variant: pageSlug === "home" ? "simple" : "illustrated"
        });
      }
    }

    if (blokItem.component === "text_section") {
      const eyebrow = (blokItem.eyebrow || "").toLowerCase();
      const heading = (blokItem.heading || "").toLowerCase();
      if (eyebrow.includes("welcome to our little grooming")) {
        if ((blokItem.body || "").includes("\n\nGet to know Lily Pads & Poppy Paws by visiting our About page.")) {
          blokItem.body = blokItem.body.replace("\n\nGet to know Lily Pads & Poppy Paws by visiting our About page.", "");
          changed = true;
        }
        fill(blokItem, {
        link_text: "Get to know Lily Pads & Poppy Paws",
        link_url: "/about"
        });
      }
      if (eyebrow.includes("care with a personal touch")) fill(blokItem, {
        art_caption: "Little paws. Big personalities.",
        feature_one: "Qualified and insured dog groomer",
        feature_two: "Grooming options from nail clips to full grooms",
        feature_three: "Conveniently based in Hemel Hempstead",
        link_text: "Read our grooming FAQs",
        link_url: "/faqs"
      });
      if (eyebrow.includes("made for wagging tails")) fill(blokItem, {
        image_url: "/images/1.jpg",
        image_alt: "Illustrated dog in the Lily Pads & Poppy Paws aqua and blue brand artwork",
        link_text: "Come and say hello",
        link_url: "/contact"
      });
      if ((eyebrow.includes("your local dog groomer") || heading.includes("hemel hempstead")) && (blokItem.body || "").includes("42 Lomond Road")) fill(blokItem, {
        address_line_1: "Lily Pads & Poppy Paws",
        address_line_2: "42 Lomond Road",
        address_line_3: "Hemel Hempstead",
        address_line_4: "HP2 6PA",
        phone_display: "07752 027606",
        phone_link: "tel:07752027606",
        primary_button_text: "Call to enquire",
        secondary_button_text: "Get directions",
        directions_url: "https://www.google.com/maps/search/?api=1&query=42+Lomond+Road+Hemel+Hempstead+HP2+6PA",
        map_title: "Map showing Lily Pads & Poppy Paws at 42 Lomond Road, Hemel Hempstead HP2 6PA",
        map_embed_url: "https://www.google.com/maps?q=42%20Lomond%20Road%2C%20Hemel%20Hempstead%2C%20HP2%206PA&output=embed"
      });
      if (heading.includes("opening hours")) fill(blokItem, {
        monday_hours: "Closed",
        tuesday_hours: "09:00 – 17:00",
        wednesday_hours: "09:00 – 17:00",
        thursday_hours: "09:00 – 17:00",
        friday_hours: "09:00 – 17:00",
        saturday_hours: "09:00 – 15:00",
        sunday_hours: "Closed"
      });
    }

    if (blokItem.component === "grooming_picker") fill(blokItem, { button_text: "Let's chat", phone_link: "tel:07752027606", options_aria_label: "Choose a grooming option" });

    if (blokItem.component === "faq_list") fill(blokItem, {
      show_heading: false,
      intro: "Can't see the answer you're looking for? Give us a call — we're always happy to have a chat.",
      phone_text: "07752 027606",
      phone_display: "07752 027606",
      phone_link: "tel:07752027606"
    });

    if (blokItem.component === "gallery_grid") {
      fill(blokItem, {
      eyebrow: "The lovely faces behind the paws",
      social_eyebrow: "More fluffy updates",
      social_heading: "Follow along for more paw-some moments.",
      social_highlight: "more paw-some moments.",
      social_intro: "Find Lily Pads & Poppy Paws on social media for the latest updates.",
      facebook_url: "https://www.facebook.com/lilypadspoppypaws/",
      instagram_url: "https://www.instagram.com/lilypadspoppypaws/",
      facebook_text: "Facebook",
      instagram_text: "Instagram"
      });
      if (!blokItem.gallery_items?.length) {
        const oldImages = blokItem.images || [];
        const defaults = oldImages.length ? oldImages.map((image, index) => blok("gallery_image", {
          image_url: image.filename || image.url || ["/images/1.jpg", "/images/2.jpeg", "/images/3.jpg"][index],
          alt: image.alt || image.title || "Lily Pads & Poppy Paws gallery image",
          caption: image.title || ["A little love for every paw", "A friendly welcome", "Made for happy tails"][index] || "A little love for every paw"
        })) : [
          blok("gallery_image", { image_url: "/images/1.jpg", alt: "Illustrated dog artwork in the Lily Pads & Poppy Paws aqua and blue brand style", caption: "A little love for every paw" }),
          blok("gallery_image", { image_url: "/images/2.jpeg", alt: "Lily Pads & Poppy Paws business logo", caption: "A friendly welcome" }),
          blok("gallery_image", { image_url: "/images/3.jpg", alt: "Decorative dog grooming brand illustration for Lily Pads & Poppy Paws", caption: "Made for happy tails" })
        ];
        blokItem.gallery_items = defaults;
        changed = true;
      }
    }

    if (blokItem.component === "call_to_action") fill(blokItem, {
      eyebrow: "Ready for a little pampering?",
      phone_link: "tel:07752027606",
      button_text: "07752 027606",
      secondary_button_text: "Contact us",
      secondary_button_link: "/contact"
    });
  }

  return changed;
}

async function main() {
  console.log(`Preparing Storyblok space ${spaceId} (${publishStories ? "publish" : "draft"} stories).`);

  const [componentResponse, storyResponse] = await Promise.all([
    request("components/"),
    request("stories?per_page=100")
  ]);

  const existingComponents = componentResponse.components || [];
  const existingStories = storyResponse.stories || [];

  for (const definition of components) {
    const existing = existingComponents.find((item) => item.name === definition.name);
    if (existing) {
      await request(`components/${existing.id}`, {
        method: "PUT",
        body: JSON.stringify({ component: { ...definition, id: existing.id } })
      });
      console.log(`Updated component: ${definition.name}`);
    } else {
      await request("components/", {
        method: "POST",
        body: JSON.stringify({ component: definition })
      });
      console.log(`Created component: ${definition.name}`);
    }
  }

  for (const page of pages) {
    const existing = existingStories.find((story) => story.slug === page.slug && !story.is_folder);
    if (existing) {
      const fullStoryResponse = await request(`stories/${existing.id}`);
      const currentStory = fullStoryResponse.story;
      const currentBody = currentStory?.content?.body || [];
      let changed = applyEditableDefaults(page.slug, currentBody);

      if (page.slug === "services" && !currentBody.some((item) => item.component === "grooming_picker")) {
        const serviceGridIndex = currentBody.findIndex((item) => item.component === "service_grid");
        currentBody.splice(serviceGridIndex >= 0 ? serviceGridIndex + 1 : currentBody.length, 0, blok("grooming_picker", {
          eyebrow: "A tiny bit of help",
          heading: "What kind of pamper are you thinking?",
          highlight: "pamper",
          intro: "Choose the option that sounds closest. We'll point you in the right direction.",
          options: [
            blok("grooming_picker_option", { title: "Just a little tidy", detail: "A nail clip or small tidy-up", result: "A little maintenance can make a lovely difference. Give us a call to ask about nail clipping." }),
            blok("grooming_picker_option", { title: "The full pamper", detail: "A full groom for a fresh new look", result: "Let's talk about the full groom you're looking for and find out what's right for your dog's coat." }),
            blok("grooming_picker_option", { title: "Something else", detail: "Not quite sure what they need?", result: "No worries at all. Tell us a little about your dog and we'll chat through the options together." })
          ]
        }));
        changed = true;
        console.log("Added Grooming Picker block to existing services page.");
      }

      if (page.slug === "about" && !currentBody.some((item) => item.component === "about_intro")) {
        const promiseIndex = currentBody.findIndex((item) => item.component === "text_section" && (item.eyebrow || "").toLowerCase().includes("the lily pads promise"));
        const approachIndex = currentBody.findIndex((item) => item.component === "text_section" && (item.heading || "").toLowerCase().includes("friendly approach"));
        if (promiseIndex >= 0 && approachIndex >= 0) {
          const promise = currentBody[promiseIndex];
          const approach = currentBody[approachIndex];
          const combined = blok("about_intro", {
            promise_eyebrow: promise.eyebrow,
            promise_heading: promise.heading,
            promise_highlight: "Lovely results.",
            promise_body: promise.body,
            heading: approach.heading,
            highlight: "dog grooming.",
            body: approach.body,
            feature_one: "Qualified and insured",
            feature_two: "All breeds welcome",
            feature_three: "Friendly conversations about your dog's grooming needs"
          });
          const insertAt = Math.min(promiseIndex, approachIndex);
          currentBody.splice(Math.max(promiseIndex, approachIndex), 1);
          currentBody.splice(Math.min(promiseIndex, approachIndex), 1);
          currentBody.splice(insertAt, 0, combined);
          changed = true;
          console.log("Combined existing About sections into the fallback-matched About Introduction block.");
        }
      }

      if (page.slug === "contact" && !currentBody.some((item) => item.component === "contact_panels")) {
        const phoneIndex = currentBody.findIndex((item) => item.component === "text_section" && (item.eyebrow || "").toLowerCase().includes("give us a call"));
        const locationIndex = currentBody.findIndex((item) => item.component === "text_section" && (item.eyebrow || "").toLowerCase().includes("find our little corner"));
        const hoursIndex = currentBody.findIndex((item) => item.component === "text_section" && (item.heading || "").toLowerCase().includes("opening hours"));
        if (phoneIndex >= 0 && locationIndex >= 0 && hoursIndex >= 0) {
          const combined = blok("contact_panels", {
            phone_eyebrow: "Give us a call",
            phone_heading: currentBody[phoneIndex].heading || "Let's talk tails.",
            phone_body: currentBody[phoneIndex].body || "For grooming enquiries, prices and appointments, give us a ring. We can chat about your dog's needs and the best next step.",
            phone_display: "07752 027606",
            phone_link: "tel:07752027606",
            location_eyebrow: "Find our little corner",
            location_heading: "Hemel Hempstead.",
            address_line_1: "42 Lomond Road",
            address_line_2: "Hemel Hempstead",
            address_line_3: "HP2 6PA",
            address_line_4: "Hertfordshire",
            directions_text: "Get directions",
            directions_url: "https://www.google.com/maps/search/?api=1&query=42+Lomond+Road+Hemel+Hempstead+HP2+6PA",
            hours_eyebrow: "When we're open",
            hours_heading: "Opening hours.",
            monday_hours: "Closed",
            tuesday_hours: "09:00 – 17:00",
            wednesday_hours: "09:00 – 17:00",
            thursday_hours: "09:00 – 17:00",
            friday_hours: "09:00 – 17:00",
            saturday_hours: "09:00 – 15:00",
            sunday_hours: "Closed",
            map_title: "Map showing Lily Pads & Poppy Paws at 42 Lomond Road, Hemel Hempstead HP2 6PA",
            map_embed_url: "https://www.google.com/maps?q=42%20Lomond%20Road%2C%20Hemel%20Hempstead%2C%20HP2%206PA&output=embed"
          });
          const insertAt = Math.min(phoneIndex, locationIndex, hoursIndex);
          [phoneIndex, locationIndex, hoursIndex].sort((a, b) => b - a).forEach((index) => currentBody.splice(index, 1));
          currentBody.splice(insertAt, 0, combined);
          changed = true;
          console.log("Combined existing Contact sections into the fallback-matched Contact Panels block.");
        }
      }

      if (page.slug !== "home") {
        for (let i = currentBody.length - 1; i >= 0; i--) {
          const block = currentBody[i];
          if (block.component === "call_to_action") {
            currentBody[i] = blok("callout", {
              heading: block.heading || "Let's get those tails wagging!",
              body: "Call to discuss your dog's grooming needs and ask about prices.",
              button_text: block.button_text || "07752 027606",
              phone_link: "tel:07752027606"
            });
            changed = true;
          }
          if (page.slug === "faqs" && block.component === "text_section" && (block.heading || "").toLowerCase().includes("can't see the answer")) {
            currentBody.splice(i, 1);
            changed = true;
          }
          if (page.slug === "services" && block.component === "text_section" && (block.heading || "").toLowerCase().includes("not sure which groom")) {
            currentBody.splice(i, 1);
            changed = true;
          }
          if (page.slug === "gallery" && block.component === "text_section" && (block.eyebrow || "").toLowerCase().includes("more fluffy updates")) {
            currentBody.splice(i, 1);
            changed = true;
          }
        }
      }

      if (page.slug === "home") {
        if (!currentBody.some((item) => item.component === "trust_ribbon")) {
          const heroIndex = currentBody.findIndex((item) => item.component === "hero");
          currentBody.splice(heroIndex >= 0 ? heroIndex + 1 : 0, 0, blok("trust_ribbon", {
            items: [
              blok("trust_ribbon_item", { label: "A warm welcome for every breed", icon: "paw" }),
              blok("trust_ribbon_item", { label: "Qualified and insured", icon: "shield" }),
              blok("trust_ribbon_item", { label: "Hemel Hempstead, Hertfordshire", icon: "location" })
            ]
          }));
          changed = true;
          console.log("Added Trust Ribbon block to existing homepage after Hero.");
        }

        if (!currentBody.some((item) => item.component === "grooming_picker")) {
          const serviceGridIndex = currentBody.findIndex((item) => item.component === "service_grid");
          const pickerBlock = blok("grooming_picker", {
            eyebrow: "A tiny bit of help",
            heading: "What kind of pamper are you thinking?",
            highlight: "pamper",
            intro: "Choose the option that sounds closest. We'll point you in the right direction.",
            options: [
              blok("grooming_picker_option", { title: "Just a little tidy", detail: "A nail clip or small tidy-up", result: "A little maintenance can make a lovely difference. Give us a call to ask about nail clipping." }),
              blok("grooming_picker_option", { title: "The full pamper", detail: "A full groom for a fresh new look", result: "Let's talk about the full groom you're looking for and find out what's right for your dog's coat." }),
              blok("grooming_picker_option", { title: "Something else", detail: "Not quite sure what they need?", result: "No worries at all. Tell us a little about your dog and we'll chat through the options together." })
            ]
          });
          currentBody.splice(serviceGridIndex >= 0 ? serviceGridIndex + 1 : currentBody.length, 0, pickerBlock);
          changed = true;
          console.log("Added Grooming Picker block to existing homepage.");
        }
      }

      if (changed) {
        await request(`stories/${existing.id}`, {
          method: "PUT",
          body: JSON.stringify({ story: { name: currentStory.name, slug: currentStory.slug, content: { ...currentStory.content, body: currentBody } } })
        });
        console.log(`Updated editable content fields for /${page.slug} without replacing existing copy.`);
      } else {
        console.log(`No content migration needed for /${page.slug}.`);
      }

      if (publishStories) {
        await request(`stories/${existing.id}/publish`);
        console.log(`Published / ${page.slug}`);
      }
      continue;
    }

    applyEditableDefaults(page.slug, page.body);
    await request("stories", {
      method: "POST",
      body: JSON.stringify({
        publish: publishStories,
        story: {
          name: page.name,
          slug: page.slug,
          content: {
            component: "page",
            body: page.body,
            seo_title: page.seo_title,
            seo_description: page.seo_description
          }
        }
      })
    });
    console.log(`Created ${publishStories ? "published" : "draft"} page: /${page.slug}`);
  }

  const settingsStory = existingStories.find((story) => story.slug === "site-settings" && !story.is_folder);
  if (!settingsStory) {
    await request("stories", {
      method: "POST",
      body: JSON.stringify({
        publish: publishStories,
        story: {
          name: "Site Settings",
          slug: "site-settings",
          content: {
            component: "site_settings",
            logo_url: "/images/2.jpeg",
            logo_alt: "Lily Pads & Poppy Paws logo",
            brand_name: "Lily Pads & Poppy Paws",
            header_call_text: "Call us",
            phone_display: "07752 027606",
            phone_link: "tel:07752027606",
            navigation: [
              blok("site_nav_link", { label: "Home", href: "/" }),
              blok("site_nav_link", { label: "About", href: "/about" }),
              blok("site_nav_link", { label: "Services", href: "/services" }),
              blok("site_nav_link", { label: "Gallery", href: "/gallery" }),
              blok("site_nav_link", { label: "FAQs", href: "/faqs" }),
              blok("site_nav_link", { label: "Contact", href: "/contact" })
            ],
            footer_description: "Qualified and insured dog grooming in Hemel Hempstead, Hertfordshire. Enquire about nail clipping and full grooms for all breeds.",
            footer_find_us_heading: "Find us",
            address_line_1: "42 Lomond Road",
            address_line_2: "Hemel Hempstead",
            address_line_3: "HP2 6PA",
            footer_social_heading: "Follow & explore",
            facebook_url: "https://www.facebook.com/lilypadspoppypaws/",
            instagram_url: "https://www.instagram.com/lilypadspoppypaws/",
            footer_links: [
              blok("site_footer_link", { label: "Grooming services", href: "/services" }),
              blok("site_footer_link", { label: "Frequently asked questions", href: "/faqs" }),
              blok("site_footer_link", { label: "Contact & location", href: "/contact" }),
              blok("site_footer_link", { label: "Privacy policy", href: "/privacy" })
            ],
            copyright_text: "© {year} Lily Pads & Poppy Paws",
            footer_tagline: "Dog grooming in Hemel Hempstead, Hertfordshire"
          }
        }
      })
    });
    console.log("Created Site Settings story.");
  } else if (publishStories) {
    await request(`stories/${settingsStory.id}/publish`);
    console.log("Published Site Settings story.");
  } else {
    console.log("Kept existing Site Settings story unchanged.");
  }

  console.log("\nStoryblok setup finished.");
  console.log("Existing stories were not overwritten. Review the stories in Storyblok before changing the live public token.");
}

main().catch((error) => {
  console.error("\nStoryblok setup failed:");
  console.error(error.message);
  process.exit(1);
});
