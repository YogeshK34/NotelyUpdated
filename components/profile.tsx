import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Avatar } from "@nextui-org/avatar";
import Link from "next/link";

import { siteConfig } from "@/config/site";

export default function ProfileComponent() {
  const [isFollowed] = React.useState(false);

  return (
    <Card className="max-w-[340px]">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src="/ProfilePicture.jpg"
          />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              Yogesh Khutwad
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              @yogeshk34
            </h5>
          </div>
        </div>
        <Link passHref href={siteConfig.links.twitter}>
          <Button
            // as="a"
            className={
              isFollowed
                ? "bg-transparent text-foreground border-default-200"
                : ""
            }
            color="primary"
            radius="full"
            rel="noopener noreferrer"
            size="sm"
            target="_blank" // Open the link in a new tab
            variant={isFollowed ? "bordered" : "solid"}
          >
            {isFollowed ? "Unfollow" : "Follow"}
          </Button>
        </Link>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
        <p>FullStack developer. Join me on this coding adventure!</p>
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">111</p>
          <p className=" text-default-400 text-small">Following</p>
        </div>
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">21</p>
          <p className="text-default-400 text-small">Followers</p>
        </div>
      </CardFooter>
    </Card>
  );
}
