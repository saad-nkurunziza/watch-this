"use client";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type CastMember = {
  id: number;
  name: string;
  character: string;
  profileUrl?: string;
};

type CastListProps = {
  cast: CastMember[];
};

export const CastList = ({ cast }: CastListProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const visibleCast = isCollapsed ? cast : cast.slice(0, 8);

  return (
    <div className="">
      <div className="grid grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-4">
        {visibleCast.map((person) => (
          <div key={person.id} className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={person.profileUrl} alt={person.name} />
              <AvatarFallback>{person.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <p className=" text-sm">{person.name}</p>
              <p className="text-sm text-muted-foreground">
                {person.character}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Button
        className="px-0 mt-5"
        variant={"link"}
        onClick={() => setIsCollapsed((prev) => !prev)}
      >
        Show {isCollapsed ? "less" : "more"}
      </Button>
    </div>
  );
};
