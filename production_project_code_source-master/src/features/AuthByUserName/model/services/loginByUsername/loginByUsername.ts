import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { User } from "entities/User"
import i18n from "shared/config/i18n/i18n"

interface LoginByUsernameProps {
  username: string
  password: string
}

export let loginByUsername = createAsyncThunk<User, LoginByUsernameProps, {rejectValue: string}>(
  "login/loginByUsername",
  async (authData, thunkAPI) => {
    try {
      let response = await axios.post<User>("http://localhost:8000/login", authData)

      if(!response.data){
        throw new Error()
      }

      return response.data
    } catch (e) {
        console.log(e)
        return thunkAPI.rejectWithValue(i18n.t("Вы ввели неверный логин или пароль"))
    }
  },
)


