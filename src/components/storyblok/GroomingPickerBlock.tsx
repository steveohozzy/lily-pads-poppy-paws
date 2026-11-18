import { storyblokEditable } from "@storyblok/react/rsc";
import { GroomingPicker } from "@/components/FallbackInteractions";

type Props = {
  blok: {
    _uid: string;
    _editable?: string;
    eyebrow?: string;
    heading?: string;
    highlight?: string;
    intro?: string;
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
          intro={blok.intro || "Choose the option that sounds closest. We'll point you in the right direction."}
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
