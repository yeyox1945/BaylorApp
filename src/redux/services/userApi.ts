import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../models/usersResponse";
import { Album } from "../../models/albumsResponse";
import { Photo } from "../../models/photosResponse";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], null>({
      query: () => "/users",
    }),
    getAlbumsByUserId: builder.query<Album[], number>({
      query: (userId) => `/albums?userId=${userId}`,
    }),
    getAllPhotos: builder.query<Photo[], null>({
      query: () => "/photos",
    }),
    getPhotosByAlbumId: builder.query<Photo[], number>({
      query: (albumId) => `/photos?albumId=${albumId}`,
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetAlbumsByUserIdQuery,
  useGetAllPhotosQuery,
  useGetPhotosByAlbumIdQuery,
} = usersApi;
