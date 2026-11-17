import { combineReducers } from "@reduxjs/toolkit";
import { ArticleDetailsPageSchema } from "../types";
import { articleDetailsPageRecommendationsReducer } from "./articleDetailsPageRecommendationsSlice";
import { articleDetailsCommentReducer } from "./articleDetailsCommentSlice";

export let articleDetailsPageReducer = combineReducers({
    recommendations: articleDetailsPageRecommendationsReducer,
    comments: articleDetailsCommentReducer
})