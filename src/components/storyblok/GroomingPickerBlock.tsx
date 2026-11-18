import { storyblokEditable } from "@storyblok/react/rsc";
import { GroomingPicker } from "@/components/FallbackInteractions";

type Props = {
  blok: {
    _uid: string;
    _editable?: string;
    eyebrow?: string;
    heading?: string;
    highlight?: string;
    highlight_after_words?: number;
    intro?: string;
    button_text?: string;
    phone_link?: string;
    options_aria_label?: string;
    options?: Array<{
      _uid: string;
      title?: string;
      detail?: string;
      result?: string;
    }>;
  };
};

export default function GroomingPickerBlock({ blok }: Props) {
  return (
    <section className="section-pad picker-section" {...storyblokEditable(blok as never)}>
      <div className="container-shell">
        <GroomingPicker
          eyebrow={blok.eyebrow || "A tiny bit of help"}
          heading={blok.heading || "What kind of pamper are you thinking?"}
          highlight={blok.highlight || "pamper"}
          highlight_after_words={blok.highlight_after_words ?? 3}
          intro={blok.intro || "Choose the option that sounds closest. We'll point you in the right direction."}
          button_text={blok.button_text || "Let's chat"}
          phone_link={blok.phone_link || "tel:07752027606"}
          options_aria_label={blok.options_aria_label || "Choose a grooming option"}
          options={blok.options?.map((option) => ({
            id: option._uid,
            title: option.title || "Grooming option",
            detail: option.detail || "",
            result: option.result || ""
          }))}
        />
      </div>
    </section>
  );
}
