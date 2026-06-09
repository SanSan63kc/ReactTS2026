import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider"
import { Article } from "entities/Article"
import i18n from "shared/config/i18n/i18n"

export let fetchArticlesList = createAsyncThunk<
  Article[],
  void,
  ThunkConfig<string>
>("articlesPage/fetchArticlesList", async (articleId, thunkApi) => {
  let { extra, rejectWithValue } = thunkApi

  try {
    let response = await extra.api.get<Article[]>(`/articles`, {
        params: {
            _expand: "user"
        }
    })
    return response.data
  } catch (e) {
    return rejectWithValue(
      i18n.t("не удалось получить данные о комментариях к статье"),
    )
  }
})
