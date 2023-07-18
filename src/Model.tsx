import { IChangeEvent } from "@rjsf/core"
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

export type FormProp = {
    submissionState?: any
    handleFormChange?: (data: IChangeEvent, controlId?: string) => void,
    handleFormSubmit?: (data: IChangeEvent, event: FormEvent) => void,
    handleFormError?: () => void,
}



