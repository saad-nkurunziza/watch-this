import { MediaRow } from "@/components/media-row";
import { Footer } from "@/components/footer";
import { fetchMedia, fetchTrending, fetchByGenre } from "@/lib/media";
import { MovieInterface, TvInterface } from "@/lib/tmdb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function Home() {
  // Hero section
  const hero_media = (await fetchTrending("all", "day"))[0] as
    | MovieInterface
    | TvInterface;

  // Trending
  const trending_media_day = (await fetchTrending(
    "all",
    "day"
  )) as MovieInterface[];
  const trending_media_week = (await fetchTrending(
    "all",
    "week"
  )) as MovieInterface[];

  // Movies
  const hot_movies = (await fetchTrending("movie", "day")) as MovieInterface[];
  const now_playing_movies = (await fetchMedia(
    "movie",
    "now_playing"
  )) as MovieInterface[];
  const upcoming_movies = (await fetchMedia(
    "movie",
    "upcoming"
  )) as MovieInterface[];
  const popular_movies = (await fetchMedia(
    "movie",
    "popular"
  )) as MovieInterface[];
  const top_rated_movies = (await fetchMedia(
    "movie",
    "top_rated"
  )) as MovieInterface[];

  // Genres - Movies
  const drama_movies = (await fetchByGenre("movie", "18")) as MovieInterface[];
  const comedy_movies = (await fetchByGenre("movie", "35")) as MovieInterface[];
  const action_movies = (await fetchByGenre("movie", "28")) as MovieInterface[];

  // TV
  const hot_tv = (await fetchTrending("tv", "day")) as TvInterface[];
  const airing_today_tv = (await fetchMedia(
    "tv",
    "airing_today"
  )) as TvInterface[];
  const popular_tv = (await fetchMedia("tv", "popular")) as TvInterface[];
  const top_rated_tv = (await fetchMedia("tv", "top_rated")) as TvInterface[];

  // Genres - TV
  const drama_tv = (await fetchByGenre("tv", "18")) as TvInterface[];
  const comedy_tv = (await fetchByGenre("tv", "35")) as TvInterface[];
  const adventure_tv = (await fetchByGenre("tv", "10759")) as TvInterface[];

  return (
    <div className="pt-28 flex flex-col gap-y-16">
      {/* Trending Tabs */}
      <Tabs defaultValue="day">
        <TabsList className="">
          <TabsTrigger value="day">Daily</TabsTrigger>
          <TabsTrigger value="week">Weekly</TabsTrigger>
        </TabsList>
        <TabsContent value="day">
          <MediaRow
            title="Trending Today"
            items={trending_media_day}
            viewMoreHref="/trending/day"
          />
        </TabsContent>
        <TabsContent value="week">
          <MediaRow
            title="Trending This Week"
            items={trending_media_week}
            viewMoreHref="/trending/week"
          />
        </TabsContent>
      </Tabs>

      {/* Movie Sections */}
      <MediaRow
        title="Hot Movies Today"
        items={hot_movies}
        viewMoreHref="/movies/hot"
      />
      <MediaRow
        title="Now Playing"
        items={now_playing_movies}
        viewMoreHref="/movies/now-playing"
      />
      <MediaRow
        title="Upcoming Releases"
        items={upcoming_movies}
        viewMoreHref="/movies/upcoming"
      />
      <MediaRow
        title="Popular Movies"
        items={popular_movies}
        viewMoreHref="/movies/popular"
      />
      <MediaRow
        title="Top Rated Movies"
        items={top_rated_movies}
        viewMoreHref="/movies/top-rated"
      />

      {/* Genre - Movies */}
      <MediaRow
        title="Drama Movies"
        items={drama_movies}
        viewMoreHref="/genre/movie/18"
      />
      <MediaRow
        title="Comedy Movies"
        items={comedy_movies}
        viewMoreHref="/genre/movie/35"
      />
      <MediaRow
        title="Action Movies"
        items={action_movies}
        viewMoreHref="/genre/movie/28"
      />

      {/* TV Sections */}
      <MediaRow
        title="Hot TV Shows Today"
        items={hot_tv}
        viewMoreHref="/tv-shows/hot"
      />
      <MediaRow
        title="Airing Today"
        items={airing_today_tv}
        viewMoreHref="/tv-shows/airing-today"
      />
      <MediaRow
        title="Popular TV Shows"
        items={popular_tv}
        viewMoreHref="/tv-shows/popular"
      />
      <MediaRow
        title="Top Rated TV Shows"
        items={top_rated_tv}
        viewMoreHref="/tv-shows/top-rated"
      />

      {/* Genre - TV */}
      <MediaRow
        title="Drama TV Shows"
        items={drama_tv}
        viewMoreHref="/genre/tv/18"
      />
      <MediaRow
        title="Comedy TV Shows"
        items={comedy_tv}
        viewMoreHref="/genre/tv/35"
      />
      <MediaRow
        title="Action & Adventure TV Shows"
        items={adventure_tv}
        viewMoreHref="/genre/tv/10759"
      />

      <Footer />
    </div>
  );
}
