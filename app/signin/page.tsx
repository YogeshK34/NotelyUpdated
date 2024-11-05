"use client";
import { signIn } from "next-auth/react";

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
                  defaultValue="walterheisenberg@gmail.com"
                  id="username"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input defaultValue="*******" id="password" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-center items-center">
              <Button>Save changes</Button>
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
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
