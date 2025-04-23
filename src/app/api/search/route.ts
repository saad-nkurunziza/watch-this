import { NextRequest, NextResponse } from "next/server";
import { searchMedia } from "@/lib/media";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("query") || "";
  const result = await searchMedia(query);
  return NextResponse.json({
    movies: result.movies,
    tv: result.tvShows,
  });
}
