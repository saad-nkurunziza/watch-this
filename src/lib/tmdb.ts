export const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";
export const YOUTUBE_URL = "https://www.youtube.com/watch?";

export const POSTER_SIZES = {
  small: "w185",
  medium: "w342",
  large: "w500",
  original: "original",
};

export const BACKDROP_SIZES = {
  small: "w300",
  medium: "w780",
  large: "w1280",
  original: "original",
};

export const PROFILE_SIZES = {
  small: "w45",
  medium: "w185",
  large: "h632",
  original: "original",
};

export function getImageUrl(path: string | null, size: string): string {
  if (!path) {
    return "https://via.placeholder.com/500x750?text=No+Image+Available";
  }
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

export function formatMovie(movie: any) {
  return {
    id: movie.id.toString(),
    title: movie.title,
    description: movie.overview,
    posterUrl: getImageUrl(movie.poster_path, POSTER_SIZES.medium),
    backdropUrl: getImageUrl(movie.backdrop_path, BACKDROP_SIZES.large),
    mediaType: "movie" as const,
    year: movie.release_date ? movie.release_date.substring(0, 4) : "",
    rating: movie.vote_average ? movie.vote_average.toFixed(1) : "",
    adult: movie.adult,
    genres: movie.genres ? movie.genres.map((g: any) => g.name) : [],
    popularity: movie.popularity,
  };
}
export type MovieInterface = ReturnType<typeof formatMovie>;

export function formatTVShow(show: any) {
  return {
    id: show.id.toString(),
    title: show.name,
    description: show.overview,
    posterUrl: getImageUrl(show.poster_path, POSTER_SIZES.medium),
    backdropUrl: getImageUrl(show.backdrop_path, BACKDROP_SIZES.large),
    mediaType: "tv" as const,
    year: show.first_air_date ? show.first_air_date.substring(0, 4) : "",
    rating: show.vote_average ? show.vote_average.toFixed(1) : "",
    genres: show.genres ? show.genres.map((g: any) => g.name) : [],
    adult: show.adult,
    popularity: show.popularity,
  };
}
export type TvInterface = ReturnType<typeof formatTVShow>;

export function formatCastMember(person: any) {
  return {
    id: person.id.toString(),
    name: person.name,
    character: person.character,
    profileUrl: getImageUrl(person.profile_path, PROFILE_SIZES.medium),
  };
}

export function formatCrewMember(person: any) {
  return {
    id: person.id.toString(),
    name: person.name,
    job: person.job,
  };
}
