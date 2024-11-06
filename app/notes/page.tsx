"use client";
import { useState } from "react";
import {
  NavbarContent,
  NavbarItem,
  Navbar as NextUINavbar,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";

import { siteConfig } from "@/config/site";
import { TwitterIcon, DiscordIcon, GithubIcon } from "@/components/icons";
import { ThemeSwitch } from "@/components/theme-switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TextIcon from "@/components/texticonComponents";
import TitleIcon from "@/components/titleiconComponent";
import { subtitle } from "@/components/primitives";
import LogoutButton from "@/components/logoutButton";

// Define the shape of the submitted note
interface SubmittedNote {
  title: string;
  note: string;
}

export default function Notes() {
  const [inputTitle, setInputTitle] = useState<string>("");
  const [note, setNotes] = useState<string>("");
  const [submittedNote, setSubmittedNote] = useState<SubmittedNote | null>(
    null
  );

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(e.target.value);
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotes(e.target.value);
  };

  const handleSubmit = () => {
    setSubmittedNote({ title: inputTitle, note });
    setInputTitle("");
    setNotes("");
  };

  return (
    <section className="flex flex-col items-center justify-center gap-8 px-4">
      <div className="w-full max-w-lg">
        <div className={subtitle()}>
          Capture your thoughts, one note at a time with Notely
        </div>

        <div className="flex flex-col space-y-4">
          <div className="flex items-center gap-3">
            <TitleIcon style={{ width: "24px", height: "24px" }} />
            <Input
              placeholder="Add Title"
              type="text"
              value={inputTitle}
              onChange={handleTitleChange}
            />
          </div>
          <div className="flex items-center gap-3">
            <TextIcon style={{ width: "24px", height: "24px" }} />
            <Input
              placeholder="Add Note"
              type="text"
              value={note}
              onChange={handleNoteChange}
            />
          </div>
          <div className="flex justify-center">
            <Button type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </div>
      {submittedNote && (
        <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md">
          <div className="font-bold text-lg mb-1 text-gray-900 dark:text-gray-100">
            {submittedNote.title}
          </div>
          <div className="text-gray-700 dark:text-gray-300">
            {submittedNote.note}
          </div>
        </div>
      )}

      <br />
      <div className="mt-28">
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
        <br />
        <LogoutButton />
      </div>
    </section>
  );
}
