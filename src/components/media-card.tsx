import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface MediaCardProps {
  id: string;
  title: string;
  posterUrl: string;
  mediaType: "movie" | "tv";
  year?: string;
  rating?: string;
}

export function MediaCard({ id, title, posterUrl, mediaType }: MediaCardProps) {
  return (
    <Link href={`/details/${mediaType}/${id}`}>
      <Card className="border-0 bg-transparent overflow-hidden rounded-none">
        <CardContent className="p-0 overflow-hidden">
          <div className="relative">
            <AspectRatio ratio={2 / 3} className="bg-muted">
              <Image
                src={posterUrl}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </AspectRatio>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
