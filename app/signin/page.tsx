"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TabsDemo() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn() {
    const result = await signIn("credentials", {
      redirect: false, // to prevent automatic redirect
      email,
      password,
    });

    if (result?.error) {
      // console.error("Sign in error", result.error);
    } else {
      router.push("/notes");
    }
  }

  return (
    <div className="flex justify-center items-center">
      <Tabs className="w-[400px]" defaultValue="account">
        <TabsList className="grid w-full">
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you&apos;re
                done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="username">Email</Label>
                <Input
                  id="username"
                  placeholder="walterheisenberg@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="*******"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-center items-center">
              <Button onClick={handleSignIn}>Save changes</Button>
            </CardFooter>
            <div className="grid grid-cols-2">
              <CardFooter>
                <Button
                  onClick={() => {
                    signIn("google", { callbackUrl: "/" });
                  }}
                >
                  Signin with Google
                </Button>
              </CardFooter>
              <CardFooter>
                <Button
                  onClick={() => {
                    signIn("github", { callbackUrl: "/" });
                  }}
                >
                  Signin with Github
                </Button>
              </CardFooter>
            </div>
            <CardFooter className=" flex justify-center items-center">
              <button
                onClick={() => {
                  router.push("/signup");
                }}
              >
                Don&apos;t have an account? SignUp
              </button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
