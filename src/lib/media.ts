import {
  formatMovie,
  formatTVShow,
  TMDB_API_BASE_URL,
  formatCastMember,
  formatCrewMember,
} from "@/lib/tmdb";

const API_KEY = process.env.TMDB_API_KEY;

type MediaType = "movie" | "tv";

type MovieCategory =
  | "trending"
  | "popular"
  | "top_rated"
  | "now_playing"
  | "upcoming";
type TvCategory =
  | "trending"
  | "popular"
  | "top_rated"
  | "airing_today"
  | "on_the_air";
type MediaCategory = MovieCategory | TvCategory;

export async function fetchTrending(
  mediaType: "movie" | "tv" | "all",
  time: "day" | "week"
) {
  const url = `${TMDB_API_BASE_URL}/trending/${mediaType}/${time}?api_key=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();

  return data.results.map((item: any) =>
    item.media_type === "movie" || mediaType === "movie"
      ? formatMovie(item)
      : formatTVShow(item)
  );
}

export const fetchMedia = async (
  mediaType: MediaType,
  category: MediaCategory
) => {
  try {
    const endpoint = `/${mediaType}/${category}`;
    const res = await fetch(
      `${TMDB_API_BASE_URL}${endpoint}?api_key=${API_KEY}`
    );
    const data = await res.json();
    return data.results.map((item: any) =>
      mediaType === "movie" ? formatMovie(item) : formatTVShow(item)
    );
  } catch (error) {
    console.error({ error });
    return [];
  }
};

export const fetchEpisodes = async (tvId: string, numberOfSeasons: number) => {
  try {
    const seasonEpisodes = [];
    for (let index = 1; index <= numberOfSeasons; index++) {
      const res = await fetch(
        `${TMDB_API_BASE_URL}/tv/${tvId}/season/${index}?api_key=${API_KEY}`
      );
      const data = await res.json();
      seasonEpisodes.push(data || []);
    }
    return seasonEpisodes;
  } catch (error) {
    console.error({ error });
    return [];
  }
};

type DetailType =
  | "similar"
  | "recommendations"
  | "reviews"
  | "credits"
  | "videos"
  | "external_ids"
  | "images"
  | "watch_providers"
  | "single";

export const fetchIdBasedMedia = async (
  mediaType: MediaType,
  detail: DetailType,
  id: string
) => {
  try {
    const endpoint =
      detail === "single"
        ? `/${mediaType}/${id}`
        : detail === "watch_providers"
        ? `/${mediaType}/${id}/watch/providers`
        : `/${mediaType}/${id}/${detail}`;

    const res = await fetch(
      `${TMDB_API_BASE_URL}${endpoint}?api_key=${API_KEY}`
    );
    const data = await res.json();

    return detail === "single"
      ? mediaType === "movie"
        ? formatMovie(data)
        : formatTVShow(data)
      : detail === "similar" || detail === "recommendations"
      ? data.results.map((item: any) =>
          mediaType === "movie" ? formatMovie(item) : formatTVShow(item)
        )
      : data.results;
  } catch (error) {
    console.error({ error });
    return [];
  }
};

export async function fetchMovieDetails(id: string) {
  const url = `${TMDB_API_BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits`;
  const response = await fetch(url);
  const data = await response.json();

  const directors = data.credits.crew
    .filter((person: any) => person.job === "Director")
    .map((person: any) => person.name);

  const writers = data.credits.crew
    .filter((person: any) => ["Writer", "Screenplay"].includes(person.job))
    .map((person: any) => person.name);

  const cast = data.credits.cast.map(formatCastMember);
  const crew = data.credits.crew
    .filter((person: any) =>
      ["Producer", "Cinematography", "Editor", "Music"].includes(person.job)
    )
    .map(formatCrewMember);

  return {
    ...formatMovie(data),
    belongs_to_collection: data.belongs_to_collection,
    budget: data.budget,
    genres: data.genres ? data.genres.map((g: any) => g.name) : [],
    homepage: data.homepage,
    imdb_id: data.imdb_id,
    original_language: data.original_language,
    original_title: data.original_title,
    production_companies: data.production_companies,
    production_countries: data.production_countries,
    release_date: data.release_date,
    revenue: data.revenue,
    runtime: data.runtime
      ? `${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m`
      : undefined,
    spoken_languages: data.spoken_languages,
    status: data.status,
    tagline: data.tagline,
    vote_average: data.vote_average,
    vote_count: data.vote_count,
    directors,
    writers,
    cast,
    crew,
  };
}
export type MovieDetailsUnAwaited = ReturnType<typeof fetchMovieDetails>;
export type MovieDetailsInterface = Awaited<MovieDetailsUnAwaited>;

export async function fetchTVShowDetails(id: string) {
  const url = `${TMDB_API_BASE_URL}/tv/${id}?api_key=${API_KEY}&append_to_response=credits,season/1`;
  const response = await fetch(url);
  const data = await response.json();

  const creators = data.created_by.map((person: any) => person.name);

  const cast = data.credits.cast.slice(0, 12).map(formatCastMember);
  const crew = data.credits.crew
    .filter((person: any) =>
      ["Creator", "Executive Producer", "Producer"].includes(person.job)
    )
    .map(formatCrewMember);

  return {
    ...formatTVShow(data),
    created_by: data.created_by,
    episode_run_time: data.episode_run_time,
    first_air_date: data.first_air_date,
    genres: data.genres ? data.genres.map((g: any) => g.name) : [],
    homepage: data.homepage,
    in_production: data.in_production,
    languages: data.languages,
    original_name: data.original_name,
    last_air_date: data.last_air_date,
    last_episode_to_air: data.last_episode_to_air,
    next_episode_to_air: data.next_episode_to_air,
    networks: data.networks,
    number_of_episodes: data.number_of_episodes,
    number_of_seasons: data.number_of_seasons,
    original_language: data.original_language,
    original_title: data.original_name,
    popularity: data.popularity,
    production_companies: data.production_companies,
    production_countries: data.production_countries,
    spoken_languages: data.spoken_languages,
    status: data.status,
    tagline: data.tagline,
    type: data.type,
    vote_average: data.vote_average,
    vote_count: data.vote_count,
    creators,
    cast,
    crew,
  };
}
export type TVShowDetailsUnAwaited = ReturnType<typeof fetchTVShowDetails>;
export type TVShowDetailsInterface = Awaited<TVShowDetailsUnAwaited>;

export async function fetchByGenre(mediaType: "movie" | "tv", genreId: string) {
  const url = `${TMDB_API_BASE_URL}/discover/${mediaType}?api_key=${API_KEY}&with_genres=${genreId}`;
  const response = await fetch(url);
  const data = await response.json();

  return data.results.map((item: any) =>
    mediaType === "movie" ? formatMovie(item) : formatTVShow(item)
  );
}

export async function searchMedia(query: string) {
  if (!query) return { movies: [], tvShows: [] };

  const url = `${TMDB_API_BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(
    query
  )}`;
  const response = await fetch(url);
  const data = await response.json();

  const movies = data.results
    .filter((item: any) => item.media_type === "movie")
    .map(formatMovie);

  const tvShows = data.results
    .filter((item: any) => item.media_type === "tv")
    .map(formatTVShow);

  return { movies, tvShows };
}

export async function fetchGenres(mediaType: "movie" | "tv") {
  const url = `${TMDB_API_BASE_URL}/genre/${mediaType}/list?api_key=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();

  return data.genres;
}
