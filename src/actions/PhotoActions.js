import { createAsyncThunk } from "@reduxjs/toolkit";

export const LIMIT = 5;

export const fetchPhotos = createAsyncThunk(
  "photos/fetchPhotos",

  async (page, { getState }, thunkAPI) => {
    try {
      const { totalFetchedPages } = getState().photos;
      if (page <= totalFetchedPages) return { cached: true };

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${LIMIT}`
      );
      console.log("API called");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      return { page, data, cached: false };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deletePhoto = createAsyncThunk(
  "photos/deletePhoto",
  async (photoId, thunkAPI) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/photos/${photoId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete photo");
      }

      return photoId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editPhoto = createAsyncThunk(
  "photos/editPhoto",
  async ({ id, title, albumId }, thunkAPI) => {
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/photos/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, albumId }),
        }
      );

      if (!res.ok) throw new Error("Failed to update photo");

      const updated = await res.json();
      return { id, title: updated.title, albumId: updated.albumId };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
