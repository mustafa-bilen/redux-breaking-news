import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  newsList: [],
  loading: false,
  error: false,
};

export const getNews = createAsyncThunk(
  "getNews",
  async (thunkAPI, { rejectedWithValue }) => {
    const API_KEY = "73f8d230646a41acb1f731cf6871b060";
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

    try {
      const { data } = await axios(url);
      return data.articles;
    } catch (error) {
      console.log(error);
      return rejectedWithValue("Something went wrong");
    }
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    clearNewList: (state) => {
      state.newsList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNews.fulfilled, (state, { payload }) => {
        state.newsList = payload;
        state.loading = false;
      })
      .addCase(getNews.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { clearNewList } = newsSlice.actions;

export default newsSlice.reducer;
