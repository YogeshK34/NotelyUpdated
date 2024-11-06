"use client";
import { title, subtitle } from "@/components/primitives";
import ProfileComponent from "@/components/profile";

export default function AboutPage() {
  return (
    <div>
      <h1 className={title()}>About Us</h1>
      <div className={subtitle({ class: "mt-2" })}>
        Built with NextUI, provides a streamlined and user-friendly platform to
        create, store, and organize notes efficiently. NextUI is a modern React
        UI library known for its ease of use, high customization, and
        accessible, responsive components that enhance the app&apos;s UI.
        NextAuth powers secure, seamless authentication, allowing users to log
        in and manage their notes privately.
      </div>
      <br />
      <div className={subtitle({ class: "mt-2" })}>
        The design uses shadCN for CSS components, giving the app a clean,
        visually appealing look. Whether you need to jot down ideas, to-do
        lists, or personal notes, this app provides a secure and structured way
        to keep your thoughts organized and accessible anytime. Designed for
        quick access and ease of use, this app is perfect for storing anything
        from fleeting thoughts to detailed information you need at hand.
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
