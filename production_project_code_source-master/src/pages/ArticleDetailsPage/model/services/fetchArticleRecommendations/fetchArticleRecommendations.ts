import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider"
import { Article } from "entities/Article"
import i18n from "shared/config/i18n/i18n"

export let fetchArticleRecommendations = createAsyncThunk<
  Article[],
  void,
  ThunkConfig<string>
>("articlesDetailsPage/fetchArticleRecommendations", async (_, thunkApi) => {
  let { extra, rejectWithValue } = thunkApi

  try {
    let response = await extra.api.get<Article[]>(`/articles`, {
      params: {
        _limit: 4,
      },
    })
    return response.data
  } catch (e) {
    return rejectWithValue(
      i18n.t("не удалось получить данные о рекомендациях к статье"),
    )
  }
})
