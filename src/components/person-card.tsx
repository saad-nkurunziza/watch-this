import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface PersonCardProps {
  person: {
    id: number;
    name: string;
    profile_path: string | null;
    known_for_department?: string;
    known_for?: any[];
  };
}

export function PersonCard({ person }: PersonCardProps) {
  const profileUrl = person.profile_path
    ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
    : "/placeholder.svg?height=278&width=185";

  return (
    <Link href={`/person/${person.id}`}>
      <Card className="overflow-hidden h-full transition-all hover:scale-[1.02] hover:shadow-md">
        <div className="aspect-[2/3] relative">
          <Image
            src={profileUrl || "/placeholder.svg"}
            alt={person.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium line-clamp-1">{person.name}</h3>
          {person.known_for_department && (
            <p className="text-sm text-muted-foreground">
              {person.known_for_department}
            </p>
          )}
          {person.known_for && person.known_for.length > 0 && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
              Known for:{" "}
              {person.known_for
                .map((media: any) => media.title || media.name)
                .join(", ")}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
