import { Comment } from "entities/Comment/model/types/comment"

export interface ArticleDetailsCommentsSchema{
    isLoading?: boolean
    error?: string
    data?: Comment[]
}