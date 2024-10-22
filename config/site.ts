export type SiteConfig = typeof siteConfig;
import { signOut } from "next-auth/react";

export const siteConfig = {
  name: "NOTELY",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Docs",
      href: "/docs",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/about",
    },
    {
      label: "Dashboard",
      href: "/pricing",
    },
    {
      label: "Projects",
      href: "/docs",
    },
    {
      label: "Team",
      href: "/blog",
    },
    {
      label: "Calendar",
      href: "/blog",
    },
    {
      label: "Settings",
      href: "/pricing",
    },
    {
      label: "Help & Feedback",
      href: "/home",
    },
    {
      label: "Logout",
      onClick: () => signOut({callbackUrl: "/"}),
    },
  ],
  links: {
    github: "https://github.com/YogeshK34",
    twitter: "https://twitter.com/yogeshkhutwad34/",
    discord: "https://discord.com/invite/WVdAWfP6",
  },
};
