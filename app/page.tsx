import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import {
  NavbarContent,
  NavbarItem,
  Navbar as NextUINavbar,
} from "@nextui-org/navbar";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { TwitterIcon, DiscordIcon, GithubIcon } from "@/components/icons";
import { ThemeSwitch } from "@/components/theme-switch";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title({ color: "yellow" })}>Notely&nbsp;</span>
        <br />
        <br />
        <span className={title()}>
          Capture Thoughts, Create Ideas, Conquer Tasks
        </span>
        <div className={subtitle({ class: "mt-4" })}>
          Never let a great idea slip away. With Notely, you can capture your
          thoughts, organize your tasks, and bring your ideas to life—all in one
          place. Stay inspired, stay productive.
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href={"/signin"}
        >
          Get Started
        </Link>
      </div>

      <div className="mt-36">
        <NextUINavbar>
          <NavbarContent>
            <NavbarItem className="hidden sm:flex gap-12">
              <Link
                isExternal
                aria-label="Twitter"
                href={siteConfig.links.twitter}
              >
                <TwitterIcon className="text-default-500" />
              </Link>
              <Link
                isExternal
                aria-label="Discord"
                href={siteConfig.links.discord}
              >
                <DiscordIcon className="text-default-500" />
              </Link>
              <Link
                isExternal
                aria-label="Github"
                href={siteConfig.links.github}
              >
                <GithubIcon className="text-default-500" />
              </Link>
              <ThemeSwitch />
            </NavbarItem>
          </NavbarContent>
        </NextUINavbar>
      </div>
    </section>
  );
}
