import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface DeletedAlbumsState {
  deletedAlbums: number[];
}

const initialState: DeletedAlbumsState = {
  deletedAlbums: [],
};

export const deletedSlice = createSlice({
  name: "deletedAlbums",
  initialState,
  reducers: {
    deleteAlbum: (state, action: PayloadAction<number>) => {
      state.deletedAlbums.push(action.payload);
    },
  },
});

export const { deleteAlbum } = deletedSlice.actions;

export default deletedSlice.reducer;
