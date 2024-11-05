"use client";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

export default function SignUpButton() {
  const router = useRouter();

  return (
    <Button
      color="primary"
      variant="shadow"
      onClick={() => {
        router.push("/signup");
      }}
    >
      Signup
    </Button>
  );
}
