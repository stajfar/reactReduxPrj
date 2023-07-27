import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Client from 'fhirclient/lib/Client';
import { fhirclient } from 'fhirclient/lib/types';


//#region TS Data Types
export interface FhirResourceState {
    fhirResouces: { patient: fhirclient.FHIR.Patient, practitioner: fhirclient.FHIR.Practitioner},
    //practitioner: fhirclient.FHIR.Practitioner,
    status: string,
    errors: string
}
//#endregion


const initialState: FhirResourceState = {
    fhirResouces: { patient: { resourceType: "Patient" }, practitioner: { resourceType: "Practitioner" } },
   // practitioner: { resourceType: "Practitioner" },
    status: 'idle',
    errors: ''
}


export const fetchFhirResources = createAsyncThunk('fetchFhirPatient/patient', async (fhirClientState: Client) => {
    console.log('geting fhir Patient by AsyncThunk');
    //get patient from fhir client (fhir client makes an http call to the fhir server to get the patient)
    let result: { patient: fhirclient.FHIR.Patient, practitioner: fhirclient.FHIR.Practitioner } = { patient: { resourceType: "Patient" }, practitioner: { resourceType: "Practitioner" } };

    if (fhirClientState.hasOwnProperty('patient')) {
        let patientData = await fhirClientState.patient.read(); //make this async  with await
        //console.log(patientData);
        result.patient = patientData as fhirclient.FHIR.Patient;
    }

    if (fhirClientState.hasOwnProperty('user')) {
        let practitionerData = await fhirClientState.user.read();//make this async with await clientState.user.read()
        result.practitioner = practitionerData as fhirclient.FHIR.Practitioner;
    }

    return result;    
});



//create slice
const fhirResourceSlice = createSlice({
    name: 'fhirResources',
    initialState: initialState,
    reducers: {
       // getUsers: (state, action) => { state.patient = action.payload; },// no need for this, componet gets from the store directly
    },
    extraReducers(builder) {
        builder
            .addCase(fetchFhirResources.pending, (state, action) => { state.status = 'loading' })
            .addCase(fetchFhirResources.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.fhirResouces = action.payload as { patient: fhirclient.FHIR.Patient, practitioner: fhirclient.FHIR.Practitioner };
            })
            .addCase(fetchFhirResources.rejected, (state, action) => {
                state.status = 'failed';
                state.errors = action.error.message ?? 'unknown error message';
            })
    }
});

export const selectFhirResources = (state: any) => state.storeFhirResouces as FhirResourceState;

//export reducer to be available for the store
export default fhirResourceSlice.reducer;
