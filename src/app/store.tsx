import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux'
import counterReducer from '../features/counterSlice';
import postsReducer from '../features/posts/PostsSlice';
import userReducer from '../features/users/UsersSlice';
import patientsReducer from '../features/eforms/eformsSlice';
import fhirPatientReducer from '../features/FHIR/FhirResourceSlice';

export const store = configureStore(
    {
        reducer: {
            storeCounter: counterReducer, //import slice reducers
            storePosts: postsReducer,
            storeUsers: userReducer,
            storePatients: patientsReducer,
            storeFhirPatient: fhirPatientReducer
        }

    });


    //this is a custom hook to overcome javascript validations
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch