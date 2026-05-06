import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider"
import i18n from "shared/config/i18n/i18n"
import { Profile } from "../../types/profile"
import { getProfileForm } from "../../selectors/getProfileForm/getProfileForm"

export let updateProfileData = createAsyncThunk<
  Profile,
  void,
  ThunkConfig<string>
>("profile/updateProfileData", async (_, thunkApi) => {
  let { extra, rejectWithValue, getState } = thunkApi

  let formData = getProfileForm(getState())

  try {
    let response = await extra.api.put<Profile>("/profile", formData)
    return response.data
  } catch (e) {
    //console.log(e)
    return rejectWithValue(i18n.t("не удалось обновить данные профиля"))
  }
})
