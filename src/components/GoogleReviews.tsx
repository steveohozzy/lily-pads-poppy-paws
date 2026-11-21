import { Star, PawPrint, ArrowUpRight } from "lucide-react";

const reviews = [
  {
    name: "Kyli Hartley",
    text: "Puppy smells and looks amazing. She had a wonderful time."
  },
  {
    name: "Joe S H",
    text: "We have a very nervous long haired dachshund who had some matting that needed removing and general grooming and Lily Pads and Poppy Paws was suggested by a friend, and I’m glad I did! It was so very easy from start to finish…" 
  },
  {
    name: "Beverley Fennell",
    text: "Our dog loved it. A big smile from him during his bath proved he enjoyed it. He was so chilled that he actually fell asleep at one point. It was great to see all the photos the groomer took during his pamper session. Highly recommended!"
  }
];

const googleReviewsUrl =
  "https://www.google.com/maps/search/?api=1&query=Lily+Pads+%26+Poppy+Paws%2C+42+Lomond+Road%2C+Hemel+Hempstead+HP2+6PA";

export default function GoogleReviews() {
  return (
    <section className="section-pad google-reviews-section" aria-labelledby="google-reviews-heading">
      <div className="container-shell">
        <div className="google-reviews-heading">
          <p className="eyebrow"><PawPrint size={16} /> A little love from our customers</p>
          <h2 id="google-reviews-heading" className="section-heading mt-4">
            Happy dogs, <span>happy humans.</span>
          </h2>
          <p className="google-reviews-intro">
            We’re so grateful to everyone who takes the time to share their experience.
            Here are a few words taken directly from our customers’ Google reviews.
          </p>
          <div className="google-reviews-rating" aria-label="Five star Google rating">
            <span className="google-reviews-stars" aria-hidden="true">
              {Array.from({ length: 5 }, (_, index) => <Star key={index} size={21} fill="currentColor" strokeWidth={1.5} />)}
            </span>
            <span>5.0 out of 5 on Google · 54 reviews</span>
          </div>
        </div>

        <div className="google-reviews-grid">
          {reviews.map((review) => (
            <article className="google-review-card" key={review.name}>
              <div className="google-review-stars" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }, (_, index) => <Star key={index} size={17} fill="currentColor" strokeWidth={1.5} />)}
              </div>
              <p>{review.text}</p>
              <span className="google-review-author">{review.name} · Google review</span>
            </article>
          ))}
        </div>

        <div className="google-reviews-actions">
          <a className="button-primary" href={googleReviewsUrl} target="_blank" rel="noopener noreferrer">
            Find us on Google <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}
