import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Client from 'fhirclient/lib/Client';


//#region TS Data Types


export interface PatientState {
    patient: any,
    status: string,
    errors: string
}

//#endregion


const initialState: PatientState = {
    patient: {},
    status: 'idle',
    errors: ''
}


export const fetchPatient = createAsyncThunk('fetchFhirPatient/patient', async (fhirClientState: Client) => {
    console.log('geting fhir Patient by AsyncThunk');
    //get patient from fhir client (fhir client makes an http call to the fhir server to get the patient)

    if (fhirClientState.hasOwnProperty('patient')) {
    let patientData = await fhirClientState.patient.read(); //make this async  with await
        //console.log(patientData);
        return patientData;
    }

    return {};    
});

//create slice
const patientSlice = createSlice({
    name: 'fhirPatient',
    initialState: initialState,
    reducers: {// just to change the state
        getUsers: (state, action) => { state.patient = action.payload; },// no need for this, componet gets from the store directly
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPatient.pending, (state, action) => { state.status = 'loading' })
            .addCase(fetchPatient.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.patient = action.payload
            })
            .addCase(fetchPatient.rejected, (state, action) => {
                state.status = 'failed';
                state.errors = action.error.message ?? 'unknown error message';
            })
    }
});

export const selectFhirPatient = (state: any) => state.storeFhirPatient as PatientState;

//export reducer to be available for the store
export default patientSlice.reducer;
