import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Profile, ProfileSchema } from "../types/profile"
import { fetchProfileData } from "../services/fetchProfileData/fetchProfileData"
import { updateProfileData } from "../services/updateProfileData/updateProfileData"

let initialState: ProfileSchema = {
  readonly: true,
  isLoading: false,
  error: undefined,
  data: undefined,
}

export const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setReadonly: (state, action: PayloadAction<boolean>) => {
      state.readonly = action.payload
    },
    cancelEdit: (state) => {
      state.readonly = true
      state.validateError = undefined
      state.form = state.data
    },
    updateProfile: (state, action: PayloadAction<Profile>) => {
      state.form = {
        ...state.data,
        ...action.payload,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchProfileData
      .addCase(fetchProfileData.pending, (state) => {
        state.validateError = undefined
        state.isLoading = true
      })
      .addCase(
        fetchProfileData.fulfilled,
        (state, action: PayloadAction<Profile>) => {
          state.isLoading = false
          state.data = action.payload
          state.form = action.payload
        },
      )
      .addCase(fetchProfileData.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // updateProfileData
      .addCase(updateProfileData.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(
        updateProfileData.fulfilled,
        (state, action: PayloadAction<Profile>) => {
          state.isLoading = false
          state.data = action.payload
          state.form = action.payload
          state.readonly = true
          state.validateError = undefined
        },
      )
      .addCase(updateProfileData.rejected, (state, action) => {
        state.isLoading = false
        state.validateError = action.payload
      })
  },
})

// Экспортируем экшены для использования в компонентах
export const { actions: profileActions } = profileSlice
export const { reducer: profileReducer } = profileSlice
