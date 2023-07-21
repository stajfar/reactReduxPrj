import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter
} from '@reduxjs/toolkit';

import postsApi from '../../api/Posts';


export const patientsAdapter = createEntityAdapter<any>({
    // Keep the "all IDs" array sorted based on post titles
    sortComparer: (a, b) => a.id.localeCompare(b.id),
});

const initialState = patientsAdapter.getInitialState({
    status: 'idle',
    errors: ''
});



export const fetchPatients = createAsyncThunk('patients/fatchpatients', async () => {
    console.log('fetch patients in AsyncThunk');
    const response = await postsApi.get('/patients');

    return response.data
});

//create slice
const eformsSlice = createSlice({
    name: 'patients',
    initialState: initialState,
    //redux reducers are sync, to do async operation like api calls, use AsyncThunk
    reducers: {
        
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPatients.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPatients.fulfilled, (state, action) => {
                state.status = 'succeeded';
                patientsAdapter.upsertMany(state, action.payload);

            })
            .addCase(fetchPatients.rejected, (state, action) => {
                state.status = 'failed';
                state.errors = action.error.message ?? 'unknown error message';
            })
    }
});



export const selectPatientsState = (state: any) => (state.storePatients.status as string);

export const {
    selectAll: selectAllPatients,
    selectById: selectPatientById,
    selectIds: selectPatientIds
} = patientsAdapter.getSelectors((state: any) => state.storePatients)



//export reducer to be available for the store
export default eformsSlice.reducer;
