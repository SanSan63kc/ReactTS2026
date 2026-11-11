import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider"
import { Article } from "entities/Article"
import i18n from "shared/config/i18n/i18n"
import {
  getArticlesPageLimit,
  getArticlesPageNum,
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
} from "../../selectors/articlesPageSelectors"

interface FetchArticleListProps {
  replace?: boolean
}

export let fetchArticlesList = createAsyncThunk<
  Article[],
  FetchArticleListProps,
  ThunkConfig<string>
>("articlesPage/fetchArticlesList", async (_, thunkApi) => {
  let { extra, rejectWithValue, getState } = thunkApi

  let limit = getArticlesPageLimit(getState())
  let page = getArticlesPageNum(getState())
  let sort = getArticlesPageSort(getState())
  let order = getArticlesPageOrder(getState())
  let search = getArticlesPageSearch(getState())

  try {
    let response = await extra.api.get<Article[]>(`/articles`, {
      params: {
        _expand: "user",
        _limit: limit,
        _page: page,
        _sort: sort,
        _order: order,
        q: search,
      },
    })
    return response.data
  } catch (e) {
    return rejectWithValue(
      i18n.t("не удалось получить данные о комментариях к статье"),
    )
  }
})
