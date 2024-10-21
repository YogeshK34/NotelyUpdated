"use client";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

export default function SigninButton() {

    const router = useRouter();

    return (
        <Button
            color="default"
            variant="shadow"
            onClick={() => {
                router.push("/login")
            }}
        >
            Signin
        </Button>
    );
}