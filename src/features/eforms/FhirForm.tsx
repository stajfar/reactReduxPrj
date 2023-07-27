import React, { FormEvent, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import validator from '@rjsf/validator-ajv8';
import Form from '@rjsf/mui';
import { RJSFSchema, UiSchema } from '@rjsf/utils';
import { IChangeEvent } from '@rjsf/core';

import fhirPath from "fhirpath";
import fhirpath_r4_model from 'fhirpath/fhir-context/r4';

import { useSchemaResolver } from '../hooks/useSchemaResolver';
import { selectFhirResources } from '../FHIR/FhirResourceSlice';

//extend JSONSchema7 by enumNames
import { JSONSchema7 } from 'json-schema';
declare module 'json-schema' {
    export interface JSONSchema7 {
        custompProperties?: { key: string, value: string }[];//array of key-value
    }
}



//it is recommended to pass in the ids to child components like this component as following
function FhirForm() {

    const [submissionState, setSubmissionState] = useState({});

    console.log('loading patient summary')



    //these goes to DB ---> schema, uiSchema
    const schema: RJSFSchema = {
        "title": "A registration form",
        "description": "Desctiption of the Form, as a sample.",
        "type": "object",
        "required": [
            "firstname",
            "lastname"
        ],
        "properties": {
            "firstname": {
                "type": "string",
                "title": "First Name",
                "custompProperties": [
                    {
                        "key": "fhirElement",
                        "value": "Patient.name.where(use='official').given.first()"
                    }
                ]
            },
            "lastname": {
                "type": "string",
                "title": "Last Name",
                "custompProperties": [
                    {
                        "key": "fhirElement",
                        "value": "Patient.name.where(use='official').family.first()"
                    }
                ]
            }
        }
    };



    const uiSchema: UiSchema = {
        "firstname": {
            "ui:autofocus": true,
            "ui:emptyValue": "",
            "ui:placeholder": "First Name",
            "ui:autocomplete": "patient-firstname",
            "ui:enableMarkdownInDescription": true,
            "ui:description": "Make text **bold** or *italic*. Take a look at other options ",
        },
        "lastname": {
            "ui:emptyValue": "",
            "ui:placeholder": "Last Name",
            "ui:autocomplete": "patient-lastname",
            "ui:enableMarkdownInDescription": true,
            "ui:description": "Make things **bold** or *italic*. Embed snippets of `code`. <small>And this is a small texts.</small> ",
        }
    };


    const fhirResourceState = useSelector(selectFhirResources);//this is fhir patient need to use fhir path to get its details.
    const patient = fhirResourceState.fhirResouces.patient;

    console.log('patient state seleted succ from the store');
    console.log(fhirResourceState);
   


    const initialFormData = Object.fromEntries(useSchemaResolver(schema)?.entries());



    const findInFhirPath = (resource: any, path: string) => {
        return fhirPath.evaluate(resource, path, undefined, fhirpath_r4_model);
    }

    useSchemaResolver(schema).forEach((fhirPath, key) => {
        const value = findInFhirPath(patient, fhirPath);
        initialFormData[key] = value[0];
    })



    useEffect(() => {
        setSubmissionState(initialFormData);
    }, [initialFormData.firstname]);//avoid using object directly as depandancy firstobj is not === to 2nd object// or use premitives




    // console.log();

    const handleFormChange = (data: IChangeEvent, control?: string) => {
        if (data.formData)
            setSubmissionState(data.formData);
    }

    const handleFormSubmit = (data: IChangeEvent, event: FormEvent) => {
        if (data.formData) {


            const entry: any = JSON.parse(JSON.stringify(data.formData));

            console.log(entry);

            const submitPosts = async () => {
                try {
                    //async the global state
                    console.log('form submitted');

                    //reset form after adding the post
                    setSubmissionState({});

                } catch (error: any) {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                    }
                }
            }
            submitPosts();
        }
    }
    const log = (type: any) => console.log.bind(console, type);

    return (
        <article className="post">
            {patient && <>
                <Form
                    schema={schema}
                    uiSchema={uiSchema}
                    validator={validator}
                    onChange={handleFormChange}
                    onSubmit={handleFormSubmit}
                    onError={log('errors')}
                    formData={submissionState}
                />


            </>}
        </article>
    );
}

export default FhirForm;