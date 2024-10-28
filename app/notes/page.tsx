"use client";
import {
    NavbarContent,
    NavbarItem,
    Navbar as NextUINavbar,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { siteConfig } from "@/config/site";
import { TwitterIcon, DiscordIcon, GithubIcon } from "@/components/icons";
import { ThemeSwitch } from "@/components/theme-switch";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TextIcon from "@/components/texticonComponents";
import TitleIcon from "@/components/titleiconComponent";
import { subtitle } from "@/components/primitives";

// Define the shape of the submitted note
interface SubmittedNote {
    title: string;
    note: string;
}

export default function Notes() {
    const [inputTitle, setInputTitle] = useState<string>("");
    const [note, setNotes] = useState<string>("");
    const [submittedNote, setSubmittedNote] = useState<SubmittedNote | null>(
        null,
    );

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputTitle(e.target.value);
    };

    const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNotes(e.target.value);
    };

    const handleSubmit = () => {
        setSubmittedNote({ title: inputTitle, note }); // Use inputTitle instead of title
        setInputTitle("");
        setNotes("");
    };

    return (
        <section className="flex flex-col items-center justify-center gap-4">
            <div>
                <div className={subtitle()}>
                    Capture your thoughts, one note at a time with Notely
                </div>
                <br></br>
                <br></br>
                <div className="flex w-full items-center space-x-2">
                    <div className="flex items-center gap-4">
                        <TitleIcon style={{ width: "24px", height: "24px" }} />
                        <Input
                            type="text"
                            placeholder="Add Title"
                            value={inputTitle}
                            onChange={handleTitleChange}
                        />
                        <br></br>
                    </div>
                    <br></br>

                    <div className="flex items-center gap-4">
                        <TextIcon style={{ width: "24px", height: "24px" }} />
                        <Input
                            type="text"
                            placeholder="Add Note"
                            value={note}
                            onChange={handleNoteChange}
                        />
                    </div>

                    <div className="flex items-center">
                        <Button onClick={handleSubmit} type="submit">
                            Submit
                        </Button>
                    </div>
                </div>

                {submittedNote && (
                    <div className=" flex flex-col items-start">
                        <div className={subtitle({ class: "mb-2" })}>
                            {/* <BulletPoint /> */}
                            {submittedNote.title}
                        </div>
                        <div className={subtitle({ class: "mt-1" })}>
                            {submittedNote.note}
                        </div>
                    </div>
                )}
            </div>
            <br></br>
            <div className="mt-52">
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
