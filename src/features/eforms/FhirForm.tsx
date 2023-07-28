import React, { FormEvent, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import fhirPath from "fhirpath";
import fhirpath_r4_model from 'fhirpath/fhir-context/r4';

import { schemaResolver } from '../hooks/useSchemaResolver';
import { selectFhirResources } from '../FHIR/FhirResourceSlice';

import {
    materialCells,
    materialRenderers,
} from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';



function FhirForm() {


   

    const schema = {
        "type": "object",
        "properties": {
            "firstName": {
                "type": "string",
                "minLength": 3,
                "description": "Please enter  first name",
                "custompProperties": [
                    {
                        "key": "fhirElement",
                        "value": "Patient.name.where(use='official').given.first()"
                    }
                ]
            },
            "lastName": {
                "type": "string",
                "minLength": 3,
                "description": "Please enter last name",
                "custompProperties": [
                    {
                        "key": "fhirElement",
                        "value": "Patient.name.where(use='official').family.first()"
                    }
                ]
            },          
            "birthDate": {
                "type": "string",
                "format": "date"
            },           
            "personalData": {
                "type": "object",
                "properties": {
                    "age": {
                        "type": "integer",
                        "description": "Please enter your age."
                    }
                },
                "required": [
                    "age"
                ]
            }           
        },
       
    };
    const uischema = {
        "type": "VerticalLayout",
        "elements": [
            {
                "type": "HorizontalLayout",
                "elements": [
                    {
                        "type": "Control",
                        "scope": "#/properties/firstName"
                    },
                    {
                        "type": "Control",
                        "scope": "#/properties/lastName"
                    },
                    {
                        "type": "Control",
                        "scope": "#/properties/personalData/properties/age"
                    },
                    {
                        "type": "Control",
                        "scope": "#/properties/birthDate"
                    }
                ]
            },
            {
                "type": "Label",
                "text": "Additional Information"
            }
        ]
    };

  
    const fhirResourceState = useSelector(selectFhirResources);//this is fhir patient need to use fhir path to get its details.
   

    console.log('patient state seleted succ from the store');   

    const [submissionState, setSubmissionState] = useState(null);

    const findInFhirPath = (resource: any, path: string) => {
        return fhirPath.evaluate(resource, path, undefined, fhirpath_r4_model);
    }


    useEffect(() => {       
      console.log('use effect executing');
        try {

            if (fhirResourceState.status === 'succeeded') {
                const patient = fhirResourceState.fhirResouces.patient;

                let initialFormData: any = {};
                schemaResolver(schema).forEach((fhirPath, key) => {
                    const value = findInFhirPath(patient, fhirPath);
                    initialFormData[key] = value[0];
                });

                //console.log('setting SubmissionState in useEffect to:');
                //console.log(submissionState); 
                setSubmissionState(initialFormData);
            }
        } catch (error: any) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.headers);
                console.log(error.response.status);
            } else {
                console.log(error.message);
            }
        }
       
    }, [fhirResourceState]);//avoid using object directly as depandancy firstobj is not === to 2nd object// or use premitives



    const handleFormChange = (data: any, errors: any) => {
        console.log('data on form change');
        console.log(data);
        //console.log('data on form change error');
        //console.log(errors);
       
        if (data)
            setSubmissionState(data);
    }

    const handleFormSubmit = (event: any) => {
        console.log(event);
      event.preventDefault()
        if (submissionState) {

            console.log(submissionState);
            const entry: any = JSON.parse(JSON.stringify(submissionState));

            console.log(entry);

            const submitPosts = async () => {
                try {
                    //async the global state
                    console.log('form submitted');

                    //reset form after adding the post
                    setSubmissionState(null);

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
   // const log = (type: any) => console.log.bind(console, type);

    return (       
        <article className="post">
            {             
                <>
                  
                {/*{console.log('print state')}*/}
                {/*{console.log(submissionState)}*/}
                 
                <JsonForms
                    schema={schema}
                    uischema={uischema}
                    data={submissionState}
                    renderers={materialRenderers}
                    cells={materialCells}
                    onChange={({ errors, data }) => handleFormChange(data, errors)}
                />
              
                <button type='button' onClick={handleFormSubmit}>Update Post</button>

            </>}
        </article>
    );
}

export default FhirForm;