import { IconKeys } from "@/components/icons";

export type HeroHeader = {
  header: string;
  subheader: string;
  image: string;
};

export type Content = {
  id: number;
  text: string;
  subtext: string;
  icon?: IconKeys;
};

export type ContentSection = {
  content: Array<Content>;
};
