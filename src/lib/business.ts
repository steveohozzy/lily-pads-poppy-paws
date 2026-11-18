export const business = {
  name: "Lily Pads & Poppy Paws",
  shortName: "Lily Pads & Poppy Paws",
  description:
    "Qualified and insured dog groomer in Hemel Hempstead. Everything available from nail clips to full grooms for all breeds.",
  telephone: "07752027606",
  telephoneDisplay: "07752 027606",
  address: {
    streetAddress: "42 Lomond Road",
    addressLocality: "Hemel Hempstead",
    postalCode: "HP2 6PA",
    addressRegion: "Hertfordshire",
    addressCountry: "GB"
  },
  instagram: "https://www.instagram.com/lilypadspoppypaws/",
  facebook: "https://www.facebook.com/lilypadspoppypaws/",
  domain: "https://lilypadspoppypaws.co.uk",
  // Confirm opening hours directly with the business before publishing.
  openingHours: [] as string[]
};

export const services = [
  {
    title: "Nail clipping",
    description: "Need a nail trim? Get in touch to enquire about nail clipping appointments.",
    icon: "scissors"
  },
  {
    title: "Full grooms",
    description: "Enquire about a full groom for your dog. All breeds are welcome.",
    icon: "sparkles"
  },
  {
    title: "Dog grooming enquiries",
    description: "If you need something else for your dog, contact us and tell us what you are looking for.",
    icon: "heart"
  }
];
