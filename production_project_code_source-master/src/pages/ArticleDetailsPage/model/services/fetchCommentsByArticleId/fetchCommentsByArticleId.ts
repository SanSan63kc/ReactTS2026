import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider"
import { Comment } from "entities/Comment/model/types/comment"
import i18n from "shared/config/i18n/i18n"

export let fetchCommentsByArticleId = createAsyncThunk<
  Comment[],
  string | undefined,
  ThunkConfig<string>
>("articleDetails/fetchCommentsByArticleId", async (articleId, thunkApi) => {
  let { extra, rejectWithValue } = thunkApi

  if(!articleId){
    return rejectWithValue(i18n.t("не удалось получить данные об идентификаторе статьи"),)
  }

  try {
    let response = await extra.api.get<Comment[]>(`/comments/`, {
        params: {
            articleId,
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
