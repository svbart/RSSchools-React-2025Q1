import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { PlanetCharacteristics } from '../common/types/types';
import { getIdFromUrl } from '../common/utils/utils';

export interface PlanetsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PlanetCharacteristics[];
}

// Define a service using a base URL and expected endpoints
export const planetsApi = createApi({
  reducerPath: 'planetsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/planets' }),
  tagTypes: ['Planets', 'Planet'],
  endpoints: (builder) => ({
    getPlanetById: builder.query<Partial<PlanetCharacteristics>, number>({
      query: (id) => {
        if (id === 0) {
          return '';
        }
        return `${id}`;
      },
      providesTags: (_, error) => {
        if (error) {
          return [];
        }
        return [{ type: 'Planet', id: 'ITEM' }];
      },
    }),
    getPlanetsByPage: builder.query<
      PlanetsResponse,
      {
        pageNumber: number;
        searchValue: string;
        itemToShowDetails: PlanetCharacteristics | null;
      }
    >({
      query: ({ pageNumber, searchValue, itemToShowDetails }) => {
        if (itemToShowDetails) {
          const id = getIdFromUrl(itemToShowDetails.url);
          return `/${id}`;
        }
        if (searchValue) {
          return `?search=${searchValue}&page=${pageNumber}`;
        } else {
          return `?page=${pageNumber}`;
        }
      },
      providesTags: (_, error) => {
        if (error) {
          return [];
        }
        return [{ type: 'Planets', id: 'LIST' }];
      },
    }),
  }),
});

export const { useGetPlanetByIdQuery, useGetPlanetsByPageQuery } = planetsApi;
