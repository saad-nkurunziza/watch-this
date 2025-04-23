"use client";

import React from "react";

import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import useSWR from "swr";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2, SearchIcon } from "lucide-react";
import { fetcher, sanitizeInput } from "@/lib/utils";

interface MediaItem {
  id: number;
  title: string;
  mediaType: "movie" | "tv";
  year: string;
}

export function SearchForm() {
  const pathname = usePathname();
  const { replace, push } = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);

  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    try {
      const storedSearches = localStorage.getItem("recent-searches");
      if (storedSearches) {
        setRecentSearches(JSON.parse(storedSearches));
      }
    } catch (error) {
      console.error("Error reading from localStorage:", error);
    }
  }, []);

  const { data, error, isLoading } = useSWR(
    searchQuery.trim()
      ? `/api/search?query=${encodeURIComponent(sanitizeInput(searchQuery))}`
      : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      dedupingInterval: 5000,
    }
  );

  const results = data || { movies: [], tv: [] };

  const executeSearch = (value: string) => {
    const sanitizedValue = sanitizeInput(value);

    if (sanitizedValue !== searchQuery) {
      setSearchQuery(sanitizedValue);

      const params = new URLSearchParams(searchParams.toString());

      if (sanitizedValue) {
        params.set("query", sanitizedValue);
      } else {
        params.delete("query");
      }

      replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  };

  const handleSearchClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      e.preventDefault();

      executeSearch(inputValue);

      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 0);
    },
    [executeSearch, inputValue]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  const saveToRecentSearches = useCallback((searchTerm: string) => {
    if (!searchTerm.trim()) return;

    setRecentSearches((prev) => {
      const filtered = prev.filter((item) => item !== searchTerm);
      const newSearches = [searchTerm, ...filtered].slice(0, 5);

      try {
        localStorage.setItem("recent-searches", JSON.stringify(newSearches));
      } catch (error) {
        console.error("Error writing to localStorage:", error);
      }

      return newSearches;
    });
  }, []);

  const handleItemSelect = useCallback(
    (id: number, mediaType: "movie" | "tv", title: string) => {
      saveToRecentSearches(title);
      setOpen(false);
      push(`/details/${mediaType}/${id}`);
    },
    [push, saveToRecentSearches]
  );

  const handleInputKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        executeSearch(inputValue);
        if (searchButtonRef.current) {
          searchButtonRef.current.focus();
        }
      }
    },
    [executeSearch, inputValue]
  );

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-full md:w-[260px] pl-8 justify-start text-sm text-muted-foreground bg-black/60 border-none hover:bg-black/80 focus-visible:ring-white/20"
        onClick={() => setOpen(true)}
        aria-label="Search for movies or TV shows"
      >
        <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4" />
        <span className="truncate">Search for movies or TV shows</span>
        <kbd className="hidden md:inline-flex ml-auto pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="gap-2 flex w-full flex-1 items-center">
          <CommandInput
            ref={inputRef}
            placeholder="Search for movies or TV shows..."
            value={inputValue}
            onValueChange={setInputValue}
            onKeyDown={handleInputKeyDown}
            className="border-0 focus:ring-0 w-full"
          />
          <Button
            ref={searchButtonRef}
            size="sm"
            // variant="ghost"
            className="h-8 px-2 text-muted-foreground hover:text-foreground"
            onClick={handleSearchClick}
            aria-label="Search"
          >
            Search
          </Button>
        </div>

        <CommandList>
          {isLoading && (
            <div className="flex items-center justify-center py-6">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span className="ml-2">Searching...</span>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center py-6 text-destructive">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span>Failed to load results. Please try again.</span>
            </div>
          )}

          {!isLoading && !error && (
            <>
              <CommandEmpty>
                {searchQuery.trim() ? (
                  <p>No results found for "{searchQuery}"</p>
                ) : (
                  <div className="py-6 text-center">
                    <p>Enter your search and click the search button</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      or press Enter to search
                    </p>
                  </div>
                )}
              </CommandEmpty>

              {!searchQuery.trim() && recentSearches.length > 0 && (
                <CommandGroup heading="Recent Searches">
                  {recentSearches.map((term, index) => (
                    <CommandItem
                      key={`recent-${index}`}
                      value={`recent-${term}`}
                      onSelect={() => {
                        setInputValue(term);
                        executeSearch(term);
                      }}
                    >
                      <span>{term}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {results.movies?.length > 0 && (
                <>
                  <CommandGroup heading="Movies">
                    {results.movies.map((movie: MediaItem) => (
                      <ResultCard
                        key={`movie-${movie.id}`}
                        media={movie}
                        onSelect={handleItemSelect}
                      />
                    ))}
                  </CommandGroup>

                  {results.tv?.length > 0 && <CommandSeparator />}
                </>
              )}

              {results.tv?.length > 0 && (
                <CommandGroup heading="TV Shows">
                  {results.tv.map((tv: MediaItem) => (
                    <ResultCard
                      key={`tv-${tv.id}`}
                      media={tv}
                      onSelect={handleItemSelect}
                    />
                  ))}
                </CommandGroup>
              )}
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}

const ResultCard = React.memo(
  ({
    media,
    onSelect,
  }: {
    media: MediaItem;
    onSelect: (id: number, mediaType: "movie" | "tv", title: string) => void;
  }) => {
    return (
      <CommandItem
        value={`${media.mediaType}-${media.id}-${media.title}`}
        className="flex justify-between"
        onSelect={() => onSelect(media.id, media.mediaType, media.title)}
      >
        <span className="truncate">{media.title}</span>
        <span className="text-muted-foreground text-sm ml-2 shrink-0">
          {media.year}
        </span>
      </CommandItem>
    );
  }
);
ResultCard.displayName = "ResultCard";
