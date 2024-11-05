"use client";
import { title, subtitle } from "@/components/primitives";
import ProfileComponent from "@/components/profile";

export default function AboutPage() {
  return (
    <div>
      <h1 className={title()}>About Us</h1>
      <div className={subtitle({ class: "mt-4" })}>
        This note-making app, built with NextUI, provides a streamlined and
        user-friendly platform to create, store, and organize notes efficiently.
        NextUI is a modern React UI library known for its ease of use, high
        customization, and accessible, responsive components that enhance the
        app&apos;s UI. NextAuth powers secure, seamless authentication, allowing
        users to log in and manage their notes privately. The design uses shadCN
        for CSS components, giving the app a clean, visually appealing look.
        Whether you need to jot down ideas, to-do lists, or personal notes, this
        app provides a secure and structured way to keep your thoughts organized
        and accessible anytime.
      </div>
      <br />
      <div className={subtitle({ class: "mt-4" })}>
        This app&apos;s intuitive interface allows users to focus on writing
        without distractions, with features that make it simple to edit, format,
        and retrieve notes. With NextUI and shadCN styling, the experience is
        both elegant and functional, ensuring a visually consistent and
        enjoyable interaction. The integration with NextAuth means your notes
        are securely stored, accessible only to you upon login, ensuring privacy
        and data safety. Designed for quick access and ease of use, this app is
        perfect for storing anything from fleeting thoughts to detailed
        information you need at hand.
      </div>
      <br />
      <br />
      <div className={subtitle({ class: "mt-4" })}>Follow Me</div>
      <div className="flex justify-center">
        <ProfileComponent />
      </div>
    </div>
  );
}
