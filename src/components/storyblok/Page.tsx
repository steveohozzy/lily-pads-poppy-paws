import { StoryblokServerComponent } from "@storyblok/react/rsc";

type Props = { blok: { body?: Array<{ _uid: string; component: string }> } };

export default function Page({ blok }: Props) {
  return (
    <>
      {blok.body?.map((nestedBlok) => (
        <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </>
  );
}
