import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getImageUrl, POSTER_SIZES, TMDB_API_BASE_URL } from "@/lib/tmdb";

interface Season {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  episodes: Episode[];
  air_date: string;
  vote_average: number;
}

interface Episode {
  id: number;
  name: string;
  overview: string;
  still_path: string;
  episode_number: number;
  show_id: number;
  season_number: number;
  air_date: string;
  episode_type: string;
  vote_average: number;
  runtime: number;
}

interface SeasonsListProps {
  seasons: Season[] | any;
  showId: string;
  number_of_seasons: number;
}

export function SeasonsList({
  seasons,
  showId,
  number_of_seasons,
}: SeasonsListProps) {
  return (
    <div className="space-y-6">
      <Accordion type="single" collapsible className="w-full">
        {seasons.map((season: any) => {
          const season_image_url = getImageUrl(
            season.poster_path,
            POSTER_SIZES.medium
          );
          return (
            <AccordionItem
              key={season.id}
              value={`season-${season.season_number}`}
            >
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4 text-left">
                  {season.poster_path && (
                    <div className="relative h-16 w-12 overflow-hidden rounded-md shrink-0">
                      <Image
                        src={season_image_url}
                        alt={season.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium">{season.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{season.episodes.length} episodes</span>
                      {season.air_date && (
                        <>
                          <span>•</span>
                          <span>{new Date(season.air_date).getFullYear()}</span>
                        </>
                      )}
                      {season.vote_average > 0 && (
                        <>
                          <span>•</span>
                          <span>Rating: {season.vote_average.toFixed(1)}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="mt-4">
                {season.overview && (
                  <p className="text-muted-foreground mb-4">
                    {season.overview}
                  </p>
                )}

                {season.episodes ? (
                  <div className="flex flex-col gap-5 mt-6">
                    <h4 className="font-medium">Episodes</h4>
                    <div className="space-y-3">
                      {season.episodes.map((episode: any) => {
                        const episode_image_url = getImageUrl(
                          episode.still_path,
                          POSTER_SIZES.medium
                        );
                        return (
                          <div
                            key={episode.id}
                            className="flex gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors"
                          >
                            {episode.still_path && (
                              <div className="relative h-14 w-12 overflow-hidden rounded-md shrink-0">
                                <Image
                                  src={episode_image_url}
                                  alt={episode.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )}

                            <div className="flex-1">
                              <h5 className="font-medium">{episode.name}</h5>
                              <div className="flex mt-0.5 items-center gap-2 text-sm text-muted-foreground/70">
                                {episode.air_date && (
                                  <span>
                                    {new Date(
                                      episode.air_date
                                    ).toLocaleDateString()}
                                  </span>
                                )}
                                {episode.runtime > 0 && (
                                  <>
                                    <span>•</span>
                                    <span>{episode.runtime}m</span>
                                  </>
                                )}
                                {episode.vote_average > 0 && (
                                  <>
                                    <span>•</span>
                                    <span>
                                      Rating: {episode.vote_average.toFixed(1)}
                                    </span>
                                  </>
                                )}
                              </div>
                              {episode.overview && (
                                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                                  {episode.overview}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="text-muted-foreground text-sm">
                    Episode information not available
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
