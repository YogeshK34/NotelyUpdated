import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { NavbarContent, NavbarItem, Navbar as NextUINavbar } from "@nextui-org/navbar";
import { TwitterIcon, DiscordIcon, GithubIcon } from "@/components/icons";
import { ThemeSwitch } from "@/components/theme-switch";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title({ color: "yellow" })}>Notely&nbsp;</span>
        <br />
        <span className={title()}>
          websites regardless of your design experience.
        </span>
        <div className={subtitle({ class: "mt-4" })}>
          Beautiful, fast and modern React UI library.
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href={"/register"}
        >
          Get Started
        </Link>
      </div>

      <div className="mt-40">
        <NextUINavbar>
          <NavbarContent>
            <NavbarItem className="hidden sm:flex gap-12">
              <Link isExternal aria-label="Twitter" href={siteConfig.links.twitter}>
                <TwitterIcon className="text-default-500" />
              </Link>
              <Link isExternal aria-label="Discord" href={siteConfig.links.discord}>
                <DiscordIcon className="text-default-500" />
              </Link>
              <Link isExternal aria-label="Github" href={siteConfig.links.github}>
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
