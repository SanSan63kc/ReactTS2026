import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "app/providers/StoreProvider"
import i18n from "shared/config/i18n/i18n"
import { Profile, ValidateProfileError } from "../../types/profile"
import { getProfileForm } from "../../selectors/getProfileForm/getProfileForm"
import { validateProfileData } from "../validateProfileData/validateProfileData"

export let updateProfileData = createAsyncThunk<
  Profile,
  void,
  ThunkConfig<ValidateProfileError[]>
>("profile/updateProfileData", async (_, thunkApi) => {
  let { extra, rejectWithValue, getState } = thunkApi

  let formData = getProfileForm(getState())

  let errors = validateProfileData(formData)

  if (errors.length) {
    return rejectWithValue(errors)
  }

  try {
    let response = await extra.api.put<Profile>(
      `/profile/${formData?.id}`,
      formData,
    )
    return response.data
  } catch (e) {
    //console.log(e)
    return rejectWithValue([ValidateProfileError.SERVER_ERROR])
  }
})
