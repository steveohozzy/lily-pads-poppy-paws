"use client";

import { useRef } from "react";
import { Star, PawPrint, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    name: "Bev Heys",
    date: "A month ago",
    text: "First time my dog had been to a groomers. The lady was really friendly and put me at ease. My dog come out beautiful and so soft and smelt wonderful thank you",
    services: "Dog ear cleaning, Dog bathing and blow dry",
    profile: "https://www.google.com/maps/contrib/110118572824136253474/reviews?hl=en-GB"
  },
  {
    name: "Anthony Rich",
    date: "Edited 4 months ago",
    text: "As usual,what can I say? WOW! Friendly, punctual, lovely cut.Happy dog, happy man, thank you.",
    profile: "https://www.google.com/maps/contrib/114778148188651020599/reviews?hl=en-GB"
  },
  {
    name: "Gary Brown",
    date: "A year ago",
    text: "Very friendly and they done an excellent job with my dogs first puppy pamper, all at a very reasonable prices. Booking is essential. A little awkward to find but most definitely worth it. Very friendly staff with a very warm welcome for the dog and myself."
  },
  {
    name: "Matthew Poynter",
    date: "A year ago",
    text: "Fabulous girls here and Petal loves to come and see them.",
    profile: "https://www.google.com/maps/contrib/107968247999793642523/reviews?hl=en-GB"
  },
  {
    name: "Jozsef Rantle",
    date: "Edited a year ago",
    text: "Best dog groomers not just in hemel, but the whole UK! 10/10, 5 STAR you name it! Cannot give enough praise! You will not regret taking your dog here and the service is amazing",
    profile: "https://www.google.com/maps/contrib/101025186461020121991/reviews?hl=en-GB"
  },
  {
    name: "Claire Evetts",
    date: "2 years ago",
    text: "They groomed my very hairy (Long haired German Shephard). She looked gorgeous afterwards and smelt lovely. Very friendly staff, will be returning. 5 gold 🌟",
    profile: "https://www.google.com/maps/contrib/107371294291689395545/reviews?hl=en-GB"
  }
];

const googleReviewsUrl =
  "https://www.google.com/maps/search/?api=1&query=Lily+Pads+%26+Poppy+Paws%2C+42+Lomond+Road%2C+Hemel+Hempstead+HP2+6PA";

function Stars() {
  return (
    <span className="google-review-stars" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }, (_, index) => (
        <Star key={index} size={17} fill="currentColor" strokeWidth={1.5} />
      ))}
    </span>
  );
}

export default function GoogleReviews() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollReviews = (direction: "previous" | "next") => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const distance = carousel.clientWidth * 0.85;
    carousel.scrollBy({
      left: direction === "next" ? distance : -distance,
      behavior: "smooth"
    });
  };

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
            Here are six lovely words taken directly from our customers’ Google reviews.
          </p>
          <div className="google-reviews-rating" aria-label="Five-star Google reviews">
            <span className="google-reviews-stars" aria-hidden="true">
              {Array.from({ length: 5 }, (_, index) => <Star key={index} size={21} fill="currentColor" strokeWidth={1.5} />)}
            </span>
            <span>Kind words from our Google customers</span>
          </div>
        </div>

        <div className="google-reviews-carousel-wrap">
          <button
            className="google-reviews-arrow"
            type="button"
            aria-label="Scroll to previous reviews"
            onClick={() => scrollReviews("previous")}
          >
            <ChevronLeft size={22} />
          </button>

          <div className="google-reviews-carousel" ref={carouselRef} aria-label="Customer Google reviews">
            {reviews.map((review) => (
              <article className="google-review-card" key={review.name}>
                <Stars />
                <p className="google-review-date">{review.date}</p>
                <p className="google-review-text">“{review.text}”</p>
                {review.services && <p className="google-review-services"><strong>Services:</strong> {review.services}</p>}
                <a
                  className="google-review-author"
                  href={review.profile || googleReviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {review.name} <ArrowUpRight size={14} />
                </a>
                <span className="google-review-source">Google review</span>
              </article>
            ))}
          </div>

          <button
            className="google-reviews-arrow"
            type="button"
            aria-label="Scroll to next reviews"
            onClick={() => scrollReviews("next")}
          >
            <ChevronRight size={22} />
          </button>
        </div>

        <div className="google-reviews-actions">
          <a className="button-primary" href={googleReviewsUrl} target="_blank" rel="noopener noreferrer">
            Read our reviews on Google <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}
