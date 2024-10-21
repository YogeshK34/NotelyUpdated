"use client";
import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { register } from "@/actions/register";

export default function Register() {
  const [error, setError] = useState<string>();
  const router = useRouter();
  const ref = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    const formData = new FormData(ref.current as HTMLFormElement);
    const r = await register({
      email: formData.get("email"),
      password: formData.get("password"),
      name: formData.get("name"),
    });
    ref.current?.reset(); // Reset the form after submission
    if (r?.error) {
      setError(r.error); // Show error if exists
    } else {
      router.push("/login"); // Redirect to login on success
    }
  };

  return (
    <section className="flex h-screen w-full items-center justify-center">
      <form
        className="flex w-full max-w-[400px] flex-col items-center justify-between gap-2 
                rounded border border-solid border-black bg-white p-6"
        onSubmit={handleSubmit} // Use onSubmit instead of action
        ref={ref}
      >
        {error && <div className="text-red-500">{error}</div>}{" "}
        <h1 className="mb-5 w-full text-2xl font-bold">Register</h1>

        <label htmlFor="name" className="w-full text-sm">Full Name</label>
        <input
          className="w-full h-8 rounded border border-solid border-black px-2.5 py-1 text-[13px]"
          id="name"
          name="name"
          placeholder="Full Name"
          required // Mark as required
          type="text"
        />

        <label htmlFor="email" className="w-full text-sm">Email</label>
        <input
          className="w-full h-8 rounded border border-solid border-black px-2.5 py-1"
          id="email"
          name="email"
          placeholder="Email"
          required // Mark as required
          type="email"
        />

        <label htmlFor="password" className="w-full text-sm">Password</label>
        <input
          className="w-full h-8 rounded border border-solid border-black px-2.5 py-1"
          id="password"
          name="password"
          placeholder="Password"
          required // Mark as required
          type="password"
        />

        <button
          className="mt-2.5 w-full rounded border border-solid border-black py-1.5
                transition duration-150 ease hover:bg-black"
        >
          Sign up
        </button>

        <Link
          className="text-sm text-[#888] transition duration-150 ease hover:text-black"
          href="/login"
        >
          Already have an account?
        </Link>
      </form>
    </section>
  );
}
