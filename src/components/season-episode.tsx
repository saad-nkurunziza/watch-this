import React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";

interface Props {
  episode: any;
}

export const SeasonEpisode = ({ episode }: Props) => {
  return (
    <div className="relative w-60 bg-card rounded-md overflow-hidden">
      <div className="h-40 w-full relative">
        <Image
          src={
            episode.still_path
              ? `https://image.tmdb.org/t/p/w500${episode.still_path}`
              : "/images/episode-placeholder.webp"
          }
          alt={episode.name}
          fill
          className="object-cover"
        />
        {episode.runtime && (
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
            {episode.runtime}m
          </div>
        )}
      </div>
      <div className="p-3 space-y-2">
        <div className="text-sm font-medium">
          {episode.episode_number}. {episode.name}
        </div>
        <p className="text-xs text-muted-foreground line-clamp-3">
          {episode.overview}
        </p>
      </div>
    </div>
  );
};
