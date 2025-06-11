import { createSlice } from "@reduxjs/toolkit";

interface FileUploadState {
  files: (File | null)[];
}

const initialState: FileUploadState = {
  files: [null, null, null],
};

const fileUploadSlice = createSlice({
  name: "fileUpload",
  initialState,
  reducers: {
    setFile: (state, action) => {
      const { index, file } = action.payload;
      state.files[index] = file;
    },
    resetFiles: (state) => {
      state.files = [null, null, null];
    },
  },
});

export const { setFile, resetFiles } = fileUploadSlice.actions;

export default fileUploadSlice.reducer;
