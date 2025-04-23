import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.message = `Error ${res.status}: ${res.statusText}`;
    throw error;
  }
  return res.json();
};

export const sanitizeInput = (input: string): string => {
  return input.replace(/[^\w\s]/gi, "").trim();
};

export const genreColorMap: Record<string, string> = {
  Action: "red",
  Adventure: "amber",
  Animation: "blue",
  Comedy: "yellow",
  Crime: "indigo",
  Documentary: "teal",
  Drama: "purple",
  Family: "green",
  Fantasy: "violet",
  History: "amber",
  Horror: "red",
  Music: "pink",
  Mystery: "indigo",
  Romance: "pink",
  "Science Fiction": "blue",
  "TV Movie": "gray",
  Thriller: "red",
  War: "gray",
  Western: "amber",
};

export const statusColorMap: Record<string, string> = {
  Released: "green",
  "Post Production": "amber",
  "In Production": "blue",
  Planned: "purple",
  Canceled: "red",
  Rumored: "gray",
  "Returning Series": "green",
  Ended: "gray",
};
