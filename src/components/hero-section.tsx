import { Button } from "@/components/ui/button";
import { PlayCircle, Plus, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";

interface HeroSectionProps {
  title: string;
  description: string;
  imageUrl: string;
  id: string;
  mediaType: "movie" | "tv";
  year?: string;
  ageRating?: string;
}

export function HeroSection({
  title,
  description,
  imageUrl,
  id,
  mediaType,
  year,
  ageRating,
}: HeroSectionProps) {
  return (
    <div className="relative w-full h-[75vh] md:h-[85vh] overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      <div className="relative h-full container px-4 md:px-6 mx-auto flex flex-col justify-end pb-20 md:pb-32 ">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-3 text-shadow">
            {title}
          </h1>

          <div className="flex items-center gap-2 text-foreground/90 mb-4">
            {year && <span className="text-sm">{year}</span>}
            {ageRating && (
              <>
                <span className="w-1 h-1 rounded-full bg-muted-foreground mx-1" />
                <Badge variant="outline">{ageRating}</Badge>
              </>
            )}
          </div>

          <p className="text-base md:text-lg text-foreground/90 mb-6 line-clamp-3">
            {description}
          </p>

          <div className="flex flex-wrap gap-3">
            <Link href={`/watch/${mediaType}/${id}`}>
              <Button className="gap-2">
                <PlayCircle className="h-5 w-5" />
                Play
              </Button>
            </Link>

            <Button variant="secondary" className="gap-2">
              <Plus className="h-5 w-5" />
              My List
            </Button>

            <Link href={`/${mediaType}/${id}`}>
              <Button
                variant="outline"
                className="gap-2 bg-foreground/10 hover:bg-foreground/20 border-none"
              >
                <Info className="h-5 w-5" />
                More Info
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
