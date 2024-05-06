import { SiteConfig, ContactConfig } from "@/types";

/* ====================
[> WEBSITE CONFIG <]
-- Fill the details about your website
 ==================== */

const baseUrl = "https://nextlanding.rdev.pro";

export const siteConfig: SiteConfig = {
  name: "Coffee Break",
  author: "RJF",
  description: "Coffe Break splitting made easy",
  keywords: ["Next.js"],
  url: {
    base: baseUrl,
    author: "https://rferg.io",
  },
  ogImage: `${baseUrl}/og.jpg`,
};

export const contactConfig: ContactConfig = {
  email: "fergusman@gmail.com",
};
