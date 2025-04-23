import { MediaHero } from "@/components/media-hero";
import { MediaMetadata } from "@/components/media-metadata";
import { CastList } from "@/components/cast-list";
import {
  fetchIdBasedMedia,
  fetchMovieDetails,
  fetchTVShowDetails,
  fetchEpisodes,
} from "@/lib/media";
import Link from "next/link";
import Image from "next/image";
import { Play, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MediaRow } from "@/components/media-row";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";
import { SeasonsList } from "@/components/seasons-list";
import { getImageUrl, POSTER_SIZES } from "@/lib/tmdb";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
};

interface PageProps {
  params: Promise<{ mediaType: string; id: string }>;
}

export default async function MediaDetailsPage({ params }: PageProps) {
  const { mediaType, id } = await params;

  if (mediaType !== "movie" && mediaType !== "tv") {
    notFound();
  }

  const isMovie = mediaType === "movie";

  const data = isMovie
    ? ((await fetchMovieDetails(id)) as any)
    : ((await fetchTVShowDetails(id)) as any);

  let episodesInSeason;
  if (!isMovie && data.number_of_seasons) {
    episodesInSeason = await fetchEpisodes(id, data.number_of_seasons);
  }
  const similarMedia = await fetchIdBasedMedia(mediaType, "similar", id);
  const recommendedMedia = await fetchIdBasedMedia(
    mediaType,
    "recommendations",
    id
  );
  const videosData = await fetchIdBasedMedia(mediaType, "videos", id);
  const reviewsData = await fetchIdBasedMedia(mediaType, "reviews", id);
  const trailers = (videosData || [])
    .filter(
      (v: any) =>
        v.site === "YouTube" &&
        ["Trailer", "Teaser"].includes(v.type) &&
        v.official
    )
    .slice(0, 4);
  const reviews = (reviewsData || []).slice(0, 4);

  const {
    title,
    posterUrl,
    backdropUrl,
    description,
    year,
    tagline,
    rating,
    adult,
    genres,
    production_companies,
    production_countries,
    spoken_languages,
    status,
    popularity,
    original_language,
    homepage,
  } = data;

  const {
    original_title,
    release_date,
    runtime,
    directors,
    writers,
    budget,
    imdb_id,
    revenue,
    belongs_to_collection,
    cast: movieCast,
    crew: movieCrew,
  } = isMovie
    ? data
    : {
        original_title: null,
        release_date: null,
        runtime: null,
        directors: null,
        writers: null,
        budget: null,
        imdb_id: null,
        revenue: null,
        belongs_to_collection: null,
        cast: null,
        crew: null,
      };

  const {
    created_by,
    episode_run_time,
    first_air_date,
    in_production,
    last_air_date,
    last_episode_to_air,
    next_episode_to_air,
    type,
    original_name,
    networks,
    number_of_episodes,
    number_of_seasons,
    seasons,
    creators,
    cast: tvCast,
    crew: tvCrew,
  } = !isMovie
    ? data
    : {
        created_by: null,
        episode_run_time: null,
        first_air_date: null,
        in_production: null,
        last_air_date: null,
        last_episode_to_air: null,
        next_episode_to_air: null,
        networks: null,
        number_of_episodes: null,
        number_of_seasons: null,
        seasons: null,
        creators: null,
        cast: null,
        crew: null,
      };

  const cast = isMovie ? movieCast : tvCast;
  const crew = isMovie ? movieCrew : tvCrew;
  const heroImage = backdropUrl || posterUrl;

  return (
    <div className="">
      <MediaHero
        title={title}
        tagline={tagline}
        imageUrl={heroImage}
        mediaType={mediaType}
      />

      <section className="mt-8">
        <MediaMetadata
          originalTitle={isMovie ? original_title : original_name}
          release_date={isMovie ? year : first_air_date?.substring(0, 4)}
          rating={Number(rating)}
          runtime={
            isMovie
              ? runtime
              : episode_run_time?.[0]
              ? `${episode_run_time[0]}m per episode`
              : undefined
          }
          genres={genres}
          mediaType={mediaType}
          status={status}
          adult={adult}
          original_language={original_language}
          in_production={in_production}
          episodes={number_of_episodes}
          seasons={number_of_seasons}
          type={type}
        />
      </section>

      <div className="mt-12 space-y-16">
        <section>
          <h2 className="font-medium mb-8">Overview</h2>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </section>

        {isMovie && belongs_to_collection && belongs_to_collection.name && (
          <section>
            <h2 className="font-medium mb-8">Collection</h2>
            <p className="text-muted-foreground leading-relaxed">
              {belongs_to_collection.name}
            </p>
          </section>
        )}

        {isMovie && (directors?.length > 0 || writers?.length > 0) && (
          <section>
            <div className="space-y-4">
              {directors?.length > 0 && (
                <div>
                  <h3 className="text-zinc-300 font-medium mb-2">
                    Director{directors.length > 1 ? "s" : ""}
                  </h3>
                  <p className="text-muted-foreground">
                    {directors.join(", ")}
                  </p>
                </div>
              )}
              {writers?.length > 0 && (
                <div>
                  <h3 className="text-zinc-300 font-medium mb-2">
                    Writer{writers.length > 1 ? "s" : ""}
                  </h3>
                  <p className="text-muted-foreground">{writers.join(", ")}</p>
                </div>
              )}
            </div>
          </section>
        )}

        {!isMovie && creators?.length > 0 && (
          <section>
            <div className="space-y-4">
              <div>
                <h3 className="text-zinc-300 font-medium mb-2">
                  Creator{creators.length > 1 ? "s" : ""}
                </h3>
                <p className="text-muted-foreground">{creators.join(", ")}</p>
              </div>
            </div>
          </section>
        )}

        {cast?.length > 0 && (
          <section>
            <h2 className="font-medium mb-8">Cast</h2>
            <CastList cast={cast} />
          </section>
        )}

        {!isMovie && number_of_seasons > 0 && (
          <section>
            <h2 className="font-medium mb-8">Seasons</h2>
            <SeasonsList
              number_of_seasons={number_of_seasons}
              showId={id}
              seasons={episodesInSeason}
            />
          </section>
        )}

        {production_companies?.length > 0 && (
          <section className="space-y-4">
            <h2 className="mb-8 font-medium">Production Companies</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {production_companies.map((company: any) => (
                <div
                  key={company.id}
                  className="flex flex-col items-center text-center space-y-2"
                >
                  <div className="w-32 h-20 relative">
                    <Image
                      src={getImageUrl(company.logo_path, POSTER_SIZES.medium)}
                      alt={company.name}
                      fill
                      className="object-contain"
                      unoptimized={true}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {trailers.length > 0 && (
          <section>
            <h2 className="font-medium mb-8">Trailers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trailers.map((trailer: any) => (
                <div key={trailer.id} className="group">
                  <div className="relative aspect-video border overflow-hidden rounded-lg mb-2 bg-muted">
                    <Link
                      href={`https://www.youtube.com/watch?v=${trailer.key}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full h-full"
                    >
                      <Image
                        src={`https://img.youtube.com/vi/${trailer.key}/hqdefault.jpg`}
                        alt={trailer.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-background/30 flex items-center justify-center">
                        <Play className="w-12 h-12 opacity-80 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </Link>
                  </div>
                  <p className="text-sm p-1 text-muted-foreground line-clamp-2">
                    {trailer.name}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="font-medium mb-8">Details</h2>
          <div className="flex flex-col gap-y-6">
            <div className={cn(isMovie ? "" : "grid grid-cols-2")}>
              <div className="flex flex-col">
                <span className="">
                  {isMovie ? "Release Date" : "First Air Date"}
                </span>
                <span className="text-muted-foreground">
                  {isMovie ? release_date : first_air_date}
                </span>
              </div>
              {!isMovie && (
                <div className="flex flex-col">
                  <span className="">Last Air Date</span>
                  <span className="text-muted-foreground">{last_air_date}</span>
                </div>
              )}
            </div>

            {isMovie && (budget || revenue) && (
              <div className="grid md:grid-cols-2 gap-3">
                {budget > 0 && (
                  <div className="flex flex-col">
                    <span className="">Budget</span>
                    <span className="text-muted-foreground">
                      {formatCurrency(budget)}
                    </span>
                  </div>
                )}
                {revenue > 0 && (
                  <div className="flex flex-col">
                    <span className="">Revenue</span>
                    <span className="text-muted-foreground">
                      {formatCurrency(revenue)}
                    </span>
                  </div>
                )}
              </div>
            )}

            {!isMovie && networks?.length > 0 && (
              <div className="flex flex-col">
                <span className="">Networks</span>
                <span className="text-muted-foreground">
                  {networks.map((network: any) => network.name).join(", ")}
                </span>
              </div>
            )}

            <div className="space-y-3">
              {original_language && (
                <div className="flex flex-col">
                  <span className="">Original Language</span>
                  <span className="text-muted-foreground">
                    {original_language.toUpperCase()}
                  </span>
                </div>
              )}
              {spoken_languages && spoken_languages.length > 0 && (
                <div className="flex flex-col">
                  <span className="">Spoken Languages</span>
                  <span className="text-muted-foreground">
                    {spoken_languages
                      .map((lang: any) => lang.english_name || lang.name)
                      .join(", ")}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {production_countries?.length > 0 && (
                <div>
                  <span className="">Production Countries</span>
                  <p className="text-muted-foreground">
                    {production_countries
                      .map((country: any) => country.name)
                      .join(", ")}
                  </p>
                </div>
              )}
            </div>

            <div>
              <div className="space-y-3">
                {popularity && (
                  <div className="flex flex-col">
                    <span className="">Popularity</span>
                    <span className="text-muted-foreground">
                      {popularity.toFixed(1)}
                    </span>
                  </div>
                )}
                {(imdb_id || homepage) && (
                  <div className="grid grid-cols-2 gap-3">
                    {imdb_id && (
                      <div className="flex flex-col">
                        <span className="">IMDB</span>
                        <Link
                          href={`https://www.imdb.com/title/${imdb_id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground underline hover inline-flex items-center gap-1 transition-colors"
                        >
                          View on IMDB <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>
                    )}
                    {homepage && (
                      <div className="flex flex-col">
                        <span className="">Homepage</span>
                        <Link
                          href={homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground underline hover inline-flex items-center gap-1 transition-colors"
                        >
                          Visit official site{" "}
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {crew && crew.length > 0 && (
          <section>
            <h2 className="font-medium mb-8">Production Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {crew.slice(0, 20).map((member: any) => (
                <div
                  key={`${member.id}-${member.job}`}
                  className="flex flex-col"
                >
                  <span className="">{member.name}</span>
                  <span className="text-muted-foreground">{member.job}</span>
                </div>
              ))}
              {crew.length > 20 && (
                <div className="col-span-full mt-2">
                  <Badge
                    variant="outline"
                    className="text-muted-foreground border"
                  >
                    +{crew.length - 20} more crew members
                  </Badge>
                </div>
              )}
            </div>
          </section>
        )}
      </div>

      <div className="flex flex-col mt-4">
        <div className="py-8">
          <MediaRow
            title={`Similar ${isMovie ? "Movies" : "TV Shows"} You Might Like`}
            items={similarMedia}
            viewMoreHref={`/${mediaType}/similar`}
          />
        </div>
        <div className="py-8">
          <MediaRow
            title="Recommended For You"
            items={recommendedMedia}
            viewMoreHref={`/${mediaType}/recommended`}
          />
        </div>
      </div>
    </div>
  );
}
