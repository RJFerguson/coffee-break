import { HeroHeader, ContentSection } from "@/types/contents";

/* ====================
[> CUSTOMIZING CONTENT <]
-- Setup image by typing `/image-name.file` (Example: `/header-image.jpg`)
-- Add images by adding files to /public folder
-- Leave blank `` if you don't want to put texts or images
 ==================== */

export const heroHeader: HeroHeader = {
  header: `Coffee runs made easy`,
  subheader: `Easy to setup. Quick. Flexible.`,
  image: `/coffee.png`,
};

export const featureCards: ContentSection = {
  content: [
    {
      id: 1,
      text: `Create Room`,
      subtext: `Quick create a new room`,
    },
    {
      id: 2,
      text: `Join a Room`,
      subtext: `Join an existing room with Code`,
    },
  ],
};
