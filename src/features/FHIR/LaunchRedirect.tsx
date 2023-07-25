import Client from 'fhirclient/lib/Client';
import React, { useEffect, useContext } from 'react';
import { useAppDispatch } from '../../app/store';
import FhirClientDataContext from './FhirClientContext';
import { fetchPatient } from './FhirResourceSlice';

function LaunchRedirect() {

    const clientState = (useContext(FhirClientDataContext) as any).FhirClientState as Client;

    const dispatch = useAppDispatch();
   
  
    useEffect(() => {
        if (clientState) {
           
            console.log('getting patient and practitioenr from fhir client, haha');
          
           
            try {
                let data = [];

               
                if (clientState.hasOwnProperty('user')) {
                    let practitionerData = clientState.user.read();//make this async with await clientState.user.read()
                    console.log(practitionerData);
                    data.push(practitionerData);
                }

                dispatch(fetchPatient(clientState));

                //if (clientState.hasOwnProperty('patient')) {
                //    let patientData = clientState.patient.read(); //make this async  with await
                //    console.log(patientData);
                //    data.push(patientData);
                //}
            }
            catch { }
        }
    }, [dispatch, clientState]);


    return (
        <p>Hello world redirected, get fhir clinet and set to store!</p>
    );
}

export default LaunchRedirect;