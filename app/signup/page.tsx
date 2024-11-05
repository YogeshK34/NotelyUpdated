"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state

  const handleSignup = async () => {
    setError(""); // Clear previous error
    setIsSubmitting(true); // Disable the button
    try {
      const res = await axios.post("http://localhost:3000/api/signup", {
        name,
        email,
        password,
      });

      if (res.data.error) {
        setError(res.data.error); // Set error message from response
      } else {
        // Redirect to the signin page upon successful signup
        router.push("/notes");
      }
    } catch (error) {
      setError("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false); // Re-enable the button
    }
  };

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
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Walter White"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError(""); // Clear error on change
                  }}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>{" "}
                {/* Changed from username to email */}
                <Input
                  id="email"
                  placeholder="walterheisenberg@gmail.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError(""); // Clear error on change
                  }}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="*******"
                  type="password" // Set type to password for security
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(""); // Clear error on change
                  }}
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
            </CardContent>
            <CardFooter className="flex justify-center items-center">
              <Button disabled={isSubmitting} onClick={handleSignup}>
                {" "}
                {/* Disable during submission */}
                Save changes
              </Button>
            </CardFooter>
            <CardFooter className="flex justify-center items-center">
              <button
                onClick={() => {
                  router.push("/signin");
                }}
              >
                Already have an account? Sign In
              </button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
