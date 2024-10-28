"use client";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                Enter your credentials to access your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <form onSubmit={handleSubmit} className="space-y-2">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    placeholder="Email"
                    type="email"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    placeholder="Password"
                    type="password"
                    required
                  />
                </div>
                <CardFooter>
                  <Button type="submit" className="w-full">
                    Sign In
                  </Button>
                </CardFooter>
              </form>
              <div className="w-full mt-2">
                <Button
                  className="w-full border border-solid border-black rounded"
                  onClick={() => handleOAuthSignIn("google")}
                  type="button"
                >
                  Sign In with Google
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle>Register</CardTitle>
              <CardDescription>
                Create an account to get started.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              <Link
                className="text-sm text-[#888] transition duration-150 ease hover:text-white"
                href="/register"
              >
                Already have an account? Sign up
              </Link>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}
