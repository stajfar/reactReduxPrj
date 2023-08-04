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

import { Button, CardActions, TextField } from '@mui/material';
import { createTheme, ThemeProvider, styled, Theme, useTheme, ThemeOptions } from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import RatingControl from '../../CustomComponents/OutlinedTextFieldControl';
import ratingControlTester from '../../CustomComponents/OutlinedTextFieldControlTester';



const renderers = [
    ...materialRenderers,
    //register custom renderers
    { tester: ratingControlTester, renderer: RatingControl },

];



const customTheme = (outerTheme: Theme) => createTheme({
    //palette: {
    //    background: {
    //        paper: '#EFF7FF', // your color

    //    },
    //},
    typography: {
        // In Chinese and Japanese the characters are usually larger,
        // so a smaller fontsize may be appropriate.
        fontSize: 12,
    },
    spacing: 4,
    components: {
        MuiCardHeader: {
            styleOverrides: {
                root: {
                    'background': '#00000008',
                    'padding': 10

                },
            }

        },
        MuiButtonBase: {
            defaultProps: {
                // The props to change the default for.
                disableRipple: false, // No more ripple, on the whole 

            },
            styleOverrides: {
                root: {
                    //'margin': '1rem',

                },
            },
        },
        MuiTextField: {
            defaultProps: {

                color: "error"

            },
            styleOverrides: {
                root: {
                    //'margin': '1rem',

                },
            },
        },
        //MuiInput: {
        //    defaultProps: {

        //        color: "secondary",
        //       // margin: "dense"

        //    },
        //    styleOverrides: {
        //        root: {
        //           // 'marginBottom': '100px',

        //        },
        //    },
        //},
        MuiFormControl: {
            defaultProps: {

                color: "secondary",
                margin: "dense"

            },
            styleOverrides: {
                root: {
                    //  'marginBottom': '20px',

                },
            },
        },


    }
});




