import Link from "next/link";
import { Phone } from "lucide-react";

export default function Callout() {
  return (
    <section className="container-shell py-12">
      <div className="cta-strip">
        <div>
          <p className="font-display text-3xl font-bold text-navy">Let's get those tails wagging!</p>
          <p className="mt-2 text-slate-600">Call to discuss your dog's grooming needs and ask about prices.</p>
        </div>
        <a href="tel:07752027606" className="button-primary shrink-0"><Phone size={18} /> 07752 027606</a>
      </div>
    </section>
  );
}
