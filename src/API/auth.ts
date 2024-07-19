import axios, { AxiosInstance, AxiosResponse } from "axios";

const apiBaseUrl = "https://api.kinopoisk.dev/v1.4/";
const apiKey = "M5H762R-BTX4X3E-MVMMTTC-GZ2KVWP";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "X-API-KEY": apiKey,
    accept: "application/json",
  },
});

interface contriesMovie {
  name?: string;
}
interface genresMovie {
  name?: string;
}
interface ratingI {
  await?: number;
  filmCritics?: number;
  imdb?: number;
  kp?: number;
  russianFilmCritics?: number;
}

export interface docsI {
  ageRating?: number;
  alternativeName?: string;
  countries?: contriesMovie[];
  description?: string;
  enName?: string;
  genres?: genresMovie[];
  id?: number;
  isSeries?: boolean;
  movieLength?: number;
  name?: string;
  rating?: ratingI;
  status?: string;
  ticketsOnSale?: boolean;
  type?: string;
  typeNumber?: number;
  year?: number;
  poster?: {
    url?: string;
    previewUrl?: string;
  };
}

export interface moviesI {
  docs?: docsI[];
}

export async function fetchData(page: string, limit: string = "250") {
  try {
    const { data }: AxiosResponse<moviesI> = await axiosInstance.get("movie", {
      params: {
        page,
        limit,
      },
    });
    return data.docs;
  } catch (error) {
    console.error('Ошибка', error);
  }
}
