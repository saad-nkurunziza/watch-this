import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Expand, Info, Pause, VolumeOff, Plus, Play } from "lucide-react";

type MediaHeroProps = {
  title: string;
  tagline?: string;
  imageUrl: string;
  mediaType: "movie" | "tv";
};

export const MediaHero = ({
  title,
  tagline,
  imageUrl,
  mediaType,
}: MediaHeroProps) => {
  return (
    <div className="relative w-full mt-24 h-[60vh] overflow-hidden">
      {/* Background image + gradient overlays */}
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

      {/* Content */}
      <div className="relative container mx-auto h-full flex flex-col justify-end px-4 md:px-6 pb-16 md:pb-24">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-2 drop-shadow-lg">
          {title}
        </h1>
        {tagline && (
          <p className="italic text-lg md:text-xl max-w-2xl drop-shadow">
            {tagline}
          </p>
        )}
        <div className="mt-4 flex space-x-3">
          <Button variant="secondary" className="flex items-center gap-2">
            <Plus className="h-5 w-5" /> My List
          </Button>
          <Button size="icon" variant="outline">
            <Play className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-6 right-6 flex space-x-2">
        {[Pause, VolumeOff, Expand, Info].map((Icon, i) => (
          <Button key={i} size="icon" variant="outline">
            <Icon className="h-5 w-5" />
          </Button>
        ))}
      </div>
    </div>
  );
};
