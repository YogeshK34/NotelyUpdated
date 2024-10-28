"use client";
import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { register } from "@/actions/register";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { signIn } from "next-auth/react";

export default function Register() {
  const [error, setError] = useState<string>();
  const router = useRouter();
  const ref = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(ref.current as HTMLFormElement);
    const r = await register({
      email: formData.get("email"),
      password: formData.get("password"),
      name: formData.get("name"),
    });
    ref.current?.reset();
    if (r?.error) {
      setError(r.error);
    } else {
      router.push("/login");
    }
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (res?.error) {
      setError(res.error as string);
    } else if (res?.ok) {
      router.push("/notes");
    }
  };

  return (
    <section className="flex h-screen w-full items-center justify-center">
      <Tabs defaultValue="register" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="register">Register</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Create your account to get started.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {error && <div className="text-red-500">{error}</div>}
              <form ref={ref} onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Full Name"
                    required
                    type="text"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    placeholder="Email"
                    required
                    type="email"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    placeholder="Password"
                    required
                    type="password"
                  />
                </div>
                <CardFooter className="flex justify-center">
                  <Button type="submit">Sign Up</Button>
                </CardFooter>
              </form>
              <Link
                className="text-sm text-[#888] transition duration-150 ease hover:text-white mt-4"
                href="/login"
              >
                Already have an account?
              </Link>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Sign in to access your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <form onSubmit={handleLogin} className="space-y-4">
                {error && <div className="text-red-500">{error}</div>}
                <div className="space-y-1">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    name="email"
                    placeholder="Email"
                    required
                    type="email"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    name="password"
                    placeholder="Password"
                    required
                    type="password"
                  />
                </div>
                <CardFooter className="flex justify-center">
                  <Button type="submit">Sign In</Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}
