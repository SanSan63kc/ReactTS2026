import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider"
import i18n from "shared/config/i18n/i18n"
import { Profile } from "../../types/profile"

export let fetchProfileData = createAsyncThunk<
  Profile,
  void,
  ThunkConfig<string>
>("profile/fetchProfileData", async (_, thunkApi) => {
  let { extra, rejectWithValue } = thunkApi

  try {
    let response = await extra.api.get<Profile>('/profile');

    return response.data
  } catch (e) {
    //console.log(e)
    return rejectWithValue(i18n.t("не удалось получить данные профиля"))
  }
})
