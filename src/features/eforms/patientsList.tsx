import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/store';
import {

  
    selectPatientIds,
    fetchPatients,
    selectPatientsState
} from './eformsSlice';
//import PatientSummary from './PatientSummary';


function Patients() {
  
    const orderedPatintsIds = useSelector(selectPatientIds);
    const patientsState = useSelector(selectPatientsState);

    const dispatch = useAppDispatch();


    //this calls on load and filles patientState above
    useEffect(() => {
        console.log('use efect exectuted to get all oatients inside Patient list');
        const fetchedPatients = async () => {
            try {
                console.log(patientsState);
                if (patientsState === 'idle')
                    dispatch(fetchPatients());
            } catch (error: any) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.headers);
                    console.log(error.response.status);
                } else {
                    console.log(error.message);
                }
            }
        }
        fetchedPatients();
    }, [dispatch, patientsState]);




    const createElement = () => {
        let content: JSX.Element = <></>;
        if (patientsState === 'loading') {
            content = <p> loading patients </p >;
        } else if (patientsState === 'succeeded') {
            <p> Error in loading patients' </p >//temp
            //content = <>{orderedPatintsIds.map(patientId => (<PatientSummary key={patientId} id={patientId}></PatientSummary>))}</>
        } else if (patientsState === 'failed') {
            <p> Error in loading patients' </p >
        }

        return content;
    }



    return (
        <>
            {createElement()}
        </>
    );
}

export default Patients;