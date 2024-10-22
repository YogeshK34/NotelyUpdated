"use client";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (res?.error) {
      setError(res.error as string);
    }
    if (res?.ok) {
      return router.push("/notes");
    }
  };

  const handleOAuthSignIn = (provider: string) => {
    signIn(provider);
  };

  return (
    <section className="w-full h-screen flex items-center justify-center">
      <form
        className="p-6 w-full max-w-[400px] flex flex-col justify-between items-center gap-2 
                border border-solid border-black bg-white rounded"
        onSubmit={handleSubmit}
      >
        {error && <div className="text-black">{error}</div>}
        <h1 className="mb-5 w-full text-2xl font-bold">Sign In</h1>
        <label className="w-full text-sm" htmlFor="email">Email</label>
        <input
          className="w-full h-8 border border-solid border-black rounded p-2"
          id="email"
          name="email"
          placeholder="Email"
          type="email"
        />
        <label className="w-full text-sm" htmlFor="password">Password</label>
        <div className="flex w-full">
          <input
            className="w-full h-8 border border-solid border-black rounded p-2"
            id="password"
            name="password"
            placeholder="Password"
            type="password"
          />
        </div>
        <button className="w-full border border-solid border-black rounded">
          SignIn
        </button>

        <div className="w-full mt-4">
          <button
            className="w-full border border-solid border-black rounded mb-2"
            onClick={() => handleOAuthSignIn("google")}
            type="button"
          >
            Sign In with Google
          </button>
        </div>

        <Link
          className="text-sm text-[#888] transition duration-150 ease hover:text-black"
          href="/register"
        >
          Don&apos;t have an account?
        </Link>
      </form>
    </section>
  );
}
