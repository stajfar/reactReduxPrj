
import { FormEvent } from "react"

export type PostType = {
    id: number,
    title: string,
    datetime: string,
    body: string,
}

export type PostProp = {
    posts: PostType[],
    handlePostDelete?: (id: number) => void,
    
}




