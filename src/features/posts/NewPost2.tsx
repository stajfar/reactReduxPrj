//import React, { FormEvent, useState, useEffect } from 'react';
//import validator from '@rjsf/validator-ajv8';
//import Form from '@rjsf/mui';
//import { RJSFSchema, UiSchema } from '@rjsf/utils';
//import { IChangeEvent } from '@rjsf/core';
//import { nanoid } from '@reduxjs/toolkit';
//import {  useDispatch } from 'react-redux';
//import { addNewPost, Post } from './PostsSlice';
//import { selectAllUsers, UserState, fetchUsers } from '../users/UsersSlice';
//import { useSelector } from 'react-redux';
//import { useAppDispatch } from '../../app/store';
//import { useNavigate } from 'react-router-dom';


////extend JSONSchema7 by enumNames
//import { JSONSchema7 } from 'json-schema';
//declare module 'json-schema' {
//    export interface JSONSchema7 {
//        enumNames?: Array<string>;
//    }
//}


//function NewPost2() {
//    const navigate = useNavigate();

//    const [submissionState, setSubmissionState] = useState({});
//    //const dispatch = useDispatch();
//    const dispatch = useAppDispatch();
//    const usersState: UserState = useSelector(selectAllUsers);

//    const keyValues = usersState.users.map(u => ({enumId: u.id, enumText: u.name }));


//    const schema: RJSFSchema = {//any inseated of RJSFSchema
//        "title": "A registration form",
//        "description": "Desctiption of the Form, as a sample.",
//        "type": "object",
//        "required": [
//            "title",
//            "body"
//        ],
//        "properties": {
//            "title": {
//                "type": "string",
//                "title": "Title"
//            },
//            "body": {
//                "type": "string",
//                "title": "Body"
//            },
//            "user": {
//                "type": "number",
//                "title": "Post Author",
//                "enum": keyValues.map(e => e.enumId),
//                "enumNames": keyValues.map(e => e.enumText)
//            }
//        }
//    };

//    const uiSchema: UiSchema = {
//        "title": {
//            "ui:autofocus": true,
//            "ui:emptyValue": "",
//            "ui:placeholder": "Post Title",
//            "ui:autocomplete": "post-title",
//            "ui:enableMarkdownInDescription": true,
//            "ui:description": "Make text **bold** or *italic*. Take a look at other options "
//        },
//        "body": {
//            "ui:autocomplete": "post-body",
//            "ui:emptyValue": "",
//            "ui:enableMarkdownInDescription": true,
//            "ui:description": "Make things **bold** or *italic*. Embed snippets of `code`. <small>And this is a small texts.</small> ",
//            "ui:widget": "textarea"
//        },
//        "user": {
//            "ui:widget": "select",
//            "ui:placeholder": "Foo"
//        }
//    };

//    const log = (type: any) => console.log.bind(console, type);

//    useEffect(() => {
//        console.log('use efect exectuted to get all users inside new post');
//        const fetchedUsers = async () => {
//            try {
//                console.log(usersState.status);
//                if (usersState.status === 'idle')
//                    dispatch(fetchUsers());
//            } catch (error: any) {
//                if (error.response) {
//                    console.log(error.response.data);
//                    console.log(error.response.headers);
//                    console.log(error.response.status);
//                } else {
//                    console.log(error.message);
//                }
//            }
//        }
//        fetchedUsers();
//    }, [dispatch, usersState.status]);

//    const handleFormChange = (data: IChangeEvent, control?: string) => {
//        if (data.formData)
//            setSubmissionState(data.formData);
//    }

//    const handleFormSubmit = (data: IChangeEvent, event: FormEvent) => {
//        if (data.formData) {
//            const id = nanoid();//some random string for now, backend creates these

//            const entry: any = JSON.parse(JSON.stringify(data.formData));
//            const myNewPost: Post = { userId: entry.user, id: id, title: entry.title, body: entry.body };


//            const submitPosts = async () => {
//                try {
//                    //async the global state
//                    dispatch(addNewPost(myNewPost));

//                    //reset form after adding the post
//                    setSubmissionState({});

//                } catch (error: any) {
//                    if (error.response) {
//                        // The request was made and the server responded with a status code
//                        // that falls out of the range of 2xx
//                        console.log(error.response.data);
//                        console.log(error.response.status);
//                        console.log(error.response.headers);
//                    } else if (error.request) {
//                        // The request was made but no response was received
//                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
//                        // http.ClientRequest in node.js
//                        console.log(error.request);
//                    } else {
//                        // Something happened in setting up the request that triggered an Error
//                        console.log('Error', error.message);
//                    }
//                }
//            }
//            submitPosts();
//        }
//    }

//    return (
//        <main className="NewPost">
//            <Form
//                schema={schema}
//                uiSchema={uiSchema}
//                validator={validator}
//                onChange={handleFormChange}
//                onSubmit={handleFormSubmit}
//                onError={log('errors')}
//                formData={submissionState}
//            />
//        </main>
//    );
//}

//export default NewPost2;


import React from 'react';

function NewPost2() {
    return (
        <p>Hello world!</p>
    );
}

export default NewPost2;