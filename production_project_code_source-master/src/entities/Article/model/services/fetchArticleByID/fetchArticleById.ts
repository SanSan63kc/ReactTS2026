import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider"
import i18n from "shared/config/i18n/i18n"
import { Article } from "../../types/article"

export let fetchArticleById = createAsyncThunk<
  Article,
  string,
  ThunkConfig<string>
>("articleDetails/fetchArticleById", async (articleId, thunkApi) => {
  let { extra, rejectWithValue } = thunkApi

  try {
    let response = await extra.api.get<Article>(`/articles/${articleId}`)
    return response.data
  } catch (e) {
    //console.log(e)
    return rejectWithValue(i18n.t("не удалось получить данные статьи"))
  }
})
