import { Providers } from "../Provider";

export default function NoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center">
      <Providers>
        <div className="inline-block text-center">{children}</div>
      </Providers>
    </section>
  );
}
