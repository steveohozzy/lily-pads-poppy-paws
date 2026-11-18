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
      body: bloks(["hero", "text_section", "service_grid", "grooming_picker", "faq_list", "gallery_grid", "call_to_action"]),
      seo_title: text(),
      seo_description: textarea()
    }
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
      button_text: text(),
      button_link: field("multilink")
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
      body: textarea()
    }
  },
  {
    name: "service_grid",
    display_name: "Service grid",
    is_root: false,
    is_nestable: true,
    schema: {
      heading: text(),
      highlight: text(),
      intro: textarea(),
      show_prices: field("boolean", { default_value: false }),
      items: bloks(["service_item"])
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
      intro: textarea(),
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
      heading: text(),
      images: field("multiasset")
    }
  },
  {
    name: "call_to_action",
    display_name: "Call to action",
    is_root: false,
    is_nestable: true,
    schema: {
      heading: text(),
      highlight: text(),
      body: textarea(),
      button_text: text()
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
        intro: "Happy dogs, lovely fresh coats and a whole lot of fuss. Lily Pads & Poppy Paws is a qualified and insured dog groomer offering everything from nail clips to full grooms for all breeds."
      }),
      blok("text_section", {
        eyebrow: "Welcome to our little grooming corner",
        heading: "Good hair days are for every dog.",
        body: "At Lily Pads & Poppy Paws, we believe every dog deserves to feel comfortable, cared for and looking their very best. Based in Hemel Hempstead, we welcome all breeds and offer grooming from a simple nail clip to a full groom.\n\nNot sure what your dog needs? Give us a call. We can chat about the grooming you have in mind and provide a price before you arrange an appointment.\n\nGet to know Lily Pads & Poppy Paws by visiting our About page."
      }),
      blok("service_grid", {
        heading: "A little trim, or the full glow-up?",
        intro: "Explore our dog grooming services in Hemel Hempstead. Every dog is different, so get in touch to discuss what your four-legged friend needs.",
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
        intro: "Lily Pads & Poppy Paws is a qualified and insured dog grooming business in Hemel Hempstead, Hertfordshire. All breeds are welcome, with grooming options ranging from nail clipping to full grooms. The aim is simple: to make every dog feel comfortable, cared for and looking their best."
      }),
      blok("text_section", {
        eyebrow: "The Lily Pads promise",
        heading: "Gentle care. Lovely results.",
        body: "Every dog has their own personality, coat and comfort level. We believe grooming should feel like a positive part of their care."
      }),
      blok("text_section", {
        heading: "A friendly approach to dog grooming.",
        body: "Every dog is different. Their breed, coat, age, personality and individual needs all help shape the kind of grooming that may be right for them. That's why Lily Pads & Poppy Paws encourages owners to get in touch and talk through what they are looking for before arranging an appointment.\n\nWhether you need a nail clip or want to enquire about a full dog groom, you can discuss your dog's needs and ask for a price before booking. The business is based in Hemel Hempstead, Hertfordshire, and welcomes enquiries for dogs of all breeds.\n\nLily Pads & Poppy Paws is qualified and insured, giving local dog owners a clear point of contact for grooming enquiries in Hemel Hempstead.\n\nQualified and insured · All breeds welcome · Friendly conversations about your dog's grooming needs."
      }),
      blok("text_section", {
        eyebrow: "Made for wagging tails",
        heading: "A local dog groomer for Hemel Hempstead.",
        body: "Based in Hemel Hempstead, Lily Pads & Poppy Paws welcomes enquiries from local dog owners looking for nail clipping or a full dog groom. Get in touch to talk through your dog's coat and grooming needs, ask about prices and discuss an appointment."
      }),
      commonCta("Come and say hello")
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
        intro: "All breeds are welcome. Prices depend on the grooming required and your dog. Give us a call and we'll happily discuss your needs and provide a price before arranging an appointment.",
        items: serviceItems.map((item) => blok("service_item", item))
      }),
      blok("text_section", {
        heading: "Not sure which groom is right?",
        body: "Every pup is unique. If you're unsure whether your dog needs a nail clip, a full groom or something else, get in touch and talk through your requirements. You can ask for a price before arranging an appointment."
      }),
      commonCta("Let's find the right care for your dog")
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
        intro: "Explore the illustrations and brand imagery behind Lily Pads & Poppy Paws, your local dog grooming business in Hemel Hempstead. More grooming photographs can be added here as they become available."
      }),
      blok("gallery_grid", {
        heading: "A little love for every paw",
        images: [
          { filename: "/images/1.jpg", alt: "Illustrated dog artwork in the Lily Pads & Poppy Paws aqua and blue brand style" },
          { filename: "/images/2.jpeg", alt: "Lily Pads & Poppy Paws business logo" },
          { filename: "/images/3.jpg", alt: "Decorative dog grooming brand illustration for Lily Pads & Poppy Paws" }
        ]
      }),
      blok("text_section", {
        eyebrow: "More fluffy updates",
        heading: "Follow along for more paw-some moments.",
        body: "Find Lily Pads & Poppy Paws on social media for the latest updates.\n\nFacebook: https://www.facebook.com/lilypadspoppypaws/\nInstagram: https://www.instagram.com/lilypadspoppypaws/"
      }),
      commonCta("Want to know more?")
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
        intro: "Everything you might like to know before booking a grooming appointment with Lily Pads & Poppy Paws."
      }),
      blok("text_section", {
        heading: "Can't see the answer you're looking for?",
        body: "Give us a call — we're always happy to have a chat. Telephone 07752 027606."
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
      commonCta("Still have a question?")
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
        intro: "Have a question about dog grooming, nail clipping, prices or appointments? Contact Lily Pads & Poppy Paws and let's talk about what your dog needs."
      }),
      blok("text_section", {
        eyebrow: "Give us a call",
        heading: "Let's talk tails.",
        body: "For grooming enquiries, prices and appointments, give us a ring. We can chat about your dog's needs and the best next step.\n\nTelephone: 07752 027606"
      }),
      blok("text_section", {
        eyebrow: "Find our little corner",
        heading: "Hemel Hempstead.",
        body: "Lily Pads & Poppy Paws\n42 Lomond Road\nHemel Hempstead\nHP2 6PA\nHertfordshire\n\nGet directions: https://www.google.com/maps/search/?api=1&query=42+Lomond+Road+Hemel+Hempstead+HP2+6PA"
      }),
      blok("text_section", {
        eyebrow: "When we're open",
        heading: "Opening hours.",
        body: "Monday: Closed\nTuesday: 09:00 – 17:00\nWednesday: 09:00 – 17:00\nThursday: 09:00 – 17:00\nFriday: 09:00 – 17:00\nSaturday: 09:00 – 15:00\nSunday: Closed"
      }),
      commonCta("We'd love to hear from you")
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
      if (page.slug === "home") {
        const fullStoryResponse = await request(`stories/${existing.id}`);
        const currentStory = fullStoryResponse.story;
        const currentBody = currentStory?.content?.body || [];
        const hasPicker = currentBody.some((item) => item.component === "grooming_picker");

        if (!hasPicker) {
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
          const insertAt = serviceGridIndex >= 0 ? serviceGridIndex + 1 : currentBody.length;
          currentBody.splice(insertAt, 0, pickerBlock);
          await request(`stories/${existing.id}`, {
            method: "PUT",
            body: JSON.stringify({ story: { ...currentStory, content: { ...currentStory.content, body: currentBody } } })
          });
          console.log("Added Grooming Picker block to existing homepage after Service Grid.");
        } else {
          console.log("Homepage already contains a Grooming Picker block.");
        }
      }

      if (publishStories && !existing.published_at) {
        await request(`stories/${existing.id}/publish`);
        console.log(`Published existing draft: /${page.slug}`);
      } else {
        console.log(`Kept existing story: /${page.slug} (existing content preserved)`);
      }
      continue;
    }

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

  console.log("\nStoryblok setup finished.");
  console.log("Existing stories were not overwritten. Review the stories in Storyblok before changing the live public token.");
}

main().catch((error) => {
  console.error("\nStoryblok setup failed:");
  console.error(error.message);
  process.exit(1);
});
