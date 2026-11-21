import { Star, PawPrint, ArrowUpRight } from "lucide-react";

const reviews = [
  {
    name: "Kyli H.",
    text: "Her puppy came home smelling and looking amazing, and had a wonderful time."
  },
  {
    name: "Joe S H",
    text: "A really easy experience from start to finish, especially with a nervous dachshund."
  },
  {
    name: "Beverley Fennell",
    text: "Their dog was so relaxed and happy during the pamper that he even nodded off."
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
            Here are just a few of the lovely things customers have said.
          </p>
          <div className="google-reviews-rating" aria-label="Five star customer feedback">
            <span className="google-reviews-stars" aria-hidden="true">
              {Array.from({ length: 5 }, (_, index) => <Star key={index} size={21} fill="currentColor" strokeWidth={1.5} />)}
            </span>
            <span>5-star customer feedback</span>
          </div>
        </div>

        <div className="google-reviews-grid">
          {reviews.map((review) => (
            <article className="google-review-card" key={review.name}>
              <div className="google-review-stars" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }, (_, index) => <Star key={index} size={17} fill="currentColor" strokeWidth={1.5} />)}
              </div>
              <p>{review.text}</p>
              <span className="google-review-author">{review.name}</span>
            </article>
          ))}
        </div>

        <div className="google-reviews-actions">
          <a className="button-primary" href={googleReviewsUrl} target="_blank" rel="noopener noreferrer">
            Read our Google reviews <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}