//move schema and ui schema to DB and get them from fhir store
const schema = {
    "type": "object",
    "title": "Person",
    "required": [
        "patientFirstName",
        "patientLastName"
    ],    
    "properties": {
        "patientFirstName": {
            "type": "string",
            "minLength": 2,
            "description": "Please enter  first name",
            "custompProperties": [
                {
                    "key": "fhirElement",
                    "value": "Patient.name.where(use='official').given.first()"
                }
            ]
        },
        "patientLastName": {
            "type": "string",
            "minLength": 2,
            "description": "Please enter last name",
            "custompProperties": [
                {
                    "key": "fhirElement",
                    "value": "Patient.name.where(use='official').family.first()"
                }
            ]
        },
        "patientPhone": {
            "type": "string",
            "minLength": 2,
            "description": "Please enter phone number",
            "custompProperties": [
                {
                    "key": "fhirElement",
                    "value": "Patient.telecom.where(system='phone').value"
                }
            ]
        },
        "patientBirthDate": {
            "type": "string",
            "format": "date",
            "custompProperties": [
                {
                    "key": "fhirElement",
                    "value": "Patient.birthDate"
                }
            ]
        },
        "patientGender": {
            "type": "string",
            "oneOf": [
                {
                    "const": "female",
                    "title": "Female"
                },
                {
                    "const": "male",
                    "title": "Male"
                },
                {
                    "const": "other",
                    "title": "Other"
                },
                {
                    "const": "unknown",
                    "title": "Unknown"
                }
            ],
            "custompProperties": [
                {
                    "key": "fhirElement",
                    "value": "Patient.gender"
                }
            ]
        },
        "patientPHN": {
            "type": "string",
            "custompProperties": [
                {
                    "key": "fhirElement",
                    "value": "Patient.identifier.where(system='http://hl7.org/fhir/sid/us-ssn').value"
                }
            ]
        },
        "patientCountry": {
            "type": "string",
            "custompProperties": [
                {
                    "key": "fhirElement",
                    "value": "Patient.address[0].country"
                }
            ]
        },
        "patientCityTown": {
            "type": "string",
            "custompProperties": [
                {
                    "key": "fhirElement",
                    "value": "Patient.address[0].city"
                }
            ]
        },
        "patientProvinceTeritory": {
            "type": "string",
            "custompProperties": [
                {
                    "key": "fhirElement",
                    "value": "Patient.address[0].state"
                }
            ]
        },
        "patientStreetAddress": {
            "type": "string",
            "custompProperties": [
                {
                    "key": "fhirElement",
                    "value": "Patient.address[0].line[0]"
                }
            ]
        },
        "patientPostalCode": {
            "type": "string",
            "custompProperties": [
                {
                    "key": "fhirElement",
                    "value": "Patient.address[0].postalCode"
                }
            ]
        },
        "alergies": {
            "type": "string"
        },
        //"personalData": {
        //    "type": "object",
        //    "properties": {
        //        "patientAge": {
        //            "type": "integer",
        //            "description": "Please enter your age."
        //        }
        //    },
        //    "required": [
        //        "patientAge"
        //    ]
        //},
        "providerFirstName": {
            "type": "string",
            "minLength": 2,
            "description": "Please enter  first name",
            "custompProperties": [
                {
                    "key": "fhirElement",
                    "value": "Practitioner.name.where(use='official').given.first()"
                }
            ]
        },
        "providerLastName": {
            "type": "string",
            "minLength": 2,
            "description": "Please enter last name",
            "custompProperties": [
                {
                    "key": "fhirElement",
                    "value": "Practitioner.name.where(use='official').family.first()"
                }
            ]
        },
        "providerID": {
            "type": "string",
            "minLength": 2,
            "description": "Please enter last name",
            "custompProperties": [
                {
                    "key": "fhirElement",
                    "value": "Practitioner.name.where(use='official').family.first()"
                }
            ]
        },
        "providerCountry": {
            "type": "string",
            "custompProperties": [
                {
                    "key": "fhirElement",
                    "value": "Practitioner.address[0].country"
                }
            ]
        },
        "providerCityTown": {
            "type": "string",
            "custompProperties": [
                {
                    "key": "fhirElement",
                    "value": "Practitioner.address[0].city"
                }
            ]
        },
        "providerProvinceTeritory": {
            "type": "string",
            "custompProperties": [
                {
                    "key": "fhirElement",
                    "value": "Practitioner.address[0].state"
                }
            ]
        },
        "providerStreetAddress": {
            "type": "string",
            "custompProperties": [
                {
                    "key": "fhirElement",
                    "value": "Practitioner.address[0].line[0]"
                }
            ]
        },
        "providerPostalCode": {
            "type": "string",
            "custompProperties": [
                {
                    "key": "fhirElement",
                    "value": "Practitioner.address[0].postalCode"
                }
            ]
        },
        "name": {
            "type": "string",
            "minLength": 3
        },
        "birthDate": {
            "type": "string",
            "format": "date"
        },
        "personalData": {
            "type": "object",
            "required": [
                "age",
                "height"
            ],
            "properties": {
                "age": {
                    "type": "integer",
                    "description": "Please enter your age."
                },
                "height": {
                    "type": "number"
                },
                "drivingSkill": {
                    "type": "number",
                    "maximum": 10,
                    "minimum": 1,
                    "default": 7
                }
            }
        },
        "friends": {
            "type": "array",
            "items": {
                "type": "object",
                "title": "Friend",
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "isClose": {
                        "type": "boolean"
                    }
                }
            }
        },
        "nationality": {
            "type": "string",
            "enum": [
                "DE",
                "IT",
                "JP",
                "US",
                "RU",
                "Other"
            ]
        },
        "occupation": {
            "type": "string"
        },
        "medicationSubForm": {
            "type": "string",
            "enum": [
                "medication1",
                "medication2"
            ]
        }
    }
};

