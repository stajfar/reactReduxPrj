import Client from 'fhirclient/lib/Client';
import React, { useEffect, useContext } from 'react';
import { useAppDispatch } from '../../app/store';
import FhirClientDataContext from './FhirClientContext';
import { fetchFhirResources } from './FhirResourceSlice';
import { useNavigate } from 'react-router-dom';

function LaunchRedirect() {

    const clientState = (useContext(FhirClientDataContext) as any).FhirClientState as Client;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
   
  
    useEffect(() => {
        if (clientState) {
           
            console.log('getting patient and practitioenr from fhir client (set state), and redirect to fhirForm');
          
           
            try {
               
                dispatch(fetchFhirResources(clientState));

                //after Store is set, navigate to the landing page
                navigate('/fhirform');
            }
            catch { }
        }
    }, [dispatch, clientState, navigate]);


    return (
        <p>Hello world redirected, get fhir clinet and set to store!</p>
    );
}

export default LaunchRedirect;