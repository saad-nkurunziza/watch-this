import { Clock, Film, Flag, Star } from "lucide-react";
import { Badge } from "./ui/badge";
import { genreColorMap, statusColorMap } from "@/lib/utils";

type MediaMetadataProps = {
  originalTitle: string;
  release_date: string;
  rating: number;
  runtime?: string;
  genres: string[];
  mediaType: "movie" | "tv";
  status: string;
  adult: boolean;
  original_language: string;
  in_production?: boolean;
  episodes?: number;
  seasons?: number;
  type?: string;
};

const getGenreColor = (genreName: string): string => {
  if (genreColorMap[genreName]) return genreColorMap[genreName];

  const colors = [
    "blue",
    "amber",
    "red",
    "green",
    "indigo",
    "pink",
    "purple",
    "teal",
    "yellow",
    "violet",
  ];
  let hash = 0;
  for (let i = 0; i < genreName.length; i++) {
    hash = genreName.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

export const MediaMetadata = ({
  originalTitle,
  release_date,
  rating,
  runtime,
  genres,
  mediaType,
  status,
  adult,
  original_language,
  in_production,
  type,
  episodes,
  seasons,
}: MediaMetadataProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pt-4">
      <div>
        <h3 className="text-sm font-medium text-white/60 mb-2">
          Original Title
        </h3>
        <p>{originalTitle}</p>
      </div>
      <div>
        <h3 className="text-sm font-medium text-white/60 mb-2">Release Year</h3>
        <p>{release_date}</p>
      </div>
      <div>
        <h3 className="text-sm font-medium text-white/60 mb-2">Rating</h3>
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          <span>{rating.toFixed(1)} / 10</span>
        </div>
      </div>
      {runtime && (
        <div>
          <h3 className="text-sm font-medium text-white/60 mb-2">Runtime</h3>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{runtime}</span>
          </div>
        </div>
      )}
      <div>
        <h3 className="text-sm font-medium text-white/60 mb-2">Genre</h3>
        {genres && genres.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <Badge
                key={genre}
                variant={getGenreColor(genre) as any}
                className="font-normal"
              >
                {genre}
              </Badge>
            ))}
          </div>
        )}
      </div>
      <div>
        <h3 className="text-sm font-medium text-white/60 mb-2">Type</h3>
        <div className="flex items-center gap-1">
          {mediaType === "movie" ? (
            <Film className="h-4 w-4" />
          ) : (
            <Flag className="h-4 w-4" />
          )}
          <span>{mediaType === "movie" ? "Movie" : "TV Series"}</span>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-white/60 mb-2">Status</h3>
        <Badge
          variant={(statusColorMap[status] as any) || "gray"}
          className="font-medium"
        >
          {status}
        </Badge>
      </div>

      <div>
        <h3 className="text-sm font-medium text-white/60 mb-2">Adult</h3>
        <p> {adult ? "Adult Content" : "Non-adult Content"}</p>
      </div>

      {mediaType === "tv" && in_production && (
        <div>
          <h3 className="text-sm font-medium text-white/60 mb-2">
            In Production
          </h3>
          <p> {in_production ? "Yes" : "No"}</p>
        </div>
      )}
      {mediaType === "tv" && seasons && (
        <div>
          <h3 className="text-sm font-medium text-white/60 mb-2">Seasons</h3>
          <p> {seasons}</p>
        </div>
      )}
      {mediaType === "tv" && episodes && (
        <div>
          <h3 className="text-sm font-medium text-white/60 mb-2">Episodes</h3>
          <p> {episodes}</p>
        </div>
      )}
      {mediaType === "tv" && type && (
        <div>
          <h3 className="text-sm font-medium text-white/60 mb-2">Show type</h3>
          <p> {type}</p>
        </div>
      )}

      {/* <div>
        <h3 className="text-sm font-medium text-white/60 mb-2">
          Original Language
        </h3>
        <p>{original_language}</p>
      </div> */}
    </div>
  );
};
