import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider"
import { getArticlesPageInited } from "../../selectors/articlesPageSelectors"
import { fetchArticlesList } from "../fetchArticlesList/fetchArticlesList"
import { articlesPageActions } from "../../slices/articlePageSlice"
import { ArticleSortField, ArticleType } from "entities/Article"
import { SortOrder } from "shared/types"

export const initArticlesPage = createAsyncThunk<
  void,
  URLSearchParams,
  ThunkConfig<string>
>("articlesPage/initArticlesPage", async (searchParams, thunkApi) => {
  const { getState, dispatch } = thunkApi
  const inited = getArticlesPageInited(getState())
  if (!inited) {
    let orderFromUrl = searchParams.get("order") as SortOrder
    let sortFromUrl = searchParams.get("sort") as ArticleSortField
    let searchFromUrl = searchParams.get("search")
    let typeFromUrl = searchParams.get("type") as ArticleType

    if (orderFromUrl) {
      dispatch(articlesPageActions.setOrder(orderFromUrl))
    }

    if (sortFromUrl) {
      dispatch(articlesPageActions.setSort(sortFromUrl))
    }

    if (searchFromUrl) {
      dispatch(articlesPageActions.setSearch(searchFromUrl))
    }

    if (typeFromUrl) {
      dispatch(articlesPageActions.setType(typeFromUrl))
    }

    dispatch(articlesPageActions.initState())
    dispatch(fetchArticlesList({}))
  }
})
