import axios from "axios"
import { USER_LOCALSTORAGE_KEY } from "shared/const/localstorage"

let baseUrl = __IS_DEV__ ? "http://localhost:8000" : "https://production.ru"

export let $api = axios.create({
    baseURL: baseUrl /* __API__ */,
    headers: {
        authorization: localStorage.getItem(USER_LOCALSTORAGE_KEY)
    }
})
