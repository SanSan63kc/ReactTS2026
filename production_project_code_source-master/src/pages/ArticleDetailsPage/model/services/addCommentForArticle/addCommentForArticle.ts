import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider"
import { Comment } from "entities/Comment/model/types/comment"
import { getUserAuthData, User, userActions } from "entities/User"
import i18n from "shared/config/i18n/i18n"
import { getArticleDetailsData } from "entities/Article/model/selectors/articleDetails"
//import { addCommentFormActions } from "features/addCommentForm/model/slices/addCommentFormSlice"
//import { getAddCommentFormText } from "features/addCommentForm/model/selectors/addCommentFormSelectors"
import { fetchCommentsByArticleId } from "../fetchCommentsByArticleId/fetchCommentsByArticleId"

export let addCommentForArticle = createAsyncThunk<Comment, string, ThunkConfig<string>>(
  "articleDetauls/addCommentForArticle",
  async (text, thunkApi) => {
    let { dispatch, extra, rejectWithValue, getState } = thunkApi

    let userData = getUserAuthData(getState())

    let article = getArticleDetailsData(getState())

    if (!userData || !text || !article) {
      return rejectWithValue("нет допуска к написанию комментов")
    }

    try {
      let response = await extra.api.post<Comment>("/comments", {
        articleId: article.id,
        userId: userData.id,
        text,
      })

      if (!response.data) {
        throw new Error()
      }

      dispatch(fetchCommentsByArticleId(article.id))

      return response.data
    } catch (e) {
      return rejectWithValue(i18n.t("Вы ввели неверный логин или пароль"))
    }
  },
)