const uischema = {
    "type": "VerticalLayout",
    "elements": [
        {
            "type": "Group",
            "elements": [
                {
                    "type": "Label",
                    "text": "This Would be the Form Title and Could be a Custom Component to apply styling"
                }
            ]
        },
        {
            "type": "HorizontalLayout",
            "elements": [
                {
                    "type": "VerticalLayout",
                    "elements": [
                        {
                            "type": "Group",
                            "elements": [
                                {
                                    "type": "VerticalLayout",
                                    "elements": [
                                        {
                                            "type": "HorizontalLayout",
                                            "elements": [
                                                {
                                                    "type": "Control",
                                                    "scope": "#/properties/patientFirstName",
                                                    "label": "Patient First Name"
                                                },
                                                {
                                                    "type": "Control",
                                                    "scope": "#/properties/patientLastName",
                                                    "label": "Patient Last Name"
                                                }
                                            ]
                                        },
                                        {
                                            "type": "HorizontalLayout",
                                            "elements": [
                                                {
                                                    "type": "Control",
                                                    "scope": "#/properties/patientPHN",
                                                    "label": "Personal Health Number"
                                                },
                                                {
                                                    "type": "Control",
                                                    "scope": "#/properties/patientBirthDate",
                                                    "label": "Date of Birth"
                                                }
                                            ]
                                        },
                                        {
                                            "type": "Control",
                                            "scope": "#/properties/patientGender",
                                            "label": "Gender",
                                            "options": {
                                                "format": "radio"
                                            }
                                        },
                                        {
                                            "type": "Group",
                                            "elements": [
                                                {
                                                    "type": "VerticalLayout",
                                                    "elements": [
                                                        {
                                                            "type": "HorizontalLayout",
                                                            "elements": [
                                                                {
                                                                    "type": "Control",
                                                                    "scope": "#/properties/patientCountry",
                                                                    "label": "Country"
                                                                },
                                                                {
                                                                    "type": "Control",
                                                                    "scope": "#/properties/patientCityTown",
                                                                    "label": "City/Town"
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "type": "Control",
                                                            "scope": "#/properties/patientProvinceTeritory",
                                                            "label": "Province/Teritory"
                                                        },
                                                        {
                                                            "type": "HorizontalLayout",
                                                            "elements": [
                                                                {
                                                                    "type": "Control",
                                                                    "scope": "#/properties/patientStreetAddress",
                                                                    "label": "Street Address"
                                                                },
                                                                {
                                                                    "type": "Control",
                                                                    "scope": "#/properties/patientPostalCode",
                                                                    "label": "Postal Code"
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ],
                                            "label": "Address"
                                        },
                                        {
                                            "type": "Control",
                                            "scope": "#/properties/patientPhone",
                                            "label": "Phone Number"
                                        }
                                    ]
                                }
                            ],
                            "label": "Patient Information"
                        },
                        {
                            "type": "Group",
                            "elements": [
                                {
                                    "type": "Control",
                                    "scope": "#/properties/alergies",
                                    "label": "Alergies"
                                },
                                {
                                    "type": "Control",
                                    "scope": "#/properties/patientFax",
                                    "options": {
                                        "format": "outlinedTextFiled"
                                    }
                                }
                            ],
                            "label": "Alergies"
                        }
                    ]
                },
                {
                    "type": "Group",
                    "elements": [
                        {
                            "type": "VerticalLayout",
                            "elements": [
                                {
                                    "type": "HorizontalLayout",
                                    "elements": [
                                        {
                                            "type": "Control",
                                            "scope": "#/properties/providerLastName",
                                            "label": "Provider Last Name"
                                        },
                                        {
                                            "type": "Control",
                                            "scope": "#/properties/providerFirstName",
                                            "label": "Provider First Name"
                                        }
                                    ]
                                },
                                {
                                    "type": "Control",
                                    "scope": "#/properties/providerID",
                                    "label": "Provider ID"
                                },
                                {
                                    "type": "Group",
                                    "elements": [
                                        {
                                            "type": "VerticalLayout",
                                            "elements": [
                                                {
                                                    "type": "HorizontalLayout",
                                                    "elements": [
                                                        {
                                                            "type": "Control",
                                                            "scope": "#/properties/providerCountry",
                                                            "label": "Country"
                                                        },
                                                        {
                                                            "type": "Control",
                                                            "scope": "#/properties/providerCityTown",
                                                            "label": "City/Town"
                                                        }
                                                    ]
                                                },
                                                {
                                                    "type": "Control",
                                                    "scope": "#/properties/providerProvinceTeritory",
                                                    "label": "Province/Teritory"
                                                },
                                                {
                                                    "type": "HorizontalLayout",
                                                    "elements": [
                                                        {
                                                            "type": "Control",
                                                            "scope": "#/properties/providerStreetAddress",
                                                            "label": "Street Address"
                                                        },
                                                        {
                                                            "type": "Control",
                                                            "scope": "#/properties/providerPostalCode",
                                                            "label": "Postal Code"
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ],
                                    "label": "Address"
                                }
                            ]
                        }
                    ],
                    "label": "Provider Information"
                }
            ]
        },
        {
            "type": "VerticalLayout",
            "elements": [
                {
                    "type": "Group",
                    "elements": [
                        {
                            "type": "Control",
                            "scope": "#/properties/medicationSubForm",
                            "label": "medication Form Selection"
                        },
                        {
                            "type": "Group",
                            "elements": [
                                {
                                    "type": "Label",
                                    "text": "Medication 1 instructions sample"
                                },
                                {
                                    "type": "Control",
                                    "scope": "#/properties/name"
                                }
                            ],
                            "label": "Medication 1",
                            "rule": {
                                "effect": "SHOW",
                                "condition": {
                                    "scope": "#/properties/medicationSubForm",
                                    "schema": {
                                        "const": "medication1"
                                    }
                                }
                            }
                        },
                        {
                            "type": "Group",
                            "elements": [
                                {
                                    "type": "Label",
                                    "text": "Medication 2 sample instructions"
                                },
                                {
                                    "type": "HorizontalLayout",
                                    "elements": [
                                        {
                                            "type": "Control",
                                            "scope": "#/properties/name"
                                        },
                                        {
                                            "type": "Control",
                                            "scope": "#/properties/name"
                                        }
                                    ]
                                }
                            ],
                            "rule": {
                                "effect": "SHOW",
                                "condition": {
                                    "scope": "#/properties/medicationSubForm",
                                    "schema": {
                                        "const": "medication2"
                                    }
                                }
                            },
                            "label": "Medication 2"
                        }
                    ],
                    "label": "Medication"
                },
                {
                    "type": "Group",
                    "elements": [
                        {
                            "type": "Control",
                            "scope": "#/properties/nationality"
                        },
                        {
                            "type": "Label",
                            "text": "OR"
                        },
                        {
                            "type": "Control",
                            "scope": "#/properties/nationality"
                        },
                        {
                            "type": "Label",
                            "text": "AND"
                        },
                        {
                            "type": "Control",
                            "scope": "#/properties/name"
                        }
                    ],
                    "label": "Eligibility Criteria"
                },
                {
                    "type": "Group",
                    "elements": [
                        {
                            "type": "Label",
                            "text": "Drug-Drug Interactions assessed"
                        },
                        {
                            "type": "Control",
                            "scope": "#/properties/nationality"
                        }
                    ],
                    "label": "Drug Interaction"
                },
                {
                    "type": "Group",
                    "elements": [
                        {
                            "type": "Control",
                            "scope": "#/properties/nationality",
                            "label": "Current kidney function"
                        },
                        {
                            "type": "Control",
                            "scope": "#/properties/nationality",
                            "label": "Fax Location"
                        },
                        {
                            "type": "Label",
                            "text": "Please use the drop down list above to find the pharm"
                        },
                        {
                            "type": "Control",
                            "scope": "#/properties/name",
                            "label": "If this fax is received in error, call:"
                        }
                    ],
                    "label": "Prescription"
                },
                {
                    "type": "Group",
                    "elements": [
                        {
                            "type": "Label",
                            "text": "Put file upload here"
                        }
                    ],
                    "label": "Signature"
                },
                {
                    "type": "Group",
                    "elements": [
                        {
                            "type": "Label",
                            "text": "C Group 1 includes ....."
                        },
                        {
                            "type": "Label",
                            "text": "C Group 2 includes"
                        }
                    ],
                    "label": "Additional Information"
                }
            ]
        }
    ]
};


function FhirForm() {

    


    const fhirResourceState = useSelector(selectFhirResources);//this is fhir patient need to use fhir path to get its details.


    console.log('patient state seleted succ from the store');

    const [initialFormState, setInitialFormState] = useState(null);
    const [submissionState, setSubmissionState] = useState(null);
    const [submissionErrorState, setSubmissionError] = useState(null);

    const findInFhirPath = (resource: any, path: string) => {
        return fhirPath.evaluate(resource, path, undefined, fhirpath_r4_model);
    }


    useEffect(() => {
        console.log('use effect executing');
        try {

            if (fhirResourceState.status === 'succeeded') {
                const patient = fhirResourceState.fhirResouces.patient;
                const practitioner = fhirResourceState.fhirResouces.practitioner;

                console.log(practitioner);

                let initialFormData: any = {};
                schemaResolver(schema).forEach((fhirPath, key) => {
                    if (fhirPath.toLowerCase().startsWith('patient')) {
                        const value = findInFhirPath(patient, fhirPath);
                        initialFormData[key] = value[0];
                    }

                    if (fhirPath.toLowerCase().startsWith('practitioner')) {
                        const value = findInFhirPath(practitioner, fhirPath);
                        initialFormData[key] = value[0];
                    }

                });

                setInitialFormState(initialFormData);
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

    }, [fhirResourceState.fhirResouces.patient, fhirResourceState.fhirResouces.practitioner, fhirResourceState.status]);//avoid using object directly as depandancy firstobj is not === to 2nd object// or use premitives



    const handleFormChange = (data: any, errors: any) => {
        console.log('data on form change');
        console.log(data);

        console.log('errors on form change');
        console.log(errors);
        setSubmissionError(errors);

        if (data)
            setSubmissionState(data);
    }

    const handleFormSubmit = () => {
        if (submissionErrorState) {
            console.log('did no submit due to form errors')
            console.log(submissionErrorState)
            return;
        }
        if (submissionState) {

            console.log('submission json:');
            console.log(submissionState);


            const submitPosts = async () => {
                try {
                    //async the global state
                    console.log('form submitted');

                    //reset form after adding the post
                    setSubmissionState(null);
                    setInitialFormState(null);


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
        } else {
            console.log('Error: Form submission State is empty');
        }


    }

    const outerTheme = useTheme();
    return (
        <article className="fhirForm">
            {
                <>
                    <ThemeProvider theme={customTheme(outerTheme)}>

                        <JsonForms
                            schema={schema}
                            uischema={uischema}
                            data={initialFormState}
                            renderers={renderers}
                            cells={materialCells}
                            onChange={({ errors, data }) => handleFormChange(data, errors)}
                            validationMode='ValidateAndShow'
                          

                        />

                        <CardActions sx={{ justifyContent: "center" }}>
                            <Button variant="contained" onClick={handleFormSubmit}>Submit Form</Button>
                        </CardActions>

                    </ThemeProvider>



                </>}
        </article>

    );
}

export default FhirForm;