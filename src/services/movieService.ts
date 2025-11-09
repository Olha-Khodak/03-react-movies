import axios from "axios";
import type { AxiosResponse } from "axios";
import type { Movie } from "../types/movie";

const token = import.meta.env.VITE_TMDB_TOKEN as string;

interface ApiMovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

export default async function fetchMovie(
  query: string,
  page = 1
): Promise<ApiMovieResponse> {
  if (!token) {
    throw new Error(
      "VITE_TMDB_TOKEN is not defined. Add it to your .env file."
    );
  }

  const response: AxiosResponse<ApiMovieResponse> = await instance.get(
    "/search/movie",
    {
      params: {
        query,
        page,
        include_adult: false,
        language: "en-US",
      },
    }
  );

  return response.data;
}
