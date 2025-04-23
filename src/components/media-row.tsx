import { MediaCard } from "@/components/media-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { MovieInterface, TvInterface } from "@/lib/tmdb";

interface MediaRowProps {
  title: string;
  items: MovieInterface[] | TvInterface[];
  viewMoreHref?: string;
}

export function MediaRow({ title, items, viewMoreHref }: MediaRowProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-medium">{title}</h2>

        {viewMoreHref && (
          <Link
            href={viewMoreHref}
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
          >
            More <ChevronRight className="h-4 w-4" />
          </Link>
        )}
      </div>

      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {items.map((item) => (
            <CarouselItem
              key={item.id}
              className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
            >
              <MediaCard
                id={item.id}
                title={item.title}
                posterUrl={item.posterUrl}
                mediaType={item.mediaType}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-10" />
        <CarouselNext className="-right-10" />
      </Carousel>
    </section>
  );
}
