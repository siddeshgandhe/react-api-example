import { createSlice } from "@reduxjs/toolkit";
import { fetchPhotos, deletePhoto, editPhoto } from "../actions/PhotoActions";
const initialState = {
  loading: false,
  photos: [],
  error: "",
  editSuccess: false,
  deleteSuccess: false,
  currentPage: 1,
};

const PhotoSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.photos = action.payload;
      })
      .addCase(fetchPhotos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      .addCase(deletePhoto.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.deleteSuccess = false;
      })
      .addCase(deletePhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.photos = state.photos.filter(
          (photo) => photo.id !== action.payload
        );
        state.deleteSuccess = true;
      })
      .addCase(deletePhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(editPhoto.fulfilled, (state, action) => {
        const { id, title, albumId } = action.payload;
        const photo = state.photos.find((p) => p.id === id);
        if (photo) {
          photo.title = title;
          photo.albumId = albumId;
        }
        state.editSuccess = true;
      });
  },
});

export const {
  fetchStart,
  fetchSuccess,
  fetchFail,
  addStart,
  addSuccess,
  addFail,
} = PhotoSlice.actions;

export const { setPage } = PhotoSlice.actions;

export default PhotoSlice.reducer;
