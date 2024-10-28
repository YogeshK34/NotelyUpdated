export default function LoginLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <section className="flex flex-cols w-full h-screen">
        <div className="inline-block max-w-lg text-center">
          {children}
        </div>
      </section>
    );
  }
  